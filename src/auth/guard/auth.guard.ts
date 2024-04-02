import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenService } from 'src/token/services/token.service';
import { JwtService } from '@nestjs/jwt';
import { NotFoundError, Observable } from 'rxjs';
import { AuthHeaderEnum } from '../enums/auth.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private keyToken: TokenService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const shopId = req.headers[AuthHeaderEnum.CLIENT_ID];

    if (!shopId) {
      throw new UnauthorizedException('Invalid Request');
    }

    const keyStore = await this.keyToken.findByShopId(shopId);

    // console.log(keyStore);

    if (!keyStore) {
      throw new UnauthorizedException('Not Found keyStore');
    }
    if (req.headers[AuthHeaderEnum.REFRESHTOKEN]) {
      try {
        const rfToken: string = req.headers[AuthHeaderEnum.REFRESHTOKEN];

        const decodeShop = await this.jwtService.verifyAsync(rfToken, {
          secret: keyStore.privateKey,
        });
        if (shopId !== decodeShop.shopId) {
          throw new UnauthorizedException('Invalid ShopId');
        }

        req.keyStore = keyStore;
        req.shop = decodeShop;
        req.refreshToken = rfToken;
      } catch (error) {
        console.error('Lỗi xác minh token JWT:', error.message);
        throw new UnauthorizedException(error.message);
      }
    }

    const accessToken = req.headers[AuthHeaderEnum.AUTHORIZATION];

    if (!accessToken) throw new UnauthorizedException('Invalid Request');

    try {
      const decodeShop = await this.jwtService.verifyAsync(accessToken, {
        secret: keyStore.publicKey,
      });
      if (shopId !== decodeShop.shopId) {
        throw new UnauthorizedException('Invalid ShopId');
      }

      req.keyStore = keyStore;
      req.shop = decodeShop;

      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}

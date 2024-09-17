import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shop } from '../../shop/interface/shop.interface';
import { SignUpShopDto, LoginShopDto } from '../../shop/dto/shop.dto';
import * as bcrypt from 'bcrypt';
import { ShopRole } from '../../shop/enums/shop.enum';
import { randomBytes } from 'crypto';
import { TokenService } from '../../token/services/token.service';
import { AuthService } from '../../auth/services/auth.service';
import { getInfoData } from '../../utils';
import { ShopService } from '../../shop/services/shop.service';
import { log } from 'console';

@Injectable()
export class AccessService {
  constructor(
    @InjectModel('Shop') private readonly shopModel: Model<Shop>,
    private readonly tokenService: TokenService,
    private readonly authService: AuthService,
    private readonly shopService: ShopService,
  ) {}

  async signup(signupShopDto: SignUpShopDto) {
    const { name, email, password } = signupShopDto;

    //1 . check email shop ton tai trong db hay khong
    const shopExist = await this.shopModel.findOne({ email: email });
    if (shopExist) {
      throw new BadRequestException('Shop đã tồn tại trong hệ thống!');
    }

    //2 . hash password
    const passwordHash: string = await bcrypt.hash(password, 10);

    //3 . tao moi shop va luu vao db
    const newShop = await this.shopModel.create({
      name,
      email,
      password: passwordHash,
      roles: [ShopRole.SHOP],
    });

    // 4. tao 2 cap khoa privateKey va publicKey
    if (newShop) {
      const privateKey: string = randomBytes(64).toString('hex');
      const publicKey: string = randomBytes(64).toString('hex');

      const keyStore = await this.tokenService.createKeyToken({
        shopId: newShop._id,
        publicKey,
        privateKey,
        refreshToken: null,
      });

      if (!keyStore) {
        throw new BadRequestException('Cửa hàng đã đăng ký');
      }

      const payload = {
        shopId: newShop._id,
        email,
      };

      const tokens = await this.authService.createTokenPair(
        payload,
        publicKey,
        privateKey,
      );
      console.log('token::::', tokens);
      return {
        metadata: {
          shop: getInfoData({ fileds: ['_id', 'name', 'email'], obj: newShop }),
          tokens,
        },
      };
    }
    return {
      metadata: null,
    };
  }

  async login(loginShopDto: LoginShopDto) {
    //1 . check db co ton tai shop hay k

    const { email, password } = loginShopDto;
    const foundShop = await this.shopService.findByEmail({ email });

    if (!foundShop) {
      throw new BadRequestException('Shop not resgisted!');
    }

    //2 . neu shop ton tai trong db thi giai ma mat khau
    const match = await bcrypt.compare(password, foundShop.password);

    if (!match) {
      throw new UnauthorizedException('Authentication errors');
    }

    // 3. tao privateKey va publicKey
    const privateKey = randomBytes(64).toString('hex');
    const publicKey = randomBytes(64).toString('hex');

    const { _id: shopId } = foundShop;

    const payload = {
      shopId,
      email,
    };

    const tokens = await this.authService.createTokenPair(
      payload,
      publicKey,
      privateKey,
    );

    await this.tokenService.createKeyToken({
      shopId,
      refreshToken: tokens.refreshToken,
      privateKey,
      publicKey,
    });

    return {
      metadata: {
        shop: getInfoData({ fileds: ['_id', 'name', 'email'], obj: foundShop }),
        tokens,
      },
    };
  }

  async handleRefreshToken({ refreshToken, keyStore, shop }) {
    const { shopId, email } = shop;

    if (keyStore.refreshTokensUsed.includes(refreshToken)) {
      await this.tokenService.deleteKeyByShopId(shopId);
      throw new ForbiddenException('Something warning happend !! pls relogin!');
    }

    if (keyStore.refreshToken !== refreshToken) {
      throw new UnauthorizedException('Shop not registed!');
    }

    const foundShop = await this.shopService.findByEmail({ email });

    if (!foundShop) throw new UnauthorizedException('Shop not registed!');

    // tao 1 cap token moi
    const tokens = await this.authService.createTokenPair(
      { shopId, email },
      keyStore.publicKey,
      keyStore.privateKey,
    );
    // update token

      await this.tokenService.updateTokenByShopId(shopId,tokens.refreshToken,refreshToken)

      return {
        metadata: {
          shop,
          tokens
        }
      }


  }

  async logout(keyStore) {
    const delKey = await this.tokenService.removeKeyById(keyStore._id);

    return delKey;
  }
}

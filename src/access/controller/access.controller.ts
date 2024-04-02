import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AccessService } from '../services/access.service';
import { SignUpShopDto, LoginShopDto } from '../../shop/dto/shop.dto';

import { AuthGuard } from 'src/auth/guard/auth.guard';

import { CustomRequest } from 'src/auth/interfaces/CustomRequest.interface';

@Controller('access/shop')
export class AccessController {
  constructor(private readonly accessService: AccessService) {}

  @Post('/signup')
  async signUp(@Body() signUpShopDto: SignUpShopDto) {
    return await this.accessService.signup(signUpShopDto);
  }

  @Post('/login')
  async login(@Body() loginShopDto: LoginShopDto) {
    return await this.accessService.login(loginShopDto);
  }

  @UseGuards(AuthGuard)
  @Post('/logout')
  async logout(@Req() req: CustomRequest) {
    return await this.accessService.logout(req.keyStore);
  }

  @UseGuards(AuthGuard)
  @Post('handleRfToken')
  async handleRefreshToken(@Req() req: CustomRequest) {
    const refreshToken = req.refreshToken;
    const shop = req.shop
    const keyStore = req.keyStore

    return await this.accessService.handleRefreshToken({refreshToken,shop,keyStore})
  }
}

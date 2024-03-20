import { Body, Controller, Post } from '@nestjs/common';
import { AccessService } from '../services/access.service';
import { SignUpShopDto } from '../../shop/dto/shop.dto';

@Controller('access')
export class AccessController {
  constructor(private readonly accessService: AccessService) {}

  @Post()
  async signUp(@Body() signUpShopDto: SignUpShopDto) {
    await this.accessService.signup(signUpShopDto);
  }
}

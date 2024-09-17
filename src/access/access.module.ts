import { Module } from '@nestjs/common';
import { AccessController } from './controller/access.controller';
import { AccessService } from './services/access.service';
import { MongooseModule } from '@nestjs/mongoose';
import { shopSchema } from '../shop/Schemas/shop.schema';
import { TokenModule } from '../token/token.module';
import { AuthModule } from '../auth/auth.module';
import { ShopModule } from '../shop/shop.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Shop', schema: shopSchema }]),
    TokenModule,
    AuthModule,
    ShopModule,
  ],
  controllers: [AccessController],
  providers: [AccessService],
})
export class AccessModule {}

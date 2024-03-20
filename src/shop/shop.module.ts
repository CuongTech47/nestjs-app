import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { shopSchema } from './Schemas/shop.schema';
import { ShopController } from './controller/shop.controller';
import { ShopService } from './services/shop.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Shop', schema: shopSchema }])],
  controllers: [ShopController],
  providers: [ShopService],
})
export class ShopModule {}

import { Module } from '@nestjs/common';
import { AccessController } from './controller/access.controller';
import { AccessService } from './services/access.service';
import { MongooseModule } from '@nestjs/mongoose';
import { shopSchema } from '../shop/Schemas/shop.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Shop', schema: shopSchema }])],
  controllers: [AccessController],
  providers: [AccessService],
})
export class AccessModule {}

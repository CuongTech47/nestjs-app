import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Shop } from '../interface/shop.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ShopService {
  constructor(@InjectModel('Shop') private readonly shopModel: Model<Shop>) {}


}

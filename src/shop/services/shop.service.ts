import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Shop } from '../interface/shop.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ShopService {
  constructor(@InjectModel('Shop') private readonly shopModel: Model<Shop>) {}

  async findByEmail({
    email,
    select = { email: 1, password: 2, name: 1, status: 1, roles: 1 },
  }) {
    return this.shopModel.findOne({ email }).select(select).lean();
  }
}

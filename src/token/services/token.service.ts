import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Token } from '../interface/token.interface';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel('Key') private readonly keyTokenModel: Model<Token>,
  ) {}

  async createKeyToken({ shopId, publicKey, privateKey, refreshToken }) {
    const filter = { shop: shopId };

    const update = {
      publicKey,
      privateKey,
      refreshTokensUsed: [],
      refreshToken,
    };

    const options = { upsert: true, new: true };

    const tokens = await this.keyTokenModel.findOneAndUpdate(
      filter,
      update,
      options,
    );

    return tokens ? tokens.publicKey : null;
  }

  async findByShopId(shopId) {
    return await this.keyTokenModel.findOne({
      shop: new Types.ObjectId(shopId),
    });
  }

  async removeKeyById(id) {
    return await this.keyTokenModel.deleteOne(id);
  }

  async deleteKeyByShopId(shopId) {
    return await this.keyTokenModel.deleteOne({
      shop: new Types.ObjectId(shopId),
    });
  }

  async updateTokenByShopId(shopId, refreshToken, refreshTokensUsed) {
    return await this.keyTokenModel.updateOne(
      {
        shop: shopId,
      },
      {
        $set: {
          refreshToken: refreshToken,
        },
        $addToSet: {
          refreshTokensUsed: refreshTokensUsed,
        },
      },
    );
  }
}

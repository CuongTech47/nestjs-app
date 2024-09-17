import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiKeyInterface } from '../interfaces/apiKey.interface';
import { Model } from 'mongoose';
import * as crypto from 'crypto';

@Injectable()
export class ApiKeyService {
  constructor(
    @InjectModel('ApiKey') private readonly apiKeyModel: Model<ApiKeyInterface>,
  ) {}

  findById = async (key) => {
    // const newKey = await this.apiKeyModel.create({
    //   key: crypto.randomBytes(64).toString('hex'),
    //   permissions: ['0000'],
    // });
    //
    // console.log(newKey);
    const objKey = await this.apiKeyModel.findOne({ key, status: true }).lean();
    return objKey;
  };
}

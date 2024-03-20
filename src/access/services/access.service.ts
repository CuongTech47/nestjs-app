import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shop } from '../../shop/interface/shop.interface';
import { SignUpShopDto } from '../../shop/dto/shop.dto';
import * as bcrypt from 'bcrypt';
import { ShopRole } from '../../shop/enums/shop.enum';
import { randomBytes } from 'crypto';
@Injectable()
export class AccessService {
  constructor(@InjectModel('Shop') private readonly shopModel: Model<Shop>) {}

  public async signup(signupShopDto: SignUpShopDto) {
    const { name, email, password } = signupShopDto;

    //1 . check email shop ton tai trong db hay khong
    const shopExist = await this.shopModel.findOne({ email: email });
    if (shopExist) {
      throw new BadRequestException('Shop đã tồn tại trong hệ thống!');
    }

    //2 . hash password
    const passwordHash = await bcrypt.hash(password, 10);

    //3 . tao moi shop va luu vao db
    const newShop = await this.shopModel.create({
      name,
      email,
      password: passwordHash,
      roles: [ShopRole.SHOP],
    });

    // 4. tao 2 cap khoa privateKey va publicKey
    if (newShop) {
      const privateKey = randomBytes(64).toString('hex');
      const publicKey = randomBytes(64).toString('hex');
      console.log({ privateKey, publicKey });
    }
  }
}

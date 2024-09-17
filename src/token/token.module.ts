import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { keyTokenSchema } from './schemas/keyToken.schema';
import { TokenService } from './services/token.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Key', schema: keyTokenSchema }]),
  ],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}

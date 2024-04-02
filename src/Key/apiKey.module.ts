import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ApiKeyService } from './services/apiKey.service';
import { apiKeySchema } from './schemas/apiKey.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'ApiKey', schema: apiKeySchema }]),
  ],
  providers: [ApiKeyService],
  exports: [ApiKeyService],
})
export class ApiKeyModule {}

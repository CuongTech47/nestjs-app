import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ShopModule } from './shop/shop.module';
import { AccessModule } from './access/access.module';

@Module({
  imports: [DatabaseModule, ShopModule, AccessModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

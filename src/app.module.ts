import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ShopModule } from './shop/shop.module';
import { AccessModule } from './access/access.module';
import { CheckApiKeyMiddleware } from './auth/middlewares/checkApiKey.middleware';
import { ApiKeyModule } from './Key/apiKey.module';
import { CheckPermisstionMiddleware } from './auth/middlewares/checkPermisstion.middleware';

@Module({
  imports: [DatabaseModule, ShopModule, AccessModule, ApiKeyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckApiKeyMiddleware, CheckPermisstionMiddleware)
      .forRoutes('*');
  }
}

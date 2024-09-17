import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { ApiKeyModule } from '../Key/apiKey.module';
import { CheckApiKeyMiddleware } from './middlewares/checkApiKey.middleware';
import { TokenModule } from '../token/token.module';
// import { AuthGuard } from './guard/auth.guard';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      // signOptions: { expiresIn: '60s' },
    }),
    ApiKeyModule,
    TokenModule,
    // AuthGuard,
  ],
  providers: [AuthService, CheckApiKeyMiddleware],
  exports: [AuthService],
})
export class AuthModule {}

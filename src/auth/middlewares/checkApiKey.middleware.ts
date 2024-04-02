import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ApiKeyService } from '../Key/services/apiKey.service';

@Injectable()
export class CheckApiKeyMiddleware implements NestMiddleware {
  constructor(private readonly apiKeyService: ApiKeyService) {}
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request... test');
    next();
  }
}

import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { ApiKeyService } from '../../Key/services/apiKey.service';
import { CustomRequest } from '../interfaces/CustomRequest.interface';
import { AuthHeaderEnum } from '../enums/auth.enum';
@Injectable()
export class CheckApiKeyMiddleware implements NestMiddleware {
  constructor(private readonly apiKeyService: ApiKeyService) {}
  async use(req: CustomRequest, res: Response, next: NextFunction) {
    // console.log('Request... test', req.headers);
    const key = req.headers[AuthHeaderEnum.API_KEY]?.toString();

    if (!key) {
      throw new ForbiddenException('Forbidden Error');
    }
    // check objKey
    const objKey = await this.apiKeyService.findById(key);

    // console.log('check api key::', objKey);
    if (!objKey) {
      throw new ForbiddenException('Forbidden Error');
    }

    req.objKey = objKey;

    // console.log(key);
    next();
  }
}

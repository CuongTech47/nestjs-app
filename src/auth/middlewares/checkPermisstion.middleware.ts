import { Response, NextFunction } from 'express';

import { CustomRequest } from '../interfaces/CustomRequest.interface';
import { ForbiddenException } from '@nestjs/common';
import { ApiKeyPermissionEnum } from '../../Key/enums/apiKey.enum';

export function CheckPermisstionMiddleware(
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) {
  if (!req.objKey.permissions) {
    throw new ForbiddenException('Forbidden denied');
  }

  const permission = ApiKeyPermissionEnum.NONE;
  const vilidPermission = req.objKey.permissions.includes(permission);

  if (!vilidPermission) {
    throw new ForbiddenException('Forbidden denied');
  }

  return next();
}

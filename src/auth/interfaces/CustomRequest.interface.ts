import { Request } from 'express';

export interface CustomRequest extends Request {
  objKey?: any;
  shop?: any;
  keyStore?: any
  refreshToken?: string,
  // accessToken?: string
}

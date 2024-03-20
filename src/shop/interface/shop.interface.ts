import { Document } from 'mongoose';

export interface Shop extends Document {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly status: string;
  readonly verify: boolean;
  readonly roles: [];
  readonly created_at: Date;
  readonly updated_at: Date;
}

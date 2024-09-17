import { Document } from 'mongoose';
export interface ApiKeyInterface extends Document {
  readonly key: string;
  readonly status: true;
  readonly permissions: [];
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

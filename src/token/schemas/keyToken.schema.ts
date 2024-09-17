import * as mongoose from 'mongoose';

const { Schema } = mongoose;
const COLLECTION_NAME = 'Keys';
export const keyTokenSchema = new Schema(
  {
    shop: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Shop',
    },
    publicKey: {
      type: String,
      required: true,
    },
    privateKey: {
      type: String,
      required: true,
    },
    refreshTokensUsed: {
      type: Array,
      default: [], // nhung rf da dc su dung
    },
    refreshToken: {
      type: String, // nhung rf dang dc su dung
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
);

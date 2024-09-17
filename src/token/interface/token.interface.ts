export interface Token {
  readonly shop: string;
  readonly privateKey: string;
  readonly publicKey: string;
  readonly refreshTokensUsed: [];
  readonly refreshToken: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

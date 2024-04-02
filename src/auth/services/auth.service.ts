import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async createTokenPair(payload, publicKey, privateKey) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: publicKey,
      expiresIn: '3d',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: privateKey,
      expiresIn: '7d', // Ví dụ: JWT sẽ hết hạn sau 7 ngày
    });

    try {
      const decoded = await this.jwtService.verifyAsync(accessToken, {
        publicKey,
      });
      console.log('Thông tin được giải mã từ JWT:', decoded);
    } catch (e) {
      console.error('Xác minh JWT không thành công:', e);
    }

    return { accessToken, refreshToken };
  }
}

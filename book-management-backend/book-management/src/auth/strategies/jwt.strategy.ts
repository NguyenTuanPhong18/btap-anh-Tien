import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';

// Strategy này chạy MỖI KHI có request kèm Bearer token, để:
// 1. Giải mã token bằng JWT_SECRET
// 2. Lấy payload (chứa userId) ra, query lại DB để lấy thông tin user mới nhất
// 3. Gắn user đó vào request.user (để @CurrentUser() và RolesGuard dùng được)
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // đọc token từ header "Authorization: Bearer <token>"
      ignoreExpiration: false, // token hết hạn sẽ tự bị từ chối
      secretOrKey: config.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: { sub: string; email: string }) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, email: true, fullName: true, role: true },
    });
    return user; // giá trị return này chính là req.user
  }
}

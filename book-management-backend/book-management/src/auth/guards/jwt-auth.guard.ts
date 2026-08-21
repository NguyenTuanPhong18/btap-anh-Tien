import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Guard chặn request không có / sai token. Dùng: @UseGuards(JwtAuthGuard)
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

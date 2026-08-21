import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Decorator tiện ích: dùng @CurrentUser() trong controller để lấy thẳng user
// đã được JwtStrategy giải mã từ token, khỏi phải viết req.user mỗi lần
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

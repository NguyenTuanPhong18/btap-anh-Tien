import { IsEmail, IsString, MinLength } from 'class-validator';

// DTO = Data Transfer Object: định nghĩa dữ liệu client gửi lên phải có dạng gì
// class-validator sẽ tự động kiểm tra, nếu sai sẽ trả lỗi 400 trước khi vào tới service
export class RegisterDto {
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Mật khẩu phải từ 6 ký tự trở lên' })
  password: string;

  @IsString()
  fullName: string;
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';

// PartialType biến tất cả field trong CreateBookDto thành optional
// -> khi update chỉ cần gửi field muốn đổi, không cần gửi lại toàn bộ
export class UpdateBookDto extends PartialType(CreateBookDto) {}

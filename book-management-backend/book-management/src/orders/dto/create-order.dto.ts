import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsUUID, IsInt, Min, ValidateNested } from 'class-validator';

class OrderItemDto {
  @IsUUID()
  bookId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @IsArray()
  @ArrayMinSize(1, { message: 'Đơn hàng phải có ít nhất 1 sản phẩm' })
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}

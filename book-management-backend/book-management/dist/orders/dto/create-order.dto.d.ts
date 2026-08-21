declare class OrderItemDto {
    bookId: string;
    quantity: number;
}
export declare class CreateOrderDto {
    items: OrderItemDto[];
}
export {};

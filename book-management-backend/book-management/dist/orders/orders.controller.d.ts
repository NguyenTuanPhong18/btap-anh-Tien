import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
export declare class OrdersController {
    private ordersService;
    constructor(ordersService: OrdersService);
    create(user: any, dto: CreateOrderDto): Promise<{
        items: ({
            book: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                title: string;
                author: string;
                description: string | null;
                price: import("@prisma/client/runtime/library").Decimal;
                stock: number;
                imageUrl: string | null;
                categoryId: string;
            };
        } & {
            id: string;
            price: import("@prisma/client/runtime/library").Decimal;
            bookId: string;
            quantity: number;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.OrderStatus;
        total: import("@prisma/client/runtime/library").Decimal;
        userId: string;
    }>;
    findMyOrders(user: any): import(".prisma/client").Prisma.PrismaPromise<({
        items: ({
            book: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                title: string;
                author: string;
                description: string | null;
                price: import("@prisma/client/runtime/library").Decimal;
                stock: number;
                imageUrl: string | null;
                categoryId: string;
            };
        } & {
            id: string;
            price: import("@prisma/client/runtime/library").Decimal;
            bookId: string;
            quantity: number;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.OrderStatus;
        total: import("@prisma/client/runtime/library").Decimal;
        userId: string;
    })[]>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        user: {
            email: string;
            fullName: string;
            id: string;
        };
        items: ({
            book: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                title: string;
                author: string;
                description: string | null;
                price: import("@prisma/client/runtime/library").Decimal;
                stock: number;
                imageUrl: string | null;
                categoryId: string;
            };
        } & {
            id: string;
            price: import("@prisma/client/runtime/library").Decimal;
            bookId: string;
            quantity: number;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.OrderStatus;
        total: import("@prisma/client/runtime/library").Decimal;
        userId: string;
    })[]>;
    findOne(id: string, user: any): Promise<{
        user: {
            email: string;
            fullName: string;
            id: string;
        };
        items: ({
            book: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                title: string;
                author: string;
                description: string | null;
                price: import("@prisma/client/runtime/library").Decimal;
                stock: number;
                imageUrl: string | null;
                categoryId: string;
            };
        } & {
            id: string;
            price: import("@prisma/client/runtime/library").Decimal;
            bookId: string;
            quantity: number;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.OrderStatus;
        total: import("@prisma/client/runtime/library").Decimal;
        userId: string;
    }>;
    updateStatus(id: string, dto: UpdateOrderStatusDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.OrderStatus;
        total: import("@prisma/client/runtime/library").Decimal;
        userId: string;
    }>;
}

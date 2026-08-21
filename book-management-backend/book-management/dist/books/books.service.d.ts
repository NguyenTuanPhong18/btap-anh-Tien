import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
export declare class BooksService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(categoryId?: string, search?: string): import(".prisma/client").Prisma.PrismaPromise<({
        category: {
            name: string;
            id: string;
            createdAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        title: string;
        author: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        imageUrl: string | null;
        categoryId: string;
        updatedAt: Date;
    })[]>;
    findOne(id: string): Promise<{
        category: {
            name: string;
            id: string;
            createdAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        title: string;
        author: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        imageUrl: string | null;
        categoryId: string;
        updatedAt: Date;
    }>;
    create(dto: CreateBookDto): import(".prisma/client").Prisma.Prisma__BookClient<{
        id: string;
        createdAt: Date;
        title: string;
        author: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        imageUrl: string | null;
        categoryId: string;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, dto: UpdateBookDto): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        author: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        imageUrl: string | null;
        categoryId: string;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        author: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        imageUrl: string | null;
        categoryId: string;
        updatedAt: Date;
    }>;
}

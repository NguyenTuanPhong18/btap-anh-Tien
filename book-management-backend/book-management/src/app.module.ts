import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // đọc file .env, dùng được ở mọi module
    PrismaModule,
    AuthModule,
    BooksModule,
    CategoriesModule,
    OrdersModule,
  ],
})
export class AppModule {}

import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// Bọc PrismaClient thành 1 Nest service để "inject" (tiêm) vào bất kỳ module nào cần query DB
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect(); // kết nối DB khi app khởi động
  }
  async onModuleDestroy() {
    await this.$disconnect(); // đóng kết nối khi app tắt
  }
}

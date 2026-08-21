import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  // Guest/Customer/Admin đều gọi được - không cần token
  findAll(categoryId?: string, search?: string) {
    return this.prisma.book.findMany({
      where: {
        categoryId: categoryId || undefined,
        title: search ? { contains: search, mode: 'insensitive' } : undefined,
      },
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const book = await this.prisma.book.findUnique({
      where: { id },
      include: { category: true },
    });
    if (!book) throw new NotFoundException('Không tìm thấy sách');
    return book;
  }

  // 3 hàm dưới chỉ Admin gọi được (chặn ở controller bằng @Roles(Role.ADMIN))
  create(dto: CreateBookDto) {
    return this.prisma.book.create({ data: dto });
  }

  async update(id: string, dto: UpdateBookDto) {
    await this.findOne(id); // ném NotFoundException nếu id không tồn tại
    return this.prisma.book.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.book.delete({ where: { id } });
  }
}

import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  // Customer đặt hàng
  async create(userId: string, dto: CreateOrderDto) {
    const bookIds = dto.items.map((i) => i.bookId);
    const books = await this.prisma.book.findMany({ where: { id: { in: bookIds } } });

    if (books.length !== bookIds.length) {
      throw new BadRequestException('Có sách trong đơn hàng không tồn tại');
    }

    // Kiểm tra tồn kho + tính tổng tiền dựa trên giá THẬT trong DB
    // (không tin giá client gửi lên, tránh bị sửa giá qua request)
    let total = 0;
    const itemsData = dto.items.map((item) => {
      const book = books.find((b) => b.id === item.bookId)!;
      if (book.stock < item.quantity) {
        throw new BadRequestException(`Sách "${book.title}" không đủ tồn kho`);
      }
      total += Number(book.price) * item.quantity;
      return { bookId: book.id, quantity: item.quantity, price: book.price };
    });

    // $transaction: đảm bảo tạo đơn hàng + trừ tồn kho cùng thành công hoặc cùng thất bại
    return this.prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          userId,
          total,
          items: { create: itemsData },
        },
        include: { items: { include: { book: true } } },
      });

      for (const item of itemsData) {
        await tx.book.update({
          where: { id: item.bookId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      return order;
    });
  }

  // Customer xem đơn hàng của chính mình
  findMyOrders(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: { items: { include: { book: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Admin xem tất cả đơn hàng
  findAll() {
    return this.prisma.order.findMany({
      include: { items: { include: { book: true } }, user: { select: { id: true, email: true, fullName: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, currentUser: { id: string; role: Role }) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { items: { include: { book: true } }, user: { select: { id: true, email: true, fullName: true } } },
    });
    if (!order) throw new NotFoundException('Không tìm thấy đơn hàng');

    // Customer chỉ được xem đơn của chính mình, Admin xem được tất cả
    if (currentUser.role !== Role.ADMIN && order.userId !== currentUser.id) {
      throw new ForbiddenException('Bạn không có quyền xem đơn hàng này');
    }
    return order;
  }

  // Admin cập nhật trạng thái đơn hàng
  async updateStatus(id: string, dto: UpdateOrderStatusDto) {
    const order = await this.prisma.order.findUnique({ where: { id } });
    if (!order) throw new NotFoundException('Không tìm thấy đơn hàng');
    return this.prisma.order.update({ where: { id }, data: { status: dto.status } });
  }
}

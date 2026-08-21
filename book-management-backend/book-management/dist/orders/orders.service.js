"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let OrdersService = class OrdersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto) {
        const bookIds = dto.items.map((i) => i.bookId);
        const books = await this.prisma.book.findMany({ where: { id: { in: bookIds } } });
        if (books.length !== bookIds.length) {
            throw new common_1.BadRequestException('Có sách trong đơn hàng không tồn tại');
        }
        let total = 0;
        const itemsData = dto.items.map((item) => {
            const book = books.find((b) => b.id === item.bookId);
            if (book.stock < item.quantity) {
                throw new common_1.BadRequestException(`Sách "${book.title}" không đủ tồn kho`);
            }
            total += Number(book.price) * item.quantity;
            return { bookId: book.id, quantity: item.quantity, price: book.price };
        });
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
    findMyOrders(userId) {
        return this.prisma.order.findMany({
            where: { userId },
            include: { items: { include: { book: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    findAll() {
        return this.prisma.order.findMany({
            include: { items: { include: { book: true } }, user: { select: { id: true, email: true, fullName: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id, currentUser) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: { items: { include: { book: true } }, user: { select: { id: true, email: true, fullName: true } } },
        });
        if (!order)
            throw new common_1.NotFoundException('Không tìm thấy đơn hàng');
        if (currentUser.role !== client_1.Role.ADMIN && order.userId !== currentUser.id) {
            throw new common_1.ForbiddenException('Bạn không có quyền xem đơn hàng này');
        }
        return order;
    }
    async updateStatus(id, dto) {
        const order = await this.prisma.order.findUnique({ where: { id } });
        if (!order)
            throw new common_1.NotFoundException('Không tìm thấy đơn hàng');
        return this.prisma.order.update({ where: { id }, data: { status: dto.status } });
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map
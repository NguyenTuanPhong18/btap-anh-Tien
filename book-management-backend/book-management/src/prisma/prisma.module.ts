import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // đánh dấu Global để không phải import PrismaModule lặp lại ở từng module con
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}

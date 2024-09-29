import { Module } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';
import { OrderController } from './order.controller';

@Module({
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, PrismaService],
})
export class OrderModule {}

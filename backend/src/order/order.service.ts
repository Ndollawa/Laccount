import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Order, OrderStatus } from '@prisma/client';
import { handleError } from '@app/common';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(protected readonly orderRepository: OrderRepository) {}

  async find(id: any): Promise<Order> {
    try {
      return await this.orderRepository.find({
        where: { id },
        include: { author: true },
      });
    } catch (error) {
      handleError(error);
    }
  }

  async findAll(query: any): Promise<Order[]> {
    try {
      return await this.orderRepository.findMany(query);
    } catch (error) {
      handleError(error);
    }
  }
  async remove(id: string): Promise<Order> {
    try {
      return await this.orderRepository.delete({
        where: { id },
      });
    } catch (error) {
      handleError(error);
    }
  }
  async create(createOrderData: CreateOrderDto): Promise<Order> {
    const {
      title ,
      body ,
      description ,
      image ,
      tags ,
      authorId , 
     } = createOrderData;

    try {
      const existingOrder = await this.orderRepository.exists({
        where: { title },
      });

      if (existingOrder) {
        throw new HttpException(
          'Order with credentials already exists.',
          HttpStatus.CONFLICT,
        );
      }

      const OrderData = {
        ...createOrderData,
        status: OrderStatus.PUBLISHED,
      readCount: 12, 
      readingTime: '12 minutes' ,
      };

      const newOrder = await this.orderRepository.create({
        data: OrderData,
      });
      Logger.debug(newOrder);
      return newOrder;
    } catch (error) {
      Logger.log(error);
      handleError(error);
    }
  }

  async update(id: string, updateOrderData: UpdateOrderDto) {
    try {
      return await this.orderRepository.update({
        where: { id },
        data: updateOrderData,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async upsert(id: string, updateOrderData: UpdateOrderDto) {
    try {
      return await this.orderRepository.upsert({
        where: { id },
        data: updateOrderData,
      });
    } catch (error) {
      handleError(error);
    }
  }
}

import { OrderStatus } from '@prisma/client';
import { IsEnum, IsString, IsUUID } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsUUID()
  buyerId: string;

  @IsString()
  @IsUUID()
  listingId: string;

  @IsEnum(OrderStatus)
  status: OrderStatus;
}

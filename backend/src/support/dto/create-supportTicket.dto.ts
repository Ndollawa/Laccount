import { TicketPriority, TicketCategory, TicketStatus } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  IsDate,
  IsDecimal,
  IsCurrency,
  IsEnum,
} from 'class-validator';

export class CreateSupportTicketDto {
  @IsString()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  assignedToId: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsEnum(TicketCategory)
  category: TicketCategory;

  @IsEnum(TicketStatus)
  status: TicketStatus;

  @IsEnum(TicketPriority)
  priority: TicketPriority;

  @IsString()
  @IsNotEmpty()
  @IsDecimal()
  amount: number;

  @IsString()
  @IsNotEmpty()
  @IsCurrency()
  currency: string;

  @IsString()
  subject: string;

  @IsString()
  ticketId: string;

  @IsOptional()
  @IsString()
  @IsDate()
  resolvedAt?: Date;
}

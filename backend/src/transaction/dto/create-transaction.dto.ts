import {
  PaymentMethod,
  TransactionPurpose,
  TransactionStatus,
} from '@prisma/client';
import { IsDecimal, IsEnum, IsString, IsUUID } from 'class-validator';

export class CreateTransactionDto {
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @IsEnum(TransactionStatus)
  status: TransactionStatus;

  @IsDecimal()
  amount: number;

  @IsString()
  currency: string;

  @IsEnum(TransactionPurpose)
  purpose: TransactionPurpose;

  @IsString()
  @IsUUID()
  sessionId: string;

  @IsString()
  @IsUUID()
  userId: string;
}

import {
  PaymentMethod,
  SubscriptionStatus,
  SubscriptionType,
} from '@prisma/client';
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

export class CreateSubscriptionDto {
  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  planId: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsOptional()
  @IsString()
  @IsEnum(PaymentMethod)
  paymentMethod?: PaymentMethod;

  @IsEnum(SubscriptionStatus)
  status: SubscriptionStatus;

  @IsString()
  @IsNotEmpty()
  @IsDecimal()
  amount: number;

  @IsString()
  @IsNotEmpty()
  @IsCurrency()
  currency: string;

  @IsOptional()
  @IsString()
  @IsDate()
  startsAt?: Date;

  @IsOptional()
  @IsString()
  @IsDate()
  endsAt?: Date;

  @IsOptional()
  @IsString()
  @IsDate()
  cancelAt?: Date;

  @IsOptional()
  @IsString()
  @IsDate()
  cancelledAt?: Date;

  @IsEnum(SubscriptionType)
  type: SubscriptionType;
}

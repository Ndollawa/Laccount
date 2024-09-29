import { PaymentFrequency, PlanStatus, PlanType } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDecimal,
} from 'class-validator';

export class CreateSubscriptionPlanDto {
  @IsString()
  @IsNotEmpty()
  subscriptionPlan: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(PlanType)
  planType: PlanType;

  @IsEnum(PlanStatus)
  status: PlanStatus;

  @IsDecimal()
  price: number;

  @IsEnum(PaymentFrequency)
  frequency: PaymentFrequency;
}

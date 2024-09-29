import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentGatewayDto } from './create-paymentgateway.dto';

export class UpdatePaymentGatewayDto extends PartialType(
  CreatePaymentGatewayDto,
) {}

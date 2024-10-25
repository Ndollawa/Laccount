import { Module } from '@nestjs/common';
import { PaymentGatewayService } from './paymentgateway.service';
import { PaymentGatewayRepository } from './paymentgateway.repository';
import { PaymentGatewayController } from './paymentgateway.controller';
import {
  PaystackPaymentGateway,
  RazorpayPaymentGateway,
  StripePaymentGateway,
} from './gateways';

@Module({
  controllers: [PaymentGatewayController],
  providers: [
    PaymentGatewayService,
    PaymentGatewayRepository,
    StripePaymentGateway,
    RazorpayPaymentGateway,
    PaystackPaymentGateway,
  ],
  exports: [PaymentGatewayService],
})
export class PaymentModule {}

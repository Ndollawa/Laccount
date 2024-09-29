import { Module } from '@nestjs/common';
import { PaymentGatewayService } from './paymentgateway.service';
import { PaymentGatewayRepository } from './paymentgateway.repository';
import { PaymentGatewayController } from './paymentgateway.controller';

@Module({
  controllers: [PaymentGatewayController],
  providers: [PaymentGatewayService, PaymentGatewayRepository],
})
export class PaymentModule {}

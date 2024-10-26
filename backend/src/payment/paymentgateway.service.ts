import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PaymentGateway, GatewayMode } from '@prisma/client';
import {
  handleError,
  PaymentGateway as PaymentGatewayInterface,
} from '@app/common';
import { CreatePaymentGatewayDto, UpdatePaymentGatewayDto } from './dto';
import { PaymentGatewayRepository } from './paymentgateway.repository';
import {
  StripePaymentGateway,
  PaystackPaymentGateway,
  RazorpayPaymentGateway,
} from './gateways';

@Injectable()
export class PaymentGatewayService {
  private paymentGateway: PaymentGatewayInterface;
  constructor(
    protected readonly stripePaymentGateway: StripePaymentGateway,
    protected readonly razorpayPaymentGateway: RazorpayPaymentGateway,
    protected readonly paystackPaymentGateway: PaystackPaymentGateway,
    protected readonly paymentGatewayRepository: PaymentGatewayRepository,
  ) {}

  async find(id: any): Promise<PaymentGateway> {
    try {
      return await this.paymentGatewayRepository.find({
        where: { id },
      });
    } catch (error) {
      handleError(error);
    }
  }

  async findAll(query: any): Promise<PaymentGateway[]> {
    try {
      return await this.paymentGatewayRepository.findMany(query);
    } catch (error) {
      handleError(error);
    }
  }
  async remove(id: string): Promise<PaymentGateway> {
    try {
      return await this.paymentGatewayRepository.delete({
        where: { id },
      });
    } catch (error) {
      handleError(error);
    }
  }
  async create(
    createPaymentGatewayData: CreatePaymentGatewayDto,
  ): Promise<PaymentGateway> {
    const {
      name,
      publicKey,
      secretKey,
      webhookSecret,
      merchantId,
      mode,
      isActive,
      supportedCurrencies,
      country,
    } = createPaymentGatewayData;

    try {
      const existingPaymentGateway = await this.paymentGatewayRepository.exists(
        {
          where: { name },
        },
      );

      if (existingPaymentGateway) {
        throw new HttpException(
          'Payment  Gateway with credentials already exists.',
          HttpStatus.CONFLICT,
        );
      }

      const PaymentGatewayData = {
        ...createPaymentGatewayData,
      };

      const newPaymentGateway = await this.paymentGatewayRepository.create({
        data: PaymentGatewayData,
      });
      Logger.debug(newPaymentGateway);
      return newPaymentGateway;
    } catch (error) {
      handleError(error);
    }
  }

  async update(id: string, updatePaymentGatewayData: UpdatePaymentGatewayDto) {
    try {
      return await this.paymentGatewayRepository.update({
        where: { id },
        data: updatePaymentGatewayData,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async upsert(id: string, updatePaymentGatewayData: UpdatePaymentGatewayDto) {
    try {
      return await this.paymentGatewayRepository.upsert({
        where: { id },
        data: updatePaymentGatewayData,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async processPayment(
    transactionId: string,
    amount: number,
    paymentMethod: string,
  ) {
    // This is where you'd call Stripe, Paystack, or Razorpay based on the payment method
    const activeGateway: string = 'stripe';
    switch (activeGateway) {
      case 'stripe':
        this.paymentGateway = this.stripePaymentGateway;
        break;
      case 'paystack':
        this.paymentGateway = this.paystackPaymentGateway;
        break;
      case 'razorpay':
        this.paymentGateway = this.razorpayPaymentGateway;
        break;
      default:
        throw new Error('Unsupported payment gateway');
    }
    // console.log();
    // Simulated webhook callback (In real scenarios, this will be an actual webhook event)
    return await this.initializePayment(amount, 'usd', '124');
  }

  //
  async initializePayment(amount: number, currency: string, userId: string) {
    return await this.paymentGateway.initializePayment(
      amount,
      currency,
      userId,
    );
  }

  async verifyPayment(paymentId: string) {
    return await this.paymentGateway.verifyPayment(paymentId);
  }

  // Verify webhook events (optional, for security)
  verifyWebhook(webhookData: any) {
    // You can implement logic here to verify that the webhook is legitimate
  }
}

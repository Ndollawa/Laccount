import { handleError, PaymentGateway } from '@app/common';
import { ConfigService } from '@nestjs/config';
import Razorpay from 'razorpay';

export class RazorpayPaymentGateway implements PaymentGateway {
  private razorpay: Razorpay;

  constructor(private readonly configService: ConfigService) {
    this.razorpay = new Razorpay({
      key_id:
        this.configService?.get('RAZORPAY_KEY_ID') ||
        (process.env.RAZORPAY_KEY_ID as string),
      key_secret:
        this.configService?.get('RAZORPAY_SECRET_KEY') ||
        (process.env.RAZORPAY_SECRET_KEY as string),
    });
  }

  async initializePayment(amount: number, currency: string, userId: string) {
    try {
      const options = {
        amount: amount * 100, // Razorpay also uses smallest currency unit
        currency,
        receipt: `receipt_${userId}`,
      };
      const order = await this.razorpay.orders.create(options);
      return order;
    } catch (error) {
      handleError(error);
    }
  }

  async verifyPayment(paymentId: string) {
    try {
      const payment = await this.razorpay.payments.fetch(paymentId);
      return payment;
    } catch (error) {
      handleError(error);
    }
  }
}

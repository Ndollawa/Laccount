import { handleError, PaymentGateway } from '@app/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

export class PaystackPaymentGateway implements PaymentGateway {
  constructor(private readonly configService: ConfigService) {}

  async initializePayment(amount: number, currency: string, userId: string) {
    try {
      const response = await axios.post(
        'https://api.paystack.co/transaction/initialize',
        {
          amount: amount * 100, // Paystack also uses smallest currency unit
          currency,
          metadata: { userId },
          email: 'user@example.com', // Pass the user's email address
        },
        {
          headers: {
            Authorization: `Bearer ${this.configService?.get('PAYSTACK_SECRET_KEY') || process.env.PAYSTACK_SECRET_KEY}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async verifyPayment(paymentId: string) {
    try {
      const response = await axios.get(
        `https://api.paystack.co/transaction/verify/${paymentId}`,
        {
          headers: {
            Authorization: `Bearer ${this.configService?.get('PAYSTACK_SECRET_KEY') || process.env.PAYSTACK_SECRET_KEY}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
}

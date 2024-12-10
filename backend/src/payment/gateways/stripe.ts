import { ConfigService } from '@nestjs/config';
import { handleError, PaymentGateway } from '@app/common';
import Stripe from 'stripe';

export class StripePaymentGateway implements PaymentGateway {
  private stripe: Stripe;

  constructor(private readonly configService: ConfigService) {
    this.stripe = new Stripe(
      this.configService?.get('STRIPE_SECRET_KEY') ||
        (process.env.STRIPE_SECRET_KEY as string),
      { apiVersion: `2024-09-30.acacia` },
    );
  }

  async initializePayment(amount: number, currency: string, userId: string) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: amount * 100, // Stripe works in smallest currency unit (e.g., cents for USD)
        currency,
        metadata: { userId },
        automatic_payment_methods: {
          enabled: true,
        },
      });
      return paymentIntent;
    } catch (error) {
      handleError(error);
    }
  }

  async verifyPayment(paymentId: string) {
    try {
      const paymentIntent =
        await this.stripe.paymentIntents.retrieve(paymentId);
      return paymentIntent;
    } catch (error) {
      handleError(error);
    }
  }
}

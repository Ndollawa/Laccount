import { Controller, Post, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Controller('webhook')
export class WebhookController {
  private;
  constructor(private readonly configService: ConfigService) {}

  @Post('stripe')
  handleStripeWebhook(@Req() req, @Res() res) {
    // Handle Stripe webhook
    // Validate the event using Stripe's secret
    const stripe: Stripe = new Stripe(
      this.configService?.get('STRIPE_SECRET_KEY') ||
        (process.env.STRIPE_SECRET_KEY as string),
      { apiVersion: null },
    );
    const endpointSecret =
      this.configService?.get('WEBHOOK_SIGNING_SECRET') ||
      (process.env.WEBHOOK_SIGNING_SECRET as string);
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log('PaymentIntent was successful!');
        break;
      case 'payment_method.attached':
        const paymentMethod = event.data.object;
        console.log('PaymentMethod was attached to a Customer!');
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    console.log(req);
    // Return a response to acknowledge receipt of the event
    return res.json({ received: true });
  }

  @Post('paystack')
  handlePaystackWebhook(@Req() req, @Res() res) {
    // Handle Paystack webhook
    res.sendStatus(200);
  }

  @Post('razorpay')
  handleRazorpayWebhook(@Req() req, @Res() res) {
    // Handle Razorpay webhook
    res.sendStatus(200);
  }
}

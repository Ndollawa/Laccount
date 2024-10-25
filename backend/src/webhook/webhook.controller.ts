import { Controller, Post, Req, Res } from '@nestjs/common';

@Controller('webhook')
export class WebhookController {
  @Post('stripe')
  handleStripeWebhook(@Req() req, @Res() res) {
    // Handle Stripe webhook
    // Validate the event using Stripe's secret
    res.sendStatus(200);
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

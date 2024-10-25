export interface PaymentGateway {
  initializePayment(
    amount: number,
    currency: string,
    userId: string,
  ): Promise<any>;
  verifyPayment(paymentId: string): Promise<any>;
}

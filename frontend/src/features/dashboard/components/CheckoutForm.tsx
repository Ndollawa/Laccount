import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { DotLoader, PulseLoader } from 'react-spinners';
import { Button } from 'react-bootstrap';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useProcessPaymentMutation } from '@dashboard/pages/Wallet/slices/paymentApi.slice';

const CheckoutForm = ({ styles: { buttonText }, amount }: { styles: { buttonText: string }, amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [processPayment, { data, isLoading, isSuccess, isError, error }] = useProcessPaymentMutation();

  // Prevent unnecessary calls by controlling the initialization flag
  const [paymentInitialized, setPaymentInitialized] = useState(false);

  // Error handling utility
  const handleError = (error: any) => {
    setLoading(false);
    setErrorMessage(error?.message || 'Payment failed');
  };

  // Payment submission logic
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);
    
    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: 'http://localhost:5173/payment-status',
      },
    });

    if (error) {
      handleError(error);
    }
  };

  // Initialize payment
  const initPayment = useCallback( async () => {
    if (paymentInitialized) return; // Prevent multiple initializations

    try {
      const paymentResponse = await processPayment({
        amount,
        transactionId: 'ghdgdg',
        userId: 'cdfgtg',
      });
      if (paymentResponse?.data?.data?.client_secret) {
        setClientSecret(paymentResponse.data?.data?.client_secret);
        setPaymentInitialized(true); // Mark payment as initialized
      }
    } catch (err) {
      setErrorMessage('Error processing payment.');
    }
  },[])

  // useEffect to manage payment initialization
  useEffect(() => {
    if (!paymentInitialized) {
      initPayment();
    }
  }, [paymentInitialized, amount]); // Only trigger on mount and when amount changes

  // Show loading spinner if necessary data isn't loaded yet
  if (!clientSecret || !stripe || !elements || isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center w-100 h-64 relative pt-3">
        <div>
          <DotLoader size="3rem" />
          <div className="my-4 text-center">
            <small>Loading...</small>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {clientSecret &&
      <> <PaymentElement />
      <div className="d-flex justify-content-end mt-5">
        <Button
          size="sm"
          type="submit"
          className="btn btn-primary text-white"
          disabled={!stripe || loading}
        >
          {loading ? <PulseLoader className='' /> : buttonText}
        </Button>
      </div></>}
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default CheckoutForm;

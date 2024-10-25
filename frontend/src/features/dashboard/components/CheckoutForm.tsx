import React, {FormEvent, useEffect, useState} from 'react';
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import { useProcessPaymentMutation } from '../pages/Wallet/slices/paymentApi.slice';
import { Button } from 'react-bootstrap';

const CheckoutForm = ({styles:{buttonText}, amount}:{styles:{buttonText:string}, amount:number}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState('');
  const [processPayment, {data, isLoading, isSuccess, isError, error }] = useProcessPaymentMutation();
  
  const handleSubmit = async (event:FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const {error} = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      clientSecret,
      confirmParams: {
        return_url: 'https://example.com/order/123/complete',
      },
    });


    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error?.message as string);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };
  const initPayment = async ()=>{
  await processPayment({amount,transactionId:'ghdgdg',userId:'cdfgtg'})

  }

useEffect(() => {
  initPayment()
    if(isSuccess){
    setClientSecret(data.data.client_secret) 
  }
  return () => {
  
  };
}, [amount, isSuccess, isError])
  return (
    <form onSubmit={handleSubmit}>
     {clientSecret && <PaymentElement />} 
     <div className="d-flex justify-content-end mt-5">
      <Button size="sm" className="" disabled={!stripe}>{buttonText}</Button>
      </div>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  )
};

export default CheckoutForm;
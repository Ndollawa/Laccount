import React, {useState, useRef, useEffect, Element} from 'react';
import {useStripe} from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { HiBadgeCheck } from "react-icons/hi";
import { PropagateLoader } from 'react-spinners';
import { BsInfoCircleFill } from 'react-icons/bs';
import { MdCancel } from "react-icons/md";
import OtherBody from './OtherBody';

const PaymentStatus = () => {
  const stripe = useStripe();
  const [message, setMessage] = useState<string | null>(null);
const icon = useRef<any>();
  useEffect(() => {
    if (!stripe) {
      return;
    }

    // Retrieve the "payment_intent_client_secret" query parameter appended to
    // your return_url by Stripe.js
    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    // Retrieve the PaymentIntent
    stripe
      .retrievePaymentIntent(clientSecret as string)
      .then(({paymentIntent}) => {
        // Inspect the PaymentIntent `status` to indicate the status of the payment
        // to your customer.
        //
        // Some payment methods will [immediately succeed or fail][0] upon
        // confirmation, while others will first enter a `processing` state.
        //
        // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
        switch (paymentIntent?.status) {
          case 'succeeded':
            setMessage('Success! Payment received.');
            icon.current = <HiBadgeCheck color={'green'} size="15rem" />
            break;

          case 'processing':
            setMessage("Payment processing. We'll update you when payment is received.");
            icon.current = <PropagateLoader  color={'blue'} size="15rem" />
            break;

          case 'requires_payment_method':
            // Redirect your user back to your payment page to attempt collecting
            // payment again
            setMessage('Payment failed. Please try another payment method.');
            icon.current = <BsInfoCircleFill color={'red'} size="15rem" />
            break;

          default:
            setMessage('Something went wrong.');
            icon.current = <MdCancel color={'red'} size="15rem" />
            break;
        }
      });
  }, [stripe]);
  const navigate =useNavigate()

  return (
    <OtherBody>
         
        {message && <div className="container h-100">
             <div className="row justify-content-center h-100 align-items-center">
                 <div className="col-md-5">
                     <div className="form-input-content text-center error-page">
                         <div className="my-3">{icon.current}</div>
                         <h5>Status: <p className='text-muted'>{message}</p></h5>
                        
             <div>
                             <button className="btn btn-primary" onClick={()=>navigate(-1)}>Click to go Back</button>
                         </div>
                     </div>
                 </div>
             </div>
         </div>}
   </OtherBody>
   )
};

export default PaymentStatus;
import React from 'react'
import { contextProps } from '../../../app/props'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

if(STRIPE_PUBLIC_KEY === undefined) throw new Error('STRIPE_PUBLIC_KEY not defined');

const StripeElement = ({children}:contextProps) => {
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
  return (
    <Elements 
    stripe={stripePromise}
    options={{
        mode: "payment",
        currency:'usd',
    }}>
        {children}
    </Elements>
  )
}

export default StripeElement
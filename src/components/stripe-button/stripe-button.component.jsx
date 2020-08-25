import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51HK6YZGJ7JUD14wpCczuRd9FdNWfPDnA6qQ9gECJCBMC0dRdy3gufoIdWhmHE2oikuAlFKzonTf8qsnaYpB5N1g400E3FBTLqr';
  const onToken = token => {
    console.log(token);
    alert('Payment Successful');
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='CowboyBebop Clothing Ltd.'
      billingAddress
      shippingAddress
      image='https://i.pinimg.com/736x/8b/ef/a3/8befa33e1cea8e5bb96ae925ffe64729.jpg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
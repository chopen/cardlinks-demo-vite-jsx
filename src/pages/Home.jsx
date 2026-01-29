import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

// https://github.com/casvil/another-react-component-library
import { Button, CreditCardForm } from 'another-react-component-library';

import useGlobalSessionState from '../utils/sessionStorage.jsx';

export default function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [cardLinksData, setCardLinksData] = useGlobalSessionState({});
  console.log('Loaded....');
  const handleSubmit = async (cardData) => {
    let newCardLinksData = { cardData: cardData };
    setIsSubmitting(true);
    setCardLinksData(newCardLinksData);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsVerified(true); // Now go to Address collection step
    console.log('setting newCardLinksData: ', newCardLinksData);
    sessionStorage.setItem('cardLinksData', JSON.stringify(newCardLinksData));
    console.log('This: ', this);
    navigate(`/Address`);
  };

  return (
    <div className='flex items-center justify-center mx-w-screen-sm bg-white p-8'>
      <div className='space-y-6 w-96'>
        <div className='bg-white p-6 rounded-lg border'>
          <h3 className='text-lg font-semibold mb-4'>
            Strivve CardLinks - Card Data
          </h3>
          <CreditCardForm
            initialValues={{
              cardNumber: cardLinksData.cardData.cardNumber,
              cardholderName: cardLinksData.cardData.cardholderName,
              cvc: cardLinksData.cardData.cvc,
              expiryDate: cardLinksData.cardData.expiryDate,
            }}
            onSubmit={handleSubmit}
          />

          <Button
            type='submit'
            label={isSubmitting ? 'Processing...' : 'Verify Card'}
            className='w-full mt-4'
            disabled={isSubmitting}
            onClick={() => {
              const form = document.querySelector('form');
              if (form) {
                form.dispatchEvent(
                  new Event('submit', {
                    bubbles: true,
                    cancelable: true,
                  }),
                );
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

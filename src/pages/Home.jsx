import React, { useState, useEffect } from 'react';

// https://github.com/casvil/another-react-component-library
import { Button, CreditCardForm } from 'another-react-component-library';

import CustomLink from '@/components/CustomLink';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [cardLinksData, setCardLinksData] = useState(() => {
    try {
      let theCardLinksData = {
        cardData: {
          cardNumber: '',
          cardholderName: '',
          cvc: '',
          expiryDate: '',
        },
      };
      if (typeof sessionStorage != 'undefined') {
        let savedCardLinksData = sessionStorage.getItem('cardLinksData');
        if (savedCardLinksData) {
          console.log('savedCardLinksData: ', savedCardLinksData);
          theCardLinksData = JSON.parse(savedCardLinksData);
        }
      }
      console.log('theCardLinksData: ', theCardLinksData);
      return theCardLinksData;
    } catch (error) {
      console.error('Session storage error:', error);
      return {};
    }
  });

  const handleSubmit = async (cardData) => {
    let newCardLinksData = { cardData: cardData };
    setIsSubmitting(true);
    setCardLinksData(newCardLinksData);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    alert('Card submitted successfully!\n' + JSON.stringify(newCardLinksData));

    setIsVerified(true); // Now go to Address collection step
    console.log('setting newCardLinksData: ', newCardLinksData);
    sessionStorage.setItem('cardLinksData', JSON.stringify(newCardLinksData));
    router.push(`/address`);
  };

  return (
    <div className='flex items-center justify-center bg-white p-8'>
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

/*return (
    <>
      <main>
        <section className='bg-dark'>
          <div className='flex flex-col items-center justify-center min-h-screen text-white layout'>
            <CustomLink href='https://github.com/theodorusclarence/vite-react-tailwind-starter'>
              <h1>Vite React Tailwind Starter</h1>
            </CustomLink>
            <p className='mb-4'>
              By{' '}
              <CustomLink href='https://theodorusclarence.com'>
                Theodorus Clarence
              </CustomLink>
            </p>

            <div className='mt-8 text-dark'>
              <p className='text-[#ffe347]'>JIT is on</p>
            </div>
            <footer className='absolute text-gray-300 bottom-2'>
              © {new Date().getFullYear()}{' '}
              <CustomLink href='https://theodorusclarence.com'>
                Theodorus Clarence
              </CustomLink>
            </footer>
          </div>
        </section>
      </main>
    </>
  );*/

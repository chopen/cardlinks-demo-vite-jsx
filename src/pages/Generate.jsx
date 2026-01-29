import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import useGlobalSessionState from '../utils/sessionStorage.jsx';
import Accordian from '@/components/Accordian';

// https://github.com/casvil/another-react-component-library
import { CreditCardPreview } from 'another-react-component-library';

function callAsyncFunctionWithTimer(delayInMs, fn, params) {
  setTimeout(() => {
    // Call the named async function
    fn(params);
  }, delayInMs);
}

export default function GenerateCardLink() {
  const navigate = useNavigate();
  const [cardLinksData, setCardLinksData] = useGlobalSessionState({});
  const [isGenerating, setIsGenerating] = useState(true);
  callAsyncFunctionWithTimer(5000, setIsGenerating, false);

  if (
    cardLinksData &&
    typeof cardLinksData.cardData !== 'undefined' &&
    typeof cardLinksData.cardAddress !== 'undefined'
  ) {
    return (
      <div>
        <div
          className={`flex py-6 items-center justify-center bg-white p-4' ${isGenerating ? 'animate-spin' : ''}`}
        >
          <CreditCardPreview
            cardNumber={cardLinksData.cardData.cardNumber}
            cardholderName={cardLinksData.cardData.cardholderName}
            cvc={cardLinksData.cardData.cvc}
            editable={false}
            expiryDate={cardLinksData.cardData.expiryDate}
            onChange={function wX() {}}
            showCvc={false}
            size='sm'
          />
          <div className='p-1 bg-white shadow-lg rounded-lg'>
            <h3 className='text-lg font-semibold mb-3 text-gray-800'>
              Cardholder Address
            </h3>
            <div className='text-gray-600'>
              <p className='mb-1'>{cardLinksData.cardAddress.address1}</p>
              <p className='mb-1'>{cardLinksData.cardAddress.address2}</p>
              <p className='mb-1'>
                {cardLinksData.cardAddress.city},{' '}
                {cardLinksData.cardAddress.state},{' '}
                {cardLinksData.cardAddress.zipCode}
              </p>
              <p>United States</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

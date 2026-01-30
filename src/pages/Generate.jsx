import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import UrlCopyComponent from '@/components/urlDisplayAndCopy';
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

const clUrl = 'https://acmefi.org/-NuAJAVQiRzLB0UDKS1m/6'; // This should come back from Strivve CardLinks entryPoint call

export default function GenerateCardLink() {
  const navigate = useNavigate();
  const [cardLinksData, setCardLinksData] = useGlobalSessionState({});
  const [isGenerating, setIsGenerating] = useState(true);
  callAsyncFunctionWithTimer(3000, setIsGenerating, false);

  console.log('cardholderAddress: ', cardLinksData.cardAddress);
  if (
    cardLinksData &&
    typeof cardLinksData.cardData !== 'undefined' &&
    typeof cardLinksData.cardAddress !== 'undefined'
  ) {
    return (
      <div>
        <div
          className={`flex pt-10 py-6 items-center justify-center bg-white p-4' ${isGenerating ? 'animate-spin' : ''}`}
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
          </div>
        <div
          className={`flex py-6 items-center justify-center bg-white p-4' ${isGenerating ? 'hidden' : 'block'}`}
        >
          <div className='p-8'>
            <h1 className='text-2xl font-bold mb-4'>
              Your Personal Card-on-File CardLink is ready!
            </h1>
            <UrlCopyComponent url={clUrl} />
          </div>
        </div>
      </div>
    );
  }
}

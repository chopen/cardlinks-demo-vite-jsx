import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import UrlCopyComponent from '@/components/urlDisplayAndCopy';
import useGlobalSessionState from '../utils/sessionStorage.jsx';
import Accordian from '@/components/Accordian';

// https://github.com/casvil/another-react-component-library
import {
  Divider,
  Switch,
  CreditCardPreview,
} from 'another-react-component-library';

import {
  Bell,
  LockKeyhole,
  SquareUserRound,
  ListEnd,
  Funnel,
  Heading2,
  Filter,
} from 'lucide-react';

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
  callAsyncFunctionWithTimer(2000, setIsGenerating, false);

  console.log('cardholderAddress: ', cardLinksData.cardAddress);
  if (
    cardLinksData &&
    typeof cardLinksData.cardData !== 'undefined' &&
    typeof cardLinksData.cardAddress !== 'undefined'
  ) {
    return (
      <div>
        <div className='flex py-6 items-center justify-center bg-white p-4'>
          <div
            className={`flex pt-10 bg-white p-4' ${isGenerating ? 'animate-spin' : ''}`}
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
        {/* Composition Settings */}
        <div className='pt-10 py-6 items-center justify-center bg-white p-4'>
          <Divider />
          <span>
            <h3 className='flex text-lg font-semibold text-gray-900 pt-3 gap-2'>
              <ListEnd className='w-5 h-5' />
              Post-processing URL Compostion Preferences
            </h3>
          </span>
          <div className='flex flex-col col-span-2 mt-2'>
            <div className='flex items-center justify-center'>
              <div className='flex flex-col justify-start'>
                <Switch
                  name='genQrCode'
                  label='Generate Personal QR-Code'
                  description='Create a personal QR-Code?'
                  defaultChecked={false}
                  labelClassName=''
                />
                <div className='pb-3'></div>
                <Switch
                  name='emailNotifications'
                  label='Email CardLink?'
                  description='Receive CardLink and QR-Code via email'
                  defaultChecked={false}
                />
                <div className='pb-3'></div>
                <Switch
                  name='smsNotifications'
                  label='SMS Notifications'
                  description='Receive CardLink and QR-Code via SMS'
                  defaultChecked={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

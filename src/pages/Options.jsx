import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';

import useGlobalSessionState from '../utils/sessionStorage.jsx';

// https://github.com/casvil/another-react-component-library
import {
  Checkbox,
  CheckboxGroup,
  CreditCardPreview,
  TextArea,
  Divider,
  FormField,
  FormInput,
  Button,
  Input,
  Switch,
  Form,
  RadioGroup,
} from 'another-react-component-library';

import {
  Bell,
  LockKeyhole,
  SquareUserRound,
  ListEnd,
  Funnel,
  Heading2,
} from 'lucide-react';

export default function CollectCardLinkOptions() {
  const [cardLinksData, setCardLinksData] = useGlobalSessionState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState('');

  // The onSubmit function handles the form data when validation passes
  const onSubmit = async (data) => {
    setMessage('Submitting...');
    try {
      // In a real application, you would send this data to a Next.js API route or Server Action
      // const response = await fetch('/api/submit-address', { ... });
      // const result = await response.json();

      let newCardLinksData = {
        cardData: cardLinksData.cardData,
        cardAddress: {},
      };
      newCardLinksData.cardAddress = data;

      console.log('Options Submitted Data:', data);
      setMessage('Address submitted successfully!');
      console.log('setting newCardLinksData: ', newCardLinksData);
      sessionStorage.setItem('cardLinksData', JSON.stringify(newCardLinksData));
      //router.push(`/generate`);
    } catch (error) {
      setMessage('Submission failed.');
    }
  };

  const authTypeOptions = [
    {
      value: 'useCVV',
      label: 'Cardholder Enters CVV',
      description: 'For teams and organizations',
    },
    {
      value: 'useZipcode',
      label: 'Cardholder Enters Postal Code',
      description: 'For large organizations',
    },
  ];

  if (
    cardLinksData &&
    typeof cardLinksData.cardData !== 'undefined' &&
    typeof cardLinksData.cardAddress !== 'undefined'
  ) {
    return (
      <div>
        <div className='flex py-6 items-center justify-center bg-white p-4'>
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
        <div className='flex py-1 items-center justify-center bg-white p-4'>
          <Form
            onSubmit={handleSubmit}
            layout='vertical'
            gridColumns={1}
            spacing='lg'
            submitText='Create CardLink'
            loadingText='Creating account...'
            className='flex py-1 items-center justify-center bg-white p-2'
          >
            {/* Security Preferences */}
            <div className='flex flex-col col-span-2 mt-6'>
              <Divider className='inherit' />
              <h3 className='items-center justify-center text-lg font-semibold text-gray-900 my-4 flex gap-2'>
                <LockKeyhole className='w-5 h-5' />
                CardLinks Safety & Security Options
              </h3>
              <CheckboxGroup
                name='accountType'
                label='Cardholder Authorization'
                labelClassName='flex text-lg font-semibold text-gray-100'
                className='flex items-center justify-center text-gray-900 text-lg'
                options={authTypeOptions}
                checkboxProps={{
                  size: 'md',
                  wrapperClassName: 'hover:bg-gray-50 px-4 rounded',
                }}
                required
              />
            </div>
            {/* Styling Settings */}
            <div className='flex flex-col col-span-2 mt-2'>
              <Divider />
              <h3 className='items-center justify-center text-lg font-semibold text-gray-900 my-4 flex gap-2'>
                <SquareUserRound className='w-5 h-5' />
                Cardholder Experience Styling Settings
              </h3>
              <h2 className='items-center justify-center text-lg text-red-500 font-semibold text-gray-900 my-2 flex gap-2'>
                {' '}
                Bryan, Praveen, Gary?{' '}
              </h2>
            </div>
            {/* Targeted Sites Settings */}
            <div className='flex flex-col col-span-2 mt-2'>
              <Divider />
              <h3 className='items-center justify-center text-lg font-semibold text-gray-900 my-4 flex gap-2'>
                <SquareUserRound className='w-5 h-5' />
                Targeted Sites Display Settings
              </h3>
              <h2 className='items-center justify-center text-lg text-red-500 font-semibold text-gray-900 my-2 flex gap-2'>
                {' '}
                Bryan, Praveen, Gary?{' '}
              </h2>
            </div>
            {/* Analytics Settings */}
            <div className='col-span-2 mt-1'>
              <Divider />
              <h3 className='items-center justify-center text-lg font-semibold text-gray-900 my-4 flex gap-2'>
                <Funnel className='w-5 h-5' />
                Analytics and Source Tracking Settings
              </h3>
              <h2 className='items-center justify-center text-lg text-red-500 font-semibold text-gray-900 my-2 flex gap-2'>
                {' '}
                Bryan, Praveen, Gary?{' '}
              </h2>
            </div>
            {/* Composition Settings */}
            <div className='col-span-2 mt-2'>
              <Divider />
              <h3 className='items-center justify-center text-lg font-semibold text-gray-900 pt-3 flex gap-2'>
                <ListEnd className='w-5 h-5' />
                Post-processing URL Compostion Preferences
              </h3>
            </div>
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
                  defaultChecked={true}
                />
                <div className='pb-3'></div>
                <Switch
                  name='smsNotifications'
                  label='SMS Notifications'
                  description='Receive CardLink and QR-Code via SMS'
                />
              </div>
            </div>
          </Form>{' '}
        </div>
      </div>
    );
  }
}

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// https://github.com/casvil/another-react-component-library
import { CreditCardPreview } from 'another-react-component-library';

import useGlobalSessionState from '../utils/sessionStorage.jsx';

// Define the validation schema for an address using Zod
const addressSchema = z.object({
  address1: z
    .string()
    .min(5, { message: 'Street address must be at least 5 characters.' }),
  address2: z.string(),
  city: z.string().min(2, { message: 'City must be at least 2 characters.' }),
  state: z.string().min(2, { message: 'State must be at least 2 characters.' }),
  zipCode: z
    .string()
    .regex(/^\d{5}(-\d{4})?$/, { message: 'Invalid ZIP code.' }),
});

export default function CollectCardAddress() {
  const navigate = useNavigate();
  const [cardLinksData, setCardLinksData] = useGlobalSessionState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addressSchema),
  });
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

      console.log('Form Submitted Data:', data);
      setMessage('Address submitted successfully!');
      console.log('setting newCardLinksData: ', newCardLinksData);
      sessionStorage.setItem('cardLinksData', JSON.stringify(newCardLinksData));
      navigate(`/options`);
    } catch (error) {
      setMessage('Submission failed.');
    }
  };

  if (!cardLinksData || cardLinksData.cardData == null) {
    return (
      <ul>
        <h2>Error: No Card data provided</h2>
        <li>
          <Link className='underline text-blue-600' href='/'>
            Home
          </Link>
        </li>
      </ul>
    );
  }
  return (
    <div className='flex flex-col py-8 items-center justify-center bg-white p-8'>
      <CreditCardPreview
        cardNumber={cardLinksData.cardData.cardNumber}
        cardholderName={cardLinksData.cardData.cardholderName}
        cvc={cardLinksData.cardData.cvc}
        editable={false}
        expiryDate={cardLinksData.cardData.expiryDate}
        onChange={function wX() {}}
        showCvc={false}
        size='lg'
      />
      <div className='relative flex py-5 pt-4 items-center'>
        <div className='flex-grow border-t border-gray-400'></div>
        <span className='flex-shrink mx-4 pt-4 pb-1 text-gray-400'>
          Cardholder Address
        </span>
        <div className='flex-grow border-t border-gray-400'></div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='items-center justify-center space-y-4 max-w-lg mx-auto p-4 border rounded shadow'
      >
        <div>
          <label
            htmlFor='streetAddress1'
            className='block text-sm font-medium text-gray-700'
          >
            Street Address 1
          </label>
          <input
            {...register('address1')}
            id='address1'
            className='mt-1 block w-full p-2 border border-gray-300 rounded'
          />
          {errors.address1 && (
            <p className='text-red-500 text-xs mt-1'>
              {errors.address1.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor='streetAddress2'
            className='block text-sm font-medium text-gray-700'
          >
            Street Address 2
          </label>
          <input
            {...register('address2')}
            id='address2'
            className='mt-1 block w-full p-2 border border-gray-300 rounded'
          />
          {errors.address2 && (
            <p className='text-red-500 text-xs mt-1'>
              {errors.address2.message}
            </p>
          )}
        </div>

        <div className='grid grid-cols-3 gap-4'>
          <div>
            <label
              htmlFor='city'
              className='block text-sm font-medium text-gray-700'
            >
              City
            </label>
            <input
              {...register('city')}
              id='city'
              className='mt-1 block w-full p-2 border border-gray-300 rounded'
            />
            {errors.city && (
              <p className='text-red-500 text-xs mt-1'>{errors.city.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor='state'
              className='block text-sm font-medium text-gray-700'
            >
              State
            </label>
            <input
              {...register('state')}
              id='state'
              className='mt-1 block w-full p-2 border border-gray-300 rounded'
            />
            {errors.state && (
              <p className='text-red-500 text-xs mt-1'>
                {errors.state.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor='zipCode'
              className='block text-sm font-medium text-gray-700'
            >
              ZIP Code
            </label>
            <input
              {...register('zipCode')}
              id='zipCode'
              className='mt-1 block w-full p-2 border border-gray-300 rounded'
            />
            {errors.zipCode && (
              <p className='text-red-500 text-xs mt-1'>
                {errors.zipCode.message}
              </p>
            )}
          </div>
        </div>

        <button
          type='submit'
          className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600'
        >
          Continue
        </button>

        {message && (
          <p className='mt-2 text-center text-sm font-medium text-green-600'>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

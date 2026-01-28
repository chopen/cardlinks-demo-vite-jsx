import React, { createContext, useContext, useState } from 'react';

// Create the context
const SessionStorageContext = createContext({
  cardLinksData: {
    cardData: {
      cardNumber: '',
      cardholderName: '',
      cvc: '',
      expiryDate: '',
    },
    cardAddress: {
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipCode: '',
    },
  },
  setCardLinksData: () => {},
});

// Create a custom hook to easily access the context
export default function useGlobalSessionState() {
  return useContext(SessionStorageContext);
}

// Create a provider component that will wrap the parts of your app needing access
export const GlobalSessionStateProvider = ({ children }) => {
  const [cardLinksData, setCardLinksData] = useState(() => {
    console.log('SessionStorageContext: ', SessionStorageContext);
    try {
      let theCardLinksData = SessionStorageContext._currentValue.cardLinksData;
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

  return (
    <SessionStorageContext.Provider value={[cardLinksData, setCardLinksData]}>
      {children}
    </SessionStorageContext.Provider>
  );
};

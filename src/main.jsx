import React from 'react';
import ReactDOM from 'react-dom/client'; // Note the '/client' import path
import { Helmet } from 'react-helmet';

import '@/index.css';
import App from '@/App';

import { GlobalSessionStateProvider } from './utils/sessionStorage.jsx';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container); // Create a root
root.render(
  <>
    <React.StrictMode>
      <GlobalSessionStateProvider>
        <App>
          <Helmet
            defaultTitle='Strivve CardLinks OnDemand Demo - Vite'
            titleTemplate='%s'
          >
            <meta charSet='utf-8' />
            <html lang='id' amp />
          </Helmet>
        </App>
      </GlobalSessionStateProvider>
    </React.StrictMode>
  </>,
);

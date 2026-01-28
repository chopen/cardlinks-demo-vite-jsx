import React from 'react';
import ReactDOM from 'react-dom/client'; // Note the '/client' import path
import { Helmet } from 'react-helmet';

import '@/index.css';
import App from '@/App';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container); // Create a root
root.render(
  <>
    <React.StrictMode>
      <App>
        <Helmet
          defaultTitle='Vite React Tailwind Starter'
          titleTemplate='%s | Vite React Tailwind Starter'
        >
          <meta charSet='utf-8' />
          <html lang='id' amp />
        </Helmet>
      </App>
    </React.StrictMode>
  </>,
);
document.getElementById('root');

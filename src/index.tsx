import { AuthProvider } from 'react-auth-kit';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToasterProvider } from './Toaster/ToastProvider';
import App from './App';
import './globals.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <div className="bg-black">
    <AuthProvider
      authType="cookie"
      authName="auth"
      cookieDomain={window.location.hostname}
      cookieSecure
    >
      <ToasterProvider>
        <App />
      </ToasterProvider>
    </AuthProvider>
  </div>,
);

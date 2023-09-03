import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import { store, persistor } from './store'; // Import store and persistor
import App from './App';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51NdrqMSIJQipzpwwLmAdL8n2lTfmP4PTmqRxor3S2zRxP7uiSSD3bYAZ0smY7g1YTfGhN4VErZBgrKtUnkbcNaa9003qoAACyt');

// Use ReactDOM.render() for older React versions
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

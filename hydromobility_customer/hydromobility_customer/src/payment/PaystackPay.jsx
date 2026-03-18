import React from 'react';
import { usePaystack } from 'react-native-paystack-webview';

const PaystackPay = () => {
  const { popup } = usePaystack();

  const initiatePayment = ({ 
    email, 
    amount, 
    onSuccess, 
    onCancel, 
    onError 
  }) => {
    popup.checkout({
      email,
      amount,
      reference: `PAY_${Date.now()}`,
      channels: ['card', 'bank', 'ussd', 'mobile_money'],
      metadata: {
        custom_fields: [{
          display_name: 'Payment From',
          variable_name: 'payment_from',
          value: 'Mobile App'
        }]
      },
      onSuccess,
      onCancel,
      onError,
      onLoad: () => console.log('Paystack checkout loaded')
    });
  };

  return { initiatePayment };
};

export default PaystackPay;
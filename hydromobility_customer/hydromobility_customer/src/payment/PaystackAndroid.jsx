import React from 'react';
import { View, Button, Alert } from 'react-native';
import { usePaystack } from 'react-native-paystack-webview';

const PaystackAndroid = ({ email = global.email, amount, onSuccess, onCancel, onError }) => {
  const { popup } = usePaystack();

  const handlePay = () => {
    if (!email || !amount || amount <= 0) {
      return Alert.alert('Invalid email or amount');
    }

    popup.checkout({
      email,
      amount: amount * 100,
      reference: 'REF_' + Date.now(),
      onSuccess: res => onSuccess(res),
      onCancel: () => onCancel(),
      onError: err => onError(err),
    });
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Pay with Paystack" onPress={handlePay} />
    </View>
  );
};

export default PaystackAndroid;

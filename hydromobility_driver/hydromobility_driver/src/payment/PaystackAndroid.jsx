import React from 'react';
import { View, Button, Alert, Text, TouchableOpacity } from 'react-native';
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
<View style={{ padding: 10 }}>
 

  <TouchableOpacity
    onPress={handlePay}
    style={{
      backgroundColor: '#0069E8',
      paddingVertical: 14,
      borderRadius: 10,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    }}
    activeOpacity={0.7}
  >
    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
      Pay with Paystack
    </Text>
  </TouchableOpacity>
</View>
  );
};

export default PaystackAndroid;

import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { useStripe, usePaymentSheet } from '@stripe/stripe-react-native';
import { api_url, CLIENT_SECRET_KEY, create_stripe_intent } from '../config/Constants';

const StripePay = ({ amount, currencyCode, label, onSuccess, onError }) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  // Fetch payment intent from backend
  const fetchPaymentIntent = async () => {
    return CLIENT_SECRET_KEY
    try {
      setLoading(true);
      const response = await fetch(api_url + create_stripe_intent, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(amount).toFixed(2),
          currency: currencyCode.toLowerCase(),
        }),
      });
      
      const data = await response.json();
      
      if (!data.result?.client_secret) {
        throw new Error('Failed to get payment intent from server');
      }
      
      return data.result.client_secret;
    } catch (error) {
      console.error('Error fetching payment intent:', error);
      Alert.alert('Error', 'Failed to initialize payment');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Initialize payment sheet
  const initializePaymentSheet = async () => {
    try {
      setLoading(true);
      
      const clientSecret = await fetchPaymentIntent();

      const { error } = await initPaymentSheet({
        merchantDisplayName: 'Your App Name',
        paymentIntentClientSecret: clientSecret,
        style: 'alwaysLight',
        appearance: {
          colors: {
            primary: '#636363',
          },
        },
      });

      if (error) {
        throw error;
      }

      setReady(true);
      return true; // Return success status
    } catch (error) {
      console.error('Payment sheet init error:', error);
      onError?.(error.message || 'Payment initialization failed');
      return false; // Return failure status
    } finally {
      setLoading(false);
    }
  };

  // Open payment sheet automatically when ready
  const openPaymentSheet = async () => {
    try {
      setLoading(true);
      const { error } = await presentPaymentSheet();

      if (error) {
        if (error.code === 'Canceled') {
          onError?.('Payment canceled');
          return; // User closed the sheet
        }
        throw error;
      }

      onSuccess?.('Payment completed successfully!');
    } catch (error) {
      console.error('Payment error:', error);
      onError?.(error.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const prepareAndOpenSheet = async () => {
      const initialized = await initializePaymentSheet();
      if (initialized) {
        await openPaymentSheet();
      }
    };
    
    prepareAndOpenSheet();
  }, []);

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#636363" />
          <Text style={styles.loadingText}>Preparing payment...</Text>
        </View>
      )}
      
      {/* Minimal UI since sheet opens automatically */}
      <Text style={styles.note}>
        Payment processing will begin automatically
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    zIndex: 10,
  },
  loadingText: {
    marginTop: 16,
    color: '#636363',
  },
  note: {
    color: '#999',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 20,
  },
});

export default StripePay;
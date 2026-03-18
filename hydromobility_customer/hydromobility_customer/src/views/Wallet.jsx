import React, { useState, useEffect, useRef } from "react";
import {

  StatusBar,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  TextInput,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import '../languages/i18next';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import DropShadow from "react-native-drop-shadow";
import RBSheet from "react-native-raw-bottom-sheet";
import LottieView from "lottie-react-native";
import Moment from "moment";
import axios from "axios";
import Toast from "react-native-toast-message";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import RazorpayCheckout from "react-native-razorpay";
import { PaystackProvider } from 'react-native-paystack-webview';
import { PayWithFlutterwave } from "flutterwave-react-native";
import StripePay from "../payment/StripePay";
import PaystackAndroid from "../payment/PaystackAndroid";
import PaystackPay, { usePaystackPay } from "../payment/PaystackPay";

import * as colors from "../assets/css/Colors";
import { normal, bold, regular, img_url, api_url, add_wallet, no_data_loader, income_icon, expense_icon, payment_methods, app_name, wallet, f_xs, f_s, f_m, f_l, f_xl, FLUTTERWAVE_KEY, base_url } from "../config/Constants";
import Icon, { Icons } from "../components/Icons";
import { connect } from "react-redux";
import { paypalPaymentStatus } from "../actions/PaymentActions";
import { useTheme } from "../context/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";

const options = { enableVibrateFallback: true, ignoreAndroidSystemSettings: false };

const Wallet = (props) => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const { theme, isDark } = useTheme(); // Using theme from context

  const [loading, setLoading] = useState(false);
  const [wallet_amount, setWalletAmount] = useState(0);
  const [filter, setFilter] = useState(1);
  const [data, setData] = useState([]);
  const [all, setAll] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [receives, setReceives] = useState([]);
  const [payment_methods_list, setPaymentMethodsList] = useState([]);
  const [amount, setAmount] = useState(0);
  const [inputText, setInputText] = useState("");
  const [payment_mode, setPaymentMode] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const { initiatePayment } = PaystackPay();
  const wallet_ref = useRef(null);
  const ref_flutterwave_sheet = useRef(null);
  const paystack_android_sheet = useRef(null);
  const stripe_pay_sheet = useRef(null);



  const [status, setStatus] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [checkCount, setCheckCount] = useState(0);
  const [isPaid, setIsPaid] = useState(0);


  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      call_wallet();
      call_payment_methods();
      if (props.paypal_payment_status !== 0) call_add_wallet();
    });
    return unsubscribe;
  }, []);

  const showToast = (type, title, message) => {
    ReactNativeHapticFeedback.trigger("impactHeavy", options);
    Toast.show({ type, text1: title, text2: message, visibilityTime: 5000, position: "top" });
  };

  const call_wallet = () => {
    setLoading(true);
    axios.post(api_url + wallet, { id: global.id, lang: i18n.language })
      .then(response => {
        setLoading(false);
        setWalletAmount(response.data.result.wallet);
        setAll(response.data.result.all);
        setExpenses(response.data.result.expenses);
        setReceives(response.data.result.receives);
        setFilter(1);
        setData(response.data.result.all);
      })
      .catch(() => {
        setLoading(false);
        showToast("error", t('Error'), t('Sorry something went wrong'));
      });
  };

  const call_payment_methods = () => {
    axios.post(api_url + payment_methods, { lang: i18n.language })
      .then(response => {
        if (response.data.status === 1) setPaymentMethodsList(response.data.result);
      })
      .catch(() => showToast("error", t('Error'), t('Sorry something went wrong')));
  };

  const call_add_wallet = (amount) => {

    axios.post(api_url + add_wallet, { id: global.id, amount })

      .then(response => {
        if (response.data.status === 1) {
          call_wallet();
          showToast("success", t('Success'), t('Amount successfully added to your wallet'));
          setInputText("");
          props.paypalPaymentStatus(0);
        } else showToast("error", t('Error'), response.data.message);
      })
      .catch(() => showToast("error", t('Error'), t('Sorry something went wrong')));
  };
  const handleOnRedirect = (data) => {
    ref_flutterwave_sheet.current.close();
    if (data.status == "successful") {
      call_add_wallet();
    } else {
      showToast("error", t('Failed'), t('Payment failed'));

    }
  };
  const choose_payment = (total_fare) => {
    if (!total_fare || total_fare === 0) {
      showToast("error", t('Error'), t('Please enter valid amount'));
    } else {
      setAmount(total_fare);
      setModalVisible(false);
      wallet_ref.current.open();
      setInputText("");
    }
  };

  const select_payment = async (item) => {
    wallet_ref.current?.close();
    setTimeout(() => payment_done(item.id), 500);
  };

  const payment_done = async (payment_id) => {
    setPaymentMode(payment_id);
    if (!payment_id) return showToast("error", t('Error'), t('Sorry something went wrong'));
    if (payment_id === 40) call_razorpay();
    else if (payment_id == 6) navigation.navigate("Paypal", { amount, from: "Wallet" });
    else if (payment_id == 7) ref_flutterwave_sheet.current.open();
    else if (payment_id == 37) stripe_pay_sheet.current.open();
    else if (payment_id == 38) {
      if (Platform.OS === 'android') paystack_android_sheet.current.open();
      else {
        initiatePayment({
          email: global.email, // Dynamic from logged-in user
          amount: parseFloat(amount), // Paystack expects lowest currency unit (e.g., Kobo)
          onSuccess: (res) => {
            console.log('Payment success:', res);
            call_add_wallet()
            // Update wallet balance here
          },
          onCancel: () => {
            showToast("error", t('Failed'), t('Payment failed'));
          },
          onError: (error) => {
            console.error('Payment error:', error);
            showToast("error", t('Failed'), t('Payment failed'));
          }
        });
      }
    }
  };

  const call_razorpay = () => {
    const options = {
      currency: global.currency_short_code,
      key: global.razorpay_key,
      amount: amount * 100,
      name: app_name,
      prefill: { contact: global.phone_with_code, name: global.first_name, email: global.email },
      theme: { color: colors.theme_fg },
    };
    RazorpayCheckout.open(options)
      .then(() => call_add_wallet())
      .catch(() => showToast("error", t('Error'), t('Transaction declined')));
  };

  const change_filter = (id) => {
    ReactNativeHapticFeedback.trigger("impactLight", options);
    setFilter(id);
    setData(id === 1 ? all : id === 2 ? expenses : receives);
  };

  const show_list = ({ item }) => {

    const isIncome = item.type === 1;
    const bgColor = isIncome ? '#ECFDF5' : '#FEF2F2';
    const textColor = isIncome ? '#047857' : '#B91C1C';

    return (
      <View style={{
        flexDirection: 'row',
        width: '98%',
        alignSelf: 'center',
        backgroundColor: theme.surface,  // themed background
        borderRadius: 12,
        marginVertical: 6,
        padding: 15,
        borderWidth: 0.5,
        borderColor: theme.divider,      // themed border

      }}>
        {/* Icon Circle */}
        <View style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          backgroundColor: bgColor,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 16
        }}>
          <Image source={isIncome ? income_icon : expense_icon} style={{ width: 20, height: 20 }} />
        </View>

        {/* Message & Timestamp */}
        <View style={{ flex: 1, justifyContent: 'center', paddingRight: 8 }}>
          <Text style={{
            color: theme.textPrimary,
            fontSize: 15,
            fontFamily: '600',
            marginBottom: 4,
            letterSpacing: -0.2
          }}>
            {item.message}
          </Text>
          <Text style={{
            color: theme.textSecondary,
            fontSize: 13,
            fontFamily: '400',
            letterSpacing: -0.1
          }}>
            {Moment(item.created_at).format("MMM DD, YYYY • hh:mm A")}
          </Text>
        </View>

        {/* Amount Tag */}
        <View style={{
          backgroundColor: bgColor,
          borderRadius: 12,
          paddingHorizontal: 10,
          paddingVertical: 6,
          alignSelf: 'center',
          minWidth: 90,
          alignItems: 'center'
        }}>
          <Text style={{
            color: textColor,
            fontSize: 14,
            fontFamily: '600',
            letterSpacing: -0.2
          }}>
            {isIncome ? '↑' : '↓'} {global.currency}{item.amount.toLocaleString()}
          </Text>
        </View>
      </View>
    );
  };





  const call_payment = async (amount) => {
    try {
      console.log("🔵 call_payment started");

      console.log("🆔 Global ID:", global.id);

      setLoading(true);

      const url = `${base_url}quickmpesa/254795531783/${global.id}/${amount}`;
      console.log("🌐 Payment URL:", url);

      const response = await axios.get(url);
      console.log("✅ STK Push Response:", response.data);

      console.log("📌 ResponseCode:", response.data.ResponseCode);
      console.log("📌 ResponseBody:", response.data);

      if (response.data.ResponseCode === "0") {
        const checkoutId = response.data.CheckoutRequestID;
        console.log("🆔 CheckoutRequestID:", checkoutId);

        setTransactionId(checkoutId);
        setIsPaid(1);
        console.log("💳 isPaid set to 1 → checking payment status");
        check_payment_status(checkoutId, amount);
      } else {
        setIsPaid(0);
        console.log("❌ Payment initiation failed, isPaid set to 0");
      }

    } catch (e) {
      console.log("❌ call_payment error:", e);
      alert('Sorry something went wrong');
      console.log("❌ Error response data:", e?.response?.data);
    } finally {
      setLoading(false);
      console.log("🟢 call_payment finished, loading set to false");
    }
  };

  const MAX_RETRIES = 5;

  const check_payment_status = async (id, amount) => {
    console.log("🟡 check_payment_status triggered");
    console.log("🆔 Payment ID:", id);
    console.log("🔁 checkCount:", checkCount);

    if (checkCount >= 3) {
      console.log("⛔ Max retry reached. Stopping.");
      return;
    }

    try {
      const response = await axios.post(
        api_url+"mpesa/check_status",
        { payment_id: id }
      );

      console.log("📥 Status API response:", response.data);

      const apiStatus = response.data.status;

      if (apiStatus === 1) {

        console.log("✅ Payment SUCCESS → calling call_add_wallet()");
        setTransactionId("");
        setIsPaid(0);
        setCheckCount(0);
        setModalVisible(false);
        call_add_wallet(amount);
        return;
      }

      console.log("⏳ Payment PENDING → retrying in 5 seconds");

      setTimeout(() => {
        setCheckCount((prev) => prev + 1);
        check_payment_status(id);
      }, 5000);

    } catch (e) {
      console.log("❌ check_payment_status error:", e?.response?.data);
    }
  };




  const handle_payment_submit = (amount) => {
    console.log("🟣 handle_payment_submit triggered");
    console.log("💳 isPaid:", isPaid);
    console.log("🆔 transactionId:", transactionId);
    console.log(amount)

    setAmount(amount);
    // ✅ BLOCK if payment already successful
    if (status === "SUCCESS") {
      console.log("🛑 Payment already completed. Blocking new payment.");
      return;
    }

    // ✅ BLOCK if payment is in progress
    if (loading || isPaid === 1) {
      console.log("⏳ Payment already in progress, waiting for status");
      return;
    }

    console.log("➡️ Starting new payment");
    call_payment(amount);
  };





  return (
    <PaystackProvider publicKey="pk_test_14e5160673559f2c1564d1778e0339e08e1071f6">
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
        <StatusBar translucent backgroundColor="transparent" barStyle={isDark ? "light-content" : "dark-content"} />

        {/* Header */}
        <View style={{ height: 70, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 0, backgroundColor: theme.background }}>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>
            <Icon type={Icons.MaterialIcons} name="arrow-back" color={theme.textPrimary} style={{ fontSize: 30 }} />
          </TouchableOpacity>
          <View style={{ width: '85%', justifyContent: 'center' }}>
            <Text style={{ color: theme.textPrimary, fontSize: f_xl, fontFamily: regular }}>{t('Wallet')}</Text>
          </View>
        </View>
        <Toast />

        {/* Wallet Balance Card */}
        <View style={{ paddingHorizontal: 24, marginTop: 16, marginBottom: 24 }}>
          <View style={{
            backgroundColor: theme.surface, borderRadius: 15, padding: 24,
            borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
            overflow: 'hidden'
          }}>
            <View style={{
              position: 'absolute', top: -50, right: -50, width: 200, height: 200, borderRadius: 100,
              backgroundColor: theme.primary, opacity: 0.15
            }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: theme.primary, justifyContent: 'center', alignItems: 'center', marginRight: 12 }}>
                  <Icon type={Icons.MaterialIcons} name="account-balance-wallet" color={theme.onPrimary} style={{ fontSize: 20 }} />
                </View>
                <Text style={{ color: theme.textSecondary, fontSize: 14, fontFamily: regular }}>{t('Wallet Balance')}</Text>
              </View>
              <TouchableOpacity onPress={() => setModalVisible(true)} style={{
                backgroundColor: theme.primary, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12,
                flexDirection: 'row', alignItems: 'center', shadowColor: theme.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 3
              }}>
                <Text style={{ color: theme.onPrimary, fontSize: 14, fontFamily: regular, marginRight: 6 }}>{t('Top up')}</Text>
                <Icon type={Icons.MaterialIcons} name="add" color={theme.onPrimary} style={{ fontSize: 18 }} />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: 8 }}>
              <Text style={{ color: theme.textSecondary, fontSize: 14, fontFamily: regular, marginBottom: 6, marginRight: 4 }}>{global.currency}</Text>
              <Text style={{ color: theme.textPrimary, fontSize: 36, fontFamily: regular, lineHeight: 40, letterSpacing: -0.5 }}>{wallet_amount}</Text>
            </View>
          </View>
        </View>

        <RBSheet
          ref={wallet_ref}
          height={500}

          animationType="fade"
          duration={250}>
          <View
            style={{
              padding: 20,
              justifyContent: 'center',
              alignItems: 'center',

              backgroundColor: theme.surface, // Necessary for the shadow to be visible
              shadowColor: '#000', // Black shadow color
              shadowOffset: { width: 0, height: 2 }, // Position of the shadow
              shadowOpacity: 0.2, // Opacity of the shadow
              shadowRadius: 3, // Blur radius of the shadow
              elevation: 3, // Elevation for Android (height of the shadow)
            }}>
            <Text
              style={{
                fontSize: f_l,
                fontFamily: regular,
                color: theme.textPrimary,
              }}>
              {t('Choose Your Payment Type')}
            </Text>
          </View>

          <FlatList
            data={payment_methods_list}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{ flexDirection: 'row', padding: 20, backgroundColor: theme.background }}
                onPress={select_payment.bind(this, item)}>
                <View style={{ width: 50 }}>
                  <Image
                    resizeMode="contain"
                    style={{ flex: 1, height: 35, width: 35 }}
                    source={{ uri: img_url + item.icon }}
                  />
                </View>
                <View
                  style={{
                    width: '80%',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: normal,
                      fontSize: f_m,
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      color: theme.textPrimary,
                    }}>
                    {item.payment}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
          />
        </RBSheet>
        <RBSheet
          ref={ref_flutterwave_sheet}
          height={150}
          openDuration={250}
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            container: { padding: 20, backgroundColor: theme.background },

          }}>
          <View style={{ margin: 10 }} />

          <PayWithFlutterwave
            onRedirect={handleOnRedirect}
            options={{
              tx_ref: Date.now() + '-' + global.id,
              authorization: FLUTTERWAVE_KEY,
              customer: {
                email: global.email,
              },
              amount: parseFloat(amount) || 0,
              currency: 'ZMW',
              payment_options: 'card',
            }}
          />
        </RBSheet>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 0,
            marginHorizontal: 20,
            marginBottom: 10,
            borderRadius: 10,
            backgroundColor: theme.surface,
            overflow: 'hidden',
          }}
        >
          {['All', 'Expenses', 'Receives'].map((item, index) => {
            const isActive = filter - 1 === index;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => change_filter(index + 1)}
                style={{
                  flex: 1,
                  paddingVertical: 10,
                  // marginHorizontal: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: isActive ? theme.primary : 'transparent',
                  borderRadius: 12,
                  shadowColor: isActive ? theme.primary : '#000',
                  shadowOffset: { width: 0, height: isActive ? 2 : 0 },
                  shadowOpacity: isActive ? 0.3 : 0,
                  shadowRadius: isActive ? 4 : 0,
                  elevation: isActive ? 4 : 0,
                }}
              >
                <Text
                  style={{
                    fontFamily: regular,
                    fontSize: 14,
                    letterSpacing: 0.5,
                    color: isActive ? theme.onPrimary : theme.textSecondary,
                  }}
                >
                  {t(item)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>


        {/* Transactions List */}
        <View style={{ paddingHorizontal: 20, flex: 1 }}>
          {data.length > 0 ? (
            <FlatList
              data={data}
              renderItem={show_list}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={<View style={{ margin: '50%' }} />}
            />
          ) : (
            <View style={{ height: 300, width: 300, alignSelf: 'center' }}>
              <LottieView style={{ flex: 1 }} source={no_data_loader} autoPlay loop />
            </View>
          )}
        </View>

        {/* Add Wallet Modal */}
        <Modal visible={isModalVisible} animationType="fade" transparent onRequestClose={() => setModalVisible(false)}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.6)', padding: 20 }}>
            <View style={{ width: '100%', maxWidth: 400, backgroundColor: theme.surface, borderRadius: 16, padding: 24, shadowColor: theme.shadow_color, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5 }}>
              <Text style={{ fontSize: 20, fontFamily: regular, color: theme.textPrimary, textAlign: 'center', marginBottom: 8 }}>{t('Add Wallet')}</Text>
              <Text style={{ fontSize: 14, color: theme.textSecondary, textAlign: 'center', lineHeight: 20, marginBottom: 16 }}>{t('Please enter your amount')}</Text>
              <TextInput
                style={{
                  height: 50, borderWidth: 1, borderColor: theme.divider, borderRadius: 8,
                  paddingHorizontal: 16, fontSize: 16, marginBottom: 24, backgroundColor: theme.surface, color: theme.textPrimary
                }}
                placeholder={t('Enter Amount')}
                placeholderTextColor={theme.textSecondary}
                keyboardType="numeric"
                value={inputText}
                onChangeText={setInputText}
              />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 12 }}>
                <TouchableOpacity style={{ flex: 1, height: 48, borderRadius: 8, backgroundColor: theme.surface, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: theme.divider }} onPress={() => setModalVisible(false)}>
                  <Text style={{ color: theme.textPrimary, fontSize: 16, fontFamily: regular }}>{t('Cancel')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    height: 48,
                    borderRadius: 8,
                    backgroundColor: theme.primary,
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: theme.primary,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                    elevation: 2,
                  }}
                  disabled={loading}
                  onPress={() => handle_payment_submit(inputText)}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color={theme.onPrimary} />
                  ) : (
                    <Text style={{ color: theme.onPrimary, fontSize: 16, fontFamily: regular }}>
                      {t('Submit')}
                    </Text>
                  )}
                </TouchableOpacity>

              </View>
            </View>
          </View>
        </Modal>

      </SafeAreaView>
    </PaystackProvider>
  );
};

function mapStateToProps(state) {
  return { paypal_payment_status: state.payment.paypal_payment_status };
}

const mapDispatchToProps = (dispatch) => ({ paypalPaymentStatus: (data) => dispatch(paypalPaymentStatus(data)) });

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

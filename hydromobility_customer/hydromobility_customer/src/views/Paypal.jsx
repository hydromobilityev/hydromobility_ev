import { useTranslation } from "react-i18next";
import '../languages/i18next';

import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
  StatusBar
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as colors from '../assets/css/Colors';
import { screenHeight, screenWidth, base_url, success_url, failed_url, } from '../config/Constants';
import Icon, { Icons } from '../components/Icons';
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux';
import { paypalPaymentStatus } from '../actions/PaymentActions';
import { SafeAreaView } from "react-native-safe-area-context";

const Paypal = (props) => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const [url, setUrl] = useState(base_url+'paywithpaypal/'+props.route.params.amount);
 const [from, setFrom] = useState(route.params.from);
 console.log("from",from)
  const go_back = () => {
    navigation.goBack();
  }

  const _onNavigationStateChange = async (value) => {
    console.log("value",value)
    if(value.url == success_url ){
      console.log(success_url)
        await props.paypalPaymentStatus(1);
        console.log("success")
        go_back();
    }else if(value.url == failed_url){
        console.log("failed");

        await props.paypalPaymentStatus(0);
        go_back();
    }
  }

  return (
    <SafeAreaView style={styles.container}>
   <StatusBar translucent backgroundColor="transparent" barStyle="dark-content"/>
      <View style={[styles.header]}>
        <TouchableOpacity activeOpacity={1} onPress={go_back.bind(this)} style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>
          <Icon type={Icons.MaterialIcons} name="arrow-back" color={colors.theme_fg_two} style={{ fontSize: 30 }} />
        </TouchableOpacity>
      </View>
        <WebView
          source={{uri: url}}
          style={{marginTop: 20}}
          onNavigationStateChange={_onNavigationStateChange.bind(this)}
        />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: screenHeight,
    width: screenWidth,
    backgroundColor: colors.lite_bg
  },
  header: {
    height: 60,
    backgroundColor: colors.lite_bg,
    flexDirection: 'row',
    alignItems: 'center'
  },
});

function mapStateToProps(state){
  const { t, i18n } = useTranslation();
    return{
      paypal_payment_status : state.payment.paypal_payment_status
    };
  }
  
  const mapDispatchToProps = (dispatch) => ({
    paypalPaymentStatus: (data) => dispatch(paypalPaymentStatus(data))
  });
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(Paypal);
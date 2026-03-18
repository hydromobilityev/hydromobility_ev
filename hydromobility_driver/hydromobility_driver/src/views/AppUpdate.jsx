import { useTranslation } from "react-i18next";
import '../languages/i18next.js';

import React, {useState, useEffect} from 'react';
import { StyleSheet, SafeAreaView, View, TouchableOpacity, Text, Linking} from 'react-native';
import * as colors from '../assets/css/Colors';
import { app_update, bold } from '../config/Constants';
import Lottie from 'lottie-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';


const AppUpdate = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const [url, setUrl] = useState(route.params.url);
if (!i18n.isInitialized) {
  return <Text>Loading translations...</Text>;
}
  useEffect( () => {
   
    
  },[]);

  const app_link = () => {
    Linking.openURL(url);
  }

  return (
    <SafeAreaView style={styles.container}>
        <View style={{ alignItems:'center', marginTop:'40%', padding:20}}>
            <Lottie style={{ height:300, width:300 }}source={app_update} autoPlay loop />
        </View>
        <View style={{ alignItems:'center', justifyContent:'center', flex:1}}>
            <TouchableOpacity onPress={ app_link } style={{ height:40, alignItems:'center', justifyContent:'center', backgroundColor:colors.theme_fg, width:300, borderRadius:10}}>
                <Text adjustsFontSizeToFit={true}  style={{ color:colors.theme_fg_three, fontFamily:bold, fontSize:14 }}>{t('Update New Version')}</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.theme_bg_three,
  },
  description: {
    padding:10
  }
});

export default AppUpdate;

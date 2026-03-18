import { useTranslation } from "react-i18next";
import '../languages/i18next.js';

import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { connect } from 'react-redux';


const EditPassword = (props) => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();

  useEffect(() => {
    
  }, []);

  return (
    <View>
      <Text>{t('hi')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logo_container: {
    flex:1
  }
});

export default connect(null,null)(EditPassword);
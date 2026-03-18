import {useTranslation} from 'react-i18next';
import '../languages/i18next.js';

import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import {useNavigation, useRoute, CommonActions} from '@react-navigation/native';
import {connect} from 'react-redux';

import axios from 'axios';
import {
  normal,
  regular,
  img_url,
  api_url,
  get_documents,
  upload_icon,
  id_proof_icon,
  vehicle_certificate_icon,
  vehicle_insurance_icon,
  vehicle_image_icon,
  f_xl,
  f_l,
  f_xs,
  f_s,
  f_m,
} from '../config/Constants';
import Icon, {Icons} from '../components/Icons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { useTheme } from '../context/ThemeContext.js';
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};
const VehicleDocument = props => {
  const {t, i18n} = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const [id, setId] = useState(route.params.id);
 const { theme, isDark,toggleTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [id_proof, setIdProof] = useState({
    path: id_proof_icon,
    status: 0,
    status_name: t('Waiting for upload'),
    color: theme.warning,
  });
  const [vehicle_certificate, setVehicleCertificate] = useState({
    path: vehicle_certificate_icon,
    status: 0,
    status_name: t('Waiting for upload'),
    color: theme.warning,
  });
  const [vehicle_insurance, setVehicleInsurance] = useState({
    path: vehicle_insurance_icon,
    status: 0,
    status_name: t('Waiting for upload'),
    color: theme.warning,
  });
  const [vehicle_image, setVehicleImage] = useState({
    path: vehicle_image_icon,
    status: 0,
    status_name: t('Waiting for upload'),
    color: theme.warning,
  });
  const [vehicle_id, setVehicleId] = useState(0);
  const [upload_status, setUploadStatus] = useState(0);

  useEffect(() => {
    subscribe = navigation.addListener('focus', async () => {
      call_get_documents();
    });
    return subscribe;
  }, []);

  const find_document = list => {
    list.map((data, index) => {
      let value = {
        path: {uri: img_url + data.path},
        status: data.status,
        status_name: data.status_name,
        color: get_status_foreground(data.status),
      };
      if (data.document_name == 'id_proof') {
        setIdProof(value);
      } else if (data.document_name == 'vehicle_certificate') {
        setVehicleCertificate(value);
      } else if (data.document_name == 'vehicle_image') {
        setVehicleImage(value);
      } else if (data.document_name == 'vehicle_insurance') {
        setVehicleInsurance(value);
      }
    });
  };
  const showToast = (type, title, message) => {
    ReactNativeHapticFeedback.trigger('impactHeavy', options);

    Toast.show({
      type: type,
      text1: title,
      text2: message,
      visibilityTime: 5000,
      position: 'top', // top, bottom
    });
  };
  const get_status_foreground = status => {
    if (status == 17) {
      return theme.error;
    } else if (status == 14 || status == 15) {
      return theme.warning;
    } else if (status == 16) {
      return theme.success;
    }
  };

  const move_to_upload = (slug, status, path) => {
    let table = slug == 'id_proof' ? 'drivers' : 'driver_vehicles';
    let find_field = slug == 'id_proof' ? 'id' : 'id';
    let find_value = slug == 'id_proof' ? id : vehicle_id;
    let status_field =
      slug == 'id_proof' ? 'id_proof_status' : slug + '_status';
    if (status == 14) {
      navigation.navigate('DocumentUpload', {
        slug: slug,
        path: upload_icon,
        status: status,
        table: table,
        find_field: find_field,
        find_value: find_value,
        status_field: status_field,
      });
    } else {
      navigation.navigate('DocumentUpload', {
        slug: slug,
        path: path,
        status: status,
        table: table,
        find_field: find_field,
        find_value: find_value,
        status_field: status_field,
      });
    }
  };

  const call_get_documents = async () => {
    console.log(api_url + get_documents);
    console.log({driver_id: id, lang: i18n.language});
    setLoading(true);
    await axios({
      method: 'post',
      url: api_url + get_documents,
      data: {driver_id: id, lang: i18n.language},
    })
      .then(async response => {
        setLoading(false);
        setVehicleId(response.data.result.details.vehicle_id);
        if (
          response.data.result.documents[0].status == 15 &&
          response.data.result.documents[1].status == 15 &&
          response.data.result.documents[2].status == 15 &&
          response.data.result.documents[3].status == 15
        ) {
          setUploadStatus(1);
          navigate_verification(id);
        } else if (
          response.data.result.documents[0].status == 16 &&
          response.data.result.documents[1].status == 16 &&
          response.data.result.documents[2].status == 16 &&
          response.data.result.documents[3].status == 16
        ) {
          setUploadStatus(1);
          navigate_approved_driver(id);
        } else {
          find_document(response.data.result.documents);
        }
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
        showToast('error', t('Error'), t('Sorry something went wrong'));
      });
  };

  const navigate_verification = async id => {
    try {
      await AsyncStorage.setItem('approved_status', '4');
      global.approved_status = 4;
    } catch (e) {
      console.log(e);
    }
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'DriverVerification', params: {id: id}}],
      }),
    );
  };

  const navigate_approved_driver = async id => {
    try {
      await AsyncStorage.setItem('approved_status', '4');
      global.approved_status = 4;
    } catch (e) {
      console.log(e);
    }
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'DriverApproved', params: {id: id}}],
      }),
    );
  };

  return (
  <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
  <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />


  <ScrollView style={{ flex: 1 }}>
    {upload_status == 0 ? (
      <View style={{ padding: 20 }}>
        {/* Title */}
        <Text
          style={{
            fontFamily: regular,
            color: theme.textPrimary,
            fontSize: f_xl,
          }}
        >
          {t('Upload your documents')} (4)
        </Text>

        <View style={{ marginVertical: 15 }} />

        {/* Reusable Card for Each Document */}
        {/* ID Proof */}
        <View style={{ marginBottom: 20 }}>
          <Text
            style={{
              fontFamily: regular,
              color: theme.textPrimary,
              fontSize: f_l,
            }}
          >
            {t('Id proof')}
          </Text>
          <Text
            style={{
              fontFamily: normal,
              color: theme.textSecondary,
              fontSize: f_xs,
              marginTop: 3,
            }}
          >
            {t('Make sure that every details of the document is clearly visible')}
          </Text>

          <TouchableOpacity
            onPress={move_to_upload.bind(this, 'id_proof', id_proof.status, id_proof.path)}
            activeOpacity={0.8}
            style={{
              marginTop: 12,
              borderWidth: 1,
              borderColor: theme.divider,
              borderRadius: 12,
              borderStyle: 'dashed',
              backgroundColor: theme.surface,
              padding: 15,
              flexDirection: 'row',
             
            }}
          >
            <View style={{ width: '70%' }}>
              <Text
                style={{
                  fontFamily: regular,
                  color: id_proof.color || theme.textPrimary,
                  fontSize: f_s,
                }}
              >
                {id_proof.status_name}
              </Text>
              <View style={{ marginVertical: 5 }} />
              <Text
                style={{
                  fontFamily: normal,
                  color: theme.textSecondary,
                  fontSize: f_xs,
                }}
              >
                {t('Upload your passport or driving licence or any one id proof')}
              </Text>
            </View>
            <View style={{ width: '30%', alignItems: 'center', justifyContent: 'center' }}>
              <Image source={id_proof.path} style={{ height: 75, width: 75, borderRadius: 8 }} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Certificate */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontFamily: regular, color: theme.textPrimary, fontSize: f_l }}>
            {t('Log Book')}
          </Text>
          <Text
            style={{
              fontFamily: normal,
              color: theme.textSecondary,
              fontSize: f_xs,
              marginTop: 3,
            }}
          >
            {t('Make sure that every details of the document is clearly visible')}
          </Text>

          <TouchableOpacity
            onPress={move_to_upload.bind(
              this,
              'vehicle_certificate',
              vehicle_certificate.status,
              vehicle_certificate.path,
            )}
            activeOpacity={0.8}
            style={{
              marginTop: 12,
              borderWidth: 1,
              borderColor: theme.divider,
              borderRadius: 12,
              borderStyle: 'dashed',
              backgroundColor: theme.surface,
              padding: 15,
              flexDirection: 'row',
              
            }}
          >
            <View style={{ width: '70%' }}>
              <Text
                style={{
                  fontFamily: regular,
                  color: vehicle_certificate.color || theme.textPrimary,
                  fontSize: f_s,
                }}
              >
                {vehicle_certificate.status_name}
              </Text>
              <View style={{ marginVertical: 5 }} />
              <Text style={{ fontFamily: normal, color: theme.textSecondary, fontSize: f_xs }}>
                {t('Upload your vehicle Log Book')}
              </Text>
            </View>
            <View style={{ width: '30%', alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={vehicle_certificate.path}
                style={{ height: 75, width: 75, borderRadius: 8 }}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Vehicle Insurance */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontFamily: regular, color: theme.textPrimary, fontSize: f_l }}>
            {t('Vehicle Insurance')}
          </Text>
          <Text style={{ fontFamily: normal, color: theme.textSecondary, fontSize: f_xs, marginTop: 3 }}>
            {t('Make sure that every details of the document is clearly visible')}
          </Text>

          <TouchableOpacity
            onPress={move_to_upload.bind(
              this,
              'vehicle_insurance',
              vehicle_insurance.status,
              vehicle_insurance.path,
            )}
            activeOpacity={0.8}
            style={{
              marginTop: 12,
              borderWidth: 1,
              borderColor: theme.divider,
              borderRadius: 12,
              borderStyle: 'dashed',
              backgroundColor: theme.surface,
              padding: 15,
              flexDirection: 'row',
             
            }}
          >
            <View style={{ width: '70%' }}>
              <Text
                style={{
                  fontFamily: regular,
                  color: vehicle_insurance.color || theme.textPrimary,
                  fontSize: f_s,
                }}
              >
                {vehicle_insurance.status_name}
              </Text>
              <View style={{ marginVertical: 5 }} />
              <Text style={{ fontFamily: normal, color: theme.textSecondary, fontSize: f_xs }}>
                {t('Upload your vehicle insurance document')}
              </Text>
            </View>
            <View style={{ width: '30%', alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={vehicle_insurance.path}
                style={{ height: 75, width: 75, borderRadius: 8 }}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Vehicle Image */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontFamily: regular, color: theme.textPrimary, fontSize: f_l }}>
            {t('Vehicle Image')}
          </Text>
          <Text style={{ fontFamily: normal, color: theme.textSecondary, fontSize: f_xs, marginTop: 3 }}>
            {t('Upload your vehicle image')}
          </Text>

          <TouchableOpacity
            onPress={move_to_upload.bind(
              this,
              'vehicle_image',
              vehicle_image.status,
              vehicle_image.path,
            )}
            activeOpacity={0.8}
            style={{
              marginTop: 12,
              borderWidth: 1,
              borderColor: theme.divider,
              borderRadius: 12,
              borderStyle: 'dashed',
              backgroundColor: theme.surface,
              padding: 15,
              flexDirection: 'row',
             
            }}
          >
            <View style={{ width: '70%' }}>
              <Text
                style={{
                  fontFamily: regular,
                  color: vehicle_image.color || theme.textPrimary,
                  fontSize: f_s,
                }}
              >
                {vehicle_image.status_name}
              </Text>
              <View style={{ marginVertical: 5 }} />
              <Text style={{ fontFamily: normal, color: theme.textSecondary, fontSize: f_xs }}>
                {t('Upload your vehicle image with number board')}
              </Text>
            </View>
            <View style={{ width: '30%', alignItems: 'center', justifyContent: 'center' }}>
              <Image source={vehicle_image.path} style={{ height: 75, width: 75, borderRadius: 8 }} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    ) : (
      <View style={{ padding: 20, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontFamily: regular, color: theme.textSecondary, fontSize: f_s, textAlign: 'center' }}>
          {t('Your documents are uploaded. Please wait, admin will verify your documents')}
        </Text>
      </View>
    )}

    <Toast />
  </ScrollView>
</SafeAreaView>

  );
};


export default connect(null, null)(VehicleDocument);

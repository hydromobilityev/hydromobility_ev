import { useTranslation } from "react-i18next";
import '../languages/i18next.js';

import React, { useState, useRef, useEffect } from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    TextInput,
    View,
    ScrollView,
    StatusBar
} from "react-native";
import { useNavigation, CommonActions, useRoute } from "@react-navigation/native";

import Icon, { Icons } from '../components/Icons';
import { connect } from 'react-redux';
import axios from 'axios';
import { regular, api_url, vehicle_update, btn_loader, f_xl, f_xs, f_m, normal } from '../config/Constants';
import LottieView from 'lottie-react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { useTheme } from "../context/ThemeContext.js";
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};
const VehicleDetails = (props) => {
  const { t, i18n } = useTranslation();
    const navigation = useNavigation();
    const route = useRoute();
    const [loading, setLoading] = useState(false);
    const [is_enabled, setEnabled] = useState(true);
    const [id, setId] = useState(route.params.id);
      const { theme, isDark,toggleTheme } = useTheme();
   

    const go_back = () => {
        navigation.goBack();
    }

    const navigate = (route) => {
        navigation.navigate(route);
    }
  const showToast = (type, title, message) => {
    ReactNativeHapticFeedback.trigger("impactHeavy", options);

    Toast.show({
      type: type,
      text1: title,
      text2: message,
      visibilityTime: 5000,
      position: "top", // top, bottom
    });
  };
    const call_vehicle_update = async () => {
        setLoading(true);
        console.log({
            driver_id: id, vehicle_type: props.vehicle_type, brand: props.vehicle_brand,
            color: props.vehicle_color, vehicle_name: props.vehicle_name, vehicle_number: props.vehicle_number
        })
        await axios({
            method: 'post',
            url: api_url + vehicle_update,
            data: {
                driver_id: id, vehicle_type: props.vehicle_type, brand: props.vehicle_brand,
                color: props.vehicle_color, vehicle_name: props.vehicle_name, vehicle_number: props.vehicle_number
            }
        })
            .then(async response => {              
                setLoading(false);
                navigate_doc(id,props.vehicle_type);
            })
            .catch(error => {
                setLoading(false);
                 showToast(
                   "error",
                   t('Error'),
                   t('Sorry something went wrong')
                 );
      
            });
    }

    const navigate_doc = async(id,vehicle_type) => {
        try {
            await AsyncStorage.setItem(
                "approved_status",
                '3'
            );
            await AsyncStorage.setItem(
                "vehicle_type",
                vehicle_type.toString()
            );
            global.approved_status = 3;
            global.vehicle_type = vehicle_type;
            console.log(global.vehicle_type)
        }catch (e) {
            console.log(e)
        }
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: "VehicleDocument" , params: {id: id}}],
            })
        );
    }

    const check_validate = async () => {
        if (props.vehicle_brand == "" || props.vehicle_color == "" ||
            props.vehicle_name == "" ||
            props.vehicle_type == "" || props.vehicle_number == "") {
                  showToast(
                    "error",
                    t('Validation error'),
                    t('Please enter all the required fields')
                  );
             
        } else {
       
            call_vehicle_update();
        }
    }



    return (
      <SafeAreaView style={{ backgroundColor: theme.background, flex: 1 }}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />

        <ScrollView contentContainerStyle={{paddingTop:20}}>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                color: theme.textPrimary,
                fontSize: f_xl,
                fontFamily: regular,
              }}
            >
              {t('Add Your Vehicle')}
            </Text>
            <View style={{ margin: 20 }} />
            <View style={{ width: "90%", }}>
              <View style={{ marginBottom: 20, }}>
                <Text
                  style={{
                    color: theme.textSecondary,
                    fontSize: f_xs,
                    fontFamily: regular,
                  }}
                >
                  {t('Vehicle Name')}
                </Text>
                <View style={{ margin: 5 }} />
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={navigate.bind(this, "CreateVehicleName")}
                  style={{ flexDirection: "row",backgroundColor:theme.surface,borderRadius:10, borderWidth:.5,borderColor:theme.divider, }}
                >
                  <View
                    style={{
                      width: "15%",
                      alignItems: "center",
                      justifyContent: "center",
               
                    }}
                  >
                    <Icon
                      type={Icons.MaterialIcons}
                      name="drive-file-rename-outline"
                      color={theme.textSecondary}
                      style={{ fontSize: 30 }}
                    />
                  </View>
                  {props.vehicle_name == "" ? (
                    <View
                      style={{
                        width: "85%",
                        alignItems: "flex-start",
                        paddingLeft: 10,
                        justifyContent: "center",
                        backgroundColor: theme.text_container_bg,
                      }}
                    >
                      <View style={{    fontSize: f_m,
        color: theme.textSecondary,
        fontFamily: regular,
        height: 60,
        backgroundColor: theme.text_container_bg,
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center'}}>
                        <Text
                          style={{
                            fontFamily: regular,
                            fontSize: f_m,
                            color: theme.textSecondary,
                          }}
                        >
                          {t('Vehicle Name')}
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{
                        width: "85%",
                        alignItems: "flex-start",
                        paddingLeft: 10,
                        justifyContent: "center",
                        backgroundColor: theme.text_container_bg,
                      }}
                    >
                      <View style={{
                            fontSize: f_m,
  
        fontFamily: regular,
        height: 60,
  
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center'
                      }}>
                        <Text
                          style={{
                            fontFamily: regular,
                            fontSize: f_m,
                            color: theme.textPrimary,
                          }}
                        >
                          {props.vehicle_name}
                        </Text>
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
              <View style={{ marginBottom: 20 }}>
                <Text
                  style={{
                    color: theme.textSecondary,
                    fontSize: f_xs,
                    fontFamily: regular,
                  }}
                >
                  {t('Vehicle Brand')}
                </Text>
                <View style={{ margin: 5 }} />
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={navigate.bind(this, "CreateVehicleBrand")}
                  style={{ flexDirection: "row" ,backgroundColor:theme.surface,borderRadius:10, borderWidth:.5,borderColor:theme.divider,}}
                >
                  <View
                    style={{
                      width: "15%",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: theme.theme_bg_three,
                    }}
                  >
                    <Icon
                      type={Icons.MaterialIcons}
                      name="branding-watermark"
                      color={theme.textSecondary}
                      style={{ fontSize: 30 }}
                    />
                  </View>
                  {props.vehicle_brand == "" ? (
                    <View
                      style={{
                        width: "85%",
                        alignItems: "flex-start",
                        paddingLeft: 10,
                        justifyContent: "center",
                        backgroundColor: theme.text_container_bg,
                      }}
                    >
                      <View style={{
                            fontSize: f_m,
        color: theme.textSecondary,
        fontFamily: regular,
        height: 60,
        backgroundColor: theme.text_container_bg,
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center'
                      }}>
                        <Text
                          style={{
                            fontFamily: regular,
                            fontSize: f_m,
                            color: theme.textSecondary,
                          }}
                        >
                          {t('Vehicle Brand')}
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{
                        width: "85%",
                        alignItems: "flex-start",
                        paddingLeft: 10,
                        justifyContent: "center",
                        backgroundColor: theme.text_container_bg,
                      }}
                    >
                      <View style={{
                            fontSize: f_m,
     
        fontFamily: regular,
        height: 60,
      
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center'
                      }}>
                        <Text
                          style={{
                            fontFamily: regular,
                            fontSize: f_m,
                            color: theme.textPrimary,
                          }}
                        >
                          {props.vehicle_brand}
                        </Text>
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
              <View style={{ marginBottom: 20 }}>
                <Text
                  style={{
                    color: theme.textSecondary,
                    fontSize: f_xs,
                    fontFamily: regular,
                  }}
                >
                  {t('Vehicle Color')}
                </Text>
                <View style={{ margin: 5 }} />
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={navigate.bind(this, "CreateVehicleColor")}
                  style={{ flexDirection: "row",backgroundColor:theme.surface,borderRadius:10, borderWidth:.5,borderColor:theme.divider, }}
                >
                  <View
                    style={{
                      width: "15%",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: theme.theme_bg_three,
                    }}
                  >
                    <Icon
                      type={Icons.Ionicons}
                      name="color-palette"
                      color={theme.textSecondary}
                      style={{ fontSize: 30 }}
                    />
                  </View>
                  {props.vehicle_color == "" ? (
                    <View
                      style={{
                        width: "85%",
                        alignItems: "flex-start",
                        paddingLeft: 10,
                        justifyContent: "center",
                        backgroundColor: theme.text_container_bg,
                      }}
                    >
                      <View style={{
                            fontSize: f_m,
        color: theme.textSecondary,
        fontFamily: regular,
        height: 60,
        backgroundColor: theme.text_container_bg,
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center'
                      }}>
                        <Text
                          style={{
                            fontFamily: regular,
                            fontSize: f_m,
                            color: theme.textSecondary,
                          }}
                        >
                          {t('Vehicle Color')}
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{
                        width: "85%",
                        alignItems: "flex-start",
                        paddingLeft: 10,
                        justifyContent: "center",
                        backgroundColor: theme.text_container_bg,
                      }}
                    >
                      <View style={{
                            fontSize: f_m,

        fontFamily: regular,
        height: 60,

        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center'
                      }}>
                        <Text
                          style={{
                            fontFamily: regular,
                            fontSize: f_m,
                            color: theme.textPrimary,
                          }}
                        >
                          {props.vehicle_color}
                        </Text>
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
              <View style={{ marginBottom: 20 }}>
                <Text
                  style={{
                    color: theme.textSecondary,
                    fontSize: f_xs,
                    fontFamily: regular,
                  }}
                >
                  {t('Vehicle Number')}
                </Text>
                <View style={{ margin: 5 }} />
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={navigate.bind(this, "CreateVehicleNumber")}
                  style={{ flexDirection: "row",backgroundColor:theme.surface,borderRadius:10, borderWidth:.5,borderColor:theme.divider, }}
                >
                  <View
                    style={{
                      width: "15%",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: theme.theme_bg_three,
                    }}
                  >
                    <Icon
                      type={Icons.Octicons}
                      name="number"
                      color={theme.textSecondary}
                      style={{ fontSize: 30 }}
                    />
                  </View>
                  {props.vehicle_number == "" ? (
                    <View
                      style={{
                        width: "85%",
                        alignItems: "flex-start",
                        paddingLeft: 10,
                        justifyContent: "center",
                        backgroundColor: theme.text_container_bg,
                      }}
                    >
                      <View style={{
                            fontSize: f_m,
        color: theme.textSecondary,
        fontFamily: regular,
        height: 60,
        backgroundColor: theme.text_container_bg,
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center'
                      }}>
                        <Text
                          style={{
                            fontFamily: regular,
                            fontSize: f_m,
                            color: theme.textSecondary,
                          }}
                        >
                          {t('Vehicle Number')}
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{
                        width: "85%",
                        alignItems: "flex-start",
                        paddingLeft: 10,
                        justifyContent: "center",
                        
                      }}
                    >
                      <View style={{
                            fontSize: f_m,

        fontFamily: regular,
        height: 60,
       
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center'
                      }}>
                        <Text
                          style={{
                            fontFamily: regular,
                            fontSize: f_m,
                            color: theme.textPrimary,
                          }}
                        >
                          {props.vehicle_number}
                        </Text>
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
              <View style={{ marginBottom: 20 }}>
                <Text
                  style={{
                    color: theme.textSecondary,
                    fontSize: f_xs,
                    fontFamily: regular,
                  }}
                >
                  {t('Vehicle Type')}
                </Text>
                <View style={{ margin: 5 }} />
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={navigate.bind(this, "CreateVehicleType")}
                  style={{ flexDirection: "row",backgroundColor:theme.surface,borderRadius:10 , borderWidth:.5,borderColor:theme.divider,}}
                >
                  <View
                    style={{
                      width: "15%",
                      alignItems: "center",
                      justifyContent: "center",
                  
                    }}
                  >
                    <Icon
                      type={Icons.FontAwesome}
                      name="car"
                      color={theme.textSecondary}
                      style={{ fontSize: 30 }}
                    />
                  </View>
                  {props.vehicle_type == "" ? (
                    <View
                      style={{
                        width: "85%",
                        alignItems: "flex-start",
                        paddingLeft: 10,
                        justifyContent: "center",
                        backgroundColor: theme.text_container_bg,
                        
                      }}
                    >
                      <View style={{
                            fontSize: f_m,
        color: theme.textSecondary,
        fontFamily: regular,
        height: 60,
        backgroundColor: theme.text_container_bg,
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center'
                      }}>
                        <Text
                          style={{
                            fontFamily: regular,
                            fontSize: f_m,
                            color: theme.textSecondary,
                          }}
                        >
                          {t('Vehicle Type')}
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{
                        width: "85%",
                        alignItems: "flex-start",
                        paddingLeft: 10,
                        justifyContent: "center",
                        backgroundColor: theme.text_container_bg,
                      }}
                    >
                      <View style={{
                            fontSize: f_m,
     
        fontFamily: regular,
        height: 60,
    
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center'
                      }}>
                        <Text
                          style={{
                            fontFamily: regular,
                            fontSize: f_m,
                            color: theme.textPrimary,
                          }}
                        >
                          {props.vehicle_type_lbl}
                        </Text>
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        {loading == false ? (
          <TouchableOpacity
            activeOpacity={1}
            onPress={check_validate.bind(this)}
            style={{
              width: "90%",
              position: "absolute",
              bottom: 20,
              marginLeft: "5%",
              backgroundColor: theme.primary,
              borderRadius: 10,
              height: 50,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: theme.onPrimary,
                fontSize: f_m,
  
                fontFamily: regular,
              }}
            >
              {t('Done')}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={{ height: 50, width: "90%", alignSelf: "center" }}>
            <LottieView style={{ flex: 1 }} source={btn_loader} autoPlay loop />
          </View>
        )}
        <Toast />
      </SafeAreaView>
    );
};


function mapStateToProps(state) {

    return {
        vehicle_name: state.vehicle.vehicle_name,
        vehicle_brand: state.vehicle.vehicle_brand,
        vehicle_color: state.vehicle.vehicle_color,
        vehicle_number: state.vehicle.vehicle_number,
        vehicle_type: state.vehicle.vehicle_type,
        vehicle_type_lbl: state.vehicle.vehicle_type_lbl,
    };
}

export default connect(mapStateToProps, null)(VehicleDetails);
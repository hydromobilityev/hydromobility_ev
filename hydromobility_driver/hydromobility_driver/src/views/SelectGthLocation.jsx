import { useTranslation } from "react-i18next";
import '../languages/i18next.js';

//Fixed
import React, { useState, useRef, useCallback, useMemo, useEffect } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  TextInput,
  FlatList,
  Keyboard
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { screenHeight, screenWidth, bold, api_url, regular, f_25, f_s, GOOGLE_KEY, normal, gth_location_change, loader, ROUTEMAPPY_KEY } from '../config/Constants';
import Icon, { Icons } from '../components/Icons';

import axios from 'axios';
import LottieView from 'lottie-react-native';

import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { useTheme } from "../context/ThemeContext.js";

const SelectGthLocation = (props) => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const search = useRef();
  const [loading, setLoading] = useState(false);
const [searchText, setSearchText] = useState('');
  const [activeInput, setActiveInput] = useState(null);
    const [predictions, setPredictions] = useState([]);
  const fetchControllerRef = useRef(null);
  const go_back = () => {
    navigation.goBack();
  }
 const { theme, isDark,toggleTheme } = useTheme(); 
  const get_location = (lat,lng,address, type) => {
    setLoading(true)
    console.log({ gth_lat: lat, gth_lng: lng, gth_location: address, driver_id: global.id })
    axios({
      method: 'post',
      url: api_url + gth_location_change,
      data: { gth_lat: lat, gth_lng: lng, gth_location: address, driver_id: global.id }
    })
      .then(async response => {
        console.log(response.data)
        setLoading(false)
        go_back();
      })
      .catch(error => {
        setLoading(false)
        alert(error)
      });
  }
const fetchPredictions = useCallback(
    async (input, type) => {
      if (!input) {
        setPredictions([]);
        return;
      }

      // Cancel previous request if it exists
      if (fetchControllerRef.current) {
        fetchControllerRef.current.abort();
      }

      const controller = new AbortController();
      fetchControllerRef.current = controller;

      try {
        setLoading(true);

        let  url = `https://api.routemappy.com/nearest?q=${encodeURIComponent(
            input,
          )}&key=${ROUTEMAPPY_KEY}&lat=${props.initial_lat}&lon=${props.initial_lng}`;
        

        const response = await fetch(url, {
          signal: controller.signal,
        });

        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();

        // Process predictions based on API type
        const processed = processCustomApiPredictions(data.features || []);

        // Only update if the active input 
          setPredictions(processed);
        
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Fetch error:', error);
        }
      } finally {
        setLoading(false);
      }
    },
    [props.initial_lat, props.initial_lng, activeInput],
  );

  // Process different API responses
  const processCustomApiPredictions = features => {
    return features.map(feature => {
      const properties = feature?.properties || {};
      const geometry = feature?.geometry || {};
      const coordinates = geometry?.coordinates || [0, 0];

      return {
        description: [properties.name, properties.city, properties.state]
          .filter(Boolean)
          .join(', '),
        place_id:
          properties.osm_id ||
          `temp-${Math.random().toString(36).slice(2, 11)}`,
        structured_formatting: {
          main_text: properties.name || 'Unnamed Location',
          secondary_text: [properties.city, properties.state]
            .filter(Boolean)
            .join(', '),
        },
        location: {
          lat: coordinates[1] ?? 0,
          lng: coordinates[0] ?? 0,
          address: [properties.name, properties.city]
            .filter(Boolean)
            .join(', '),
          city: properties.city,
          state: properties.state,
          country: properties.country,
        },
        _originalFeature: feature,
      };
    });
  };

 
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }
  // Debounced fetch with input type awareness
  const debouncedFetch = useMemo(() => {
    return debounce((input, type) => {
      if (input.length > 1) {
        // Reduced minimum length for faster response
        fetchPredictions(input, type);
      } else {
        setPredictions([]);
      }
    }, 120); // Optimized debounce time
  }, [fetchPredictions]);

  // Unified input change handler
  const handleInputChange = (text, type) => {
 
    setSearchText(text);
    setActiveInput({type, value: text});

    // Immediate UI feedback
    if (text.length > 1) {
      setLoading(true);
    } else {
      setPredictions([]);
    }

    debouncedFetch(text, type);
  };
  const clearInput = type => {
    setPickupAddress(''); // clear the visible input

    setPredictions([]);
  };

  // Input focus handlers
  const handleFocus = (type, currentValue) => {
    if (type === 'origin') {
      setIsFocused(true);
    } else {
      setIsDestFocused(true);
    }
    setActiveInput({type, value: currentValue || ''});

    // Trigger search if there's existing text
    if (currentValue && currentValue.length > 1) {
      debouncedFetch(currentValue, type);
    }
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (fetchControllerRef.current) {
        fetchControllerRef.current.abort();
      }
    };
  }, []);
  const handleSelect = async place => {
    console.log('Selected Place:', place);

    let selectedPlace = {
      address: '',
      lat: 0,
      lng: 0,
    };

    try {
     
        if (!place?.description || !place?.location) {
          console.warn(
            'Invalid place object structure when using global.places == 1',
          );
          return;
        }

        selectedPlace = {
            address: place.description,
          lat: place.location.lat,
          lng: place.location.lng,
        };
      

      const {address, lat, lng} = selectedPlace;
   

  get_location(lat,lng,address)

      setSearchText("")

      setPredictions([]);
      Keyboard.dismiss();
    } catch (error) {
      console.error('Failed to fetch place details:', error);
    }
  };
   const PredictionsDropdown = ({
    predictions,
    loading,
    onSelect,
    activeInputType,
  }) => {
    const getPredictionIcon = description => {
      if (description.includes('Airport') || description.includes('Station'))
        return 'airport-shuttle';
      if (description.includes('Hotel') || description.includes('Motel'))
        return 'hotel';
      if (description.match(/\d{3,}/)) return 'location-on';
      return 'place';
    };

    return (
    <View
  style={{
    borderRadius: 8,
    maxHeight: 300,

  
  }}>
  {loading ? (
    <View style={{padding: 0}}>
      {[...Array(3)].map((_, i) => (
        <View
          key={`skeleton-${i}`}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 20,
            paddingHorizontal: 16,
          }}>
          <View
            style={{
              width: 42,
              height: 42,
              borderRadius: 50,
              backgroundColor: theme.divider,
              marginRight: 12,
            }}
          />
          <View style={{flex: 1}}>
            <View
              style={{
                height: 15,
                backgroundColor: theme.divider,
                borderRadius: 4,
                width: '70%',
                marginBottom: 6,
              }}
            />
            <View
              style={{
                height: 14,
                backgroundColor: theme.divider,
                borderRadius: 4,
                width: '50%',
              }}
            />
          </View>
        </View>
      ))}
    </View>
  ) : predictions.length > 0 ? (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={predictions}
      keyboardShouldPersistTaps="always"
      keyExtractor={item => item.place_id}
      renderItem={({item}) => (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 20,
            paddingHorizontal: 16,
          }}
          onPress={() => onSelect(item, activeInputType)}>
          <View
            style={{
              width: 42,
              height: 42,
              borderRadius: 50,
              backgroundColor: theme.background,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
            }}>
            <Icon
              type={Icons.MaterialIcons}
              name={getPredictionIcon(item.description)}
              size={20}
              color={theme.textSecondary}
            />
          </View>
          <View style={{flex: 1}}>
            <Text
              style={{
                fontSize: 16,
                color: theme.textPrimary,
                fontWeight: '500',
              }}
              numberOfLines={1}>
              {item.structured_formatting?.main_text ||
                item.properties?.name ||
                item.description.split(',')[0]}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: theme.textSecondary,
                marginTop: 2,
              }}
              numberOfLines={1}>
              {item.structured_formatting?.secondary_text ||
                item.description.split(',').slice(1).join(',').trim() ||
                'Location'}
            </Text>
          </View>
        </TouchableOpacity>
      )}
      ItemSeparatorComponent={() => (
        <View
          style={{
            height: 1,
            backgroundColor: theme.divider,
            marginLeft: 70,
            marginRight: 16,
          }}
        />
      )}
      ListFooterComponent={<View style={{height: 8}} />}
    />
  ) : (
    <View
      style={{
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          fontSize: 14,
          color: theme.textSecondary,
          textAlign: 'center',
        }}>
        No places found
      </Text>
    </View>
  )}
</View>

    );
  };
  return (
<SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
  <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

  {/* Header */}
  <View
    style={{
      height: 60,
      flexDirection: 'row',
      alignItems: 'center',
    
    }}>
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={go_back.bind(this)}
      style={{
        width: '15%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Icon
        type={Icons.MaterialIcons}
        name="arrow-back"
        color={theme.textPrimary}
        style={{ fontSize: 28 }}
      />
    </TouchableOpacity>

  </View>

  <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={{ paddingBottom: 40 }}>
    {/* Title */}
    <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
      <Text
        style={{
          color: theme.textSecondary,
          fontSize: f_25,
          fontFamily: regular,
        }}>
        {t('Enter Location')}
      </Text>
    </View>

    {/* Search Box */}
    <View style={{ width: '92%', alignSelf: 'center', marginBottom: 20 }}>
      <View
        style={{
          backgroundColor: theme.surface,
          borderRadius: 12,
         
        
         
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.background,
            borderRadius: 10,
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderWidth: 1,
            borderColor: theme.primary,
          }}>
          <Icon
            name="trip-origin"
            size={22}
            color={theme.primary}
            style={{ marginRight: 10 }}
          />

          <TextInput
            style={{
              flex: 1,
              fontSize: 16,
              color: theme.textPrimary,
              paddingVertical: 4,
              height: 38,
            }}
            placeholder={t('Type the location')}
            placeholderTextColor={theme.textSecondary}
            value={searchText}
            onChangeText={text => handleInputChange(text, 'origin')}
          />

          {searchText?.length > 0 && (
            <TouchableOpacity
              style={{
                padding: 5,
                marginLeft: 6,
                backgroundColor: theme.surface,
                borderRadius: 20,
              }}
              onPress={() => clearInput('origin')}>
              <Icon type={Icons.Feather} name="x" color={theme.textSecondary} size={16} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Predictions Dropdown */}
      {activeInput && (predictions.length > 0 || loading) && (
        <PredictionsDropdown
          predictions={predictions}
          loading={loading}
          onSelect={item => handleSelect(item)}
          activeInputType={activeInput.type}
        />
      )}
    </View>

    {/* Loader */}
    {loading && (
      <View style={{ height: 50, width: '90%', alignSelf: 'center' }}>
        <LottieView style={{ flex: 1 }} source={loader} autoPlay loop />
      </View>
    )}
  </ScrollView>
</SafeAreaView>


  );
};


function mapStateToProps(state) {
  return {
    initial_lat: state.booking.initial_lat,
    initial_lng: state.booking.initial_lng,
    initial_region: state.booking.initial_region,
  };
}
export default connect(mapStateToProps, null)(SelectGthLocation);

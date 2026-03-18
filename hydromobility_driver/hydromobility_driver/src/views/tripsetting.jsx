<SafeAreaView style={{backgroundColor: colors.lite_bg, flex: 1}}>
  <StatusBar
    translucent
    backgroundColor="transparent"
    barStyle="dark-content"
  />
  <View style={[styles.header]}>
    <TouchableOpacity
      activeOpacity={1}
      onPress={go_back.bind(this)}
      style={{width: '15%', alignItems: 'center', justifyContent: 'center'}}>
      <Icon
        type={Icons.MaterialIcons}
        name="arrow-back"
        color={colors.theme_bg_two}
        style={{fontSize: 30}}
      />
    </TouchableOpacity>
    <View
      activeOpacity={1}
      style={{
        width: '85%',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}>
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{
          color: colors.theme_bg_two,
          fontSize: f_xl,
          fontFamily: regular,
        }}>
        {t('Trip Settings')}
      </Text>
    </View>
  </View>
  <View
    style={{
      backgroundColor: colors.theme_bg_three,
      padding: 10,
      margin: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.theme_bg,
    }}>
    <View style={{flexDirection: 'row', width: '100%', padding: 10}}>
      <View style={{width: '70%'}}>
        <Text
          style={{
            fontFamily: regular,
            fontSize: 18,
            color: colors.theme_fg_two,
          }}>
          {t('Enable Daily ride status')}
        </Text>
      </View>
      <View
        style={{width: '30%', alignItems: 'center', justifyContent: 'center'}}>
        <Switch
          trackColor={{false: '#C0C0C0', true: colors.status_online}}
          thumbColor={isEnabled ? '#f5dd4b' : '#fefeff'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={daily_toggleSwitch}
          value={daily_status}
        />
      </View>
    </View>
  </View>

  <View style={{margin: 10}} />
  <View
    style={{
      backgroundColor: colors.theme_bg_three,
      padding: 10,
      margin: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.theme_bg,
    }}>
    <View style={{flexDirection: 'row', width: '100%', padding: 10}}>
      <View style={{width: '70%'}}>
        <Text
          style={{
            fontFamily: regular,
            fontSize: 18,
            color: colors.theme_fg_two,
          }}>
          {t('Enable Outstation ride status')}
        </Text>
      </View>
      <View
        style={{width: '30%', alignItems: 'center', justifyContent: 'center'}}>
        <Switch
          trackColor={{false: '#C0C0C0', true: colors.status_online}}
          thumbColor={isEnabled ? '#f5dd4b' : '#fefeff'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={outstation_toggleSwitch}
          value={outstation_status}
        />
      </View>
    </View>
  </View>
  <View style={{margin: 10}} />
  <View
    style={{
      backgroundColor: colors.theme_bg_three,
      padding: 10,
      margin: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.theme_bg,
    }}>
    <View style={{flexDirection: 'row', width: '100%', padding: 10}}>
      <View style={{width: '70%'}}>
        <Text
          style={{
            fontFamily: regular,
            fontSize: 18,
            color: colors.theme_fg_two,
          }}>
          {t('Enable Shared ride status')}
        </Text>
      </View>
      <View
        style={{width: '30%', alignItems: 'center', justifyContent: 'center'}}>
        <Switch
          trackColor={{false: '#C0C0C0', true: colors.status_online}}
          thumbColor={isEnabled ? '#f5dd4b' : '#fefeff'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={shared_toggleSwitch}
          value={shared_status}
        />
      </View>
    </View>
  </View>
  <View style={{margin: 10}} />
  <View
    style={{
      backgroundColor: colors.theme_bg_three,
      padding: 10,
      margin: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.theme_bg,
    }}>
    <View style={{flexDirection: 'row', width: '100%', padding: 10}}>
      <View style={{width: '70%'}}>
        <Text
          style={{
            fontFamily: regular,
            fontSize: 18,
            color: colors.theme_fg_two,
          }}>
          {t('Enable Rental ride status')}
        </Text>
      </View>
      <View
        style={{width: '30%', alignItems: 'center', justifyContent: 'center'}}>
        <Switch
          trackColor={{false: '#C0C0C0', true: colors.status_online}}
          thumbColor={isEnabled ? '#f5dd4b' : '#fefeff'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={rental_toggleSwitch}
          value={rental_status}
        />
      </View>
    </View>
  </View>
  {loading == true && (
    <View style={{height: 50, width: '90%', alignSelf: 'center'}}>
      <LottieView style={{flex: 1}} source={loader} autoPlay loop />
    </View>
  )}
</SafeAreaView>;

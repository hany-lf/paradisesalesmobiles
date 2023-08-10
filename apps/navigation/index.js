import {
  NavigationContainer,
  //   DefaultTheme,
  //   DarkTheme,
  //   useTheme,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as Utils from '@utils';
import i18n from 'i18next';
import React, {useEffect, useRef, useState} from 'react';
import {initReactI18next} from 'react-i18next';

import {
  Platform,
  StatusBar,
  useColorScheme,
  View,
  Text,
  useWindowDimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
const RootStack = createStackNavigator();
import MainStack from './MainStack';

import Loading from '../screens/Loading';

const Navigator = props => {
  const navigationRef = useRef(null);
  const scheme = useColorScheme();
  const [initialRoute, setInitialRoute] = useState('MainStack');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const onProcess = async () => {
      // // Get current language of device
      // const languageCode = language ?? BaseSetting.defaultLanguage;
      // dispatch(ApplicationActions.onChangeLanguage(languageCode));
      // // Config language for app
      // await i18n.use(initReactI18next).init({
      //   compatibilityJSON: 'v3',
      //   resources: BaseSetting.resourcesLanguage,
      //   lng: languageCode,
      //   fallbackLng: languageCode,
      // });
      setTimeout(() => {
        Utils.enableExperimental();
        setLoading(false);
        //    navigationRef?.current?.dispatch(StackActions.replace('OnBoard'));
      }, 300);
    };
    onProcess();
  }, []);

  if (loading) {
    return null;
  }
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          drawerStyle: {
            width: '60%',
          },
          drawerActiveTintColor: '#BC4B52',
        }}>
        {loading ? (
          <RootStack.Screen
            name="Loading"
            component={Loading}
            options={{headerShown: false}}></RootStack.Screen>
        ) : (
          <RootStack.Screen
            name="MainStack"
            component={MainStack}
            options={{headerShown: false}}></RootStack.Screen>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
    // <View>
    //   <Text>ini navigator</Text>
    //   <Text>akan jadi validasi user disini</Text>
    // </View>
  );
};
export default Navigator;

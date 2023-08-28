import {
  NavigationContainer,
  //   DefaultTheme,
  //   DarkTheme,
  //   useTheme,
} from '@react-navigation/native';
import {languageSelect} from '@selectors';
import {createStackNavigator} from '@react-navigation/stack';
import * as Utils from '@utils';
import i18n from 'i18next';
import React, {useEffect, useRef, useState} from 'react';
import {initReactI18next} from 'react-i18next';

import {ApplicationActions} from '@actions';
import {BaseSetting, DefaultTheme} from '@config';
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
import SignIn from '../screens/SignIn';
import ResetPass from '../screens/ResetPass';

import getUser from '../selectors/UserSelectors';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import SplashScreen from 'react-native-splash-screen';
import ForgotPassword from '../screens/ForgotPassword';
import Register from '../screens/Register';
import CustomModal from '../screens/CustomModal';

const Navigator = props => {
  const navigationRef = useRef(null);
  const scheme = useColorScheme();
  const [initialRoute, setInitialRoute] = useState('MainStack');
  const [loading, setLoading] = useState(true);
  const language = useSelector(languageSelect);

  const dispatch = useDispatch();

  useEffect(() => {
    //hide screen splash
    SplashScreen.hide();

    const onProcess = async () => {
      // Get current language of device
      const languageCode = language ?? BaseSetting.defaultLanguage;
      dispatch(ApplicationActions.onChangeLanguage(languageCode));
      // Config language for app
      await i18n.use(initReactI18next).init({
        compatibilityJSON: 'v3',
        resources: BaseSetting.resourcesLanguage,
        lng: languageCode,
        fallbackLng: languageCode,
      });
      setTimeout(() => {
        Utils.enableExperimental();
        setLoading(false);
        //    navigationRef?.current?.dispatch(StackActions.replace('OnBoard'));
      }, 300);
    };
    onProcess();
  }, []);

  const user = useSelector(state => getUser(state));
  console.log('user navigation', user);
  if (loading) {
    return null;
  }
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          animationEnabled: false,
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
        ) : user == null || user == '' || user == 0 ? (
          <RootStack.Screen
            name="SignIn"
            component={SignIn}
            options={{headerShown: false}}></RootStack.Screen>
        ) : user.isResetPass == 1 ? (
          <RootStack.Screen
            name="ResetPass"
            component={ResetPass}
            options={{headerShown: false}}></RootStack.Screen>
        ) : (
          <RootStack.Screen
            name="MainStack"
            component={MainStack}
            options={{headerShown: false}}></RootStack.Screen>
        )}
        {/* <RootStack.Screen
          name="Create"
          component={CustomModal}
          options={{animationEnabled: true}}
        /> */}
        <RootStack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{headerShown: false}}></RootStack.Screen>
        <RootStack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}></RootStack.Screen>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
export default Navigator;

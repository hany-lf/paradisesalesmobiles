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
  Alert,
  Linking,
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
import SignUpasGuest from '../screens/SignIn/SignUpasGuest';

import checkVersion from 'react-native-store-version';
import VersionInfo from 'react-native-version-info';

const Navigator = props => {
  const navigationRef = useRef(null);
  const scheme = useColorScheme();
  const [initialRoute, setInitialRoute] = useState('MainStack');
  const [loading, setLoading] = useState(true);
  const language = useSelector(languageSelect);

  const [isLatest, setLatest] = useState(true);
  const [result, setResult] = useState(undefined);
  const [visibileModalVers, setVisibleModalVers] = useState(false);

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

    const init = async () => {
      console.log(VersionInfo.appVersion);
      console.log(VersionInfo.buildVersion);
      console.log(VersionInfo.bundleIdentifier);
      const version = VersionInfo.appVersion;
      try {
        const check = await checkVersion({
          version,
          iosStoreURL:
            'https://apps.apple.com/us/app/paradise-indonesia/id6474651466',
          androidStoreURL:
            'https://play.google.com/store/apps/details?id=com.paradisesalesmobiles',
        });

        console.log('check', check);

        setResult(check);

        if (check.result !== 'new') {
          setLatest(false);
          // setVisibleModalVers(false);
        } else if (check.result == 'new') {
          // setVisibleModalVers(true);
          Alert.alert(
            'Paradise Indonesia needs an update!',
            'To use this app, downloaded the latest version',
            [
              {
                text: 'Download',
                onPress: () =>
                  Linking.openURL(
                    'https://play.google.com/store/apps/details?id=com.paradisesalesmobiles',
                  ),
              },
              // {text: 'Camera', onPress: () => fromCamera()},
              // {
              //   text: 'Cancel',
              //   onPress: () => console.log('User Cancel'),
              //   style: 'cancel',
              // },
            ],
            {cancelable: false},
          );
        }
      } catch (e) {
        console.log(e.message);
      }
    };

    // init(); //ini dimatiin dulu biar bisa develop lebih cepet
    onProcess();
  }, []);

  const user = useSelector(state => getUser(state));
  console.log('user navigation', user);
  if (loading) {
    return null;
  }

  // useEffect(() => {
  //   const init = async () => {
  //     console.log(VersionInfo.appVersion);
  //     console.log(VersionInfo.buildVersion);
  //     console.log(VersionInfo.bundleIdentifier);
  //     const version = VersionInfo.appVersion;
  //     try {
  //       const check = await checkVersion({
  //         version,
  //         iosStoreURL: 'https://apps.apple.com/jp/app/github/id1477376905',
  //         androidStoreURL:
  //           'https://play.google.com/store/apps/details?id=com.paradisesalesmobiles',
  //       });

  //       console.log('check', check);

  //       setResult(check);

  //       if (check.result !== 'new') {
  //         setLatest(false);
  //         // setVisibleModalVers(false);
  //       } else if (check.result == 'new') {
  //         // setVisibleModalVers(true);
  //         Alert.alert(
  //           'Paradise Indonesia needs an update!',
  //           'To use this app, downloaded the latest version',
  //           [
  //             {
  //               text: 'Download',
  //               onPress: () =>
  //                 Linking.openURL(
  //                   'https://play.google.com/store/apps/details?id=com.paradisesalesmobiles',
  //                 ),
  //             },
  //             // {text: 'Camera', onPress: () => fromCamera()},
  //             // {
  //             //   text: 'Cancel',
  //             //   onPress: () => console.log('User Cancel'),
  //             //   style: 'cancel',
  //             // },
  //           ],
  //           {cancelable: false},
  //         );
  //       }
  //     } catch (e) {
  //       console.log(e.message);
  //     }
  //   };

  //   init();
  // }, []);

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
        {/* ---- Sign yang ini untuk kalo abis resetpass backto screen sign in berhasil */}
        {/* <RootStack.Screen
          name="SignIn"
          component={SignIn}
          options={{headerShown: false}}></RootStack.Screen> */}
        {/* ---- Sign yang ini untuk kalo abis resetpass backto screen sign in berhasil */}
        <RootStack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{headerShown: false}}></RootStack.Screen>
        <RootStack.Screen
          name="SignUpasGuest"
          component={SignUpasGuest}
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

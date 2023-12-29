import {API_URL} from '@env';
import SliderIntro from 'react-native-slider-intro';
import {DefaultTheme, useFont} from '@config';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BaseStyle} from '@config';
import React, {useCallback, useEffect, useState, useRef} from 'react';
import styles from './styles';

// import messaging from '@react-native-firebase/messaging';
import {useTheme} from '@react-navigation/native';
import {TextInput, Icon, Button} from '@components';
// import {TextInput, Icon, Button} from '@components';
import {login, actionTypes} from '../../actions/UserActions';
import {BaseColor, Fonts} from '../../config';
import {
  TouchableOpacity,
  View,
  Image,
  Platform,
  Text,
  Alert,
  useColorScheme,
  StatusBar,
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  Modal,
  // Button,
} from 'react-native';
import {useSelector, useDispatch, connect} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import {firebase} from '@react-native-firebase/messaging';
import intro5 from '@assets/images/OnboardingScreen.jpg';
import AppIntroSlider from 'react-native-app-intro-slider';
import IconAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useTranslation} from 'react-i18next';

const SignUpasGuest = props => {
  return (
    <View>
      <Text>ini menjadi screen signup as guest</Text>
    </View>
  );
};
export default SignUpasGuest;

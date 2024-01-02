import {API_URL} from '@env';
import SliderIntro from 'react-native-slider-intro';
import {DefaultTheme, useFont} from '@config';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BaseStyle} from '@config';
import React, {useCallback, useEffect, useState, useRef} from 'react';
import styles from './styles';

// import messaging from '@react-native-firebase/messaging';
import {useTheme} from '@react-navigation/native';
import {TextInput, Icon, Button, Header} from '@components';
// import {TextInput, Icon, Button} from '@components';
import {login, actionTypes, signupguest} from '../../actions/UserActions';
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
import IntlPhoneInput from '@components/CountryCode';

const SignUpasGuest = props => {
  console.log('api url env', API_URL);
  const scheme = useColorScheme();
  console.log('schema', scheme);
  const {colors} = scheme === 'dark' ? DefaultTheme.dark : DefaultTheme.light; //dari config aja coba ya
  const font = useFont();
  let slider = useRef(null);
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [nohp, setNohp] = useState('');
  const [password, setPassword] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const [intro, setIntro] = useState(false);
  const [loadingProses, setLoadingProses] = useState(false);
  const [disableUser, setdisableUser] = useState(false);
  const [token_firebase, setTokenFirebase] = useState('');
  const {navigation} = props;
  console.log('props', props);
  const userError = useSelector(state => state.user);
  const user = useSelector(state => state.user);
  console.log('user di sig in', userError);

  const passwordChanged = useCallback(value => setPassword(value), []);
  const emailChanged = useCallback(value => setEmail(value), []);
  const nameChanged = useCallback(value => setName(value), []);
  // const nameChanged = useCallback(value => setName(value), []);

  const loginklik = () => {
    setLoadingProses(true);
    setLoading(true);

    // alert('alert sign in');
    const cekdata = {
      email,
      password,
      name,
      nohp,
      token_firebase,
    };
    console.log('cekdata', cekdata);

    SignupUserGuest();

    setTimeout(() => {
      setLoadingProses(false);
      setLoading(false);
    }, 3000);
  };

  const onChangeTextPhone = ({
    dialCode,
    unmaskedPhoneNumber,
    phoneNumber,
    isVerified,
  }) => {
    setNohp(dialCode + unmaskedPhoneNumber);
    //    this.setState({nohp: dialCode + unmaskedPhoneNumber});
    console.log(dialCode, unmaskedPhoneNumber, phoneNumber, isVerified);
    // console.log('nohp',this.state.nohp);
  };

  useEffect(() => {
    requestUserPermission();
  }, []);

  //untuk ubah disable button login
  useEffect(() => {
    console.log('!email', email);
    if (email != '' && password != '') {
      setdisableUser(false);
    } else {
      setdisableUser(true);
    }
  });

  // PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

  const requestUserPermission = async () => {
    await messaging().registerDeviceForRemoteMessages();

    const authStatus = await messaging().requestPermission();

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      registerAppWithFCM();
      getFcmToken();

      console.log('Authorization status:', authStatus);
    }
  };

  const registerAppWithFCM = async () => {
    await messaging().registerDeviceForRemoteMessages();
  };

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();

    if (fcmToken) {
      console.log('Bearer ' + fcmToken);
      console.log('Your Firebase Token is:', fcmToken);
      setTokenFirebase(fcmToken);
    } else {
      console.log('Failed', 'No token received');
    }
  };

  const SignupUserGuest = useCallback(
    () => dispatch(signupguest(name, nohp, email, password, token_firebase)),
    [name, nohp, email, password, token_firebase, dispatch],
    // setLoadingProses(false),
    // setLoading(false),
  );

  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={[BaseStyle.safeAreaView, {backgroundColor: BaseColor.whiteColor}]}>
      <Header
        title={t('sign_up_as_guest')}
        renderLeft={() => {
          return (
            <Icon
              // name="angle-left"
              name="arrow-left"
              size={18}
              color={BaseColor.corn70}
              enableRTL={true}
            />
          );
        }}
        style={{height: 80}}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <View style={{marginHorizontal: 20}}>
        <TextInput
          style={[BaseStyle.textInput, {marginBottom: 30}]}
          onChangeText={nameChanged}
          autoCorrect={false}
          placeholder={t('name')}
          value={name}
          selectionColor={colors.primary}
        />

        <TextInput
          style={[BaseStyle.textInput, {marginBottom: 30}]}
          onChangeText={emailChanged}
          autoCorrect={false}
          placeholder={t('email')}
          value={email}
          selectionColor={colors.primary}
        />

        <View style={{marginBottom: 30}}>
          <View
            style={[
              BaseStyle.textInput,
              {
                backgroundColor: colors.cardColor,
                borderColor: BaseColor.corn30,
                borderWidth: 1,
              },
              // style,
            ]}>
            <IntlPhoneInput
              dialCodeTextStyle={{
                color: BaseColor.corn70,
                fontFamily: Fonts.type.Lato,
              }}
              phoneInputStyle={{
                color: BaseColor.corn70,
                fontFamily: Fonts.type.Lato,
              }}
              onChangeText={onChangeTextPhone}
              defaultCountry="ID"
              placeholder={'Phone'}
            />
          </View>
        </View>

        <TextInput
          style={[BaseStyle.textInput, {marginTop: 0, marginBottom: 30}]}
          onChangeText={passwordChanged}
          autoCorrect={false}
          placeholder={t('password')}
          secureTextEntry={hidePass}
          value={password}
          selectionColor={colors.primary}
          position={'right'}
          icon={
            <Icon
              onPress={() => setHidePass(!hidePass)}
              active
              name={hidePass ? 'eye-slash' : 'eye'}
              size={20}
              color={BaseColor.corn70}
            />
          }
        />

        <View>
          <Button
            medium
            round
            disabled={disableUser}
            // loading={loading}
            style={{marginTop: 15}}
            backgroundColor={disableUser ? BaseColor.corn30 : BaseColor.corn70}
            onPress={loginklik}>
            {loadingProses == true ? (
              <ActivityIndicator
                color={BaseColor.whiteColor}></ActivityIndicator>
            ) : (
              t('sign_up_as_guest')
            )}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUpasGuest;

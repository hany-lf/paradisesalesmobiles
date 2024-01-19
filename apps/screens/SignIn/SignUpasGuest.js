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
import {UserAuth} from '@actions';
import axios from 'axios';
const SignUpasGuest = props => {
  console.log('api url env', API_URL);
  const scheme = useColorScheme();
  console.log('schema', scheme);
  const {colors} = scheme === 'dark' ? DefaultTheme.dark : DefaultTheme.light; //dari config aja coba ya
  const font = useFont();
  let slider = useRef(null);
  const {authentication} = UserAuth;
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [emailValidError, setEmailValidError] = useState('');
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
  const [ResresetError, setErrorResetPass] = useState(false);
  const [modalAlert, setModalAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');
  const passwordChanged = useCallback(value => setPassword(value), []);
  const emailChanged = useCallback(value => {
    setEmail(value);
    handleValidEmail(value);
  }, []);
  const nameChanged = useCallback(value => setName(value), []);
  // const nameChanged = useCallback(value => setName(value), []);

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

  const handleValidEmail = val => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (val.length === 0) {
      setEmailValidError('undefined');
      console.log('email address must be enter');
    } else if (reg.test(val) === false) {
      setEmailValidError('notvalid');
      console.log('enter valid email address');
    } else if (reg.test(val) === true) {
      setEmailValidError('valid');
      console.log('email sudah benar');
    }
  };

  useEffect(() => {
    requestUserPermission();
  }, []);

  //untuk ubah disable button login
  useEffect(() => {
    console.log('!email', email);
    if (
      email != '' &&
      password != '' &&
      name != '' &&
      nohp != '' &&
      emailValidError == 'valid'
    ) {
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

  const submitSignup = () => {
    const formData = {
      email: email,
      nama: name,
      password: password,
      token_firebase: token_firebase,
      handphone: nohp,
      group_cd: 'GUEST',
    };
    console.log('formdaata signupguest', formData);
    axios
      .post(API_URL + '/auth/sign-up-guest', formData)
      .then(res => {
        console.log('res', res);
        if (res.data.Error === false) {
          setErrorResetPass(res.data.Error);
          setModalAlert(true);
          setMessageAlert(res.data.Pesan);

          // alert(res.data.Pesan);
        } else {
          console.log('erroor email udah dipake', res);
          setErrorResetPass(res.data.Error);
          setModalAlert(true);

          const msgError = res.data.Pesan;
          setMessageAlert(msgError);
          // alert(res.data.Pesan);
        }
      })
      .catch(error => {
        console.log('error signupguest di axios', error.response);
        // console.log('error di catch signup', error.response.data.Error);

        if (error.response.data.Error === true) {
          if (error.response.data.Pesan.email != null) {
            const msgError = error.response.data.Pesan.email[0];
            // error.response.data.Pesan.email[0] ||
            // error.response.data.Pesan.nama[0] ||
            // error.response.data.Pesan.handphone[0] ||
            // error.response.data.Pesan.password[0];
            setErrorResetPass(error.response.data.Error);
            setModalAlert(true);
            // console.log('nama error', error.response.data.Pesan.nama[0]);

            setMessageAlert(msgError);
          } else {
            const msgError = error.response.data.Pesan;
            // error.response.data.Pesan.email[0] ||
            // error.response.data.Pesan.nama[0] ||
            // error.response.data.Pesan.handphone[0] ||
            // error.response.data.Pesan.password[0];
            setErrorResetPass(error.response.data.Error);
            setModalAlert(true);
            // console.log('nama error', error.response.data.Pesan.nama[0]);

            setMessageAlert(msgError);
          }
        }
      });
  };

  const resetError = () => {
    console.log('reset error');
    setModalAlert(false);
  };

  const resetSuccess = () => {
    console.log('reset sukses');
    console.log('props navigasi', props);

    setModalAlert(false);
    props.navigation.pop();
  };

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
        <View style={{marginBottom: 30}}>
          <TextInput
            style={[BaseStyle.textInput]}
            onChangeText={emailChanged}
            autoCorrect={false}
            placeholder={t('email')}
            value={email}
            autoCapitalize={'none'}
            selectionColor={colors.primary}
          />
          {emailValidError == 'valid' ? null : emailValidError == 'notvalid' ? (
            <Text
              style={{
                fontSize: 12,
                color: BaseColor.redStateColor,
                fontFamily: Fonts.type.LatoItalic,
              }}>
              enter valid email address
            </Text>
          ) : // <Text
          //   style={{
          //     fontSize: 12,
          //     color: BaseColor.redStateColor,
          //     fontFamily: Fonts.type.LatoItalic,
          //   }}>
          //   email address must be enter
          // </Text>
          null}
        </View>

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
              modalCountryItemCountryNameStyle={{
                color: BaseColor.corn70,
                fontFamily: Fonts.type.Lato,
                fontSize: 13,
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
          autoCapitalize={'none'}
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
            // onPress={loginklik}
            onPress={submitSignup}>
            {loadingProses == true ? (
              <ActivityIndicator
                color={BaseColor.whiteColor}></ActivityIndicator>
            ) : (
              t('sign_up_as_guest')
            )}
          </Button>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalAlert}

        // onRequestClose={() => {
        //   Alert.alert('Modal has been closed.');
        //   setModalShowUsername(!showModalUsername);
        // }}
      >
        <View
          style={{
            // backgroundColor: BaseColor.corn50,
            backgroundColor: 'rgba(152, 128, 78, 0.8)', //modal transparan
            // opacity: 0.5,
            height: Dimensions.get('screen').height,
            // height: 100,
            alignContent: 'center',

            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: BaseColor.whiteColor,
              borderRadius: 10,
              marginHorizontal: 20,

              justifyContent: 'center',
              padding: 10,
            }}>
            <Text
              style={{
                justifyContent: 'center',
                color: BaseColor.greenStateColor,
                fontFamily: Fonts.type.Lato,
                fontSize: 14,
                textAlign: 'center',
                marginTop: 10,
                marginBottom: 5,
              }}>
              {ResresetError == false ? 'Successfully updated' : 'Warning'}
              {/* Successfully updated */}
            </Text>
            <Text
              style={{
                justifyContent: 'center',
                color: BaseColor.corn70,
                fontFamily: Fonts.type.Lato,
                fontSize: 14,
                textAlign: 'center',
                marginTop: 5,
                marginBottom: 15,
              }}>
              {messageAlert}
            </Text>
            <TouchableOpacity
              onPress={() =>
                ResresetError == false ? resetSuccess() : resetError()
              }>
              <View
                // small
                style={{
                  borderRadius: 10,
                  height: 35,
                  width: 120,
                  padding: 0,
                  margin: 0,
                  backgroundColor: BaseColor.corn50,
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    justifyContent: 'center',
                    color: BaseColor.whiteColor,
                    fontFamily: Fonts.type.Lato,
                    fontSize: 13,
                    textAlign: 'center',
                    margin: 3,
                  }}>
                  Okay
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SignUpasGuest;

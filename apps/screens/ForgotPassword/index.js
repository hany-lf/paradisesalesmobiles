import {
  TouchableOpacity,
  View,
  Image,
  Platform,
  // Text,
  Alert,
  useColorScheme,
  StatusBar,
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  // Button,
  Modal,
} from 'react-native';
import {Text, Button, TextInput, Icon} from '@components';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BaseStyle, BaseColor, Fonts, DefaultTheme, useFont} from '@config';
import IconAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {API_URL} from '@env';
import React, {useCallback, useEffect, useState, useRef} from 'react';
import styles from './styles';
import axios from 'axios';
import {UserAuth} from '@actions';
const ForgotPassword = props => {
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

  const [intro, setIntro] = useState(false);
  const [loadingProses, setLoadingProses] = useState(false);
  const [disableUser, setdisableUser] = useState(false);
  const [token_firebase, setTokenFirebase] = useState('');
  const [suksesEmail, setSuksesEmail] = useState(false);
  const {navigation} = props;
  console.log('props', props);
  const {authentication} = UserAuth;
  const [modalAlert, setModalAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');
  const [ResresetError, setErrorResetPass] = useState(false);
  const emailChanged = useCallback(value => setEmail(value), []);

  useEffect(() => {
    email != '' ? setdisableUser(false) : setdisableUser(true);
  });

  const resetPass = () => {
    const formData = {
      email: email,
    };
    console.log('formdaata change pass', formData);
    axios
      .post(API_URL + '/auth/forgot-pass', formData)
      .then(res => {
        console.log('res', res);
        if (res.data.Error == false) {
          setErrorResetPass(res.data.Error);
          setModalAlert(true);
          setMessageAlert(res.data.Pesan);

          // alert(res.data.Pesan);
        } else {
          setErrorResetPass(res.data.Error);
          setModalAlert(true);
          setMessageAlert(res.data.Pesan);
          // alert(res.data.Pesan);
        }
      })
      .catch(error => {
        console.log('error reset di axios', error.response);
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
    dispatch(
      authentication(false, response => {
        setLoading(false);
      }),
    );
  };

  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={[BaseStyle.safeAreaView, {backgroundColor: BaseColor.whiteColor}]}>
      {suksesEmail == false ? (
        <View style={{marginTop: '30%'}}>
          <View style={{alignItems: 'center', marginBottom: 30}}>
            <IconAwesome5
              name="fingerprint"
              size={50}
              color={BaseColor.corn70}></IconAwesome5>
            <View style={{marginTop: 30}}>
              <Text
                style={{
                  fontFamily: Fonts.type.Lato,
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: BaseColor.corn70,
                }}>
                Forgot Password?
              </Text>
            </View>
            <View style={{marginTop: 30}}>
              <Text
                style={{
                  fontFamily: Fonts.type.Lato,
                  color: BaseColor.corn70,
                }}>
                No worries, we'll send you reset instruction
              </Text>
            </View>
          </View>
          <View style={{paddingHorizontal: 20}}>
            <TextInput
              style={[BaseStyle.textInput, {marginBottom: 30}]}
              onChangeText={emailChanged}
              autoCorrect={false}
              placeholder={t('email')}
              value={email}
              selectionColor={colors.primary}
            />
          </View>

          <View>
            <Button
              medium
              // full
              round
              disabled={disableUser}
              loading={loading}
              onPress={() => resetPass()}
              style={{marginTop: 25}}
              backgroundColor={
                disableUser ? BaseColor.corn30 : BaseColor.corn70
              }>
              {loadingProses == true ? (
                <ActivityIndicator
                  color={BaseColor.whiteColor}></ActivityIndicator>
              ) : (
                t('reset_password')
              )}
            </Button>
          </View>
          <TouchableOpacity
            onPress={() => {
              // navigation.goBack();
              props.navigation.pop();
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                marginTop: 30,
              }}>
              <IconAwesome5
                name="arrow-left"
                color={BaseColor.corn70}
                size={16}
                style={{marginHorizontal: 12}}></IconAwesome5>
              <Text
                style={{
                  fontFamily: Fonts.type.Lato,

                  textAlign: 'center',
                  color: BaseColor.corn70,
                }}>
                Back to login
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{marginTop: '30%'}}>
          <View style={{alignItems: 'center', marginBottom: 30}}>
            <IconAwesome5
              name="paper-plane"
              size={50}
              color={BaseColor.corn70}></IconAwesome5>
            <View style={{marginTop: 30}}>
              <Text
                style={{
                  fontFamily: Fonts.type.Lato,
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: BaseColor.corn70,
                }}>
                Email sent!
              </Text>
            </View>
            <View style={{marginTop: 15}}>
              <Text
                style={{
                  fontFamily: Fonts.type.Lato,
                  color: BaseColor.corn70,
                }}>
                Please check your email to reset the password!
              </Text>
            </View>
          </View>

          <View>
            <Button
              medium
              // full
              round
              loading={loading}
              onPress={() => {
                navigation.goBack();
              }}
              style={{marginTop: 5}}
              backgroundColor={BaseColor.corn70}>
              {loadingProses == true ? (
                <ActivityIndicator
                  color={BaseColor.whiteColor}></ActivityIndicator>
              ) : (
                t(' Back to login')
              )}
            </Button>
          </View>
        </View>
      )}

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
export default ForgotPassword;

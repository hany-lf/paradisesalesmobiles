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

  const emailChanged = useCallback(value => setEmail(value), []);

  useEffect(() => {
    email != '' ? setdisableUser(false) : setdisableUser(true);
  });

  const resetPass = () => {
    setSuksesEmail(true); // setelah sukses reset, kasih ini biar muncul screen sukses
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
    </SafeAreaView>
  );
};
export default ForgotPassword;

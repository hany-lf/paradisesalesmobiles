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
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const Register = props => {
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
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const [hideRePass, setHideRePass] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [showRequiredEmail, setShowRequiredEmail] = useState(false);

  const [intro, setIntro] = useState(false);
  const [loadingProses, setLoadingProses] = useState(false);
  const [disableUser, setdisableUser] = useState(true);
  const [token_firebase, setTokenFirebase] = useState('');
  const [suksesEmail, setSuksesEmail] = useState(false);
  const {navigation} = props;
  console.log('props', props);

  const emailChanged = useCallback(value => setEmail(value), []);
  const fullNameChanged = useCallback(value => setFullName(value), []);
  const phoneNumberChanged = useCallback(value => setphoneNumber(value), []);
  const passwordChanged = useCallback(value => setPassword(value), []);
  const repasswordChanged = useCallback(value => setRePassword(value), []);

  // const phoneNumberChanged = useCallback(value => {
  //   var cleaned = ('' + value).replace(/\D/g, '');
  //   var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  //   console.log('matcg', match);
  //   if (match) {
  //     var intlCode = match[1] ? '+1 ' : '',
  //       number = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join(
  //         '',
  //       );

  //     // this.setState({
  //     //   phoneNum: number,
  //     // });
  //     console.log('nnumber', number);
  //     setphoneNumber(number);
  //     return;
  //   }

  //   setphoneNumber(value);
  // }, []);
  useEffect(() => {
    // email != '' ? setdisableUser(false) : setdisableUser(true);
  });

  const resetPass = () => {
    console.log('phone number', phoneNumber);
    // setSuksesEmail(true); // setelah sukses reset, kasih ini biar muncul screen sukses
    email != '' ? setShowRequiredEmail(false) : setShowRequiredEmail(true);
  };

  const clickTC = isCheck => {
    console.log('ischeck', isCheck);
    setIsChecked(isCheck);
    if (isCheck == false) {
      setdisableUser(true);
    } else {
      setdisableUser(false);
    }
  };

  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={[BaseStyle.safeAreaView, {backgroundColor: BaseColor.whiteColor}]}>
      <View style={{marginTop: '20%'}}>
        <View style={{alignItems: 'center', marginBottom: 20}}>
          <Text
            style={{
              fontFamily: Fonts.type.LatoBold,
              fontSize: 18,
              color: BaseColor.corn70,
            }}>
            Registration
          </Text>
        </View>
        <View style={{paddingHorizontal: 20}}>
          <TextInput
            style={[
              BaseStyle.textInput,
              {marginBottom: showRequiredEmail ? 0 : 30},
            ]}
            onChangeText={emailChanged}
            autoCorrect={false}
            placeholder={t('email')}
            value={email}
            selectionColor={colors.primary}
            // autoComplete={'email'}
          />
          {showRequiredEmail ? (
            <Text
              style={{
                marginBottom: 15,
                fontSize: 13,
                color: BaseColor.redColor,
              }}>
              Required field
            </Text>
          ) : null}
        </View>

        <View style={{paddingHorizontal: 20}}>
          <TextInput
            style={[BaseStyle.textInput, {marginBottom: 30}]}
            onChangeText={fullNameChanged}
            autoCorrect={false}
            placeholder={t('full_name')}
            value={fullName}
            selectionColor={colors.primary}
          />
        </View>

        <View style={{paddingHorizontal: 20}}>
          <TextInput
            style={[BaseStyle.textInput, {marginBottom: 30}]}
            onChangeText={phoneNumberChanged}
            autoCorrect={false}
            placeholder={t('phone_number')}
            value={phoneNumber}
            selectionColor={colors.primary}
            // autoComplete={'tel'}
            keyboardType={'phone-pad'}
            textContentType="telephoneNumber"
            dataDetectorTypes="phoneNumber"
            maxLength={14}
            format="+1 (###) ###-####"
          />
        </View>

        <View style={{paddingHorizontal: 20}}>
          <TextInput
            style={[BaseStyle.textInput, {marginBottom: 30}]}
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
        </View>

        <View style={{paddingHorizontal: 20}}>
          <TextInput
            style={[BaseStyle.textInput, {marginBottom: 30}]}
            onChangeText={repasswordChanged}
            autoCorrect={false}
            placeholder={t('confirm_password')}
            secureTextEntry={hideRePass}
            value={repassword}
            selectionColor={colors.primary}
            position={'right'}
            icon={
              <Icon
                onPress={() => setHideRePass(!hideRePass)}
                active
                name={hidePass ? 'eye-slash' : 'eye'}
                size={20}
                color={BaseColor.corn70}
              />
            }
          />
        </View>

        <View style={{alignItems: 'center'}}>
          <BouncyCheckbox
            size={20}
            fillColor={BaseColor.corn50}
            unfillColor="#FFFFFF"
            text={
              <View style={{flexDirection: 'row', width: '100%'}}>
                <Text
                  style={{
                    fontFamily: Fonts.type.Lato,
                    color: BaseColor.corn50,
                  }}>
                  I have read and agree to{' '}
                </Text>
                <TouchableOpacity>
                  <View>
                    <Text
                      style={{
                        borderBottomColor: BaseColor.corn70,
                        borderBottomWidth: 1,
                        fontFamily: Fonts.type.Lato,
                        color: BaseColor.corn70,
                      }}>
                      Terms & Conditions
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            }
            iconStyle={{borderColor: BaseColor.corn70}}
            innerIconStyle={{borderWidth: 2, borderRadius: 5}}
            // textStyle={{fontFamily: Fonts.type.Lato}}
            onPress={isChecked => clickTC(isChecked)}
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
            backgroundColor={disableUser ? BaseColor.corn30 : BaseColor.corn70}>
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
    </SafeAreaView>
  );
};
export default Register;

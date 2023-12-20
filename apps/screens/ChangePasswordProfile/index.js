import {Text, SafeAreaView, Header, Icon, Button} from '@components';
import {BaseStyle, BaseColor, Fonts} from '../../config';
import {useTranslation} from 'react-i18next';
import {
  View,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
  ActivityIndicator,
  Modal,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import RenderHtml from 'react-native-render-html';

import {ScrollView} from 'react-native-gesture-handler';
import Image from '../../components/Image';
import getUser from '../../selectors/UserSelectors';

import {TextInput} from '../../components';
import React, {useCallback, useEffect, useState, useRef} from 'react';
import {saveProfile, actionTypes} from '../../actions/UserActions';
import {useSelector, useDispatch, connect} from 'react-redux';
import editSuksesSelector from '../../selectors/EditProfilSelectors';
import {API_URL} from '@env';
const ChangePasswordProfile = props => {
  const {t} = useTranslation();
  //   const dummyFAQ = dummy_faq.menu_faq;
  const {navigation} = props;
  const dispatch = useDispatch();
  const {width} = useWindowDimensions().width;
  // const {user} = useSelector(state => getUser)
  const userToken = useSelector(state => state.user.userIDToken);
  const user = useSelector(state => getUser(state));
  console.log('user pict', user);
  console.log('user userToken', userToken.Token);

  const [email, setEmail] = useState(user.user);
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.handphone);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const [hidePassConfirm, setHidePassConfirm] = useState(true);
  const [disableButton, setDisableButton] = useState(true);
  const [loadingProses, setLoadingProses] = useState(false);
  const [modalAlert, setModalAlert] = useState(false);
  const [modalAlertNotMatch, setModalAlertNotMatch] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');
  const [messageAlertNotMatch, setMessageAlertNotMatch] = useState('');
  // useEffect(() => {
  //   if (user === null) {
  //     props.navigation.navigate('Auth');
  //   }
  // });

  //untuk ubah disable button change pass
  useEffect(() => {
    if (password != '' && passwordConfirmation != '') {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  });

  const saveChangePass = () => {
    if (password == passwordConfirmation) {
      const formData = {
        email: email,
        newpass: password,
        token: userToken.Token,
      };
      console.log('formdaata change pass', formData);
      axios
        .post(API_URL + '/profile/change-pass', formData)
        .then(res => {
          console.log('res change pass', res);
          if (res.data.Error == false) {
            setModalAlert(true);
            setMessageAlert(res.data.Pesan);

            // alert(res.data.Pesan);
          } else {
            setModalAlert(true);
            setMessageAlert(res.data.Pesan);
            // alert(res.data.Pesan);
          }
        })
        .catch(error => {
          console.log(error.response);
        });

      // alert('same password');
    } else {
      // alert('different password');
      setModalAlertNotMatch(true);
      setMessageAlertNotMatch('Passwords do not match.');
    }
  };

  const onCloseAlert = () => {
    setModalAlert(false);
    navigation.navigate('HomeScreen');
  };
  const onCloseAlertNotMatch = () => {
    setModalAlertNotMatch(false);
  };

  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={[BaseStyle.safeAreaView, {backgroundColor: BaseColor.whiteColor}]}>
      <Header
        title={t('change_password')}
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
      <ScrollView style={{marginHorizontal: 20}}>
        <View style={{marginTop: 10}}>
          <TextInput
            style={[BaseStyle.textInput, {marginTop: 10}]}
            onChangeText={text => setPassword(text)}
            autoCorrect={false}
            placeholder={t('password')}
            secureTextEntry={hidePass}
            value={password}
            selectionColor={BaseColor.primary}
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
          {/* <TextInput
            style={[BaseStyle.textInput, {marginBottom: 30}]}
            onChangeText={text => setPassword(text)}
            autoCorrect={false}
            placeholder={t('password')}
            value={password}
            selectionColor={BaseColor.primary}
          /> */}
          {/* <TextInput
            style={[BaseStyle.textInput, {marginBottom: 30}]}
            onChangeText={text => setPasswordConfirmation(text)}
            autoCorrect={false}
            placeholder={t('password_confirmation')}
            value={passwordConfirmation}
            selectionColor={BaseColor.primary}
          /> */}
          <TextInput
            style={[BaseStyle.textInput, {marginTop: 10}]}
            onChangeText={text => setPasswordConfirmation(text)}
            autoCorrect={false}
            placeholder={t('password_confirmation')}
            secureTextEntry={hidePassConfirm}
            value={passwordConfirmation}
            selectionColor={BaseColor.primary}
            position={'right'}
            icon={
              <Icon
                onPress={() => setHidePassConfirm(!hidePassConfirm)}
                active
                name={hidePassConfirm ? 'eye-slash' : 'eye'}
                size={20}
                color={BaseColor.corn70}
              />
            }
          />
        </View>

        {/* <TouchableOpacity
          onPress={() => {
            saveChangePass();
          }} */}
        {/* style={{marginTop: 40}}> */}
        <Button
          full
          style={{height: 50, marginTop: 40}}
          round
          onPress={() => saveChangePass()}
          // onPress={() => console.log('button change pass')}
          // backgroundColor={BaseColor.corn70}
          backgroundColor={disableButton ? BaseColor.corn30 : BaseColor.corn70}>
          {loadingProses == true ? (
            <ActivityIndicator color={BaseColor.whiteColor}></ActivityIndicator>
          ) : (
            <Text
              style={{color: BaseColor.whiteColor, fontFamily: Fonts.type.L}}>
              Confirm
            </Text>
          )}
        </Button>
        {/* </TouchableOpacity> */}
      </ScrollView>

      {/* ---- MODAL ALERT UNTUK GANTI PASSWORD ---- */}
      <View>
        <Modal
          visible={modalAlert}
          animationType="slide"
          transparent={true}
          // style={{height: '100%'}}
          onBackdropPress={() => onCloseAlert()}>
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
                // flex: 1,

                // alignContent: 'center',
                padding: 10,
                backgroundColor: '#fff',
                // height: ,
                borderRadius: 8,
              }}>
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: BaseColor.primary,
                    marginBottom: 10,
                  }}>
                  {messageAlert.includes('success') ? 'Success' : 'Failedsss'}
                </Text>
                <Text>{messageAlert}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                <Button
                  style={{
                    marginTop: 10,
                    // marginBottom: 10,
                    backgroundColor: BaseColor.corn70,
                    width: 70,
                    height: 40,
                  }}
                  onPress={() => onCloseAlert()}>
                  <Text style={{fontSize: 13, color: BaseColor.whiteColor}}>
                    {t('OK')}
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      {/* ---- CLOSE MODAL ALERT UNTUK GANTI PASSWORD ---- */}

      {/* ---- MODAL ALERT UNTUK PASSWORD TIDAK SAMA ---- */}
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalAlertNotMatch}
          onBackdropPress={() => onCloseAlertNotMatch()}>
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
                  color: BaseColor.redStateColor,
                  fontFamily: Fonts.type.Lato,
                  fontSize: 14,
                  textAlign: 'center',
                  marginTop: 10,
                  marginBottom: 5,
                }}>
                {/* {editProfilStatus.Pesan} */}
                Sorry!
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
                {messageAlertNotMatch}
              </Text>
              <TouchableOpacity onPress={() => setModalAlertNotMatch(false)}>
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
      </View>
      {/* ---- CLOSE MODAL ALERT UNTUK PASSWORD TIDAK SAMA ---- */}
    </SafeAreaView>
  );
};
export default ChangePasswordProfile;

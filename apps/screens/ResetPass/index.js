import {View, Text, Modal, Dimensions, TouchableOpacity} from 'react-native';
import {TextInput, Icon, Header} from '@components';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {BaseSetting, BaseColor, BaseStyle, Fonts} from '../../config';
import {Button} from '../../components';
import {useTranslation} from 'react-i18next';
import getUser from '../../selectors/UserSelectors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector, useDispatch, connect} from 'react-redux';
import {API_URL} from '@env';

const ResetPass = props => {
  const {navigation} = props;
  const [hidePass, setHidePass] = useState(true);
  const [confirmPass, setConfirmPass] = useState('');
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const user = useSelector(state => getUser(state));
  console.log('user di resetpass', user);

  const [modalAlert, setModalAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');
  const [ResresetError, setErrorResetPass] = useState(false);
  const resetPass = () => {
    const formData = {
      email: user.email,
      newpass: confirmPass,
    };
    console.log('formdaata change pass', formData);
    axios
      .post(API_URL + '/auth/reset-pass', formData)
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

  const resetSuccess = () => {
    console.log('reset sukses');
    console.log('props navigasi', props);
    // console.log('navigasi signin?', props.navigation.navigate());
    navigation.navigate('SignIn');
    // props.navigation.navigate('ForgotPassword');
    setModalAlert(false);

    // props.navigation.pop();
  };

  const resetError = () => {
    console.log('reset error');
    setModalAlert(false);
  };

  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={[BaseStyle.safeAreaView, {backgroundColor: BaseColor.whiteColor}]}>
      <Header
        title={t('reset_password')}
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
      <View style={{marginHorizontal: 30}}>
        <TextInput
          style={[BaseStyle.textInput, {marginTop: 10, marginBottom: 20}]}
          onChangeText={text => setConfirmPass(text)}
          autoCorrect={false}
          placeholder={t('reset_password')}
          secureTextEntry={hidePass}
          value={confirmPass}
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
        <Button
          medium
          round
          onPress={() => resetPass()}
          style={{backgroundColor: BaseColor.corn50, height: 50}}>
          <Text
            style={{
              fontFamily: Fonts.type.Lato,
              fontSize: 14,
              color: BaseColor.whiteColor,
            }}>
            Submit
          </Text>
        </Button>
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

export default ResetPass;

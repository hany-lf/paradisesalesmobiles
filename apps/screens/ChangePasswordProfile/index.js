import {Text, SafeAreaView, Header, Icon, Button} from '@components';
import {BaseStyle, BaseColor, Fonts} from '../../config';
import {useTranslation} from 'react-i18next';
import {
  View,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import RenderHtml from 'react-native-render-html';

import {ScrollView} from 'react-native-gesture-handler';
import Image from '../../components/Image';
import getUser from '../../selectors/UserSelectors';

import {TextInput} from '../../components';
import React, {useCallback, useEffect, useState, useRef} from 'react';
import {saveProfile, actionTypes} from '../../actions/UserActions';
import {useSelector, useDispatch, connect} from 'react-redux';
import editSuksesSelector from '../../selectors/EditProfilSelectors';

const ChangePasswordProfile = props => {
  const {t} = useTranslation();
  //   const dummyFAQ = dummy_faq.menu_faq;
  const {navigation} = props;
  const dispatch = useDispatch();
  const {width} = useWindowDimensions().width;
  // const {user} = useSelector(state => getUser)
  const user = useSelector(state => getUser(state));
  console.log('user pict', user);

  const editProfilStatus = useSelector(state => editSuksesSelector(state));
  console.log('edit sttus', editProfilStatus);

  const [email, setEmail] = useState(user.user);
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.handphone);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const [hidePassConfirm, setHidePassConfirm] = useState(true);
  const [disableButton, setDisableButton] = useState(true);
  const [loadingProses, setLoadingProses] = useState(false);
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

  const saveProfiles = useCallback(
    () =>
      dispatch(saveProfile({emails: user.user, name, phone, genders: 'Male'})),
    [{emails: user.user, name, phone, genders: 'Male'}, dispatch],
  );

  const saveChangePass = () => {
    alert('functionnya belum selesai');
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

        <TouchableOpacity
          onPress={() => saveChangePass()}
          style={{marginTop: 40}}>
          <Button
            full
            style={{height: 50}}
            round
            onPress={() => console.log('button change pass')}
            // backgroundColor={BaseColor.corn70}
            backgroundColor={
              disableButton ? BaseColor.corn30 : BaseColor.corn70
            }>
            {loadingProses == true ? (
              <ActivityIndicator
                color={BaseColor.whiteColor}></ActivityIndicator>
            ) : (
              <Text
                style={{color: BaseColor.whiteColor, fontFamily: Fonts.type.L}}>
                Confirm
              </Text>
            )}
          </Button>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
export default ChangePasswordProfile;

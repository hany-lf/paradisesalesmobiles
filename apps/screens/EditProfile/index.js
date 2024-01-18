import {Text, SafeAreaView, Header, Icon, Button} from '@components';
import {BaseStyle, BaseColor, Fonts} from '../../config';
import {useTranslation} from 'react-i18next';
import {
  View,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
  Modal,
  Dimensions,
  Alert,
  Platform,
} from 'react-native';
import RenderHtml from 'react-native-render-html';

import {ScrollView} from 'react-native-gesture-handler';
import Image from '../../components/Image';
import getUser from '../../selectors/UserSelectors';

import {TextInput} from '../../components';
import React, {useCallback, useEffect, useState, useRef} from 'react';
import {
  saveProfile,
  actionTypes,
  saveFotoProfil,
} from '../../actions/UserActions';
import {useSelector, useDispatch, connect} from 'react-redux';
import editSuksesSelector from '../../selectors/EditProfilSelectors';
import ImagePicker from 'react-native-image-crop-picker';
// import ReactNativeBlobUtil from 'react-native-blob-util';
import {UserAuth} from '@actions';
import MaskInput, {Masks, useMaskedInputProps} from 'react-native-mask-input';
import {useTheme} from '@react-navigation/native';

const EditProfile = props => {
  const [loading, setLoading] = useState(false);
  const {t} = useTranslation();
  //   const dummyFAQ = dummy_faq.menu_faq;
  const {navigation} = props;
  const dispatch = useDispatch();
  const {width} = useWindowDimensions().width;
  // const {user} = useSelector(state => getUser)
  const user = useSelector(state => getUser(state));
  console.log('user pict', user);
  const {colors} = useTheme();
  const cardColor = colors.card;
  const editProfilStatus = useSelector(state => editSuksesSelector(state));
  console.log('edit sttus', editProfilStatus);
  const [klikButtonConfirm, setKlikButtonConfirm] = useState(false);
  const {authentication} = UserAuth;
  const [email, setEmail] = useState(user.user);
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.handphone);
  const [images, setImage] = useState([]);
  const [modalAlert, showModal] = useState(false);

  const [visibileModalEdit, setVisibleModalEdit] =
    editProfilStatus != undefined
      ? useState(editProfilStatus.status)
      : useState(false);

  const phoneMaskedInputProps = useMaskedInputProps({
    value: phone,
    onChangeText: setPhone,
    mask: [
      // /\d+/,
      /\d/,
      /\d/,
      // ')',
      ' ',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
      /\d/,
    ],
    // placeholder: 'number',
    placeholderFillCharacter: '0',
  });
  // useEffect(() => {
  //   if (user === null) {
  //     props.navigation.navigate('Auth');
  //   }
  // });

  const klikConfirm = () => {
    saveProfiles();
    // navigation.pop()
    // setTimeout(() => {
    //   props.navigation.pop();
    //   //    navigationRef?.current?.dispatch(StackActions.replace('OnBoard'));
    // }, 300);
    // console.log('setklikbuttonconfirm true');
    // setKlikButtonConfirm(true);
  };

  const saveProfiles = useCallback(
    () =>
      // setKlikButtonConfirm(true),
      dispatch(saveProfile({emails: user.user, name, phone, genders: 'Male'})),
    [{emails: user.user, name, phone, genders: 'Male'}, dispatch],
  );

  const savePhoto = useCallback(() =>
    dispatch(saveFotoProfil({image: images, email: user.user})),
  );

  const handlePhotoPick = () => {
    console.log('datImage', images);
    Alert.alert(
      'Select a Photo',
      'Choose the place where you want to get a photo',
      [
        {text: 'Gallery', onPress: () => fromGallery()},
        {text: 'Camera', onPress: () => fromCamera()},
        {
          text: 'Cancel',
          onPress: () => console.log('User Cancel'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  const fromCamera = () => {
    ImagePicker.openCamera({
      width: 500,
      height: 500,
      cropping: true,
    })
      .then(images => {
        console.log('received image', images);

        setImage([
          {
            uri: images.path,
            width: images.width,
            height: images.height,
            mime: images.mime,
          },
        ]);
        // savePhoto();
        // uploadPhoto();
        // setImage(prevState => ({
        //   image: [
        //     ...prevState.image,
        //     {
        //       uri: image.path,
        //       width: image.width,
        //       height: image.height,
        //       mime: image.mime,
        //     },
        //   ],
        // }));
      })
      .catch(e => console.log('tag', e));
  };

  const fromGallery = (cropping, mediaType = 'photo') => {
    // let imageList = [];

    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
      multiple: false,
    })
      .then(images => {
        console.log('received images', images);
        setImage([
          {
            uri: images.path,
            width: images.width,
            height: images.height,
            mime: images.mime,
          },
        ]);
        // savePhoto();
        // uploadPhoto();
        // image.map(image => {
        //   imageList.push({
        //     uri: image.path,
        //     width: image.width,
        //     height: image.height,
        //     mime: image.mime,
        //   });
        // });
        // console.log('received images', image);
        // console.log('received images >', imageList);
        // setImage(imageList);
        // for (var i = 0; i < image.length; i++) {
        //   setImage({
        //     images: [
        //       {
        //         uri: image[i].path,
        //         width: image[i].width,
        //         height: image[i].height,
        //         mime: image[i].mime,
        //       },
        //     ],
        //   });
        // }
      })
      .catch(e => console.log('tag', e));
  };

  useEffect(() => {
    images.length != 0 ? savePhoto() : null;
  }, [images]);

  const onLogOut = () => {
    showModal(!modalAlert);
  };

  const removeAccount = () => {
    setLoading(true);
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
      <Header
        title={t('edit_profile')}
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
        {user ? (
          user.pict ? (
            <TouchableOpacity onPress={() => handlePhotoPick()}>
              <View style={{alignItems: 'center'}}>
                <View style={{width: 100, height: 100}}>
                  <Image
                    source={{uri: user.pict}}
                    style={{
                      width: 100,
                      height: 100,
                      resizeMode: 'contain',
                      borderRadius: 50,
                    }}></Image>
                </View>

                {/* <TouchableOpacity>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon
                    name={'camera'}
                    size={23}
                    solid
                    color={BaseColor.corn30}></Icon>
                  <View style={{marginHorizontal: 10}}>
                    <Text>Change Photo Profil</Text>
                  </View>
                </View>
              </TouchableOpacity> */}
              </View>
            </TouchableOpacity>
          ) : (
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity>
                <View
                  style={{
                    backgroundColor: BaseColor.corn70,
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name={'user'}
                    size={55}
                    solid
                    color={BaseColor.corn50}></Icon>
                  <View style={{position: 'absolute'}}>
                    <Icon
                      name={'camera'}
                      size={23}
                      solid
                      color={BaseColor.whiteColor}></Icon>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )
        ) : (
          <Text>user no</Text>
        )}

        <View
          style={{
            borderBottomColor: BaseColor.grey30,
            borderBottomWidth: 2,
            marginVertical: 30,
          }}></View>

        <View style={{marginTop: 10}}>
          <TextInput
            style={[
              BaseStyle.textInput,
              {marginBottom: 30, backgroundColor: BaseColor.corn30},
            ]}
            onChangeText={text => console.log(text)}
            autoCorrect={false}
            placeholder={t('email')}
            value={email}
            editable={false}
            selectionColor={BaseColor.primary}
          />
          <TextInput
            style={[BaseStyle.textInput, {marginBottom: 30}]}
            onChangeText={text => setName(text)}
            autoCorrect={false}
            placeholder={t('name')}
            value={name}
            selectionColor={BaseColor.primary}
          />
          <TextInput
            selectionColor={BaseColor.primary}
            style={[BaseStyle.textInput, {marginBottom: 30}]}
            {...phoneMaskedInputProps}></TextInput>
          {/* <TextInput
            style={[BaseStyle.textInput, {marginBottom: 30}]}
            onChangeText={text => setPhone(text)}
            autoCorrect={false}
            placeholder={t('phone_number')}
            value={phone}
            keyboardType={'phone-pad'}
            selectionColor={BaseColor.primary}
            textContentType="telephoneNumber"
            dataDetectorTypes="phoneNumber"
            maxLength={14}
            format="+1 (###) ###-####"
            inputMode="tel"
          /> */}

          {/* <View
            style={[
              BaseStyle.textInput,
              {
                backgroundColor: cardColor,
                borderColor: BaseColor.corn30,
                borderWidth: 1,
                marginBottom: 30,
              },
            ]}>
            <MaskInput
              value={phone}
              maxLength={14}
              placeholder={t('phone_number')}
              // placeholder={'CPF/CNPJ'}
              keyboardType={'phone-pad'}
              selectionColor={BaseColor.primary}
              onChangeText={(masked, unmasked) => {
                setPhone(unmasked); // you can use the unmasked value as well

                // assuming you typed "9" all the way:
                console.log(masked); // (99) 99999-9999
                console.log(unmasked); // 99999999999
              }}
              placeholderFillCharacter="0"
              mask={[
                // '(',
                '+',
                /\d/,
                /\d/,
                // ')',
                ' ',
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                '-',
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                '-',
                /\d/,
                /\d/,
                /\d/,
              ]}
            />
          </View> */}
        </View>

        <Button
          full
          onPress={() => klikConfirm()}
          backgroundColor={BaseColor.corn50}
          style={{height: 50, borderRadius: 15}}>
          <Text
            style={{
              justifyContent: 'center',
              color: BaseColor.whiteColor,
              fontFamily: Fonts.type.Lato,
              fontSize: 13,
              textAlign: 'center',
              margin: 3,
            }}>
            Confirm
          </Text>
        </Button>

        {Platform.OS == 'ios' ? (
          <Button
            onPress={() => onLogOut()}
            backgroundColor={BaseColor.grey30}
            style={{
              height: 50,
              borderRadius: 15,
              width: '40%',
              alignSelf: 'center',
              marginTop: 50,
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
              Remove Account
            </Text>
          </Button>
        ) : null}
      </ScrollView>

      {editProfilStatus != undefined && klikButtonConfirm == true ? (
        <Modal
          animationType="slide"
          transparent={true}
          visible={visibileModalEdit}

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
                {/* {editProfilStatus.Pesan} */}
                Successfully updated
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
                {editProfilStatus.pesan}
              </Text>
              <TouchableOpacity onPress={() => setVisibleModalEdit(false)}>
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
      ) : null}

      <Modal animationType="slide" transparent={true} visible={modalAlert}>
        <View
          style={{
            backgroundColor: '#98804E80',
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
                fontFamily: Fonts.type.LatoBold,
                fontSize: 15,
                textAlign: 'center',
                marginBottom: 20,
              }}>
              Are you sure to remove account?
            </Text>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <TouchableOpacity
                onPress={() => removeAccount()}
                style={{width: '30%'}}>
                <View
                  // small
                  style={{
                    borderRadius: 10,
                    height: 35,
                    width: '100%',
                    padding: 0,
                    margin: 0,
                    backgroundColor: BaseColor.yellowStateColor,
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
                    Yes
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => showModal(!modalAlert)}
                style={{width: '30%'}}>
                <View
                  // small
                  style={{
                    borderRadius: 10,
                    height: 35,
                    width: '100%',
                    padding: 0,
                    margin: 0,
                    backgroundColor: BaseColor.redStateColor,
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
                    No
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default EditProfile;

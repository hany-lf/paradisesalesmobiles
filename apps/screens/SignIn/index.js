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
import {PermissionsAndroid} from 'react-native';
import errorsSelector from '../../selectors/ErrorSelectors';

const SignIn = props => {
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
  // console.log('datashow modal null', user.dataShowModal);
  // const psn =
  //   user.dataShowModal === null
  //     ? 'isinya null ya'
  //     : user.dataShowModal.msgPesan;
  // const stts =
  //   user.dataShowModal === null ? 'isinya null ya' : user.dataShowModal.status;

  // user.dataShowModal != null || user.dataShowModal != undefined
  //   ? user.dataShowModal.msgPesan
  //   : null;
  // const [showModalUsername, setModalShowUsername] = useState(false);
  // const [pesanModalUsername, setPesanModalUsername] = useState('');
  // const [typeErrorLogin, setTypeErrorLogin] = useState('');
  // console.log('user di sign in', user);

  // const errors = useSelector(state =>
  //   errorsSelector([actionTypes.LOGIN_ERROR], state),
  // );
  // console.log('error selector', errors);
  const passwordChanged = useCallback(value => setPassword(value), []);
  const emailChanged = useCallback(value => setEmail(value), []);

  useEffect(() => {
    console.log('user for reset? ', user.user);
    console.log('usr error', user.errorLogin);
    if (user.user != null) {
      // console.log('user', user);

      // loadProject();
      // props.navigation.navigate('MainStack');
      props.navigation.navigate('MainStack');
      // navigation.navigate('MainStack');
    } else {
      setIntro(true); //tutup dulu sementara
      console.log('truee');
    }
  }, []);

  const _onDone = () => {
    console.log('done');
    setIntro(false);
  };

  const _onSkip = () => {
    setIntro(false);
  };

  const renderDoneButton = () => {
    return (
      <View style={styles.nextButton}>
        <Text
          style={{
            color: '#CCC0A7',
            fontFamily: Fonts.type.LatoBold,
            fontSize: 16,
          }}>
          Done
        </Text>
      </View>
    );
  };

  const renderNextButton = () => {
    // console.log('activeindex', i);
    return (
      // <TouchableOpacity>
      <View>
        {/* <Icon */}
        <IconAwesome5
          name="arrow-right"
          style={{
            color: BaseColor.corn30,
            fontSize: 24,
            marginRight: 5,
          }}></IconAwesome5>
      </View>
      // </TouchableOpacity>
    );
  };

  const renderSkipButton = () => {
    return (
      <View>
        <Text style={styles.text}>Skip</Text>
      </View>
    );
  };
  const _renderItem = ({item}) => (
    <ImageBackground
      source={item.backgroundImage}
      style={[
        styles.mainContent,
        {
          width: '100%',
          height: '100%',
        },
      ]}>
      {item.image == null ||
      item.image == '' ||
      item.image == undefined ? null : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: Dimensions.get('window').height,
          }}>
          <Image
            style={{width: 200, height: 100, resizeMode: 'cover'}}
            source={item.image}
          />
        </View>
      )}

      <View style={{marginTop: '60%'}}>
        <Text
          style={{
            color: '#CCC0A7',
            fontFamily: Fonts.type.Lato,
            fontSize: 16,
          }}>
          {item.title}
        </Text>

        {/* <Button
          title={item.key}
          // onPress={() => slider?.goToSlide(item.key, true)}
        >
          <Text>{item.key}</Text>
        </Button> */}
      </View>
    </ImageBackground>
  );

  const _renderPagination = activeIndex => {
    console.log('acit', activeIndex);
    return (
      <View style={{position: 'absolute', bottom: 16, left: 16, right: 16}}>
        <SafeAreaView>
          <View
            style={{
              height: 16,
              margin: 16,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {slides.length > 1 &&
              slides.map((_, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    {
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      marginHorizontal: 20,
                      marginBottom: 30,
                    },
                    i === activeIndex
                      ? {backgroundColor: BaseColor.corn50}
                      : {backgroundColor: BaseColor.corn30},
                  ]}
                  onPress={() => slider?.goToSlide(i, true)}
                />
              ))}
          </View>
        </SafeAreaView>
      </View>
    );
  };

  const slides = [
    {
      key: '0',
      title: 'Welcome to Paradise Property App',

      backgroundImage: require('@assets/images/OnboardingScreen.jpg'),
    },
    {
      key: '1',
      title: 'Enjoy amazing promo & offers',

      backgroundImage: require('@assets/images/OnboardingScreenbeach.jpg'),
    },
    {
      key: '2',
      title: 'Browse your luxury apartments',
      backgroundImage: require('@assets/images/OnboardingScreen-03.jpg'),
    },
  ];

  // const showModal = modal => {
  //   const currentModal = {
  //     showModal: true,
  //     modalType: modal,
  //   };
  //   props.showModal({modal: currentModal});
  // };

  const loginklik = () => {
    setLoadingProses(true);
    setLoading(true);

    // alert('alert sign in');
    const cekdata = {
      email,
      password,
      token_firebase,
    };
    console.log('cekdata', cekdata);

    loginUser();

    setTimeout(() => {
      setLoadingProses(false);
      setLoading(false);
    }, 3000);
    // if (userError.errorLogin.status == true) {
    //   setLoadingProses(false);
    //   setLoading(false);
    // }

    // changeShowModal({
    //   status: stts,
    //   pesan: psn,
    //   type_error: user.dataShowModal.error,
    // });
    // user;
    // showModal();
  };

  const changeShowModal = ({status, pesan, type_error}) => {
    setModalShowUsername(status);
    setPesanModalUsername(pesan);
    setTypeErrorLogin(type_error);
  };

  const loginUser = useCallback(
    () => dispatch(login(email, password, token_firebase)),
    [email, password, token_firebase, dispatch],
    // setLoadingProses(false),
    // setLoading(false),
  );

  // const showModal = modal => {
  //   const currentModal = {
  //     showModal: true,
  //     modalType: modal,
  //   };
  //   setModalShowUsername(currentModal.showModal);
  //   console.log('show modal di sign in', currentModal.showModal);
  //   props.showModal({modal: currentModal});
  // };

  useEffect(() => {
    requestUserPermission();
    // showModal();
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

  return intro == false ? (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={[BaseStyle.safeAreaView, {backgroundColor: BaseColor.whiteColor}]}>
      <View style={{marginTop: '20%'}}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('@assets/images/logo-paradise.png')}
            style={{width: 200, height: 150, resizeMode: 'contain'}}></Image>
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
          <TextInput
            style={[BaseStyle.textInput, {marginTop: 10}]}
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

        <TouchableOpacity
          style={{}}
          onPress={() => navigation.navigate('ForgotPassword')}>
          <View
            style={{
              justifyContent: 'flex-end',
              flexDirection: 'row',

              marginVertical: 20,
              paddingRight: 20,
            }}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </View>
        </TouchableOpacity>

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
              t('Login')
            )}
          </Button>
        </View>
        <View
          style={{flexDirection: 'row', alignSelf: 'center', marginTop: 30}}>
          <Text
            style={{
              fontFamily: Fonts.type.Lato,

              textAlign: 'center',
            }}>
            Don't have account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <View>
              <Text
                style={{
                  fontFamily: Fonts.type.Lato,
                  // width: '15%',
                  borderBottomColor: BaseColor.corn70,
                  borderBottomWidth: 1,
                  textAlign: 'center',
                }}>
                Register
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={false}

          // onRequestClose={() => {
          //   Alert.alert('Modal has been closed.');
          //   setModalShowUsername(!showModalUsername);
          // }}
        >
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
                  fontFamily: Fonts.type.Lato,
                  fontSize: 14,
                  textAlign: 'center',
                }}>
                {typeErrorLogin == 'email_kosong'
                  ? 'Incorrect username'
                  : typeErrorLogin == 'password_kosong'
                  ? 'Incorrect password'
                  : pesanModalUsername == 'Wrong Password'
                  ? 'Incorrect Password'
                  : pesanModalUsername == 'User not found'
                  ? `Can't find account`
                  : 'Incorrect Username email tidak lengkap'}
              </Text>
              <Text
                style={{
                  justifyContent: 'center',
                  color: BaseColor.redColor,
                  fontFamily: Fonts.type.Lato,
                  fontSize: 14,
                  textAlign: 'center',
                }}>
                {pesanModalUsername}
              </Text>
              <TouchableOpacity
                onPress={() => setModalShowUsername(!showModalUsername)}>
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
                    Try again
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View> */}
    </SafeAreaView>
  ) : (
    <AppIntroSlider
      renderNextButton={renderNextButton} //ini ngerender doang supaya buttonnya di gaya-gayain
      renderDoneButton={renderDoneButton} //ini ngerender doang supaya buttonnya di gaya-gayain
      renderSkipButton={renderSkipButton} //ini ngerender doang supaya buttonnya di gaya-gayain
      onDone={_onDone}
      onSkip={_onSkip}
      data={slides}
      activeDotStyle={{
        width: 20,
        height: 20,
        borderRadius: 10,
        marginHorizontal: 20,
        marginBottom: 30,
        backgroundColor: BaseColor.corn50,
      }}
      dotStyle={{
        width: 20,
        height: 20,
        borderRadius: 10,
        marginHorizontal: 20,
        marginBottom: 30,
        backgroundColor: BaseColor.corn30,
      }}
      // renderPagination={_renderPagination} //ini buat pagination doang ya tanpa button next
      // ref={ref => {
      //   slider = ref;
      // }} // the ref ini digunain buat si pagination kalo dinyalain
      // scrollEnabled={true}
      renderItem={_renderItem}></AppIntroSlider>
  );
};

const mapDispatchToProps = dispatch => ({
  showModal: dataShowModal => dispatch(showModal(dataShowModal)),
});

export default connect(mapDispatchToProps, mapDispatchToProps)(SignIn);

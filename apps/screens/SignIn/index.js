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
  // Button,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import intro5 from '@assets/images/OnboardingScreen.jpg';
import AppIntroSlider from 'react-native-app-intro-slider';
import IconAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useTranslation} from 'react-i18next';

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
  const [disableUser, setdisableUser] = useState(true);
  // type Item = typeof data[0];

  // const  _keyExtractor = (item: Item) => item.title;

  const passwordChanged = useCallback(value => setPassword(value), []);
  const emailChanged = useCallback(value => setEmail(value), []);

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

  const loginklik = () => {};

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
          onPress={() => alert('screen forgot password')}>
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
            loading={loading}
            style={{marginTop: 15}}
            backgroundColor={disableUser ? BaseColor.corn30 : BaseColor.corn70}
            onPress={loginklik}>
            {loadingProses == true ? (
              <ActivityIndicator
                color={BaseColor.whiteColor}></ActivityIndicator>
            ) : (
              t('sign_in')
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
          <TouchableOpacity>
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
export default SignIn;

import {API_URL} from '@env';
import SliderIntro from 'react-native-slider-intro';
import {DefaultTheme} from '@config';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BaseStyle} from '@config';
import React, {useCallback, useEffect, useState, useRef} from 'react';
import styles from './styles';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
// import messaging from '@react-native-firebase/messaging';
import {useTheme} from '@react-navigation/native';

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
  Button,
} from 'react-native';

import intro5 from '@assets/images/OnboardingScreen.jpg';
import AppIntroSlider from 'react-native-app-intro-slider';
import IconAwesome5 from 'react-native-vector-icons/FontAwesome5';
const SignIn = props => {
  console.log('api url env', API_URL);
  const scheme = useColorScheme();
  console.log('schema', scheme);
  const {colors} = scheme === 'dark' ? DefaultTheme.dark : DefaultTheme.light; //dari config aja coba ya
  const [intro, setIntro] = useState(true);
  let slider = useRef(null);
  // type Item = typeof data[0];

  // const  _keyExtractor = (item: Item) => item.title;

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
        <Text style={styles.text}>Done</Text>
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
            fontFamily: Fonts.type.LatoItalic,
            fontSize: 20,
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
      title: 'Approval Document',

      backgroundImage: require('@assets/images/OnboardingScreen-03.jpg'),
    },
    {
      key: '2',
      title: 'Approval Document',

      backgroundImage: require('@assets/images/OnboardingScreenbeach.jpg'),
    },
  ];

  return intro == false ? (
    <View>
      <Text>ini login ya ges ya</Text>
    </View>
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

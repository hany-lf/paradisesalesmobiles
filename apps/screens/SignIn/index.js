import {API_URL} from '@env';
import SliderIntro from 'react-native-slider-intro';
import {DefaultTheme} from '@config';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BaseStyle} from '@config';
import React, {useCallback, useEffect, useState} from 'react';
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
} from 'react-native';

import intro5 from '@assets/images/OnboardingScreen.jpg';
import AppIntroSlider from 'react-native-app-intro-slider';
const SignIn = props => {
  console.log('api url env', API_URL);
  const scheme = useColorScheme();
  console.log('schema', scheme);
  const {colors} = scheme === 'dark' ? DefaultTheme.dark : DefaultTheme.light; //dari config aja coba ya
  const [intro, setIntro] = useState(true);

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
    return (
      <View style={styles.nextButton}>
        <Text style={styles.text}>Next</Text>
      </View>
    );
  };

  const renderSkipButton = () => {
    return (
      <View>
        <Text style={styles.text}>Skip</Text>
      </View>
    );
  };
  const _renderItem = ({item, dimensions}) => (
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
            style={{width: 200, height: 100, resizeMode: 'contain'}}
            source={item.image}
          />
        </View>
      )}

      <Text
        style={{
          color: '#CCC0A7',
          fontFamily: Fonts.type.LatoItalic,
          fontSize: 20,
        }}>
        {item.title}
      </Text>
    </ImageBackground>
  );

  const slides = [
    // {
    //   key: '1',
    //   title: 'Find information and update Approval',
    //   // titleStyle: styles.textTitle,
    //   // textStyle: styles.textTitle,
    //   text: 'Find information and updates on approvals developed by IFCA and get detailed information on documents to be approved.',
    //   // image: require('@assets/images/onboard1.png'),
    //   // imageStyle: styles.images_waskita,
    //   // backgroundColor: colors.primary,
    //   // width: 550,
    //   // height: 550,
    //   // bottomSpacer: styles.bottom_Spacer,
    //   backgroundImage: require('@assets/images/onboard1.png'),
    // },
    {
      key: '2',
      title: 'Welcome to Paradise Property App',

      backgroundImage: require('@assets/images/OnboardingScreen.jpg'),
    },
    {
      key: '3',
      title: 'Approval Document',
      // titleStyle: styles.textTitle,
      // textStyle: styles.textTitle,
      text: 'Document approvals have become very easy via online.',
      image: require('@assets/images/Onboarding Screen-03.jpg'),
      // imageStyle: styles.images_waskita,
      backgroundColor: colors.primary,
      // width: 200,
      // height: 200,
      // bottomSpacer: styles.bottom_Spacer,
      backgroundImage: require('@assets/images/OnboardingScreen.jpg'),
    },
    {
      key: '4',
      title: 'Approval Document',
      // titleStyle: styles.textTitle,
      // textStyle: styles.textTitle,
      text: 'Document approvals have become very easy via online.',
      image: require('@assets/images/Onboarding Screen-03.jpg'),
      // imageStyle: styles.images_waskita,
      backgroundColor: colors.primary,
      // width: 200,
      // height: 200,
      // bottomSpacer: styles.bottom_Spacer,
      backgroundImage: require('@assets/images/OnboardingScreen.jpg'),
    },
  ];

  return intro == false ? (
    <View>
      <Text>ini login ya ges ya</Text>
    </View>
  ) : (
    // <SliderIntro
    //   data={slides}
    //   renderNextButton={renderNextButton} //ini ngerender doang supaya buttonnya di gaya-gayain
    //   renderDoneButton={renderDoneButton} //ini ngerender doang supaya buttonnya di gaya-gayain
    //   renderSkipButton={renderSkipButton} //ini ngerender doang supaya buttonnya di gaya-gayain
    //   onDone={_onDone}
    //   onSkip={_onSkip}
    //   renderItem={_renderItem}
    //   // navContainerMaxSizePercent={0.3}
    // />
    <AppIntroSlider
      renderNextButton={renderNextButton} //ini ngerender doang supaya buttonnya di gaya-gayain
      renderDoneButton={renderDoneButton} //ini ngerender doang supaya buttonnya di gaya-gayain
      renderSkipButton={renderSkipButton} //ini ngerender doang supaya buttonnya di gaya-gayain
      onDone={_onDone}
      onSkip={_onSkip}
      data={slides}
      renderItem={_renderItem}></AppIntroSlider>
  );
};
export default SignIn;

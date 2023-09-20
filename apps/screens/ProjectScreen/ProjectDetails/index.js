import {Text, Header, Icon, Button} from '@components';
// import data_dummy from '../Home/data_dummy.json';
import {
  View,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BaseStyle, Fonts, BaseColor} from '@config';
import {useTranslation} from 'react-i18next';
import {ButtonMenuHome} from '../../../components';
import YoutubePlayer from 'react-native-youtube-iframe';
import React, {useState, useCallback, useRef} from 'react';

import {
  iframeModel,
  HTMLIframe,
  useHtmlIframeProps,
} from '@native-html/iframe-plugin';
import RenderHTML, {
  RenderHTMLProps,
  CustomRendererProps,
  TBlock,
  CustomBlockRenderer,
} from 'react-native-render-html';
import WebView from 'react-native-webview';

const FixedIFrameRenderer: CustomBlockRenderer = props => {
  const iframeProps = useHtmlIframeProps(props);
  if (!iframeProps) {
    return null;
  }
  const {width, height} = StyleSheet.flatten(iframeProps.style);
  return (
    <View style={{width, height}}>
      <HTMLIframe {...iframeProps} />
    </View>
  );
};

const htmlConfig: Partial<RenderHTMLProps> = {
  renderers: {
    iframe: FixedIFrameRenderer,
  },
  customHTMLElementModels: {
    iframe: iframeModel,
  },
  WebView,
};

const ProjectDetails = props => {
  console.log('props dari project', props);
  const {t} = useTranslation();
  const {navigation} = props;
  const [playing, setPlaying] = useState(false);
  const {width} = Dimensions.get('screen').width;
  const paramsDetail = props.route.params;

  const source_video = 'https://www.youtube.com/watch?v=R8JLo2EB3Wk&t=8s';

  const htmlContent = `
   
    <p>iframe</p>
    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15865.454417604291!2d106.8161527!3d-6.2156871!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f154ce1b1f43%3A0xf301b1f204447127!2sSudirman%20Suites%20Apartment!5e0!3m2!1sid!2sid!4v1695113732314!5m2!1sid!2sid" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
   
    <p>end iframe</p>
   
    
`;

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={[BaseStyle.safeAreaView, {backgroundColor: BaseColor.whiteColor}]}>
      <ScrollView>
        <ImageBackground
          source={require('@assets/images/home/slider-project/sudirmansuite.jpeg')}
          // width={100}
          // height={100}
          imageStyle={{
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
            //   borderRadius: 20,
          }}
          style={{
            resizeMode: 'contain',
            width: Dimensions.get('screen').width,

            height: 350,
          }}>
          <Header
            //   title={t('project_details')}
            title={t('')}
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
            style={{height: 80, borderRadius: 40}}
            onPressLeft={() => {
              navigation.goBack();
            }}
          />
          <View
            style={{
              position: 'absolute',
              backgroundColor: BaseColor.grey10,
              // top: 0,
              left: 0,
              right: 0,
              bottom: 15,
              height: 100,

              marginHorizontal: 30,
              marginVertical: 20,
              borderRadius: 20,
              opacity: 0.8,
              // justifyContent: 'center',
              // alignItems: 'center',
            }}>
            <View
              style={{
                marginVertical: 10,
                marginHorizontal: 25,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: Fonts.type.LatoBlack,
                  color: BaseColor.corn90,
                  marginVertical: 10,
                  fontSize: 16,
                }}>
                {/* {item.project_name} */}
                {/* Project name */}
                {paramsDetail.project_name}
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.type.LatoBold,
                  color: BaseColor.corn50,
                  marginVertical: 5,
                }}>
                {/* {item.location} */}
                {/* lokasi */}
                {paramsDetail.location}
              </Text>
            </View>
          </View>
        </ImageBackground>
        <View style={{marginHorizontal: 20, marginTop: 20}}>
          <Text
            style={{
              fontSize: 12,
              fontFamily: Fonts.type.Lato,
              color: BaseColor.corn90,
              marginVertical: 5,
            }}>
            Overview
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontFamily: Fonts.type.Lato,
              color: BaseColor.corn90,
              marginVertical: 5,
            }}>
            Lorem ipsum dolor sit amet consectetur. Pharetra lacus hendrerit
            purus urna orci lectus. Enim enim elementum nunc praesent maecenas
            vulputate nunc. Quisque ac sed lectus eu adipiscing tellus lacus
            diam.
          </Text>
          <TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 5,
                //   alignSelf: 'center',
                //   alignContent: 'center',
                //   justifyContent: 'center',
                //   alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: Fonts.type.Lato,
                  color: BaseColor.corn90,
                  marginBottom: 2,
                  marginRight: 5,
                  alignSelf: 'center',
                  // alignContent: 'center',
                  // justifyContent: 'center',
                  // alignItems: 'center',
                  borderBottomWidth: 0.5,
                  borderBottomColor: BaseColor.corn90,
                }}>
                Show more
              </Text>
              <Icon
                style={
                  {
                    // alignSelf: 'center',
                    // alignContent: 'center',
                    // justifyContent: 'center',
                    // alignItems: 'center',
                  }
                }
                // name="angle-left"

                name="chevron-right"
                size={18}
                color={BaseColor.corn70}
                enableRTL={true}
              />
            </View>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 30,
            }}>
            <ButtonMenuHome
              title={'Features'}
              nameicon={'gem'}></ButtonMenuHome>
            <ButtonMenuHome
              title={'Gallery'}
              nameicon={'images'}></ButtonMenuHome>
            <ButtonMenuHome
              title={'Floor Plan'}
              nameicon={'houzz'}></ButtonMenuHome>
            <ButtonMenuHome
              title={'Surrounding Area'}
              nameicon={'map-marker-alt'}
              onPress={() =>
                navigation.navigate('CalculatorScreen')
              }></ButtonMenuHome>
          </View>
        </View>

        {/* /// VIDEO  */}
        <View
          style={{
            marginHorizontal: 20,
            borderRadius: 15,
            marginTop: 15,
            backgroundColor: 'yellow',
            marginBottom: 0,
          }}>
          <Text
            style={{
              fontFamily: Fonts.type.LatoBold,
              fontSize: 14,
              color: BaseColor.corn70,
              marginVertical: 15,
            }}>
            Video
          </Text>
          <YoutubePlayer
            height={200}
            play={playing}
            videoId="R8JLo2EB3Wk"
            onChangeState={onStateChange}
            style={{borderRadius: 15}}
          />
          {/* <Button
            onPress={() => togglePlaying}
            style={{backgroundColor: 'red'}}>
            <Text>{playing ? 'Pause' : 'Play'}</Text>
          </Button> */}
          {/* <Button title={playing ? 'pause' : 'play'} onPress={togglePlaying} /> */}
        </View>

        {/* /// LOCATION  */}
        <View>
          <Text>mau lokasi</Text>
          {/* <WebView
            originWhitelist={['*']}
            source={{html: '<h1>Hello    world</h1>'}}
          /> */}
          {/* <RenderHTML
            // customHTMLElementModels={HTMLElementModel}
            contentWidth={width}
            source={{
              html: '../tes.html',
            }}></RenderHTML> */}
          {/* <RenderHTML
            source={{
              html: '<iframe width="100%" height="50%" src="https://www.youtube.com/embed/cqyziA30whE" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>',
            }}
            style={{marginTop: 20}}
          /> */}
          <RenderHTML
            {...htmlConfig}
            source={{html: htmlContent}}
            contentWidth={Dimensions.get('window').width}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default ProjectDetails;

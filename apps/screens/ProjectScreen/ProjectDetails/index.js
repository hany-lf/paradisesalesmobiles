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
  Modal,
} from 'react-native';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BaseStyle, Fonts, BaseColor} from '@config';
import {useTranslation} from 'react-i18next';
import {ButtonMenuHome} from '../../../components';
import YoutubePlayer from 'react-native-youtube-iframe';
import React, {useState, useCallback, useRef} from 'react';

import IframeRenderer, {iframeModel} from '@native-html/iframe-plugin';
import RenderHTML from 'react-native-render-html';
import WebView from 'react-native-webview';

import Features from './Modals/Features';
import Gallery from './Modals/Gallery';
import {data_gallery} from './data_gallery.json';
import {data_floorplan} from './data_floorplan.json';
import Floorplan from './Modals/Floorplan';

const ProjectDetails = props => {
  console.log('props dari project', props);
  const {t} = useTranslation();
  const {navigation} = props;
  const [playing, setPlaying] = useState(false);
  const {width} = Dimensions.get('screen').width;
  const paramsDetail = props.route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [visibleFeatures, setVisibleFeatures] = useState(false);
  const [visibleGallery, setVisibleGallery] = useState(false);
  const [visibleFloorplan, setVisibleFloorplan] = useState(false);
  const source_video = 'https://www.youtube.com/watch?v=R8JLo2EB3Wk&t=8s';
  // const gallery = data_gallery;
  const [gallery, setGallery] = useState(data_gallery);
  const [floorplan, setFloorplan] = useState(data_floorplan);
  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  const renderers = {
    iframe: IframeRenderer,
  };

  const customHTMLElementModels = {
    iframe: iframeModel,
  };

  const clik = () => {
    console.log('cek vis', visibleFeatures);
    setVisibleFeatures(true);
  };

  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={[BaseStyle.safeAreaView, {backgroundColor: BaseColor.whiteColor}]}>
      <ScrollView>
        <ImageBackground
          source={{uri: paramsDetail.picture_url}}
          // source={require('@assets/images/home/slider-project/sudirmansuite.jpeg')}
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
                {paramsDetail.descs}
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
          <TouchableOpacity onPress={() => setModalVisible(true)}>
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
              onPress={() => clik()}
              title={'Features'}
              nameicon={'gem'}></ButtonMenuHome>
            <ButtonMenuHome
              onPress={() => setVisibleGallery(true)}
              title={'Gallery'}
              nameicon={'images'}></ButtonMenuHome>
            <ButtonMenuHome
              onPress={() => setVisibleFloorplan(true)}
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
            // borderRadius: 15,
            marginTop: 15,
            // backgroundColor: 'yellow',
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
          <View
            style={{
              marginHorizontal: 20,
              // borderRadius: 15,
              marginTop: 15,
              // backgroundColor: 'yellow',
              marginBottom: 0,
            }}>
            <Text
              style={{
                fontFamily: Fonts.type.LatoBold,
                fontSize: 14,
                color: BaseColor.corn70,
                marginVertical: 15,
              }}>
              Location
            </Text>

            <RenderHTML
              renderers={renderers}
              WebView={WebView}
              contentWidth={width}
              customHTMLElementModels={customHTMLElementModels}
              defaultWebViewProps={
                {
                  /* Any prop you want to pass to all WebViews */
                }
              }
              renderersProps={{
                iframe: {
                  scalesPageToFit: true,
                  webViewProps: {
                    /* Any prop you want to pass to iframe WebViews */
                  },
                },
              }}
              source={{
                html:
                  // `<!DOCTYPE html>
                  //             <html>
                  //             <body>

                  //             <h1>The iframe element</h1>

                  //             <iframe width="100%" height="315"
                  //                 src="https://stackoverflow.com/questions/64057689/iframe-not-showing-in-react-native-webview">
                  //             </iframe>

                  //             </body>
                  //             </html>`,
                  `<!DOCTYPE html>
                            <html>
                            <body>
                            
                            <h1>The iframe element</h1>
                            
                         <div class="mapouter"><div class="gmap_canvas"><iframe class="gmap_iframe" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=University of Oxford&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe><a href="https://connectionsgame.org/">Connections NYT</a></div><style>.mapouter{position:relative;text-align:right;width:600px;height:400px;}.gmap_canvas {overflow:hidden;background:none!important;width:600px;height:400px;}.gmap_iframe {width:600px!important;height:400px!important;}</style></div>
                            </body>
                            </html>`,
                // ' <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15282225.79979123!2d73.7250245393691!3d20.750301298393563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1587818542745!5m2!1sen!2sin" width="600" height="450" frameborder="0" style={{border:0}} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>',
              }}></RenderHTML>
          </View>
        </View>
        {/* // --- modal project detail overview */}
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            <View
              style={[
                styles.centeredView,
                {
                  backgroundColor: BaseColor.whiteColor,
                  borderTopRightRadius: 25,
                  borderTopLeftRadius: 25,
                },
              ]}>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginHorizontal: 20,
                    marginVertical: 20,
                  }}>
                  <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}>
                    <View>
                      <Icon
                        name={'arrow-left'}
                        size={18}
                        color={BaseColor.corn90}></Icon>
                    </View>
                  </TouchableOpacity>

                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: Fonts.type.LatoBold,
                        color: BaseColor.corn70,
                        fontSize: 16,
                      }}>
                      Overview
                    </Text>
                  </View>
                </View>
                {/* --- border  */}
                <View
                  style={{
                    borderWidth: 0.3,
                    borderColor: BaseColor.corn70,
                    borderStyle: 'solid',
                  }}></View>
              </View>
              {/* <View style={styles.modalView}> */}
              <View style={{marginHorizontal: 30, marginVertical: 20}}>
                <Text
                  style={{textAlign: 'justify', fontFamily: Fonts.type.Lato}}>
                  Lorem ipsum dolor sit amet consectetur. Nibh scelerisque
                  tristique facilisi lectus ullamcorper. Commodo sed egestas ut
                  ullamcorper vulputate enim dui. Nec tristique venenatis
                  euismod ut volutpat sapien consectetur eu. Ornare pharetra
                  netus pellentesque sit at aliquam scelerisque. Non aliquet
                  libero bibendum sagittis est sapien tempor. Viverra nullam
                  mollis nulla lacus scelerisque. Est magna massa libero orci
                  egestas. Nibh in et egestas odio platea sit. Nulla adipiscing
                  aliquet ac hac aliquam nunc neque. Sed euismod leo adipiscing
                  donec metus pretium fermentum in. Euismod turpis ullamcorper
                  egestas lorem. Ut tellus posuere lacus pharetra orci et ac.
                  Curabitur massa volutpat ac volutpat porttitor. Amet venenatis
                  neque tempus dui ultrices viverra. Orci sit adipiscing congue
                  lectus eu consectetur ornare. Dignissim ullamcorper lacinia
                  eget porttitor volutpat dui faucibus. Dictum quam convallis in
                  suspendisse diam volutpat diam. Rutrum tempus suspendisse nunc
                  aliquam scelerisque mauris integer sit arcu. Egestas sagittis
                  velit nunc dolor praesent. Diam sem maecenas eleifend ut.
                  Tellus pretium vestibulum nisi ac urna neque viverra ac.
                  Viverra fames scelerisque laoreet nisi ut viverra. Nunc nunc
                  ipsum nisl mi facilisis mattis ac. Mi sed est ut non lobortis.
                  Dignissim elit molestie vulputate pellentesque phasellus diam
                  turpis leo.
                </Text>
                {/* <Text style={styles.modalText}>Hello World!</Text>
                <Button
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </Button> */}
              </View>
            </View>
          </Modal>
        </View>
        {/* // modal features */}
        <Features
          onRequestClose={() => {
            setVisibleFeatures(false);
          }}
          visible={visibleFeatures}
          icon={
            <TouchableOpacity onPress={() => setVisibleFeatures(false)}>
              <Icon
                name={'arrow-left'}
                size={18}
                color={BaseColor.corn90}></Icon>
            </TouchableOpacity>
          }
          datas={paramsDetail}></Features>
        {/* // modal gallery  */}
        <Gallery
          onRequestClose={() => {
            setVisibleGallery(false);
          }}
          visible={visibleGallery}
          icon={
            <TouchableOpacity onPress={() => setVisibleGallery(false)}>
              <Icon
                name={'arrow-left'}
                size={18}
                color={BaseColor.corn90}></Icon>
            </TouchableOpacity>
          }
          datas={gallery}></Gallery>
        <Floorplan
          onRequestClose={() => {
            setVisibleFloorplan(false);
          }}
          visible={visibleFloorplan}
          icon={
            <TouchableOpacity onPress={() => setVisibleFloorplan(false)}>
              <Icon
                name={'arrow-left'}
                size={18}
                color={BaseColor.corn90}></Icon>
            </TouchableOpacity>
          }
          datas={floorplan}></Floorplan>
      </ScrollView>
    </SafeAreaView>
  );
};
export default ProjectDetails;

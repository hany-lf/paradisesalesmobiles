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
  useWindowDimensions,
  Linking,
} from 'react-native';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BaseStyle, Fonts, BaseColor} from '@config';
import {useTranslation} from 'react-i18next';
import {ButtonMenuHome} from '../../../components';
import YoutubePlayer from 'react-native-youtube-iframe';
import React, {useState, useCallback, useRef, useEffect} from 'react';

import IframeRenderer, {iframeModel} from '@native-html/iframe-plugin';
import RenderHTML from 'react-native-render-html';
import {WebView} from 'react-native-webview';

import Features from './Modals/Features';
import Gallery from './Modals/Gallery';
import {data_gallery} from './data_gallery.json';
import {data_floorplan} from './data_floorplan.json';
import Floorplan from './Modals/Floorplan';
import Surrounding from './Modals/Surrounding';
import axios from 'axios';
import {API_URL} from '@env';
import {useSelector, useDispatch, connect} from 'react-redux';
import getUser from '../../../selectors/UserSelectors';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
const ProjectDetails = props => {
  console.log('props dari project', props);
  const {t} = useTranslation();
  const {navigation} = props;
  const [playing, setPlaying] = useState(false);

  const paramsDetail = props.route.params;
  const entity_cd = paramsDetail.entity_cd;
  const project_no = paramsDetail.project_no;
  const [modalVisible, setModalVisible] = useState(false);
  const [visibleFeatures, setVisibleFeatures] = useState(false);
  const [visibleGallery, setVisibleGallery] = useState(false);
  const [visibleFloorplan, setVisibleFloorplan] = useState(false);
  const [visibleSurrounding, setVisibleSurrounding] = useState(false);
  const source_video = 'https://www.youtube.com/watch?v=R8JLo2EB3Wk&t=8s';
  // const gallery = data_gallery;
  const [gallery, setGallery] = useState(data_gallery);
  const [floorplan, setFloorplan] = useState(data_floorplan);
  const user = useSelector(state => getUser(state));

  const [dataProjectDetail, setDataProjectDetail] = useState([]);
  const [galleryProject, setGalleryProject] = useState([]);
  const [overviewProject, setOverviewProject] = useState([]);
  const [featureProject, setFeatureProject] = useState([]);
  const [planProject, setPlanProject] = useState([]);
  const [surroundingProject, setSurroundingProject] = useState([]);
  const [downloadProject, setDownloadProject] = useState([]);
  const [projectAddress, setProjectAddress] = useState([]);
  const {width} = useWindowDimensions().width;
  const [itemsOverview, setItemsOverview] = useState([]);
  const [webViewKey, setwebViewKey] = useState(1);
  const [regionChange, setRegion] = useState('');
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

  useEffect(() => {
    getProjectDetails();
  }, []);

  const getProjectDetails = () => {
    try {
      const config = {
        method: 'get',
        // url: 'http://dev.ifca.co.id:8080/apiciputra/api/approval/groupMenu?approval_user=MGR',
        url: API_URL + '/project/project-details',
        headers: {
          'content-type': 'application/json',
          // 'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Bearer ${user.Token}`,
        },
        params: {entity_cd: entity_cd, project_no: project_no},
      };
      console.log('formdaata get project', config);
      axios(config)
        .then(result => {
          const pasing = result.data.Data;
          console.log('data di project', pasing);
          setDataProjectDetail(pasing);
          setGalleryProject(pasing.gallery);
          setOverviewProject(pasing.overview);
          setFeatureProject(pasing.feature);
          setPlanProject(pasing.plan);
          setSurroundingProject(pasing.surrounding);
          setDownloadProject(pasing.download);
          setProjectAddress(pasing.project);
        })
        .catch(error =>
          console.log('error getdata project error', error.response),
        );
    } catch (error) {
      console.log('ini konsol eror', error);
    }
  };

  const showModalOverview = item => {
    setModalVisible(true);
    setItemsOverview(item);
  };

  const onRegionChange = region => {
    setRegion(region);
  };

  const htmlContent = `
    <html>
        <body>
            <div class="section">
                <div class="wrapper">
                    <h1>The TITLE</h1>
                    <div class="post-wrapper">
                        <div class="post-rich-text w-richtext">
                            <p>Check out this video to see it in action.</p>
                            <iframe allowfullscreen="true" frameborder="0" scrolling="no" src="https://www.youtube.com/embed/OfLV5h-1rRI?si=JJiTuK-IPjJWeG9o" width="300" height="200"></iframe>
                            <p>And there’s even more to come... </p>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    </html>`;

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
                {paramsDetail.caption_address}
              </Text>
            </View>
          </View>
        </ImageBackground>

        {/* -- overview  */}
        <View style={{marginHorizontal: 20, marginTop: 20}}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: Fonts.type.LatoBold,
              color: BaseColor.corn70,
              marginVertical: 5,
            }}>
            Overview
          </Text>
          {overviewProject.length != 0 ? (
            overviewProject.map((item, index) => (
              // <View>

              // <RenderHTML
              //   contentWidth={width}
              //   source={{
              //     html: item.overview_info,
              //   }}
              // />

              // </View>
              <View key={index}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: Fonts.type.Lato,
                    color: BaseColor.corn90,
                    marginVertical: 5,
                  }}>
                  {item.overview_info
                    .replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, '')
                    .replace(/(&nbsp;)/g, ' ')
                    .replace(/(&ndash;)/g, '-')
                    .replace(/(&amp;)/g, `&`)}
                </Text>
                <TouchableOpacity onPress={() => showModalOverview(item)}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginVertical: 5,

                      alignItems: 'center',
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
                      size={14}
                      color={BaseColor.corn70}
                      enableRTL={true}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text
              style={{
                fontSize: 12,
                fontFamily: Fonts.type.Lato,
                color: BaseColor.corn70,
                marginVertical: 5,
              }}>
              No data overview
            </Text>
          )}
        </View>

        {/* --- grid features dll  */}
        <View style={{marginHorizontal: 20, marginTop: 20}}>
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
              onPress={() => setVisibleSurrounding(true)}
              title={'Surrounding'}
              nameicon={'map-marker-alt'}
              // onPress={() =>
              //   navigation.navigate('CalculatorScreen')
              // }
            ></ButtonMenuHome>
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
            Contact
          </Text>

          {projectAddress.map((item, index) => (
            <View>
              <View
                style={{
                  backgroundColor: BaseColor.corn30,
                  borderRadius: 15,
                  padding: 10,
                  marginBottom: 10,
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.type.Lato,
                    color: BaseColor.corn70,
                    fontSize: 12,
                    textAlign: 'center',
                  }}>
                  Address: {item.coordinat_address}
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts.type.Lato,
                    color: BaseColor.corn70,
                    fontSize: 12,
                    textAlign: 'center',
                  }}>
                  Phone: {item.wa_no}
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts.type.Lato,
                    color: BaseColor.corn70,
                    fontSize: 12,
                    textAlign: 'center',
                  }}>
                  Email: {item.email_add}
                </Text>
              </View>

              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: Fonts.type.LatoBold,
                  color: BaseColor.corn70,
                  fontSize: 12,
                }}>
                ARE YOU INTERESTED? IT'S TIME TO DISCOVER YOUR HOME
              </Text>

              <View style={{alignItems: 'center', marginTop: 8}}>
                <Button
                  style={{
                    backgroundColor: BaseColor.corn10,
                    width: '50%',
                    height: 40,
                  }}
                  onPress={() => Linking.openURL(item.coordinat_project)}>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontFamily: Fonts.type.LatoBold,
                        color: BaseColor.corn70,
                        fontSize: 12,
                        paddingRight: 5,
                      }}>
                      Find Location
                    </Text>
                    <Icon
                      name={'location-arrow'}
                      color={BaseColor.corn70}
                      size={14}></Icon>
                  </View>
                </Button>
              </View>
            </View>
          ))}
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

          {overviewProject.length != 0 ? (
            overviewProject.map((item, index) => (
              <YoutubePlayer
                key={index}
                height={200}
                play={playing}
                videoId={item.youtube_link}
                // videoId="OfLV5h-1rRI"
                onChangeState={onStateChange}
                style={{borderRadius: 15}}
                useLocalHTML={true}
              />
            ))
          ) : (
            <Text>No Url Id Youtube</Text>
          )}

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
            {/* <Text
              style={{
                fontFamily: Fonts.type.LatoBold,
                fontSize: 14,
                color: BaseColor.corn70,
                marginVertical: 15,
              }}>
              Location
            </Text> */}
            {/* <View>
              <MapView
                //             {markers.map((marker, index) => (
                //   <Marker
                //     key={index}
                //     coordinate={marker.latlng}
                //     title={marker.title}
                //     description={marker.description}
                //   />
                // ))}
                // region={regionChange}
                // onRegionChange={onRegionChange}
                style={{width: '100%', height: 300}}
                initialRegion={{
                  latitude: -6.2092,
                  longitude: 106.85138,
                  latitudeDelta: 0.04,
                  longitudeDelta: 0.05,
                }}>
                <Marker
                  coordinate={{latitude: -6.2092, longitude: 106.85138}}
                  image={{uri: 'custom_pin'}}
                  style={{width: 50, height: 50}}
                />
              </MapView>
            </View> */}

            {/* <WebView
              javaScriptEnabled={true}
              domStorageEnabled={true}
              map
              style={{flex: 1}}
              allowsPreserveOrigin
              webPolicies={{
                forms: 'https://*.other-domain.com',
              }}
              source={{uri: 'https://google.com/'}}
            /> */}
            {/* <RenderHTML
              javaScriptEnabled={true}
              domS
              renderers={renderers}
              WebView={WebView}
              contentWidth={Dimensions.get('window').width - 35}
              customHTMLElementModels={customHTMLElementModels}
              source={{
                html: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15865.742481636988!2d106.85165925!3d-6.206128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f4711cac0e99%3A0x47c98448b038a7d8!2sManggarai!5e0!3m2!1sid!2sid!4v1700646090231!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
              }}></RenderHTML> */}
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
              {itemsOverview.length != 0 ? (
                <View style={{marginHorizontal: 30, marginVertical: 20}}>
                  <Text
                    numberOfLines={0}
                    style={{
                      textAlign: 'justify',
                      fontFamily: Fonts.type.Lato,
                    }}>
                    {itemsOverview.overview_info
                      .replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, '')
                      .replace(/(&nbsp;)/g, ' ')
                      .replace(/(&ndash;)/g, '-')
                      .replace(/(&amp;)/g, `&`)}
                  </Text>
                  {/* <Text style={styles.modalText}>Hello World!</Text>
                <Button
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </Button> */}
                </View>
              ) : (
                <Text>No data overview</Text>
              )}
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
          datas={featureProject}></Features>
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
          datas={galleryProject}></Gallery>
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
          datas={planProject}></Floorplan>
        <Surrounding
          onRequestClose={() => {
            setVisibleSurrounding(false);
          }}
          visible={visibleSurrounding}
          icon={
            <TouchableOpacity onPress={() => setVisibleSurrounding(false)}>
              <Icon
                name={'arrow-left'}
                size={18}
                color={BaseColor.corn90}></Icon>
            </TouchableOpacity>
          }
          datas={surroundingProject}></Surrounding>
      </ScrollView>
    </SafeAreaView>
  );
};
export default ProjectDetails;

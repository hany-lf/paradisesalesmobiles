import {Text, Button, Icon} from '@components';
import {
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image,
  Dimensions,
  useWindowDimensions,
  Platform,
  StatusBar,
  Alert,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import {BaseStyle, Fonts, BaseColor} from '@config';
import moment from 'moment';
import RenderHtml, {
  defaultSystemFonts,
  HTMLElementModel,
  HTMLContentModel,
} from 'react-native-render-html';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import ReactNativeBlobUtil from 'react-native-blob-util';
import ImageViewing from 'react-native-image-viewing';

import get from 'lodash/get';

const customHTMLElementModels = {
  a: HTMLElementModel.fromCustomModel({
    tagName: 'a',
    mixedUAStyles: {
      fontFamily: Fonts.type.Lato,
      color: 'blue',
    },
    contentModel: HTMLContentModel.block,
  }),
  p: HTMLElementModel.fromCustomModel({
    tagName: 'p',
    mixedUAStyles: {
      fontFamily: Fonts.type.Lato,
    },
    contentModel: HTMLContentModel.block,
  }),
};

const PromoModal = props => {
  const {t} = useTranslation();
  const {onPress, datas, visibleMod, icon, ...attrs} = props;
  const systemFonts = [  ...defaultSystemFonts,
    'Lato-Regular',
    'Lato-Black',
    'Lato-Bold',
    'Lato-Italic'];
  const {width} = useWindowDimensions().width;
  console.log('attrs ?', attrs);
  console.log('datas nya', datas);
  console.log('visiblemodal', visibleMod);

  const [dataImage, setDataImage] = useState([]);
  const [showImage, setShowImage] = useState(false);
  const insets = useSafeAreaInsets();

  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setImageIndex] = useState(0);

  const zoomImage = image => {
    console.log('array image zoom', image);
    setImageIndex(0);
    const data = [{uri: image}];

    console.log('arr url', data);

    setDataImage(data);
    setIsVisible(true);
  };

  const ImageHeader = ({title, onRequestClose}) => {
    const HIT_SLOP = {top: 16, left: 16, bottom: 16, right: 16};
    return (
      <SafeAreaView style={{backgroundColor: '#00000077'}}>
        <View
          style={{
            flex: 1,
            padding: 8,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{width: 45, height: 45}} />
          {title && (
            <Text
              style={{
                maxWidth: 240,
                marginTop: 12,
                flex: 1,
                flexWrap: 'wrap',
                textAlign: 'center',
                fontSize: 17,
                lineHeight: 17,
                color: '#FFF',
              }}>
              {title}
            </Text>
          )}
          <TouchableOpacity
            style={{
              width: 45,
              height: 45,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={onRequestClose}
            hitSlop={HIT_SLOP}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  const onRequestClose = () => setIsVisible(false);

  const onLongPress = image => {
    // Alert.alert('url image', image.uri);
    Alert.alert(
      'Do you want to save the image?',
      'This image will be saved on your phone.',
      [
        {text: 'Yes', onPress: () => _saveImages(image.uri)},
        {text: 'Cancel', onPress: () => onRequestClose()},
      ],
      {cancelable: false},
    );
  };

  const _saveImages = uri => {
    console.log('urii??', uri);
    let dirs = ReactNativeBlobUtil.fs.dirs;
    ReactNativeBlobUtil.config({
      // add this option that makes response data to be stored as a file,
      // this is much more performant.
      fileCache: true,
      addAndroidDownloads: {
        path: dirs.DownloadDir + '/' + 'Promo',
        // path: dirs.DownloadDir + '/' + item.doc_no + '.' + extension, //ini pake extensi yang sama kayak url
        useDownloadManager: true,
        // Show notification when response data transmitted
        notification: true,
        // Title of download notification
        title: 'Image Gallery Apps Paradise Mobiles',
        // File description (not notification description)
        description: 'downloading content...',
        // mime: 'application/pdf',
        // Make the file scannable  by media scanner
        mediaScannable: true,
      },
    })
      .fetch('GET', uri, {
        //some headers ..
      })
      .then(res => {
        // the temp file path
        console.log('The file saved to ', res.path());
        imageView = (
          <Image
            source={{
              uri:
                Platform.OS === 'android'
                  ? 'file://' + res.path()
                  : '' + res.path(),
            }}
          />
        );
      });
  };

  return datas == null ? null : (
    <View
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      }}>
      <Modal {...attrs} animationType="slide" transparent={true}>
        <View
          style={[
            styles.centeredView,
            {
              backgroundColor: BaseColor.whiteColor,
              borderTopRightRadius: 25,
              borderTopLeftRadius: 25,
              paddingBottom: 40,
            },
          ]}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 20,
                marginVertical: 20,
              }}>
              {icon}

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
                  {t('promo_detail')}
                </Text>
              </View>
            </View>
            {/* --- border  */}
            {/* <View
              style={{
                borderWidth: 0.3,
                borderColor: BaseColor.corn70,
                borderStyle: 'solid',
              }}></View> */}
            <ScrollView>
              <View style={{marginHorizontal: 30, marginVertical: 20}}>
                <View
                // style={{width: 200, height: 100}}
                >
                  <View style={{marginBottom: 20}}>
                    <Text
                      style={{
                        color: BaseColor.corn70,
                        fontFamily: Fonts.type.LatoBold,
                        fontSize: 16,
                      }}>
                      {datas.promo_title}
                    </Text>
                    {/* <Text
                      style={{
                        color: BaseColor.corn70,
                        fontFamily: Fonts.type.Lato,
                        fontSize: 11,
                        marginVertical: 5,
                      }}>
                      Created date:
                      {moment(datas.date_created).format('DD MMM YYYY - hh:mm')}
                    </Text> */}
                  </View>
                  <TouchableOpacity
                    onPress={() => zoomImage(datas.url_image)}
                    style={{
                      alignItems: 'center',
                      width: 300,
                      height: 300,

                      alignSelf: 'center',
                    }}>
                    <Image
                      source={{uri: datas.url_image}}
                      // source={require('@assets/images/home/slider-project/sudirmansuite.jpeg')}
                      style={{
                        // width: '100%',
                        // // width: 300,
                        // height: 200,
                        // width: '100%',
                        width: 300,
                        height: 300,
                        // height: Dimensions.get('window').height / 3,
                        // marginTop: 10,
                        // paddingTop: 10,
                        // ...StyleSheet.absoluteFillObject,
                        resizeMode: 'contain',
                        // resizeMode: 'cover',

                        borderRadius: 25,
                      }}></Image>
                  </TouchableOpacity>
                </View>
                <View style={{marginVertical: 20}}>
                  <RenderHtml
                    contentWidth={width}
                    source={{html: datas.promo_descs}}
                    systemFonts={systemFonts}
                    defaultTextProps={{allowFontScaling: false}}
                    enableExperimentalMarginCollapsing={true}
                    customHTMLElementModels={customHTMLElementModels}
                    tagsStyles={{
                      strong: {
                        color: BaseColor.corn70,
                        // fontSize: 12,
                        // fontFamily: Fonts.type.LatoBold,
                        fontWeight: '600',
                        ...(Platform.OS === 'android' && {
                          fontWeight: '600',
                          fontFamily: Fonts.type.LatoBlack,
                        }),
                      },
                      b: {
                        color: BaseColor.corn70,
                        // fontSize: 12,
                        // fontFamily: Fonts.type.LatoBold,
                        fontWeight: '600',
                        ...(Platform.OS === 'android' && {
                          fontWeight: '600',
                          fontFamily: Fonts.type.LatoBlack,
                        }),
                      },

                      p: {
                        color: BaseColor.corn70,
                        // fontSize: 12,
                        fontFamily: Fonts.type.Lato,
                        // fontFamily: Fonts.type.ComicSansMS,
                        textAlign: 'justify',
                      },
                      span: {
                        color: BaseColor.corn70,
                        // fontSize: 12,
                        fontFamily: Fonts.type.Lato,
                        // fontFamily: Fonts.type.ComicSansMS,
                        textAlign: 'justify',
                      },
                      li: {
                        // color: isDarkMode ? 'blue' : 'red',
                        color: BaseColor.corn70,
                        // fontSize: 12,
                        fontFamily: Fonts.type.Lato,
                      },
                    }}
                  />
                  {/* <Text
                    style={{textAlign: 'justify', fontFamily: Fonts.type.Lato}}>
                    {datas.promo_descs
                      .replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, '')
                      .replace(/(&nbsp;)/g, ' ')
                      .replace(/(&ndash;)/g, '-')
                      .replace(/(&amp;)/g, `&`)}
                  </Text> */}
                </View>
                <Text
                  style={{
                    fontFamily: Fonts.type.Lato,
                    fontSize: 12,
                    color: BaseColor.corn70,
                  }}>
                  Syarat dan Ketentuan
                </Text>

                <View style={{marginVertical: 20}}>
                  <RenderHtml
                    contentWidth={width}
                    source={{html: datas.tnc_descs}}
                    systemFonts={systemFonts}
                    defaultTextProps={{allowFontScaling: false}}
                    enableExperimentalMarginCollapsing={true}
                    customHTMLElementModels={customHTMLElementModels}
                    tagsStyles={{
                      strong: {
                        color: BaseColor.corn70,
                        // fontSize: 12,
                        // fontFamily: Fonts.type.LatoBold,
                        fontWeight: '600',
                        ...(Platform.OS === 'android' && {
                          fontWeight: '600',
                          fontFamily: Fonts.type.LatoBlack,
                        }),
                      },
                      b: {
                        color: BaseColor.corn70,
                        // fontSize: 12,
                        // fontFamily: Fonts.type.LatoBold,
                        fontWeight: '600',
                        ...(Platform.OS === 'android' && {
                          fontWeight: '600',
                          fontFamily: Fonts.type.LatoBlack,
                        }),
                      },

                      p: {
                        color: BaseColor.corn70,
                        // fontSize: 12,
                        fontFamily: Fonts.type.Lato,
                        // fontFamily: Fonts.type.ComicSansMS,
                        textAlign: 'justify',
                      },
                      span: {
                        color: BaseColor.corn70,
                        // fontSize: 12,
                        fontFamily: Fonts.type.Lato,
                        // fontFamily: Fonts.type.ComicSansMS,
                        textAlign: 'justify',
                      },
                      li: {
                        // color: isDarkMode ? 'blue' : 'red',
                        color: BaseColor.corn70,
                        // fontSize: 12,
                        fontFamily: Fonts.type.Lato,
                      },
                    }}
                  />
                </View>
              </View>
              <ImageViewing
                images={dataImage}
                imageIndex={currentImageIndex}
                presentationStyle="overFullScreen"
                visible={isVisible}
                onRequestClose={onRequestClose}
                onLongPress={onLongPress}
                HeaderComponent={
                  dataImage === datas
                    ? ({imageIndex}) => {
                        const title = get(dataImage, `${imageIndex}.title`);
                        return (
                          <ImageHeader
                            title={title}
                            onRequestClose={onRequestClose}
                          />
                        );
                      }
                    : undefined
                }
                FooterComponent={({imageIndex}) => (
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: '#000',
                      ...Platform.select({
                        android: {
                          paddingTop: StatusBar.currentHeight,
                          marginLeft: 40,
                          bottom: 40,
                        },
                        ios: {marginLeft: 40, bottom: 40},
                      }),
                    }}>
                    <Text
                      style={{
                        fontFamily: Fonts.type.Lato,
                        color: BaseColor.corn30,
                      }}>{`${imageIndex + 1} / ${dataImage.length}`}</Text>
                  </View>
                  // <ImageFooter
                  //   imageIndex={imageIndex}
                  //   imagesCount={dataImage.length}
                  // />
                )}
              />
            </ScrollView>
          </View>
        </View>

        {/* <Button onPress={() => close()} style={{backgroundColor: 'red'}}>
        <Text>close</Text>
      </Button> */}
      </Modal>
    </View>
  );
};

export default PromoModal;

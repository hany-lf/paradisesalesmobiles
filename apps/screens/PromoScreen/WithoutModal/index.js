import {Text, Button, Icon, Header} from '@components';
import {
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image,
  ActivityIndicator,
  Dimensions,
  useWindowDimensions,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {BaseStyle, Fonts, BaseColor} from '@config';
import {useTranslation} from 'react-i18next';
import moment from 'moment';

import ReactNativeBlobUtil from 'react-native-blob-util';
import RenderHtml, {
  defaultSystemFonts,
  HTMLElementModel,
  HTMLContentModel,
} from 'react-native-render-html';
import ImageViewing from 'react-native-image-viewing';
import get from 'lodash/get';

import {default as HTML} from 'react-native-render-html';
// import {cssStringToRNStyle} from 'react-native-render-html/src/HTMLStyles';

function isFontAttribute(attrName) {
  return attrName === 'color';
}
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
const PromoWithoutModal = props => {
  const {navigation} = props;
  // const systemFonts = [
  //   ...defaultSystemFonts,

  //   'Arial Black',
  //   'Comic-Sans MS',
  //   'Courier New',
  //   'Lato-Bold',
  //   'Lato-Regular',
  //   'Lato-Black',
  //   'Lato-Italic',
  // ];
  const systemFonts = [  ...defaultSystemFonts,
    'Lato-Regular',
    'Lato-Black',
    'Lato-Bold',
    'Lato-Italic'];
    const {width: contentWidth} = useWindowDimensions();

  const {t} = useTranslation();
  const [detailPromo, setDetailPromo] = useState(props.route.params.datas);

  const [dataImage, setDataImage] = useState([]);
  const [showImage, setShowImage] = useState(false);
  const insets = useSafeAreaInsets();

  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setImageIndex] = useState(0);

  console.log('detil prmo', detailPromo);

  const zoomImage = image => {
    console.log('array image zoom', image);
    setImageIndex(0);
    const data = [{uri: image}];

    console.log('arr url', data);

    setDataImage(data);
    setIsVisible(true);
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
        title: 'Image Promo Apps Paradise Mobiles',
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

  // const customHTMLElementModels = {
  //   font: HTMLElementModel.fromCustomModel({
  //     tagName: 'font',
  //     contentModel: HTMLContentModel.block,
  //   }),
  // };
  // const renderers = {
  //   font: {
  //     wrapper: 'Text',
  //     renderer: function (
  //       htmlAttribs,
  //       children,
  //       convertedCSSStyles,
  //       passedProps,
  //     ) {
  //       const {key} = passedProps;
  //       const stylesFromFontAttributes = cssStringToRNStyle(
  //         extractInlineStyleFromFontAttributes(htmlAttribs),
  //         'text',
  //         passedProps,
  //       );
  //       return (
  //         <Text
  //           style={[convertedCSSStyles, stylesFromFontAttributes]}
  //           key={key}>
  //           {children}
  //         </Text>
  //       );
  //     },
  //   },
  // };

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

  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={[BaseStyle.safeAreaView, {backgroundColor: BaseColor.whiteColor}]}>
      <Header
        title={t('promo_detail')}
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
      {detailPromo == null ? (
        <View>
          <Text>No Data Promo Detail</Text>
        </View>
      ) : (
        <ScrollView>
          <View style={{marginHorizontal: 30, marginVertical: 20}}>
            <View
            // style={{width: 200, height: 100}}
            >
              <View style={{marginBottom: 25}}>
                <Text
                  style={{
                    color: BaseColor.corn70,
                    fontFamily: Fonts.type.LatoBold,
                    fontSize: 16,
                  }}>
                  {detailPromo.promo_title}
                </Text>
                {/* <Text
                  style={{
                    color: BaseColor.corn70,
                    fontFamily: Fonts.type.Lato,
                    fontSize: 11,
                    marginVertical: 5,
                  }}>
                  Created date:
                  {moment(detailPromo.date_created).format(
                    'DD MMM YYYY - hh:mm',
                  )}
                </Text> */}
              </View>
              <TouchableOpacity
                onPress={() => zoomImage(detailPromo.url_image)}
                style={{alignItems: 'center'}}>
                <Image
                  source={{uri: detailPromo.url_image}}
                  // source={require('@assets/images/home/slider-project/sudirmansuite.jpeg')}
                  style={{
                    width: 300,
                    // height: Dimensions.get('window').height / 2.5,
                    height: 300,
                    // marginTop: 10,
                    // paddingTop: 10,
                    // ...StyleSheet.absoluteFillObject,
                    resizeMode: 'contain',
                    borderRadius: 25,
                  }}></Image>
              </TouchableOpacity>
            </View>
            <View style={{marginVertical: 20}}>
              {/* <Text>{detailPromo.promo_descs}</Text> */}

              {/* <Text>halo</Text> */}
              <RenderHtml
                contentWidth={contentWidth}
                source={{html: detailPromo.promo_descs}}
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
                numberOfLines={0} // ini wajib ada kalo menggunakan Text dari component
                style={{textAlign: 'justify', fontFamily: Fonts.type.Lato}}>
                {detailPromo.promo_descs
                  .replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, '')
                  .replace(/(&nbsp;)/g, ' ')
                  .replace(/(&ndash;)/g, '-')
                  .replace(/(&amp;)/g, `&`)}
              </Text> */}
            </View>
            <Text
              style={{
                color: BaseColor.corn70,
                fontFamily: Fonts.type.LatoBold,
                fontSize: 16,
              }}>
              Syarat dan Ketentuan
            </Text>

            <View style={{marginVertical: 20}}>
              <RenderHtml
                contentWidth={contentWidth}
                source={{html: detailPromo.tnc_descs}}
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
        </ScrollView>
      )}
      <ImageViewing
        images={dataImage}
        imageIndex={currentImageIndex}
        presentationStyle="overFullScreen"
        visible={isVisible}
        onRequestClose={onRequestClose}
        onLongPress={onLongPress}
        HeaderComponent={
          dataImage === detailPromo
            ? ({imageIndex}) => {
                const title = get(dataImage, `${imageIndex}.title`);
                return (
                  <ImageHeader title={title} onRequestClose={onRequestClose} />
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
    </SafeAreaView>
  );
};

export default PromoWithoutModal;

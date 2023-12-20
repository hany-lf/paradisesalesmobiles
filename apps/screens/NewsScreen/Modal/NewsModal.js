import {Text, Button, Icon} from '@components';
import {
  View,
  TouchableOpacity,
  Modal,
  Dimensions,
  ScrollView,
  Image,
  ActivityIndicator,
  useWindowDimensions,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {BaseStyle, Fonts, BaseColor} from '@config';
import {useTranslation} from 'react-i18next';
import moment from 'moment';
import ImageViewer from 'react-native-image-zoom-viewer';
import ReactNativeBlobUtil from 'react-native-blob-util';
import RenderHtml, {defaultSystemFonts} from 'react-native-render-html';
const NewsModal = props => {
  const {t} = useTranslation();
  const {onPress, datas, visibleMod, icon, ...attrs} = props;
  const systemFonts = [...defaultSystemFonts, global.fontRegular];
  const {width} = useWindowDimensions().width;
  console.log('attrs ?', attrs);
  console.log('datas nya', datas);
  console.log('visiblemodal', visibleMod);
  const [visibleModal, setVisibleModal] = useState(visibleMod);
  console.log('visiblemodaldifeature', visibleModal);
  const [dataImage, setDataImage] = useState([]);
  const [showImage, setShowImage] = useState(false);
  const insets = useSafeAreaInsets();

  const close = () => {
    setVisibleModal(false);
  };
  const zoomImage = image => {
    const data = [{url: image}];
    console.log('image zoom', image);
    setShowImage(true);
    setDataImage(data);
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
        title: 'Image News Apps Paradise Mobiles',
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

  const renderHeader = () => (
    <View
      style={[
        styles.header,
        Platform.OS === 'ios' ? {paddingTop: insets.top} : {paddingTop: 10},
      ]}>
      <TouchableOpacity onPress={() => setShowImage(false)}>
        <Icon
          name={'times'}
          color={BaseColor.whiteColor}
          style={{
            fontSize: 16,
          }}></Icon>
      </TouchableOpacity>
    </View>
  );

  return datas == null ? null : ( // <Text>datas null</Text>
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
                  {t('news_detail')}
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
                      {datas.news_title}
                    </Text>
                    <Text
                      style={{
                        color: BaseColor.corn70,
                        fontFamily: Fonts.type.Lato,
                        fontSize: 11,
                        marginVertical: 5,
                      }}>
                      Created date:{' '}
                      {moment(datas.date_created).format('DD MMM YYYY - hh:mm')}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => zoomImage(datas.url_image)}>
                    {/* <Image
                      source={{uri: datas.url_image}}
                      style={{
                        width: '100%',
                        height: Dimensions.get('window').height / 2.5,
                        // width: '100%',
                        // // width: 300,
                        // height: 200,
                        // marginTop: 10,
                        // paddingTop: 10,
                        // ...StyleSheet.absoluteFillObject,
                        resizeMode: 'contain',
                        borderRadius: 25,
                      }}></Image> */}
                    <View
                      style={{height: 250, borderRadius: 25, width: '100%'}}>
                      <Image
                        source={{uri: datas.url_image}}
                        style={{
                          width: '100%',
                          // height: Dimensions.get('window').height / 2.5,
                          // width: '100%',
                          // // width: 300,
                          height: '100%',
                          // marginTop: 10,
                          // paddingTop: 10,
                          // ...StyleSheet.absoluteFillObject,
                          resizeMode: 'contain',
                          borderRadius: 25,
                        }}></Image>
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={{marginVertical: 20}}>
                  <RenderHtml
                    contentWidth={width}
                    source={{html: datas.news_descs}}
                    systemFonts={systemFonts}
                    tagsStyles={{
                      p: {
                        color: BaseColor.corn70,
                        fontSize: 12,
                        fontFamily: Fonts.type.LatoBold,
                        textAlign: 'justify',
                      },
                      li: {
                        // color: isDarkMode ? 'blue' : 'red',
                        color: BaseColor.corn70,
                        fontSize: 12,
                        fontFamily: Fonts.type.LatoBold,
                      },
                    }}
                  />
                  {/* <Text
                    style={{
                      textAlign: 'justify',
                      fontFamily: Fonts.type.Lato,
                    }}
                    numberOfLines={0} // ini wajib ada kalo menggunakan Text dari component
                  >
                    {datas.news_descs
                      .replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, '')
                      .replace(/(&nbsp;)/g, ' ')
                      .replace(/(&ndash;)/g, '-')
                      .replace(/(&amp;)/g, `&`)}
                  </Text> */}
                </View>
              </View>
              <Modal visible={showImage} transparent={true}>
                {renderHeader()}
                <ImageViewer
                  useNativeDriver={true}
                  imageUrls={dataImage}
                  enableSwipeDown={true}
                  onSwipeDown={() => setShowImage(false)}
                  onSave={uri => _saveImages(uri)}
                  menuContext={{
                    saveToLocal: 'Save Image',
                    cancel: 'Cancel',
                  }}
                />
              </Modal>
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

export default NewsModal;

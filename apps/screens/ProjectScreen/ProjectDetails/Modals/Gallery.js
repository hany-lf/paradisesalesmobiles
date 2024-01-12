import {Text, Button, Icon} from '@components';
// import Image from '../../../../components/Image';
import {
  View,
  TouchableOpacity,
  Modal,
  Platform,
  Image,
  ActivityIndicator,
  Alert,
  StatusBar,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import React, {useState} from 'react';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import {BaseStyle, Fonts, BaseColor} from '@config';
import {ScrollView} from 'react-native-gesture-handler';

import ImageViewing from 'react-native-image-viewing';

import get from 'lodash/get';

import ReactNativeBlobUtil from 'react-native-blob-util';

const Gallery = props => {
  const {onPress, datas, icon, ...attrs} = props;
  console.log('attrs ?', attrs);
  console.log('datas nya', datas);
  const {t} = useTranslation();
  const [dataImage, setDataImage] = useState([]);
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [actionTriggered, setActionTriggered] = useState('');

  const insets = useSafeAreaInsets();
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setImageIndex] = useState(0);
  const zoomImage = (imagesArr, index) => {
    console.log('index zoom', index);

    console.log('array image zoom', imagesArr);
    setImageIndex(index);
    const arr = imagesArr.map(image => ({
      uri: image.gallery_url,
    }));
    console.log('arr url', arr);

    setDataImage(arr);
    setIsVisible(true);
  };
  const onRequestClose = () => setIsVisible(false);

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
      <Modal {...attrs} animationType="slide" transparent={false}>
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
                  {t('gallery_project')}
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
                  {datas.map((item, index) => (
                    <View
                      style={{
                        marginHorizontal: 10,
                        marginVertical: 10,
                        // backgroundColor: 'yellow',
                        borderRadius: 10,
                      }}
                      key={index}>
                      <TouchableOpacity onPress={() => zoomImage(datas, index)}>
                        {/* <Text>{item.image}</Text> */}
                        <Image
                          source={{uri: item.gallery_url}}
                          style={{
                            width: '100%',
                            height: 200,
                            resizeMode: 'contain',
                            borderRadius: 10,
                            // ...Platform.select({
                            //   android: {
                            //     elevation: 1,
                            //   },
                            //   default: {
                            //     shadowColor: BaseColor.corn90,
                            //     shadowOffset: {height: 0, width: 0},
                            //     shadowOpacity: 3,
                            //     shadowRadius: 3,
                            //   },
                            // }),
                          }}></Image>
                      </TouchableOpacity>
                    </View>
                  ))}
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
      </Modal>
    </View>
  );
};

export default Gallery;

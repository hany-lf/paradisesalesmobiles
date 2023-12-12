import {Text, Button, Icon} from '@components';
// import Image from '../../../../components/Image';
import {
  View,
  TouchableOpacity,
  Modal,
  Platform,
  Image,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import React, {useState} from 'react';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import {BaseStyle, Fonts, BaseColor} from '@config';
import {ScrollView} from 'react-native-gesture-handler';
import ImageViewer from 'react-native-image-zoom-viewer';
import GalleryZoom from './GalleryZoom';

const Gallery = props => {
  const {onPress, datas, icon, ...attrs} = props;
  console.log('attrs ?', attrs);
  console.log('datas nya', datas);
  const {t} = useTranslation();
  const [dataImage, setDataImage] = useState([]);
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [actionTriggered, setActionTriggered] = useState('');
  const [visibleGalleryZoom, setVisibleGalleryZoom] = useState(false);
  const insets = useSafeAreaInsets();
  const zoomImage = items => {
    console.log('items', items);

    const arr = items.map((str, index) => ({
      url: str.gallery_url,
    }));
    console.log('arr??', arr);
    const data = arr;
    // const data = [{url: images}]; //biasanya kayak gini, imagesnya itu string object
    console.log('image zoom', data);
    // setActionTriggered('zoom_image');
    setShowImageGallery(true);
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

  const renderHeader = () => (
    <View
      style={[
        styles.header,
        Platform.OS === 'ios' ? {paddingTop: insets.top} : {},
      ]}>
      <TouchableOpacity onPress={() => setShowImageGallery(false)}>
        <Icon
          name={'times'}
          color={BaseColor.whiteColor}
          style={{
            fontSize: 16,
          }}></Icon>
      </TouchableOpacity>
    </View>
  );

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
                      <TouchableOpacity onPress={() => zoomImage(datas)}>
                        {/* <Text>{item.image}</Text> */}
                        <Image
                          source={{uri: item.gallery_url}}
                          // source={require(item.image)}
                          // source={item.image}
                          // alt={item.image}
                          // source={require(`@assets/images/unitgalleries/gallery/PK-Principal-Antasari-Place-16-Sept-2022-1-1-35-scaled.jpg`)}
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
              <Modal
                visible={showImageGallery}
                transparent={true}
                animationType="slide">
                {renderHeader()}
                <ImageViewer
                  useNativeDriver={true}
                  imageUrls={dataImage}
                  enableSwipeDown={true}
                  onSwipeDown={() => setShowImageGallery(false)}
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
      </Modal>
    </View>
  );
};

export default Gallery;

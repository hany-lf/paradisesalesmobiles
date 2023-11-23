import {Text, Button, Icon, Header} from '@components';
import {
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BaseStyle, Fonts, BaseColor} from '@config';
import {useTranslation} from 'react-i18next';
import moment from 'moment';
import ImageViewer from 'react-native-image-zoom-viewer';
import ReactNativeBlobUtil from 'react-native-blob-util';
const PromoWithoutModal = props => {
  const {navigation} = props;
  //   const {onPress, datas, visibleMod, icon, ...attrs} = props;
  //   console.log('attrs ?', attrs);
  //   console.log('datas nya', datas);
  //   console.log('visiblemodal', visibleMod);
  //   const [visibleModal, setVisibleModal] = useState(visibleMod);
  //   console.log('visiblemodaldifeature', visibleModal);
  const {t} = useTranslation();
  const [detailPromo, setDetailPromo] = useState(props.route.params.datas);
  const [dataImage, setDataImage] = useState([]);
  const [showImage, setShowImage] = useState(false);
  console.log('detil prmo', detailPromo);
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
                <Text
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
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => zoomImage(detailPromo.url_image)}>
                <Image
                  source={{uri: detailPromo.url_image}}
                  // source={require('@assets/images/home/slider-project/sudirmansuite.jpeg')}
                  style={{
                    width: '100%',
                    // width: 300,
                    height: 200,
                    // marginTop: 10,
                    // paddingTop: 10,
                    // ...StyleSheet.absoluteFillObject,
                    resizeMode: 'contain',
                    borderRadius: 25,
                  }}></Image>
              </TouchableOpacity>
            </View>
            <View style={{marginVertical: 20}}>
              <Text
                numberOfLines={0} // ini wajib ada kalo menggunakan Text dari component
                style={{textAlign: 'justify', fontFamily: Fonts.type.Lato}}>
                {detailPromo.promo_descs
                  .replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, '')
                  .replace(/(&nbsp;)/g, ' ')
                  .replace(/(&ndash;)/g, '-')
                  .replace(/(&amp;)/g, `&`)}
              </Text>
            </View>
          </View>
        </ScrollView>
      )}
      <Modal visible={showImage} transparent={true}>
        {/* <TouchableOpacity onPress={() => setShowImage(false)}>
          <Icon
            name={'times'}
            color={BaseColor.blackColor}
            style={{
              fontSize: 14,
            }}></Icon>
        </TouchableOpacity> */}
        <ImageViewer
          // onSave={dataImage}
          // onSaveToCamera={() => alert('halo')}
          loadingRender={() => (
            <ActivityIndicator
              style={{
                justifyContent: 'center',
                alignSelf: 'center',
              }}
              size="large"
              color="#FFFFFF"
            />
          )}
          useNativeDriver={true}
          renderHeader={index => (
            <View style={{marginTop: 50}}>
              <TouchableOpacity
                key={index}
                onPress={() => setShowImage(false)}
                style={{
                  backgroundColor: 'black',
                  marginTop: 20,
                  marginLeft: 20,
                }}>
                <View
                  style={{
                    width: 30,
                    height: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Icon
                    name={'times'}
                    color={BaseColor.whiteColor}
                    style={{
                      fontSize: 16,
                    }}></Icon>
                </View>
              </TouchableOpacity>
            </View>
          )}
          // saveToLocalByLongPress={true}
          imageUrls={dataImage}
          enableSwipeDown={true}
          onSwipeDown={() => setShowImage(false)}
          onSave={uri => _saveImages(uri)}
          menuContext={{
            saveToLocal: 'Save Image',
            cancel: 'Cancel',
          }}
        />
        {/* <ImageViewer
          renderHeader={() => {
            <TouchableOpacity
              onPress={() => setShowImage(false)}
              style={{backgroundColor: 'red'}}>
              <Icon
                name={'times'}
                color={BaseColor.whiteColor}
                style={{
                  fontSize: 14,
                }}></Icon>
            </TouchableOpacity>;
          }}
          imageUrls={dataImage}
          enableSwipeDown={true}
          onSwipeDown={() => setShowImage(false)}
        /> */}
      </Modal>
    </SafeAreaView>
  );
};

export default PromoWithoutModal;

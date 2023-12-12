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
import React, {useState} from 'react';
import styles from './styles';

import {BaseStyle, Fonts, BaseColor} from '@config';
import {ScrollView} from 'react-native-gesture-handler';
import ImageViewer from 'react-native-image-zoom-viewer';

const GalleryZoom = props => {
  const {onPress, datas, icon, ...attrs} = props;
  console.log('attrs ?', attrs);
  console.log('datas nya', datas);

  const [dataImage, setDataImage] = useState([]);
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [actionTriggered, setActionTriggered] = useState('');

  const zoomImage = items => {
    console.log('items', items);

    const arr = items.map((str, index) => ({
      url: str.gallery_url,
    }));
    console.log('arr??', arr);
    const data = arr;
    // const data = [{url: images}]; //biasanya kayak gini, imagesnya itu string object
    console.log('image zoom', data);
    setActionTriggered('zoom_image');
    setShowImageGallery(true);
    setDataImage(arr);
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
  return (
    <View>
      <Modal {...attrs} animationType="slide" transparent={true}>
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
      </Modal>
    </View>
  );
};

export default GalleryZoom;

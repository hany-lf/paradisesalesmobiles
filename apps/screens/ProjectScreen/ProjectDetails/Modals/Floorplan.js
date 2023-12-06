import {Text, Button, Icon, Image} from '@components';
// import Image from '../../../../components/Image';
import {View, TouchableOpacity, Modal, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';

import {BaseStyle, Fonts, BaseColor} from '@config';
import {ScrollView} from 'react-native-gesture-handler';
import ImageViewer from 'react-native-image-zoom-viewer';

const Floorplan = props => {
  const {onPress, datas, icon, ...attrs} = props;
  console.log('attrs ?', attrs);
  console.log('datas nya', datas);
  const images = datas.data_floorplan;
  console.log('imagess flooorplan', images);

  const [dataImage, setDataImage] = useState([]);
  const [showImage, setShowImage] = useState(false);

  const zoomImage = items => {
    console.log('items', items);

    const arr = items.map((str, index) => ({
      url: str.plan_url,
    }));
    console.log('arr??', arr);
    const data = arr;
    // const data = [{url: images}]; //biasanya kayak gini, imagesnya itu string object
    console.log('image zoom', data);
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
                  Floorplan
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
              <View style={{marginHorizontal: 10, marginVertical: 20}}>
                {datas.map((item, index) => (
                  <View
                    style={{marginHorizontal: 10, marginVertical: 10}}
                    key={index}>
                    <TouchableOpacity onPress={() => zoomImage(datas)}>
                      {/* <Text>{item.image}</Text> */}
                      <Image
                        source={{uri: item.plan_url}}
                        // source={require(item.image)}
                        // source={item.image}
                        // alt={item.image}
                        // source={require(`@assets/images/unitgalleries/gallery/PK-Principal-Antasari-Place-16-Sept-2022-1-1-35-scaled.jpg`)}
                        style={{
                          width: '100%',
                          height: 200,
                          resizeMode: 'contain',
                          borderRadius: 20,
                          ...Platform.select({
                            android: {
                              elevation: 1,
                            },
                            default: {
                              shadowColor: BaseColor.corn90,
                              shadowOffset: {height: 0, width: 0},
                              shadowOpacity: 3,
                              shadowRadius: 3,
                            },
                          }),
                        }}></Image>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </ScrollView>
            {/* <ScrollView>
            <View style={{marginHorizontal: 30, marginVertical: 20}}>
              {datas.map((item, index) => (
                <View style={{marginHorizontal: 10}} key={index}>
                  <Text key={index}>{item.plan_url}</Text>
                  <Image
                    source={{uri: item.plan_url}}
                    // source={item.plan_url}
                    style={{
                      width: '100%',
                      height: 400,
                      resizeMode: 'cover',
                      // borderRadius: 50,
                    }}></Image>
                </View>
              ))}
            </View>
          </ScrollView> */}
          </View>
        </View>

        {/* <Button onPress={() => close()} style={{backgroundColor: 'red'}}>
        <Text>close</Text>
      </Button> */}
      </Modal>
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
            <TouchableOpacity
              key={index}
              onPress={() => setShowImage(false)}
              style={{backgroundColor: 'black', marginTop: 20, marginLeft: 20}}>
              <Icon
                name={'times'}
                color={BaseColor.whiteColor}
                style={{
                  fontSize: 16,
                }}></Icon>
            </TouchableOpacity>
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

export default Floorplan;

import {Text, Button, Icon} from '@components';
// import Image from '../../../../components/Image';
import {
  View,
  TouchableOpacity,
  Platform,
  Modal,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';

import {BaseStyle, Fonts, BaseColor} from '@config';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import ImageViewer from 'react-native-image-zoom-viewer';
import {useIsFocused} from '@react-navigation/native';
const Surrounding = props => {
  const {onPress, datas, icon, ...attrs} = props;
  console.log('attrs ?', attrs);
  console.log('datas nya', datas);

  const [dataImage, setDataImage] = useState([]);
  const [showImage, setShowImage] = useState(false);
  // const [setdatasFilter, setDataFilter] = useState([]);
  const isFocused = useIsFocused();

  let type = datas.map((item, i) => {
    return item.amenities_type;
  });
  console.log('type amen', type);
  const setDataFilter = [];
  const datasFilter = new Set(
    datas.reduce((all, foo) => [...all, ...foo.amenities_type], []),
  );
  setDataFilter.push(...datasFilter);
  console.log('cekk', ...datasFilter); //untuk memfilter amenities type aja dan jgn ada yang sama
  console.log('cekk tess', setDataFilter); //untuk memfilter amenities type aja dan jgn ada yang sama

  // useEffect(() => {
  //   console.log('isfockus', isFocused);
  //   if (isFocused) {
  //     datasFilterProccess();
  //   }
  // }, []);

  // const datasFilterProccess = () => {
  //   const datasFilter = new Set(
  //     datas.reduce((all, foo) => [...all, ...foo.amenities_type], []),
  //   );
  //   console.log('cekk', datasFilter); //untuk memfilter amenities type aja dan jgn ada yang sama

  //   setDataFilter(datasFilter);
  // };

  const zoomImage = items => {
    console.log('items', items);

    const arr = items.map((str, index) => ({
      url: str.image,
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
    <ScrollView>
      <Modal {...attrs} animationType="slide" transparent={true}>
        <View
          style={[
            styles.centeredView,
            {
              backgroundColor: BaseColor.whiteColor,
              borderTopRightRadius: 25,
              borderTopLeftRadius: 25,
              paddingBottom: 30,
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
                  Surrounding Area
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

            <ScrollView
              style={{
                marginTop: 10,
                // backgroundColor: 'yellow',
              }}>
              <View style={{marginBottom: 50}}>
                {setDataFilter.map((itemType, indexType) => (
                  <View key={indexType} style={{marginBottom: 10}}>
                    <View
                      style={[styles.badgeSurrounding, {marginVertical: 5}]}>
                      <Text style={styles.text}>
                        {itemType == 'I'
                          ? 'Infrastructure'
                          : itemType == 'S'
                          ? 'School'
                          : itemType == 'H'
                          ? 'Hospital'
                          : itemType == 'O'
                          ? 'Shopping'
                          : '.'}
                      </Text>
                    </View>
                    {datas.map((item, index) => (
                      <View style={{marginTop: 0}} key={index}>
                        {itemType === item.amenities_type ? (
                          <Text style={[styles.text, {marginLeft: 20}]}>
                            {item.amenities_info.replace(/(<([^>]+)>)/gi, '')}
                          </Text>
                        ) : null}
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>

        {/* <Button onPress={() => close()} style={{backgroundColor: 'red'}}>
        <Text>close</Text>
      </Button> */}
      </Modal>
    </ScrollView>
  );
};

export default Surrounding;

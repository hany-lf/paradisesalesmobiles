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
import React, {useState} from 'react';
import styles from './styles';

import {BaseStyle, Fonts, BaseColor} from '@config';
import {ScrollView} from 'react-native-gesture-handler';
import ImageViewer from 'react-native-image-zoom-viewer';

const Surrounding = props => {
  const {onPress, datas, icon, ...attrs} = props;
  console.log('attrs ?', attrs);
  console.log('datas nya', datas);

  const [dataImage, setDataImage] = useState([]);
  const [showImage, setShowImage] = useState(false);

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
                height: Dimensions.get('screen').height,
              }}>
              {/* ----- */}
              <View>
                {/* <View> */}
                <View style={{marginVertical: 10}}>
                  <View style={styles.badgeSurrounding}>
                    <Text style={styles.text}>Shopping</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <View>
                      <View style={styles.shadowimageSurrounding}>
                        <Image
                          source={require('@assets/images/surrounding/mallpim.jpeg')}
                          style={{
                            width: 100,
                            height: 100,
                            resizeMode: 'cover',
                            borderRadius: 15,
                          }}></Image>
                      </View>
                      <View style={{width: 100, marginTop: 8}}>
                        <Text style={[styles.text, {textAlign: 'center'}]}>
                          Pondok Indah Mall (PIM)
                        </Text>
                        <Text style={[styles.text, {textAlign: 'center'}]}>
                          7km
                        </Text>
                      </View>
                    </View>

                    <View>
                      <View style={styles.shadowimageSurrounding}>
                        <Image
                          source={require('@assets/images/surrounding/mallpim.jpeg')}
                          style={{
                            width: 100,
                            height: 100,
                            resizeMode: 'cover',
                            borderRadius: 15,
                          }}></Image>
                      </View>
                      <View style={{width: 100, marginTop: 8}}>
                        <Text style={[styles.text, {textAlign: 'center'}]}>
                          Cilandak Town Square
                        </Text>
                        <Text style={[styles.text, {textAlign: 'center'}]}>
                          1.6km
                        </Text>
                      </View>
                    </View>
                    <View>
                      <View style={styles.shadowimageSurrounding}>
                        <Image
                          source={require('@assets/images/surrounding/mallpim.jpeg')}
                          style={{
                            width: 100,
                            height: 100,
                            resizeMode: 'cover',
                            borderRadius: 15,
                          }}></Image>
                      </View>
                      <View style={{width: 100, marginTop: 8}}>
                        <Text style={[styles.text, {textAlign: 'center'}]}>
                          Blok M Plaza
                        </Text>
                        <Text style={[styles.text, {textAlign: 'center'}]}>
                          6.6km
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={{marginVertical: 10}}>
                  <View style={styles.badgeSurrounding}>
                    <Text style={styles.text}>School</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <View>
                      <View style={styles.shadowimageSurrounding}>
                        <Image
                          source={require('@assets/images/surrounding/mallpim.jpeg')}
                          style={{
                            width: 100,
                            height: 100,
                            resizeMode: 'cover',
                            borderRadius: 15,
                          }}></Image>
                      </View>
                      <View style={{width: 100, marginTop: 8}}>
                        <Text style={[styles.text, {textAlign: 'center'}]}>
                          High Scope International School
                        </Text>
                        <Text style={[styles.text, {textAlign: 'center'}]}>
                          2.8km
                        </Text>
                      </View>
                    </View>
                    <View>
                      <View style={styles.shadowimageSurrounding}>
                        <Image
                          source={require('@assets/images/surrounding/mallpim.jpeg')}
                          style={{
                            width: 100,
                            height: 100,
                            resizeMode: 'cover',
                            borderRadius: 15,
                          }}></Image>
                      </View>
                      <View style={{width: 100, marginTop: 8}}>
                        <Text style={[styles.text, {textAlign: 'center'}]}>
                          Sekolah Cikal
                        </Text>
                        <Text style={[styles.text, {textAlign: 'center'}]}>
                          7km
                        </Text>
                      </View>
                    </View>
                    <View>
                      <View style={styles.shadowimageSurrounding}>
                        <Image
                          source={require('@assets/images/surrounding/mallpim.jpeg')}
                          style={{
                            width: 100,
                            height: 100,
                            resizeMode: 'cover',
                            borderRadius: 15,
                          }}></Image>
                      </View>

                      <View style={{width: 100, marginTop: 8}}>
                        <Text style={[styles.text, {textAlign: 'center'}]}>
                          Jakarta Intercultural School
                        </Text>
                        <Text style={[styles.text, {textAlign: 'center'}]}>
                          3.5km
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={{marginVertical: 10}}>
                  <View style={styles.badgeSurrounding}>
                    <Text style={styles.text}>School</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <View>
                      <View style={styles.shadowimageSurrounding}>
                        <Image
                          source={require('@assets/images/surrounding/mallpim.jpeg')}
                          style={{
                            width: 100,
                            height: 100,
                            resizeMode: 'cover',
                            borderRadius: 15,
                          }}></Image>
                      </View>
                      <View style={{width: 100, marginTop: 8}}>
                        <Text style={[styles.text, {textAlign: 'center'}]}>
                          High Scope International School
                        </Text>
                        <Text style={[styles.text, {textAlign: 'center'}]}>
                          2.8km
                        </Text>
                      </View>
                    </View>

                    <View>
                      <View style={styles.shadowimageSurrounding}>
                        <Image
                          source={require('@assets/images/surrounding/mallpim.jpeg')}
                          style={{
                            width: 100,
                            height: 100,
                            resizeMode: 'cover',
                            borderRadius: 15,
                          }}></Image>
                      </View>
                      <View style={{width: 100, marginTop: 8}}>
                        <Text style={[styles.text, {textAlign: 'center'}]}>
                          High Scope International School
                        </Text>
                        <Text style={[styles.text, {textAlign: 'center'}]}>
                          2.8km
                        </Text>
                      </View>
                    </View>

                    <View>
                      <View style={styles.shadowimageSurrounding}>
                        <Image
                          source={require('@assets/images/surrounding/mallpim.jpeg')}
                          style={{
                            width: 100,
                            height: 100,
                            resizeMode: 'cover',
                            borderRadius: 15,
                          }}></Image>
                      </View>
                      <View style={{width: 100, marginTop: 8}}>
                        <Text style={[styles.text, {textAlign: 'center'}]}>
                          Sekolah CIKAL
                        </Text>
                        <Text style={[styles.text, {textAlign: 'center'}]}>
                          2.8km
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* <View>
                  <View
                    style={{
                      width: 100,
                      padding: 10,
                      //   height: 20,
                      backgroundColor: 'orange',
                      alignItems: 'center',
                      borderRadius: 15,
                    }}>
                    <Text>Health</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <View
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: 15,
                        ...Platform.select({
                          android: {
                            elevation: 3,
                          },
                          default: {
                            shadowColor: BaseColor.corn90,
                            shadowOffset: {height: 0, width: 0},
                            shadowOpacity: 3,
                            shadowRadius: 3,
                          },
                        }),
                      }}>
                      <Image
                        source={require('@assets/images/surrounding/mallpim.jpeg')}
                        style={{
                          width: 100,
                          height: 100,
                          resizeMode: 'cover',
                          borderRadius: 15,
                        }}></Image>
                      <View style={{width: 100}}>
                        <Text style={{textAlign: 'center'}}>
                          RS Pondok Indah
                        </Text>
                        <Text style={{textAlign: 'center'}}>4.4km</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: 15,
                        ...Platform.select({
                          android: {
                            elevation: 3,
                          },
                          default: {
                            shadowColor: BaseColor.corn90,
                            shadowOffset: {height: 0, width: 0},
                            shadowOpacity: 3,
                            shadowRadius: 3,
                          },
                        }),
                      }}>
                      <Image
                        source={require('@assets/images/surrounding/mallpim.jpeg')}
                        style={{
                          width: 100,
                          height: 100,
                          resizeMode: 'cover',
                          borderRadius: 15,
                        }}></Image>
                      <View style={{width: 100}}>
                        <Text style={{textAlign: 'center'}}>
                          Brawijaya Hospital
                        </Text>
                        <Text style={{textAlign: 'center'}}>7.1km</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: 15,
                        ...Platform.select({
                          android: {
                            elevation: 3,
                          },
                          default: {
                            shadowColor: BaseColor.corn90,
                            shadowOffset: {height: 0, width: 0},
                            shadowOpacity: 3,
                            shadowRadius: 3,
                          },
                        }),
                      }}>
                      <Image
                        source={require('@assets/images/surrounding/mallpim.jpeg')}
                        style={{
                          width: 100,
                          height: 100,
                          resizeMode: 'cover',
                          borderRadius: 15,
                        }}></Image>
                      <View style={{width: 100}}>
                        <Text style={{textAlign: 'center'}}>
                          Klinik Mata Nusantara - Eye Care
                        </Text>
                        <Text style={{textAlign: 'center'}}>3km</Text>
                      </View>
                    </View>
                  </View>
                </View> */}
                {/* </View> */}
              </View>
            </ScrollView>
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
    </ScrollView>
  );
};

export default Surrounding;

import {Text, Header, Icon, Button} from '@components';

import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Animated,
} from 'react-native';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BaseStyle, Fonts, BaseColor} from '@config';
import {useTranslation} from 'react-i18next';
import React, {useEffect, useState, useCallback, useRef} from 'react';
import {useSelector, useDispatch, connect} from 'react-redux';
import getUser from '../../selectors/UserSelectors';
import axios from 'axios';
import {API_URL} from '@env';
import UnitInfoModal from './Modal/UnitInfoModal';
import ImageViewer from 'react-native-image-zoom-viewer';
import ReactNativeBlobUtil from 'react-native-blob-util';
import UnitInfoDetailsModal from './Modal/UnitInfoDetailsModal';

const UnitInfo = props => {
  const {navigation} = props;
  const {t} = useTranslation();
  const user = useSelector(state => getUser(state));
  const [showPromo, setShowPromo] = useState(false);
  const [modalVisibile, setModalVisible] = useState(false);
  const [paramsData, setParamsData] = useState(props.route.params.paramsData);
  const [itemsData, setItemsData] = useState(props.route.params.item);
  const [dataImage, setDataImage] = useState([]);
  const [showImage, setShowImage] = useState(false);
  let [toggled, setToggled] = useState(false);
  const height = useRef(new Animated.Value(1)).current;

  console.log('params data untuk unit info', paramsData);
  console.log('items data untuk unit info', itemsData);
  const showModalPromo = () => {
    setShowPromo(true);
  };

  const closeShowModalPromo = () => {
    setShowPromo(false);
  };

  const dataPromo = [
    {title: 'tes', descs: 'ini decs', date: '27 agustus 2023'},
  ];

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

  // useEffect(() => {}, [toggled]);

  const toggledShowMore = () => {
    Animated.timing(height, {
      toValue: toggled ? 2 : 0,
      duration: 600,
    }).start();

    setToggled(toggled => !toggled);
  };

  const dataDummyDetails =
    'Lokasi terbaik, berada di Jantung Jakarta Selatan, di Perempatan Pangeran Antasari dan TB Simatupang. Akses mudah, dengan Akses JORR 1 dan 2, sehingga mudah menuju ke berbagai area sekitar lainnya. Semua yang kamu butuhkan tersedia, Fitness Center, kolam renang, serta fasilitas untuk anak-anak seperti sekolah, area playground dalam satu area tempat tinggal. Konsultasi kelas dunia, dalam merancang dan merencanakan produknya INPP berorientasi pada pendekatan yang berfokus pada konsumen. yang dihasilkan harus sesuai kebutuhan, Kebiasaan, dan kapabilitas konsumen. Tipe unit smart dan modern, selalu konsisten dalam mengimplementasikan startegi bisnis yang kreatif dan inovatifuntuk menghasilkan Iconic Lifestyle Destination.';

  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={[BaseStyle.safeAreaView, {backgroundColor: BaseColor.whiteColor}]}>
      <Header
        title={t('unit_info')}
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
      <ScrollView
        style={{
          marginHorizontal: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            // justifyContent: 'space-evenly',
            justifyContent: 'space-around',
            // width: '100%',
            marginHorizontal: 5,
          }}>
          <TouchableOpacity onPress={() => zoomImage(paramsData.picture_url)}>
            <View style={{marginVertical: 10, marginHorizontal: 10}}>
              <Image
                // source={require('@assets/images/promonews/promo2.png')}
                source={{uri: paramsData.picture_url}}
                style={{
                  width: 150,
                  height: 150,
                  resizeMode: 'contain',
                  borderRadius: 15,
                }}></Image>
            </View>
          </TouchableOpacity>
          <View
            style={{
              width: '50%',
              marginVertical: 10,
              marginHorizontal: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: Fonts.type.LatoBold,
                color: BaseColor.corn70,
              }}>
              {paramsData.descs}
            </Text>

            <Text
              numberOfLines={4}
              style={{
                marginTop: 5,
                fontSize: 16,
                fontFamily: Fonts.type.Lato,
                color: BaseColor.corn70,
              }}>
              Unit {itemsData.lot_no}
            </Text>
            <View
              style={{
                marginVertical: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Icon
                  style={{marginRight: 5}}
                  name={'bed'}
                  size={12}
                  color={BaseColor.corn70}></Icon>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: Fonts.type.Lato,
                    color: BaseColor.corn70,
                  }}>
                  {paramsData.qty_bedroom} Bedroom
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Icon
                  style={{marginRight: 5}}
                  name={'shower'}
                  size={12}
                  color={BaseColor.corn70}></Icon>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: Fonts.type.Lato,
                    color: BaseColor.corn70,
                  }}>
                  {paramsData.qty_bathroom} Bathroom
                </Text>
              </View>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: Fonts.type.Lato,
                  color: BaseColor.corn70,
                }}>
                {itemsData.build_up_area} SQM Nett / {itemsData.land_area} SQM
                Semi gross
              </Text>
            </View>
            <Button
              onPress={() => setShowPromo(true)}
              style={{
                backgroundColor: BaseColor.corn50,
                height: 40,
                marginTop: 15,
                borderRadius: 15,
              }}>
              <Text
                style={{
                  color: BaseColor.whiteColor,
                  fontSize: 12,
                  fontFamily: Fonts.type.Lato,
                }}>
                See gallery
              </Text>
            </Button>
          </View>
        </View>

        {/* --- border  */}
        <View
          style={{
            borderWidth: 0.5,
            borderColor: BaseColor.corn30,
            marginVertical: 20,
          }}></View>

        <View>
          <Text
            style={{
              fontFamily: Fonts.type.LatoBold,
              color: BaseColor.corn70,
              fontSize: 14,
              //   marginVertical: 10,
              marginTop: 5,
              marginBottom: 15,
            }}>
            {t('unit_details')}
          </Text>
          {/* <Animated.View
            style={{
              // backgroundColor: 'blue',
              height: height.interpolate({
                inputRange: [0, 1],
                outputRange: [70, 200],
              }),
            }}>
            {console.log('togle', toggled)} */}
          <Text
            numberOfLines={4}
            style={{
              fontFamily: Fonts.type.Lato,
              color: BaseColor.corn70,
              fontSize: 14,
              textAlign: 'justify',
            }}>
            {dataDummyDetails}
          </Text>
          {/* </Animated.View> */}

          {/* <TouchableOpacity onPress={() => setModalVisible(true)}>
           */}
          <TouchableOpacity onPress={() => setModalVisible()}>
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 10,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: Fonts.type.Lato,
                  color: BaseColor.corn90,
                  marginBottom: 2,
                  marginRight: 5,
                  alignSelf: 'center',
                  // alignContent: 'center',
                  // justifyContent: 'center',
                  // alignItems: 'center',
                  borderBottomWidth: 0.5,
                  borderBottomColor: BaseColor.corn90,
                }}>
                Show more
              </Text>
              <Icon
                name="chevron-right"
                size={14}
                color={BaseColor.corn70}
                enableRTL={true}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* --- border  */}
        <View
          style={{
            borderWidth: 0.3,
            borderColor: BaseColor.corn30,
            borderStyle: 'solid',
            marginVertical: 20,
          }}></View>

        <View>
          <Text
            style={{
              fontFamily: Fonts.type.LatoBold,
              color: BaseColor.corn70,
              fontSize: 14,
              //   marginVertical: 10,
              marginTop: 5,
              marginBottom: 15,
            }}>
            Room facility
          </Text>

          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 5,
              }}>
              <Icon
                style={{marginRight: 10}}
                name={'bed'}
                size={13}
                color={BaseColor.corn70}></Icon>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: Fonts.type.Lato,
                  color: BaseColor.corn70,
                }}>
                {paramsData.qty_bedroom} Bedroom
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 5,
              }}>
              <Icon
                style={{marginRight: 15}}
                name={'shower'}
                size={13}
                color={BaseColor.corn70}></Icon>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: Fonts.type.Lato,
                  color: BaseColor.corn70,
                }}>
                {paramsData.qty_bathroom} Bathroom
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 5,
              }}>
              <Icon
                style={{marginRight: 15}}
                name={'archive'}
                size={13}
                color={BaseColor.corn70}></Icon>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: Fonts.type.Lato,
                  color: BaseColor.corn70,
                }}>
                Kitchen table top & lower cabinet
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 5,
              }}>
              <Icon
                style={{marginRight: 15}}
                name={'fire-alt'}
                size={13}
                color={BaseColor.corn70}></Icon>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: Fonts.type.Lato,
                  color: BaseColor.corn70,
                }}>
                Stove
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 5,
              }}>
              <Icon
                style={{marginRight: 15}}
                name={'fax'}
                size={13}
                color={BaseColor.corn70}></Icon>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: Fonts.type.Lato,
                  color: BaseColor.corn70,
                }}>
                Telephone & Internet outlet
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 5,
              }}>
              <Icon
                style={{marginRight: 15}}
                name={'pager'}
                size={13}
                color={BaseColor.corn70}></Icon>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: Fonts.type.Lato,
                  color: BaseColor.corn70,
                }}>
                Air Conditioner
              </Text>
            </View>
          </View>
        </View>

        {/* --- border  */}
        <View
          style={{
            borderWidth: 0.3,
            borderColor: BaseColor.corn30,
            borderStyle: 'solid',
            marginVertical: 20,
          }}></View>

        <View>
          <Text
            style={{
              fontFamily: Fonts.type.LatoBold,
              color: BaseColor.corn70,
              fontSize: 14,
              //   marginVertical: 10,
              marginTop: 5,
              marginBottom: 15,
            }}>
            Unit Plan
          </Text>
          {/* <TouchableOpacity
            onPress={() =>
              zoomImage(require('@assets/images/floorplan/STD-1.jpg'))
            }> */}
          <Image
            style={{
              alignSelf: 'center',
              resizeMode: 'contain',
              width: '100%',
              height: 200,
            }}
            source={require('@assets/images/floorplan/STD-1.jpg')}></Image>
          {/* </TouchableOpacity> */}
        </View>
      </ScrollView>
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
      <UnitInfoModal
        onRequestClose={() => {
          setShowPromo(false);
        }}
        visible={showPromo}
        icon={
          <TouchableOpacity onPress={() => setShowPromo(false)}>
            <Icon name={'arrow-left'} size={18} color={BaseColor.corn90}></Icon>
          </TouchableOpacity>
        }
        datas={dataPromo}></UnitInfoModal>
      <UnitInfoDetailsModal
        onRequestClose={() => {
          setModalVisible(false);
        }}
        visible={modalVisibile}
        icon={
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Icon name={'arrow-left'} size={18} color={BaseColor.corn90}></Icon>
          </TouchableOpacity>
        }
        datas={dataDummyDetails}></UnitInfoDetailsModal>
    </SafeAreaView>
  );
};

export default UnitInfo;

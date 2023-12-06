import {
  Text,
  SafeAreaView,
  Header,
  Icon,
  Image,
  Button,
  TextInput,
} from '@components';
import {BaseStyle, BaseColor, Fonts} from '../../config';
import {useTranslation} from 'react-i18next';
import {
  View,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
  Alert,
  Linking,
  ActivityIndicator,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Modal} from 'react-native';

import {useIsFocused} from '@react-navigation/native';
import styles from './styles';
import GridUnit from '../../components/GridUnit/GridUnit';
import dataUnitEnquiry from './dataUnitEnquiry.json';
import {API_URL} from '@env';
import getUser from '../../selectors/UserSelectors';
import {useSelector, useDispatch, connect} from 'react-redux';
import axios from 'axios';
import {Dropdown} from 'react-native-element-dropdown';
import ImageViewer from 'react-native-image-zoom-viewer';
import ReactNativeBlobUtil from 'react-native-blob-util';

const UnitEnquiryList = props => {
  const {t} = useTranslation();
  //   const dummyFAQ = dummy_faq.menu_faq;
  const {navigation} = props;
  const user = useSelector(state => getUser(state));
  const {width} = useWindowDimensions().width;
  console.log('params dari list enquiry', props.route.params);
  // const paramsData = props.route.params;
  const [paramsData, setParamsData] = useState(props.route.params);
  const lot_type = paramsData.lot_type;
  const entity_cd = paramsData.entity_cd;
  const project_no = paramsData.project_no;
  const [showModal, setShowModal] = useState(false);
  const [project_name, setProjectName] = useState(
    props.route.params.project_name,
  );
  const [dataBrosurFetch, setDataBrosur] = useState([]);
  const [emailCust, setEmailCust] = useState('');
  const [phoneCust, setPhoneCust] = useState('');

  const [dataListEnquiry, setDataListEnquiry] = useState([]);
  const isFocused = useIsFocused();
  const [value, setValueLevel] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [levelNo, setLevelNo] = useState([]);
  const [dataImage, setDataImage] = useState([]);
  const [showImage, setShowImage] = useState(false);
  // const renderLabel = () => {
  //   if (value || isFocus) {
  //     return (
  //       <Text style={[styles.label, isFocus && {color: 'blue'}]}>
  //         Dropdown label
  //       </Text>
  //     );
  //   }
  //   return null;
  // };

  useEffect(() => {
    getDataListEnquiry();
  }, []);

  const getDataListEnquiry = () => {
    try {
      const config = {
        method: 'get',
        // url: 'http://dev.ifca.co.id:8080/apiciputra/api/approval/groupMenu?approval_user=MGR',
        url: API_URL + '/unit-enquiry/pm-lot',
        headers: {
          'content-type': 'application/json',
          // 'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Bearer ${user.Token}`,
        },
        // params: {approval_user: user.userIDToken.UserId},
        params: {
          lot_type: lot_type,
          entity_cd: entity_cd,
          project_no: project_no,
        },
      };
      console.log('formdaata get pm lot', config);
      axios(config)
        .then(result => {
          const pasing = result.data.Data;
          console.log('data di lot type', pasing);
          setDataListEnquiry(pasing);
          const level = pasing.map((item, id) => ({
            label: 'Lantai ' + parseInt(item.level_no, 10),
            value: item.level_no,
          }));
          console.log('levelno?', level);
          setLevelNo(level);
        })
        .catch(error =>
          console.log('error getdata pm lot type error', error.response),
        );
    } catch (error) {
      console.log('ini konsol eror pm lot type', error);
    }
  };

  const sendReq_ = () => {};

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

  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={[BaseStyle.safeAreaView, {backgroundColor: BaseColor.whiteColor}]}>
      <Header
        // title={t('unit_enquiry_list')}
        title={paramsData.descs}
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
      <ScrollView>
        {/* --- header atas gambar --- */}
        <TouchableOpacity onPress={() => zoomImage(paramsData.picture_url)}>
          <View
            style={{
              width: '100%',
              paddingHorizontal: 20,
              marginVertical: 10,
            }}>
            <View
              style={{
                backgroundColor: BaseColor.corn10,
                borderTopRightRadius: 25,
                borderTopLeftRadius: 25,
              }}>
              <Image
                source={{uri: paramsData.picture_url}}
                style={{
                  width: '100%',
                  // width: 300,
                  height: 200,
                  // marginTop: 10,
                  // paddingTop: 10,
                  // ...StyleSheet.absoluteFillObject,
                  resizeMode: 'cover',
                  borderRadius: 25,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginRight: 15,
                }}>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 15,
                      marginHorizontal: 15,
                    }}>
                    {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={{
                          fontFamily: Fonts.type.Lato,
                          color: BaseColor.corn50,
                        }}>
                        6
                      </Text>
                      <View
                        style={{
                          width: 10,
                          height: 10,
                          backgroundColor: 'yellow',
                          marginHorizontal: 5,
                        }}></View>
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={{
                          fontFamily: Fonts.type.Lato,
                          color: BaseColor.corn50,
                        }}>
                        6
                      </Text>
                      <View
                        style={{
                          width: 10,
                          height: 10,
                          backgroundColor: 'red',
                          marginHorizontal: 5,
                        }}></View>
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={{
                          fontFamily: Fonts.type.Lato,
                          color: BaseColor.corn50,
                        }}>
                        6
                      </Text>
                      <View
                        style={{
                          width: 10,
                          height: 10,
                          backgroundColor: 'green',
                          marginHorizontal: 5,
                        }}></View>
                    </View> */}
                  </View>
                  <View style={{marginHorizontal: 15, marginVertical: 5}}>
                    {/* <Text
                      style={{
                        fontFamily: Fonts.type.Lato,
                        color: BaseColor.corn50,
                        marginVertical: 5,
                      }}>
                      
                    </Text> */}
                  </View>
                </View>

                {/* <Button
                onPress={() => setShowModal(true)}
                style={{
                  backgroundColor: BaseColor.corn50,
                  marginLeft: 20,
                  paddingHorizontal: 40,
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
                  See details
                </Text>
              </Button> */}
              </View>
            </View>
          </View>
        </TouchableOpacity>
        {/* --- tutup header atas gambar --- */}

        {/* --- row booked not available available --- */}
        <View
          style={{
            backgroundColor: BaseColor.whiteColor,
            borderColor: BaseColor.corn30,
            borderStyle: 'solid',
            borderWidth: 0.5,
            borderRadius: 20,
            marginHorizontal: 20,
            height: 50,
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 15,
                  height: 15,
                  backgroundColor: BaseColor.yellowStateColor,
                  marginHorizontal: 5,
                }}></View>
              <Text
                style={{
                  fontFamily: Fonts.type.Lato,
                  fontSize: 14,
                  color: BaseColor.corn70,
                }}>
                Booked
              </Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  width: 15,
                  height: 15,
                  backgroundColor: BaseColor.redStateColor,
                  marginHorizontal: 5,
                }}></View>
              <Text
                style={{
                  fontFamily: Fonts.type.Lato,
                  fontSize: 14,
                  color: BaseColor.corn70,
                }}>
                Not available
              </Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  width: 15,
                  height: 15,
                  backgroundColor: BaseColor.greenStateColor,
                  marginHorizontal: 5,
                }}></View>
              <Text
                style={{
                  fontFamily: Fonts.type.Lato,
                  fontSize: 14,
                  color: BaseColor.corn70,
                }}>
                Available
              </Text>
            </View>
          </View>
        </View>
        {/* --- tutup row booked not available available --- */}

        {/* --- choose level no --- */}
        {/* <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{marginHorizontal: 20}}>
              <Text
                style={{
                  color: BaseColor.corn50,
                  fontFamily: Fonts.type.Lato,
                  fontSize: 14,
                }}>
                Level No
              </Text>
            </View>

            <Dropdown
              style={[
                styles.dropdown,
                isFocus && {borderColor: BaseColor.corn30},
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              itemTextStyle={styles.itemTextStyle}
              containerStyle={{borderRadius: 15, marginVertical: 5}}
              data={levelNo}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select level' : 'Choose one'}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValueLevel(item.value);
                setIsFocus(false);
              }}
              // renderLeftIcon={() => (
              //   <Icon
              //     style={styles.icon}
              //     color={isFocus ? 'blue' : 'black'}
              //     name="city"
              //     size={20}
              //   />
              // )}
            />
          </View>
        </View> */}
        {/* --- tutup choose level no --- */}
        {/* --- grid unit --- */}

        <View
          style={{
            paddingTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FlatList
            data={dataListEnquiry}
            numColumns={4}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    padding: 8,
                    // paddingLeft: index % 2 == 0 ? 3 : 10,
                    // paddingRight: index % 2 == 0 ? 3 : 10,
                    paddingBottom: 15,
                  }}>
                  <GridUnit
                    onPress={() =>
                      navigation.navigate('UnitInfo', {
                        item,
                        paramsData: paramsData,
                      })
                    }
                    title={item.descs}
                    nameicon={
                      item.status == 'B' || item.status == 'S'
                        ? 'door-closed'
                        : item.status == 'A'
                        ? 'door-open'
                        : item.status == 'R' || item.status == 'H'
                        ? 'door-closed'
                        : 'times'
                    }
                    // type={item.zone_cd} //sementara zone_code
                    status_unit={
                      // item.lot_no
                      item.status == 'B' || item.status == 'S'
                        ? 'B'
                        : item.status == 'A'
                        ? 'A'
                        : item.status == 'R' || item.status == 'H'
                        ? 'NA'
                        : 'NA'
                    } //status unit untuk warna warna nya
                  />
                </View>
              );
            }}
            keyExtractor={item => item.lot_no}
          />
        </View>
      </ScrollView>

      <Modal visible={showModal} animationType="slide" transparent={false}>
        <View
          style={[
            styles.centeredView,
            {
              //   backgroundColor: 'rgba(152, 128, 78, 0.8)', //modal transparan
              borderTopRightRadius: 25,
              borderTopLeftRadius: 25,
              height: '100%',
            },
          ]}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 20,
                marginVertical: 20,
              }}>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Icon
                  name={'arrow-left'}
                  size={18}
                  color={BaseColor.corn90}></Icon>
              </TouchableOpacity>

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
                  {t('unit_details')}
                </Text>
              </View>
            </View>

            <View
              style={{
                borderWidth: 0.3,
                borderColor: BaseColor.corn70,
                borderStyle: 'solid',
              }}></View>
            <ScrollView>
              <View>
                <Text>Description unit</Text>
              </View>
            </ScrollView>
          </View>
        </View>
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
            // <TouchableOpacity
            //   key={index}
            //   onPress={() => setShowImage(false)}
            //   style={{
            //     backgroundColor: BaseColor.whiteColor,
            //     top: 10,
            //     left: 20,
            //     width: 50,
            //     borderRadius: 5,
            //     alignItems: 'center',
            //   }}>
            //   <View>
            //     <Icon
            //       name={'times'}
            //       color={BaseColor.corn50}
            //       style={{
            //         fontSize: 20,
            //       }}></Icon>
            //   </View>
            // </TouchableOpacity>
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
    </SafeAreaView>
  );
};

export default UnitEnquiryList;

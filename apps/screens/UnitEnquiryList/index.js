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

const UnitEnquiryList = props => {
  const {t} = useTranslation();
  //   const dummyFAQ = dummy_faq.menu_faq;
  const {navigation} = props;
  const user = useSelector(state => getUser(state));
  const {width} = useWindowDimensions().width;
  console.log('params dari list enquiry', props.route.params);
  // const paramsData = props.route.params;
  const [paramsData, setParamsData] = useState(props.route.params);
  const [showModal, setShowModal] = useState(false);
  const [project_name, setProjectName] = useState(
    props.route.params.project_name,
  );
  const [dataBrosurFetch, setDataBrosur] = useState([]);
  const [emailCust, setEmailCust] = useState('');
  const [phoneCust, setPhoneCust] = useState('');

  const [dataListEnquiry, setDataListEnquiry] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    getDataListEnquiry();
  }, []);
  const getDataListEnquiry = () => {
    const lot_type = paramsData.lot_type;
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
        params: {lot_type: lot_type},
      };
      console.log('formdaata get pm lot', config);
      axios(config)
        .then(result => {
          const pasing = result.data.Data;
          console.log('data di lot type', pasing);
          setDataListEnquiry(pasing);
        })
        .catch(error =>
          console.log('error getdata pm lot type error', error.response),
        );
    } catch (error) {
      console.log('ini konsol eror pm lot type', error);
    }
  };

  const sendReq_ = () => {};

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
                  </View>
                </View>
                <View style={{marginHorizontal: 15, marginVertical: 5}}>
                  <Text
                    style={{
                      fontFamily: Fonts.type.Lato,
                      color: BaseColor.corn50,
                      marginVertical: 5,
                    }}>
                    50.2cm
                  </Text>
                </View>
              </View>

              <Button
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
              </Button>
            </View>
          </View>
        </View>
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
                        unittype: paramsData.descs,
                      })
                    }
                    title={item.descs}
                    nameicon={
                      item.status == 'B'
                        ? 'door-closed'
                        : item.status == 'A'
                        ? 'door-open'
                        : item.status == 'S' //ini status nya ngambil darimana
                        ? 'door-closed'
                        : 'times'
                    }
                    type={item.zone_cd} //sementara zone_code
                    status_unit={
                      // item.lot_no
                      item.status == 'B'
                        ? 'B'
                        : item.status == 'A'
                        ? 'A'
                        : item.status == 'S' //ini status nya ngambil darimana
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
    </SafeAreaView>
  );
};

export default UnitEnquiryList;

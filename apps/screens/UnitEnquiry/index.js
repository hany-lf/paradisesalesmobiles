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
  RefreshControl,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import React, {useState, useEffect, useCallback} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Modal} from 'react-native';

import {useIsFocused} from '@react-navigation/native';
import styles from './styles';
import {API_URL} from '@env';
import getUser from '../../selectors/UserSelectors';
import {useSelector, useDispatch, connect} from 'react-redux';
import axios from 'axios';
const UnitEnquiry = props => {
  const {t} = useTranslation();
  const user = useSelector(state => getUser(state));
  const {navigation} = props;
  const {width} = useWindowDimensions().width;
  console.log('params dari choose project', props.route.params);
  // const paramsData = props.route.params;
  const [paramsData, setParamsData] = useState(props.route.params);
  const project_no = paramsData.project_no;
  const entity_cd = paramsData.entity_cd;
  const [showModal, setShowModal] = useState(false);
  const [project_name, setProjectName] = useState(
    props.route.params.project_name,
  );
  const [dataBrosurFetch, setDataBrosur] = useState([]);
  const [emailCust, setEmailCust] = useState('');
  const [phoneCust, setPhoneCust] = useState('');
  const [data_LotType, setData_LotType] = useState([]);
  const [countUnit, setCountUnit] = useState([]);
  const [countUnitAvailable, setCountUnitAvailable] = useState([]);
  const [countUnitNotAvailable, setCountUnitNotAvailable] = useState([]);
  const [countUnitBooked, setCountUnitBooked] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const isFocused = useIsFocused();
  useEffect(() => {
    getData_LotType();
    getCountUnit();
  }, []);

  const groupBy = (objectArray, property) => {
    return objectArray.reduce(function (accumulator, currentObject) {
      let key = currentObject[property];
      if (!accumulator[key]) {
        accumulator[key] = [];
      }
      accumulator[key].push(currentObject);
      return accumulator;
    }, {});
  };

  const getData_LotType = () => {
    console.log('entity_cd', entity_cd);
    try {
      const config = {
        method: 'get',
        // url: 'http://dev.ifca.co.id:8080/apiciputra/api/approval/groupMenu?approval_user=MGR',
        url: API_URL + '/unit-enquiry/lot-type',
        headers: {
          'content-type': 'application/json',
          // 'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Bearer ${user.Token}`,
        },
        // params: {approval_user: user.userIDToken.UserId},
        params: {entity_cd: entity_cd, project_no: project_no},
      };
      console.log('formdaata get lot type', config);
      axios(config)
        .then(result => {
          const pasing = result.data.Data;
          console.log('data di lot type', pasing);

          setData_LotType(pasing);
        })
        .catch(error =>
          console.log('error getdata lot type error', error.response),
        );
    } catch (error) {
      console.log('ini konsol eror lot type', error);
    }
  };

  const getCountUnit = () => {
    console.log('entity_cd', entity_cd);
    try {
      const config = {
        method: 'get',
        // url: 'http://dev.ifca.co.id:8080/apiciputra/api/approval/groupMenu?approval_user=MGR',
        url: API_URL + '/unit-enquiry/count-unit',
        headers: {
          'content-type': 'application/json',
          // 'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Bearer ${user.Token}`,
        },
        // params: {approval_user: user.userIDToken.UserId},
        params: {entity_cd: entity_cd, project_no: project_no},
      };
      console.log('formdaata get lot type', config);
      axios(config)
        .then(result => {
          const pasing = result.data.Data;

          const available = pasing.available;
          const not_available = pasing.not_available;
          const booked = pasing.booked;
          console.log('data di lot type', pasing);
          setCountUnit(pasing);

          setCountUnitAvailable(available);
          setCountUnitNotAvailable(not_available);
          setCountUnitBooked(booked);
        })
        .catch(error =>
          console.log('error getdata lot type error', error.response),
        );
    } catch (error) {
      console.log('ini konsol eror lot type', error);
    }
  };

  const sendReq_ = () => {};

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getData_LotType();
    getCountUnit();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={[BaseStyle.safeAreaView, {backgroundColor: BaseColor.whiteColor}]}>
      <Header
        title={t('unit_enquiry')}
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View
          //   key={index}
          // style={styles.item}
          style={{
            width: '100%',
            height: 300,
            paddingHorizontal: 30,
            marginVertical: 10,
            // marginHorizontal
          }}>
          {/* <Text>{paramsData.picture_url}</Text> */}
          <Image
            source={{uri: paramsData.picture_url}}
            style={{
              width: '100%',
              // width: 300,
              height: 300,
              // marginTop: 10,
              // paddingTop: 10,
              // ...StyleSheet.absoluteFillObject,
              resizeMode: 'cover',
              borderRadius: 25,
            }}
          />

          <View
            style={{
              position: 'absolute',
              backgroundColor: BaseColor.grey10,
              // top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              height: 80,

              marginHorizontal: 55,
              marginVertical: 20,
              borderRadius: 20,
              opacity: 0.8,
              // justifyContent: 'center',
              // alignItems: 'center',
            }}>
            <View style={{marginVertical: 10, marginHorizontal: 25}}>
              <Text
                style={{
                  fontFamily: Fonts.type.LatoBlack,
                  color: BaseColor.corn90,
                  marginVertical: 5,
                  fontSize: 16,
                }}>
                {paramsData.project_descs}
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.type.LatoBold,
                  color: BaseColor.corn50,
                  marginVertical: 5,
                }}>
                {paramsData.caption_address}
              </Text>
            </View>
          </View>
        </View>

        {console.log('count unitttt', countUnit)}

        {data_LotType.length != 0 ? (
          data_LotType.map((item, index) => (
            <View
              key={index}
              style={{
                backgroundColor: BaseColor.corn10,
                borderRadius: 15,
                marginVertical: 10,
                marginHorizontal: 20,
                // marginRight: 20,
              }}>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    // justifyContent: 'space-between',
                    margin: 10,
                  }}>
                  <Image
                    source={{uri: item.picture_url}} //ini sementara pake picture dari params data, sbnrnya ada pict url nya masing2 lot type
                    style={{
                      width: 150,
                      height: 150,
                      borderRadius: 15,
                    }}></Image>
                  <View>
                    <View style={{marginLeft: 20}}>
                      <View>
                        <Text style={{fontFamily: Fonts.type.LatoBold}}>
                          {item.property_cd}
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: 15,
                        }}>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          {/* <Text
                            style={{
                              fontFamily: Fonts.type.Lato,
                              color: BaseColor.corn50,
                            }}>
                            6
                          </Text> */}

                          {/* <Text>0</Text> */}

                          <View
                            style={{
                              width: 10,
                              height: 10,
                              backgroundColor: 'yellow',
                              marginHorizontal: 5,
                            }}></View>
                        </View>

                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <View
                            style={{
                              width: 10,
                              height: 10,
                              backgroundColor: 'red',
                              marginHorizontal: 5,
                            }}></View>
                        </View>

                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          {countUnitBooked
                            .filter(
                              itemCount => itemCount.type == item.lot_type,
                            )
                            .map((countTotal, indexTotal) => (
                              <Text
                                key={indexTotal}
                                style={{
                                  fontFamily: Fonts.type.Lato,
                                  color: BaseColor.corn50,
                                }}>
                                {countTotal.total}
                              </Text>
                            ))}
                          <View
                            style={{
                              width: 10,
                              height: 10,
                              backgroundColor: 'green',
                              marginHorizontal: 5,
                            }}></View>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginVertical: 2,
                          marginTop: 10,
                        }}>
                        <Icon
                          style={{marginRight: 5}}
                          name={'shower'}
                          size={14}
                          color={BaseColor.corn50}></Icon>
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: Fonts.type.Lato,
                            color: BaseColor.corn50,
                          }}>
                          {item.qty_bathroom} bathroom
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginVertical: 2,
                        }}>
                        <Icon
                          style={{marginRight: 5}}
                          name={'bed'}
                          size={14}
                          color={BaseColor.corn50}></Icon>
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: Fonts.type.Lato,
                            color: BaseColor.corn50,
                          }}>
                          {item.qty_bedroom} bedroom
                        </Text>
                      </View>
                      {/* <View>
                        <Text
                          style={{
                            fontFamily: Fonts.type.Lato,
                            color: BaseColor.corn50,
                            marginVertical: 5,
                          }}>
                          {item.luas == null ? 0 : item.luas} m2
                        </Text>
                      </View> */}
                    </View>

                    <Button
                      onPress={() =>
                        navigation.navigate('UnitEnquiryList', item)
                      }
                      style={{
                        backgroundColor: BaseColor.corn50,
                        // width: '80%',
                        marginLeft: 20,
                        paddingHorizontal: 40,
                        // marginHorizontal: 20,
                        height: 40,
                        marginTop: 15,
                      }}
                      rounded
                      //   medium
                    >
                      <Text
                        style={{
                          color: BaseColor.whiteColor,
                          fontSize: 12,

                          fontFamily: Fonts.type.Lato,
                        }}>
                        Choose Unit
                      </Text>
                    </Button>
                  </View>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View
            style={{
              backgroundColor: BaseColor.corn10,
              borderRadius: 15,
              marginVertical: 10,
              marginHorizontal: 20,
              // marginRight: 20,
            }}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  // justifyContent: 'space-between',
                  margin: 10,
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.type.Lato,
                    fontSize: 14,
                    color: BaseColor.corn70,
                  }}>
                  No Data Available
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* <Modal visible={showModal} animationType="slide" transparent={false}>
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
                  Brochure
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
              <View style={{marginHorizontal: 30, marginVertical: 20}}>
                <Text
                  style={{
                    fontFamily: Fonts.type.LatoBold,
                    fontSize: 16,
                    color: BaseColor.corn70,
                  }}>
                  Request a Brochure
                </Text>

                <TextInput
                  style={[
                    // BaseStyle.textInput,/
                    {marginVertical: 30, height: 100},
                  ]}
                  onChangeText={text => setMessage(text)}
                  //   onChangeText={text => console.log('type', text)}
                  autoCorrect={false}
                  placeholder={t('your_message')}
                  value={messageCust}
                  selectionColor={BaseColor.primary}
                  multiline
                  numberOfLines={4}
                  position={'left'}
                  icon={
                    <Icon
                      style={{marginHorizontal: 10}}
                      name={'whatsapp'}
                      size={24}
                      color={BaseColor.corn50}
                    />
                  }
                />

                <Button
                  onPress={() => sendReq_()}
                  round
                  style={{
                    height: 50,
                    backgroundColor: BaseColor.corn50,
                    // borderRadius: 15,
                  }}
                  medium>
                  <Text
                    style={{
                      fontFamily: Fonts.type.Lato,
                      fontSize: 14,
                      color: BaseColor.whiteColor,
                      alignSelf: 'center',
                    }}>
                    Send
                  </Text>
                </Button>
              </View>
            </ScrollView>
          </View>
        </View>

    
      </Modal> */}
    </SafeAreaView>
  );
};

export default UnitEnquiry;

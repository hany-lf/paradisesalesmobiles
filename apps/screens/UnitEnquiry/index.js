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
const UnitEnquiry = props => {
  const {t} = useTranslation();
  //   const dummyFAQ = dummy_faq.menu_faq;
  const {navigation} = props;
  const {width} = useWindowDimensions().width;
  console.log('params dari choose project', props.route.params);
  // const paramsData = props.route.params;
  const [paramsData, setParamsData] = useState(props.route.params);
  const [showModal, setShowModal] = useState(false);
  const [project_name, setProjectName] = useState(
    props.route.params.project_name,
  );
  const [dataBrosurFetch, setDataBrosur] = useState([]);
  const [emailCust, setEmailCust] = useState('');
  const [phoneCust, setPhoneCust] = useState('');

  const isFocused = useIsFocused();
  useEffect(() => {
    getData();
  });
  const getData = () => {};

  const sendReq_ = () => {};

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
      <ScrollView>
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
          {/* <Text>{item.image}</Text> */}
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
                {paramsData.entity_name}
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.type.LatoBold,
                  color: BaseColor.corn50,
                  marginVertical: 5,
                }}>
                {paramsData.location}
              </Text>
            </View>
          </View>
        </View>

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
                // justifyContent: 'space-between',
                margin: 10,
              }}>
              <Image
                source={{uri: paramsData.picture_url}}
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 15,
                }}></Image>
              <View>
                <View style={{marginLeft: 20}}>
                  <View>
                    <Text style={{fontFamily: Fonts.type.LatoBold}}>
                      2BR Suites
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 15,
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
                  <View>
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
                  onPress={() =>
                    navigation.navigate('UnitEnquiryList', paramsData)
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

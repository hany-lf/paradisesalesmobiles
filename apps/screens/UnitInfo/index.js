import {Text, Header, Icon, Button} from '@components';

import {View, ScrollView, Image, TouchableOpacity, Modal} from 'react-native';
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

const UnitInfo = props => {
  const {navigation} = props;
  const {t} = useTranslation();
  const user = useSelector(state => getUser(state));
  const [showPromo, setShowPromo] = useState(false);
  const [paramsData, setParamsData] = useState(props.route.params);
  console.log('params data untuk unit info', paramsData);
  const showModalPromo = () => {
    setShowPromo(true);
  };

  const closeShowModalPromo = () => {
    setShowPromo(false);
  };

  const dataPromo = [
    {title: 'tes', descs: 'ini decs', date: '27 agustus 2023'},
  ];
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
          <View style={{marginVertical: 10, marginHorizontal: 10}}>
            <Image
              source={require('@assets/images/promonews/promo2.png')}
              style={{
                width: 150,
                height: 150,
                resizeMode: 'contain',
                borderRadius: 15,
              }}></Image>
          </View>
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
              {paramsData.unittype}
            </Text>

            <Text
              numberOfLines={4}
              style={{
                marginTop: 5,
                fontSize: 16,
                fontFamily: Fonts.type.Lato,
                color: BaseColor.corn70,
              }}>
              Unit E-10
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
                  2 Bedroom
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
                  1 Bathroom
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
                68 SQM Nett / 80.2 SQM Semi gross
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

          <Text
            style={{
              fontFamily: Fonts.type.Lato,
              color: BaseColor.corn70,
              fontSize: 14,
            }}>
            Lorem ipsum dolor sit amet consectetur. Pharetra lacus hendrerit
            purus urna orci lectus. Enim enim elementum nunc praesent maecenas
            vulputate nunc. Quisque ac sed lectus eu adipiscing tellus lacus
            diam.
          </Text>

          <TouchableOpacity onPress={() => setModalVisible(true)}>
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
                style={{marginRight: 15}}
                name={'bed'}
                size={13}
                color={BaseColor.corn70}></Icon>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: Fonts.type.Lato,
                  color: BaseColor.corn70,
                }}>
                1 Bedroom
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
                1 Bathroom
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

          <Image
            style={{alignSelf: 'center'}}
            width={100}
            height={100}
            source={require('@assets/images/floorplan/unitplan.png')}></Image>
        </View>
      </ScrollView>

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
    </SafeAreaView>
  );
};

export default UnitInfo;

import {Text, Header, Icon} from '@components';

import {
  useWindowDimensions,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
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
import PromoModal from './Modal/PromoModal';
import moment from 'moment';
const PromoScreen = props => {
  const [showPromo, setShowPromo] = useState(false);

  const {navigation} = props;
  const {t} = useTranslation();
  const user = useSelector(state => getUser(state));

  const [dataPromo, setDataPromo] = useState([]);
  const [paramsData, setParamsData] = useState(props.route.params);
  console.log('params data', paramsData);
  const {width} = useWindowDimensions();
  const [itemsParams, setItemsParams] = useState();

  useEffect(() => {
    getDataPromo();
  }, []);

  const getDataPromo = () => {
    // const entity_cd = paramsData.entity_cd;
    // const project_no = paramsData.project_no;
      const entity_cd = '0321';
    const project_no = '0321';

    try {
      const config = {
        method: 'get',
        // url: 'http://dev.ifca.co.id:8080/apiciputra/api/approval/groupMenu?approval_user=MGR',
        url: API_URL + '/promo/index',
        headers: {
          'content-type': 'application/json',
          // 'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Bearer ${user.Token}`,
        },
        // params: {approval_user: user.userIDToken.UserId},
        params: {entity_cd: entity_cd, project_no: project_no},
      };
      console.log('formdaata get promo', config);
      axios(config)
        .then(result => {
          const pasing = result.data.Data;
          const filterdata = pasing.filter(pasing => pasing.status == 'Active');
          console.log('data di promo', filterdata);
          setDataPromo(filterdata);
        })
        .catch(error =>
          console.log('error getdata promo error', error.response),
        );
    } catch (error) {
      console.log('ini konsol eror promo', error);
    }
  };

  const showModalPromo = item => {
    setShowPromo(true);
    setItemsParams(item);
  };

  const closeShowModalPromo = () => {
    setShowPromo(false);
  };

  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={[BaseStyle.safeAreaView, {backgroundColor: BaseColor.whiteColor}]}>
      <Header
        title={t('promo')}
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
        onPressRight={() => {
          navigation.navigate(Alert.alert('ini kanan'));
        }}
        renderRight={() => {
          return (
            <Icon
              // name="angle-left"
              name="download"
              size={18}
              color={BaseColor.corn70}
              enableRTL={true}
            />
          );
        }}
      />
      <ScrollView>
        {dataPromo.length != 0 ? (
          dataPromo.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{marginVertical: 10}}
              onPress={() => showModalPromo(item)}>
              <View
                style={{
                  backgroundColor: BaseColor.corn10,
                  borderRadius: 15,
                  // width: '100%',
                  marginHorizontal: 20,
                  // flex: 1,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    // justifyContent: 'space-evenly',
                    justifyContent: 'space-around',
                    // width: '100%',
                    marginHorizontal: 5,
                  }}>
                  <View
                    style={{
                      width: '50%',
                      marginVertical: 10,
                      marginHorizontal: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: Fonts.type.LatoBold,
                        color: BaseColor.corn70,
                      }}>
                      {item.promo_title}
                    </Text>

                    <Text
                      numberOfLines={4}
                      style={{
                        marginTop: 5,
                        fontSize: 12,
                        fontFamily: Fonts.type.Lato,
                        color: BaseColor.corn70,
                      }}>
                      {item.promo_descs
                        .replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, '')
                        .replace(/(&nbsp;)/g, ' ')
                        .replace(/(&ndash;)/g, '-')
                        .replace(/(&amp;)/g, `&`)}
                    </Text>
                    <View style={{justifyContent: 'flex-end', flex: 1}}>
                      <Text
                        style={{
                          fontSize: 10,
                          fontFamily: Fonts.type.Lato,
                          color: BaseColor.corn50,
                        }}>
                        {moment(item.date_created).format('MMMM Do YYYY')}
                      </Text>
                    </View>
                  </View>
                  <View style={{marginVertical: 10, marginHorizontal: 10}}>
                    <Image
                      source={{uri: item.url_image}}
                      // source={require('@assets/images/promonews/promo2.png')}
                      style={{
                        width: 150,
                        height: 150,
                        resizeMode: 'contain',
                        borderRadius: 15,
                      }}></Image>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View>
            <Text>Data not available</Text>
          </View>
        )}
      </ScrollView>

      <PromoModal
        onRequestClose={() => {
          setShowPromo(false);
        }}
        visible={showPromo}
        icon={
          <TouchableOpacity onPress={() => setShowPromo(false)}>
            <Icon name={'arrow-left'} size={18} color={BaseColor.corn90}></Icon>
          </TouchableOpacity>
        }
        datas={itemsParams}></PromoModal>
    </SafeAreaView>
  );
};

export default PromoScreen;

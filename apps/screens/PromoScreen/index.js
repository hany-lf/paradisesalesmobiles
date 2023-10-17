import {Text, Header, Icon} from '@components';

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
import PromoModal from './Modal/PromoModal';
const PromoScreen = props => {
  const {navigation} = props;
  const {t} = useTranslation();
  const user = useSelector(state => getUser(state));
  const [showPromo, setShowPromo] = useState(false);

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
      />
      <ScrollView>
        <TouchableOpacity onPress={() => showModalPromo()}>
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
                  Dapatkan diskon akhir tahun sekarang juga!
                </Text>

                <Text
                  numberOfLines={4}
                  style={{
                    marginTop: 5,
                    fontSize: 12,
                    fontFamily: Fonts.type.Lato,
                    color: BaseColor.corn70,
                  }}>
                  Lorem ipsum dolor sit amet consectetur. Est et euismod eget
                  nam amet quam sed. Sed purus vitae aliquam arcu commodo et non
                  et.
                </Text>
                <View style={{justifyContent: 'flex-end', flex: 1}}>
                  <Text
                    style={{
                      fontSize: 10,
                      fontFamily: Fonts.type.Lato,
                      color: BaseColor.corn50,
                    }}>
                    27 Agustus 2023
                  </Text>
                </View>
              </View>
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
            </View>
          </View>
        </TouchableOpacity>
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
        datas={dataPromo}></PromoModal>
    </SafeAreaView>
  );
};

export default PromoScreen;

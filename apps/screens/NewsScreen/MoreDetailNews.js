import {Text, Header, Icon} from '@components';

import {
  useWindowDimensions,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
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
import NewsModal from './Modal/NewsModal';
import moment from 'moment';

import RenderHtml, {
  defaultSystemFonts,
  HTMLElementModel,
  HTMLContentModel,
} from 'react-native-render-html';

const MoreDetailNews = props => {
  const {navigation} = props;
  const {t} = useTranslation();
  const user = useSelector(state => getUser(state));

  const [paramsData, setParamsData] = useState(props.route.params);
  console.log('params data', paramsData);
  const [itemsParams, setItemsParams] = useState();
  const [showNews, setShowNews] = useState(false);

  const showModalNews = item => {
    console.log('item modal news', item);
    setShowNews(true);
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
        title={t('More Promo')}
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
        {paramsData.map((items, key) => (
          <TouchableOpacity
            key={key}
            style={{marginVertical: 10}}
            onPress={() => showModalNews(items)}>
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
                    {items.news_title}
                  </Text>

                  <Text
                    numberOfLines={4}
                    style={{
                      marginTop: 5,
                      fontSize: 12,
                      fontFamily: Fonts.type.Lato,
                      color: BaseColor.corn70,
                    }}>
                    {items.news_descs
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
                      {moment(items.date_created).format('MMMM Do YYYY')}
                    </Text>
                  </View>
                </View>
                <View style={{marginVertical: 10, marginHorizontal: 10}}>
                  <Image
                    source={{uri: items.url_image}}
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
        ))}
      </ScrollView>

      <NewsModal
        onRequestClose={() => {
          setShowNews(false);
        }}
        visible={showNews}
        icon={
          <TouchableOpacity onPress={() => setShowNews(false)}>
            <Icon name={'arrow-left'} size={18} color={BaseColor.corn90}></Icon>
          </TouchableOpacity>
        }
        datas={itemsParams}></NewsModal>
    </SafeAreaView>
  );
};

export default MoreDetailNews;

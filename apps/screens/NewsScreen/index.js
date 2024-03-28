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

import dummy_news from './dummy_news.json';
const NewsScreen = props => {
  const {navigation} = props;
  const {t} = useTranslation();
  const user = useSelector(state => getUser(state));
  const [showNews, setShowNews] = useState(false);
  const [dataNews, setDataNews] = useState([]);
  const [paramsData, setParamsData] = useState(props.route.params);
  console.log('params data', paramsData); 
  const {width} = useWindowDimensions();
  const [itemsParams, setItemsParams] = useState();
  const [dummyNews, setDummyNews] = useState(dummy_news.Data);

  useEffect(() => {
    getDataNews();
  }, []);

  const getDataNews = () => {
    // const entity_cd = paramsData.entity_cd;
    // const project_no = paramsData.project_no;

    const entity_cd = dummyNews.entity_cd;
    const project_no = dummyNews.project_no;
    try {
      const config = {
        method: 'get',
        // url: 'http://dev.ifca.co.id:8080/apiciputra/api/approval/groupMenu?approval_user=MGR',
        url: API_URL + '/news/index',
        headers: {
          'content-type': 'application/json',
          // 'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Bearer ${user.Token}`,
        },
        // params: {approval_user: user.userIDToken.UserId},
        // params: {entity_cd: entity_cd, project_no: project_no},
        params: {},
      };
      console.log('formdaata get lot type', config);
      axios(config)
        .then(result => {
          // const pasing = dummy_news;
          const pasing = result.data.Data;
          console.log('pasing data', pasing);
          // const filterdata = pasing.filter(
          //   pasing => pasing.status == 'Active',
          // );
          // console.log('data di news', filterdata);
          // setDataNews(filterdata);

          // pasing.forEach((item, id) => {
          //   item.type === project_no
          //     ? ((filterdata = pasing.filter(
          //         pasing =>
          //           pasing.status == 'Active' && pasing.type == project_no,
          //       )),
          //       setDataNews(filterdata))
          //     : ((filterdata = pasing.filter(
          //         pasing =>
          //           pasing.status == 'Active' && pasing.type == 'General',
          //       )),
          //       setDataNews(filterdata));
          // });

          const cek = pasing.filter(
            item =>
              // item.project_no === project_no &&
              item.status === 'Active' &&
              (item.type === 'General' || item.type === project_no),
          );

          console.log('data di news', cek);
          setDataNews(cek);
        })
        .catch(error => console.log('error getdata news error', error));
    } catch (error) {
      console.log('ini konsol eror news', error);
    }
  };

  const showModalNews = item => {
    console.log('item modal news', item);
    setShowNews(true);
    setItemsParams(item);
  };

  const closeShowModalNews = () => {
    setShowNews(false);
  };

  const DetailNews = (detail, key) => {
    // console.log('detail haa', detail);

    return detail.slice(0, 3).map((item, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => showModalNews(item)}
        style={{marginVertical: 10}}>
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
                  // textAlign: 'justify',
                }}>
                {item.news_title}
              </Text>

              <Text
                numberOfLines={4}
                style={{
                  marginTop: 5,
                  fontSize: 12,
                  fontFamily: Fonts.type.Lato,
                  color: BaseColor.corn70,
                  // textAlign: 'justify',
                }}>
                {item.news_descs
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
                  resizeMode: 'cover',
                  borderRadius: 15,
                }}></Image>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    ));
  };

  // const dataNews = [{title: 'tes', descs: 'ini decs', date: '27 agustus 2023'}];
  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={[BaseStyle.safeAreaView, {backgroundColor: BaseColor.whiteColor}]}>
      <Header
        title={t('news')}
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
        {dummyNews.length != 0 ? (
          dummyNews.map((item, index) => (
            <View key={index}>
              <View style={{flexDirection: 'row', padding: 10}}>
                <Icon
                  name={'city'}
                  size={18}
                  color={BaseColor.corn70}
                  style={{marginRight: 10}}></Icon>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: Fonts.type.LatoBold,
                    color: BaseColor.corn70,
                  }}>
                  {item.descs}
                </Text>
              </View>
              {DetailNews(item.detail)}
              <View
                style={{
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                {item.detail.length > 3 ? (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('MoreDetailNews', item.detail)
                    }>
                    <Text
                      style={{
                        fontFamily: Fonts.type.Lato,
                        fontSize: 13,
                        color: BaseColor.corn50,
                      }}>
                      Mores...
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          ))
        ) : (
          <View
            style={{
              backgroundColor: BaseColor.corn10,
              borderRadius: 15,
              // width: '100%',
              marginHorizontal: 20,
              // flex: 1,
            }}>
            <Text
              style={{
                fontSize: 12,
                fontFamily: Fonts.type.Lato,
                color: BaseColor.corn70,
              }}>
              Data not available
            </Text>
          </View>
        )}
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

export default NewsScreen;

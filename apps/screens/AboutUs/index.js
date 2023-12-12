import {Text, SafeAreaView, Header, Icon} from '@components';
import {BaseStyle, BaseColor, Fonts} from '../../config';
import {useTranslation} from 'react-i18next';
import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
  RefreshControl,
} from 'react-native';
import RenderHtml, {defaultSystemFonts} from 'react-native-render-html';
// import data_about from './data_aboutus.json';
import {ScrollView} from 'react-native-gesture-handler';
import axios from 'axios';
import {API_URL} from '@env';
import getUser from '../../selectors/UserSelectors';
import {useDispatch, useSelector} from 'react-redux';

const AboutUs = props => {
  const {t} = useTranslation();
  const systemFonts = [...defaultSystemFonts, global.fontRegular];
  //   const dummyFAQ = dummy_faq.menu_faq;
  const {navigation} = props;
  const {width} = useWindowDimensions().width;
  const user = useSelector(state => getUser(state));
  // console.log('descs', data_about.data_about[0].descs);
  const [dataAbout, setDataAbout] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  //   const source = {
  //     // html: data_about.data_about[0].descs,
  //     html: data_about.data_about,
  //   };

  // const source = data_about.data_about;

  useEffect(() => {
    getDataAbout();
  }, []);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getDataAbout();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
  const getDataAbout = () => {
    // const entity_cd = paramsData.entity_cd;
    // const project_no = paramsData.project_no;
    try {
      const config = {
        method: 'get',
        // url: 'http://dev.ifca.co.id:8080/apiciputra/api/approval/groupMenu?approval_user=MGR',
        url: API_URL + '/about-us/index',
        headers: {
          'content-type': 'application/json',
          // 'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Bearer ${user.Token}`,
        },
        // params: {approval_user: user.userIDToken.UserId},
        params: {},
      };
      console.log('formdaata get lot type', config);
      axios(config)
        .then(result => {
          const pasing = result.data.Data;

          setDataAbout(pasing);
        })
        .catch(error =>
          console.log('error getdata about error', error.response),
        );
    } catch (error) {
      console.log('ini konsol eror about', error);
    }
  };

  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={[BaseStyle.safeAreaView, {backgroundColor: BaseColor.whiteColor}]}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Header
          title={t('about_us')}
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
        <View style={{marginHorizontal: 20, flex: 1}}>
          {dataAbout.map((item, index) => {
            console.log('item source', item.about_descs);
            return (
              <View>
                <RenderHtml
                  contentWidth={width}
                  source={{html: item.about_descs}}
                  systemFonts={systemFonts}
                  tagsStyles={{
                    p: {
                      color: BaseColor.corn70,
                      fontSize: 12,
                      fontFamily: Fonts.type.LatoBold,
                      textAlign: 'justify',
                    },
                  }}
                />

                <Text style={{fontFamily: Fonts.type.LatoBold, fontSize: 15}}>
                  Our Contact
                </Text>
                <RenderHtml
                  contentWidth={width}
                  source={{html: item.address}}
                  systemFonts={systemFonts}
                  tagsStyles={{
                    p: {
                      color: BaseColor.corn70,
                      fontSize: 12,
                      fontFamily: Fonts.type.LatoBold,
                    },
                  }}
                />

                <RenderHtml
                  contentWidth={width}
                  source={{html: item.contact_info}}
                  systemFonts={systemFonts}
                  tagsStyles={{
                    p: {
                      color: BaseColor.corn70,
                      fontSize: 12,
                      fontFamily: Fonts.type.LatoBold,
                    },
                  }}
                />

                <RenderHtml
                  contentWidth={width}
                  source={{html: item.phone}}
                  systemFonts={systemFonts}
                  tagsStyles={{
                    p: {
                      color: BaseColor.corn70,
                      fontSize: 12,
                      fontFamily: Fonts.type.LatoBold,
                    },
                  }}
                />
              </View>
            );
            // (

            // )
          })}
          {/* <RenderHtml contentWidth={width} source={source}  /> */}
          {/* <Text style={{textAlign: 'justify'}}>
          Explore the archipelago`s most exciting and iconic properties,
          presented by Paradise Indonesia. For over 20 years, we have been
          change makers and purposeful pioneers. We take risks for a chance to
          better lives and impact communities by elevating spaces and
          experiences. Discover what we have to offer and how we are bringing
          Paradise`s unique brand of delight across Indonesia`s major urban
          cities. Since our humble beginnings in 2002, our journey has been
          guided by a passion for developing spaces that transcend the visual
          and the functional, towards finding new and exciting ways to deliver
          exceptional consumer satisfaction and market fit. Since then, we have
          established a reputation for visionary projects that successfully
          deliver elevated spaces, curated experiences, and lasting impressions
          that draw people to return again and again. Today, our imaginative
          lifestyle projects offer inspiring designs that invite, engage, and
          result in vibrant developments that become destinations and landmarks
          in their own right.
        </Text>
        <Text>Our Contact</Text>
        <Text>
          PT Indonesian Paradise Property Tbk & Subsidiaries Centennial Tower,
          30th Floor Jl. Gatot Subroto Kav. 24-25 Jakarta 12930, Indonesia
        </Text>
        <Text>
          info@paradiseindonesia.com corporate.secretary@paradiseindonesia.com
          investor.relations@paradiseindonesia.com
        </Text>
        <Text>Tel (62-21) 29880466 Fax (62-21) 29880460</Text> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default AboutUs;

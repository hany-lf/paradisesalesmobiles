import {Text, Button, Icon, Header} from '@components';
import {View, TouchableOpacity, Modal, ScrollView, Image} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BaseStyle, Fonts, BaseColor} from '@config';
import {useTranslation} from 'react-i18next';

const NewsWithoutModal = props => {
  const {navigation} = props;
  //   const {onPress, datas, visibleMod, icon, ...attrs} = props;
  //   console.log('attrs ?', attrs);
  //   console.log('datas nya', datas);
  //   console.log('visiblemodal', visibleMod);
  //   const [visibleModal, setVisibleModal] = useState(visibleMod);
  //   console.log('visiblemodaldifeature', visibleModal);
  const {t} = useTranslation();
  const [detailNews, setDetailNews] = useState(props.route.params.datas);
  console.log('detil news', detailNews);
  const close = () => {
    setVisibleModal(false);
  };
  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={[BaseStyle.safeAreaView, {backgroundColor: BaseColor.whiteColor}]}>
      <Header
        title={t('news_detail')}
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
      {detailNews == null ? (
        <View>
          <Text>No Data Promo Detail</Text>
        </View>
      ) : (
        <ScrollView>
          <View style={{marginHorizontal: 30, marginVertical: 20}}>
            <View
            // style={{width: 200, height: 100}}
            >
              <Image
                //   source={{uri: detailNews.url_image}}
                source={require('@assets/images/home/slider-project/sudirmansuite.jpeg')}
                style={{
                  width: '100%',
                  // width: 300,
                  height: 200,
                  // marginTop: 10,
                  // paddingTop: 10,
                  // ...StyleSheet.absoluteFillObject,
                  resizeMode: 'contain',
                  borderRadius: 25,
                }}></Image>
            </View>
            <View style={{marginVertical: 20}}>
              <Text
                style={{textAlign: 'justify', fontFamily: Fonts.type.Lato}}
                numberOfLines={0} // ini wajib ada kalo menggunakan Text dari component
              >
                {detailNews.news_descs.replace(/(<([^>]+)>)/gi, '')}
              </Text>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default NewsWithoutModal;

import {Text, Button, Icon, Header} from '@components';
import {View, TouchableOpacity, Modal, ScrollView, Image} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BaseStyle, Fonts, BaseColor} from '@config';
import {useTranslation} from 'react-i18next';
import moment from 'moment';
import ImageViewer from 'react-native-image-zoom-viewer';

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
  const [dataImage, setDataImage] = useState([]);
  const [showImage, setShowImage] = useState(false);
  console.log('detil news', detailNews);
  const close = () => {
    setVisibleModal(false);
  };

  const zoomImage = image => {
    const data = [{url: image}];
    console.log('image zoom', image);
    setShowImage(true);
    setDataImage(data);
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
              <View style={{marginBottom: 25}}>
                <Text
                  style={{
                    color: BaseColor.corn70,
                    fontFamily: Fonts.type.LatoBold,
                    fontSize: 16,
                  }}>
                  {detailNews.news_title}
                </Text>
                <Text
                  style={{
                    color: BaseColor.corn70,
                    fontFamily: Fonts.type.Lato,
                    fontSize: 11,
                    marginVertical: 5,
                  }}>
                  Created date:{' '}
                  {moment(detailNews.date_created).format(
                    'DD MMM YYYY - hh:mm',
                  )}
                </Text>
              </View>
              <TouchableOpacity onPress={() => zoomImage(detailNews.url_image)}>
                <Image
                  source={{uri: detailNews.url_image}}
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
              </TouchableOpacity>
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
      <Modal visible={showImage} transparent={true}>
        {/* <TouchableOpacity onPress={() => setShowImage(false)}>
          <Icon
            name={'times'}
            color={BaseColor.blackColor}
            style={{
              fontSize: 14,
            }}></Icon>
        </TouchableOpacity> */}
        <ImageViewer
          renderHeader={() => {
            <TouchableOpacity
              onPress={() => setShowImage(false)}
              style={{backgroundColor: 'red'}}>
              <Icon
                name={'times'}
                color={BaseColor.whiteColor}
                style={{
                  fontSize: 14,
                }}></Icon>
            </TouchableOpacity>;
          }}
          imageUrls={dataImage}
          enableSwipeDown={true}
          onSwipeDown={() => setShowImage(false)}
        />
      </Modal>
    </SafeAreaView>
  );
};

export default NewsWithoutModal;

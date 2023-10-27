import {Text, Button, Icon} from '@components';
import {
  View,
  TouchableOpacity,
  Modal,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BaseStyle, Fonts, BaseColor} from '@config';
import {useTranslation} from 'react-i18next';
const NewsModal = props => {
  const {t} = useTranslation();
  const {onPress, datas, visibleMod, icon, ...attrs} = props;
  console.log('attrs ?', attrs);
  console.log('datas nya', datas);
  console.log('visiblemodal', visibleMod);
  const [visibleModal, setVisibleModal] = useState(visibleMod);
  console.log('visiblemodaldifeature', visibleModal);

  const close = () => {
    setVisibleModal(false);
  };
  return datas == null ? null : ( // <Text>datas null</Text>
    <View
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      }}>
      <Modal {...attrs} animationType="slide" transparent={true}>
        <View
          style={[
            styles.centeredView,
            {
              backgroundColor: BaseColor.whiteColor,
              borderTopRightRadius: 25,
              borderTopLeftRadius: 25,
            },
          ]}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 20,
                marginVertical: 20,
              }}>
              {icon}

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
                  {t('news_detail')}
                </Text>
              </View>
            </View>
            {/* --- border  */}
            <View
              style={{
                borderWidth: 0.3,
                borderColor: BaseColor.corn70,
                borderStyle: 'solid',
              }}></View>
            <ScrollView>
              <View style={{marginBottom: 20}}>
                <View
                  style={{
                    margin: 20,
                    backgroundColor: 'white',
                    // borderRadius: 20,
                    // padding: 35,
                    alignItems: 'center',
                    // shadowColor: '#000',
                    // shadowOffset: {
                    //   width: 0,
                    //   height: 2,
                    // },
                    // shadowOpacity: 0.25,
                    // shadowRadius: 4,
                    // elevation: 5,
                  }}>
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
                      numberOfLines={0} // ini wajib ada kalo menggunakan Text dari component
                      style={{
                        textAlign: 'justify',
                        fontFamily: Fonts.type.Lato,
                        width: '100%',
                      }}>
                      {datas.news_descs.replace(/(<([^>]+)>)/gi, '')}
                    </Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>

        {/* <Button onPress={() => close()} style={{backgroundColor: 'red'}}>
        <Text>close</Text>
      </Button> */}
      </Modal>
    </View>
  );
};

export default NewsModal;

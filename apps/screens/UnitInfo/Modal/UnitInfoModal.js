import {Text, Button, Icon} from '@components';
import {
  View,
  TouchableOpacity,
  Modal,
  Image,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import {BaseStyle, Fonts, BaseColor} from '@config';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

const UnitInfoModal = props => {
  const {onPress, datas, visibleMod, icon, ...attrs} = props;
  console.log('attrs ?', attrs);
  console.log('datas nya', datas);
  console.log('visiblemodal', visibleMod);
  const {t} = useTranslation();
  const [visibleModal, setVisibleModal] = useState(visibleMod);
  console.log('visiblemodaldifeature', visibleModal);
  const insets = useSafeAreaInsets();
  const [dataImage, setDataImage] = useState([]);
  const [showImage, setShowImage] = useState(false);
  const close = () => {
    setVisibleModal(false);
  };

  const zoomImage = items => {
    console.log('items', items);

    const arr = items.map((str, index) => ({
      url: str.plan_url,
    }));
    console.log('arr??', arr);
    const data = arr;
    // const data = [{url: images}]; //biasanya kayak gini, imagesnya itu string object
    console.log('image zoom', data);
    setShowImage(true);
    setDataImage(data);
  };

  const renderHeader = () => (
    <View
      style={[
        styles.header,
        Platform.OS === 'ios' ? {paddingTop: insets.top} : {paddingTop: 10},
      ]}>
      <TouchableOpacity onPress={() => setShowImage(false)}>
        <Icon
          name={'times'}
          color={BaseColor.whiteColor}
          style={{
            fontSize: 16,
          }}></Icon>
      </TouchableOpacity>
    </View>
  );

  return (
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
      <Modal {...attrs} animationType="slide" transparent={false}>
        <View
          style={[
            styles.centeredView,
            {
              backgroundColor: BaseColor.whiteColor,
              borderTopRightRadius: 25,
              borderTopLeftRadius: 25,
              paddingBottom: 40,
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
                  {t('unit_galleries')}
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
                  {datas.map((item, index) => (
                    <View
                      style={{
                        marginHorizontal: 10,
                        marginVertical: 10,
                        // backgroundColor: 'yellow',
                        borderRadius: 10,
                      }}
                      key={index}>
                      <TouchableOpacity
                        // onPress={() => alert('haaa')}
                        onPress={() => zoomImage(datas)}>
                        {/* <Text>{item.image}</Text> */}
                        <Image
                          source={{uri: item.plan_url}}
                          style={{
                            width: '100%',
                            height: 200,
                            resizeMode: 'contain',
                            borderRadius: 10,
                          }}></Image>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>
              <Modal
                visible={showImage}
                transparent={true}
                animationType="slide">
                {renderHeader()}
                {/* <Text style={{color: 'red'}}>
                  hakl ini adalah modal image gallery
                </Text> */}
                {/* <ImageViewer
                  useNativeDriver={true}
                  imageUrls={dataImage}
                  enableSwipeDown={true}
                  onSwipeDown={() => setShowImage(false)}
                  onSave={uri => _saveImages(uri)}
                  menuContext={{
                    saveToLocal: 'Save Image',
                    cancel: 'Cancel',
                  }}
                /> */}
              </Modal>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default UnitInfoModal;

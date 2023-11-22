import {Text, Button, Icon} from '@components';
import {View, TouchableOpacity, Modal, Image} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';

import {BaseStyle, Fonts, BaseColor} from '@config';

const UnitInfoModal = props => {
  const {onPress, datas, visibleMod, icon, ...attrs} = props;
  console.log('attrs ?', attrs);
  console.log('datas nya', datas);
  console.log('visiblemodal', visibleMod);
  const [visibleModal, setVisibleModal] = useState(visibleMod);
  console.log('visiblemodaldifeature', visibleModal);

  const close = () => {
    setVisibleModal(false);
  };
  return (
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
                Unit Galleries
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

          <View style={{marginHorizontal: 30, marginVertical: 20}}>
            <Image
              style={{
                alignSelf: 'center',
                width: '100%',
                height: 200,
                resizeMode: 'contain',
              }}
              source={require('@assets/images/unitgalleries/gallery/1BR-3.jpg')}></Image>
            <Image
              style={{
                alignSelf: 'center',
                width: '100%',
                height: 200,
                resizeMode: 'contain',
              }}
              source={require('@assets/images/unitgalleries/gallery/2BR-2.jpg')}></Image>
            <Image
              style={{
                alignSelf: 'center',
                width: '100%',
                height: 200,
                resizeMode: 'contain',
              }}
              source={require('@assets/images/unitgalleries/gallery/STD-2.jpg')}></Image>
          </View>
        </View>
      </View>

      {/* <Button onPress={() => close()} style={{backgroundColor: 'red'}}>
        <Text>close</Text>
      </Button> */}
    </Modal>
  );
};

export default UnitInfoModal;

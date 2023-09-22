import {Text, Button, Icon, Image} from '@components';
// import Image from '../../../../components/Image';
import {View, TouchableOpacity, Modal} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';

import {BaseStyle, Fonts, BaseColor} from '@config';
import {ScrollView} from 'react-native-gesture-handler';

const Floorplan = props => {
  const {onPress, datas, icon, ...attrs} = props;
  console.log('attrs ?', attrs);
  console.log('datas nya', datas);
  const images = datas.data_floorplan;
  console.log('imagess flooorplan', images);
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
                Floorplan
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
            <View style={{marginHorizontal: 30, marginVertical: 20}}>
              {datas.map((item, index) => (
                <View style={{marginHorizontal: 10}}>
                  <Text key={index}>{item.image}</Text>
                  <Image
                    // source={{uri: item.image}}
                    source={item.image}
                    style={{
                      width: '100%',
                      height: 400,
                      resizeMode: 'cover',
                      // borderRadius: 50,
                    }}></Image>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>

      {/* <Button onPress={() => close()} style={{backgroundColor: 'red'}}>
        <Text>close</Text>
      </Button> */}
    </Modal>
  );
};

export default Floorplan;

import {Text, Button, Icon} from '@components';
import {View, TouchableOpacity, Modal, FlatList} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {ButtonMenuHome} from '@components';
import {BaseStyle, Fonts, BaseColor} from '@config';
import dummy_feature from './dummy_features.json';

const Features = props => {
  const {onPress, datas, visibleMod, icon, ...attrs} = props;
  console.log('attrs ?', attrs);
  console.log('datas nya', datas);
  console.log('visiblemodal', visibleMod);
  const [visibleModal, setVisibleModal] = useState(visibleMod);
  console.log('visiblemodaldifeature', visibleModal);

  const [dataFeatures, setDataFeatures] = useState(dummy_feature.data);
  console.log('datafeature', dataFeatures);
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
                Feature
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

          <View style={{marginHorizontal: 20, marginVertical: 20}}>
            <FlatList
              keyExtractor={item => item.key}
              numColumns={4}
              horizontal={false}
              data={dataFeatures}
              renderItem={({item, index}) => {
                return (
                  <View>
                    <ButtonMenuHome
                      disabled={true}
                      style={{
                        margin: 7,
                        backgroundColor: BaseColor.whiteColor,
                        borderWidth: 0.5,
                        borderColor: BaseColor.corn30,
                        borderStyle: 'solid',
                      }}
                      // onPress={() => clik()}
                      // disabled={disabled}
                      title={item.title}
                      typeIcon={'MCI'}
                      nameicon={item.icon}></ButtonMenuHome>
                  </View>
                );
              }}></FlatList>
            {/* <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <ButtonMenuHome
                style={{
                  backgroundColor: BaseColor.whiteColor,
                  borderWidth: 0.5,
                  borderColor: BaseColor.corn30,
                  borderStyle: 'solid',
                }}
                onPress={() => clik()}
                title={'Playground'}
                typeIcon={'MCI'}
                nameicon={'slide'}></ButtonMenuHome>
              <ButtonMenuHome
                style={{
                  backgroundColor: BaseColor.whiteColor,
                  borderWidth: 0.5,
                  borderColor: BaseColor.corn30,
                  borderStyle: 'solid',
                }}
                onPress={() => clik()}
                title={'Swimming Pool'}
                typeIcon={'MCI'}
                nameicon={'pool'}></ButtonMenuHome>
              <ButtonMenuHome
                style={{
                  backgroundColor: BaseColor.whiteColor,
                  borderWidth: 0.5,
                  borderColor: BaseColor.corn30,
                  borderStyle: 'solid',
                }}
                onPress={() => clik()}
                title={'Park'}
                typeIcon={'MCI'}
                nameicon={'sprout-outline'}></ButtonMenuHome>
              <ButtonMenuHome
                style={{
                  backgroundColor: BaseColor.whiteColor,
                  borderWidth: 0.5,
                  borderColor: BaseColor.corn30,
                  borderStyle: 'solid',
                }}
                onPress={() => clik()}
                title={'CCTV'}
                typeIcon={'MCI'}
                nameicon={'cctv'}></ButtonMenuHome>
            </View> */}
          </View>
        </View>
      </View>

      {/* <Button onPress={() => close()} style={{backgroundColor: 'red'}}>
        <Text>close</Text>
      </Button> */}
    </Modal>
  );
};

export default Features;

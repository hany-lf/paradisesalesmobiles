import RBSheet from 'react-native-raw-bottom-sheet';
import PropTypes from 'prop-types';
import {View, Modal, Pressable, FlatList} from 'react-native';
import {Text, Button} from '@components';
import React, {useState, useEffect, useRef} from 'react';
import styles from './styles';
import {useIsFocused} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BaseStyle, Fonts, BaseColor, BaseSetting} from '../../config';
import {ButtonMenuHome} from '@components';
import {Icon} from '../../components';
import dummy_menu from './dummy_menu.json';
const CustomModal = props => {
  const isFocused = useIsFocused();
  const {navigation} = props;
  console.log('props custom moda', props);
  const showModalProps = props.route.params.showModal;
  console.log('showModalProps', showModalProps);

  // const [showModalProps, setShowModalProps] = useState(
  //   props.route.params.showModal,
  // );
  const [showModal, setShowModal] = useState(props.route.params.showModal);
  const [modalVisible, setModalVisible] = useState(true);
  const [dummyMenu, setDummyMenu] = useState(dummy_menu.data_menu);
  console.log('dumy menu', dummy_menu);
  useEffect(() => {
    if (isFocused) {
      setModalVisible(true);
      //  getInitialData();
      // showModalProps == true
      //   ? setModalVisible(modalVisible)
      //   : setModalVisible(!modalVisible);
    }
    console.log('cek useeffect');

    // if (props.route.params.showModal == true) {
    //   console.log('ngeset modal visible true');
    //   setModalVisible(showModal);
    // }
  }, [isFocused, dummy_menu]);

  const button = () => {
    console.log('c');
    setModalVisible(!modalVisible);
    navigation.navigate('HomeScreen');
    // setModalVisible(!modalVisible);
    // setModalVisible(!modalVisible);
  };

  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={[BaseStyle.safeAreaView, {backgroundColor: BaseColor.whiteColor}]}>
      <View>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              // left: 0,
              // right: 0,
              backgroundColor: BaseColor.corn30,
              // alignSelf: 'center',
              // width: '100%',
              paddingHorizontal: 10,
              paddingVertical: 20,
              borderRadius: 25,
              marginBottom: 100,
              marginLeft: 10,
              marginRight: 10,
              alignSelf: 'center',
            }}>
            <View
              style={{
                paddingTop: 10,
                justifyContent: 'center',
              }}>
              <FlatList
                data={dummyMenu}
                numColumns={4}
                renderItem={({item, index}) => {
                  return (
                    <View
                      style={{
                        padding: 5,
                        // paddingLeft: index % 2 == 0 ? 3 : 10,
                        // paddingRight: index % 2 == 0 ? 3 : 10,
                        paddingBottom: 15,
                      }}>
                      <ButtonMenuHome
                        title={item.menu_name}
                        nameicon={item.icon_name}
                      />
                    </View>
                  );
                }}
                keyExtractor={item => item.key}
              />
            </View>
          </View>

          <View
            style={{
              position: 'absolute',
              bottom: 0,
              alignSelf: 'center',
              marginBottom: 10, //margin bottom untuk button bulet bawah
            }}>
            <Button
              onPress={() => button()}
              style={{
                backgroundColor: BaseColor.corn30,
                borderRadius: 40,
                width: 70,
                height: 70,
              }}>
              <Icon
                name={'times-circle'}
                size={30} //size maksimal 30 krn kalo 31 hilang
                color={BaseColor.corn50}></Icon>
            </Button>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default CustomModal;

import RBSheet from 'react-native-raw-bottom-sheet';
import PropTypes from 'prop-types';
import {View, Modal, Pressable, FlatList, TouchableOpacity} from 'react-native';
import {Text, Button} from '@components';
import React, {useState, useEffect, useRef} from 'react';
import styles from './styles';
import {useIsFocused} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BaseStyle, Fonts, BaseColor, BaseSetting} from '../../config';
import {ButtonMenuHome} from '@components';
import {Icon} from '../../components';
import dummy_menu from './dummy_menu.json';
import {useSelector, useDispatch, connect} from 'react-redux';
import getUser from '../../selectors/UserSelectors';
import axios from 'axios';
import {API_URL} from '@env';
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
  const [dataMenu, setDataMenu] = useState([]);
  const user = useSelector(state => getUser(state));
  console.log('user di menu', user);
  console.log('isfokus', isFocused);
  useEffect(() => {
    if (isFocused) {
      setModalVisible(true);
      getMenuUser();
    }
    console.log('cek useeffect', isFocused);
  }, [isFocused]);

  // useEffect(() => {
  //   getMenuUser();
  // }, []);

  const getMenuUser = () => {
    const config = {
      method: 'get',
      // url: 'http://dev.ifca.co.id:8080/apiciputra/api/approval/groupMenu?approval_user=MGR',
      url: API_URL + '/menu/index',
      headers: {
        'content-type': 'application/json',
        // 'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${user.Token}`,
      },
      // params: {approval_user: user.userIDToken.UserId},
      params: {group_cd: user.Group},
    };
    console.log('formdaata change pass', config);

    axios(config)
      .then(result => {
        // let load = {
        //   success: true,
        // };
        const pasing = result.data.Data;
        console.log('data di getmenu', pasing);
        setDataMenu(pasing);
        setModalVisible(true);
      })
      .catch(error => console.log('error getdata menu error', error.response));
  };

  const button = () => {
    console.log('c');
    setModalVisible(false);
    navigation.navigate('HomeScreen');
    // setModalVisible(!modalVisible);
    // setModalVisible(!modalVisible);
  };

  const goToScreen = item => {
    console.log('is project', item.isProject);
    if (item.isProject == 1) {
      navigation.navigate('ChooseProject', {goTo: item.URL});
    } else {
      navigation.navigate(item.URL);
    }
  };

  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={[BaseStyle.safeAreaView, {backgroundColor: BaseColor.whiteColor}]}>
      <View style={{backgroundColor: 'red'}}>
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
                data={dataMenu}
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
                        onPress={() => goToScreen(item)}
                        title={item.Title}
                        nameicon={item.IconClass}
                      />
                    </View>
                  );
                }}
                keyExtractor={item => item.MenuID}
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
            <TouchableOpacity onPress={() => button()}>
              <View
                style={{
                  backgroundColor: BaseColor.corn30,
                  borderRadius: 35,
                  width: 70,
                  height: 70,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon
                  name="times-circle"
                  size={40}
                  color={BaseColor.corn50}
                  style={{margin: 0}}></Icon>
              </View>
            </TouchableOpacity>

            {/* <Button
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
            </Button> */}
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default CustomModal;

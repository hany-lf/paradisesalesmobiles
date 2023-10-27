import RBSheet from 'react-native-raw-bottom-sheet';
import PropTypes from 'prop-types';
import {
  View,
  Modal,
  Pressable,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Animated,
  Easing,
} from 'react-native';
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

  //tes
  // const animatedValue = useState(new Animated.Value(0));

  // const bottom = animatedValue.current.interpolate({
  //   inputRange:[0,1],
  //   outputRange: [-height, 0]
  // })

  // useEffect(() =>{
  //   if(isFocused) {
  //     Animated.timing(animatedValue.current,{
  //       toValue:1,
  //       duration:200,
  //       easing: Easing.bezier(0.28,0,0.63,1),
  //       useNativeDriver: false //'bottom' is not supported by native animated module
  //     }).start()
  //   }
  //   else{
  //     Animated.timing(animatedValue.current, {
  //       toValue:0,

  //       duration:100,
  //       easing:Easing.cubic,
  //       useNativeDriver: false
  //     }).start()
  //   }
  // },[isFocused])

  const {height, width} = Dimensions.get('window');
  const SCREEN_HEIGHT = Math.round(height);
  const SCREEN_WIDTH = Math.round(width);
  // Animation
  // const startValue = new Animated.Value(Math.round(height + height * 0.3));
  // const endValue = Math.round(height - height * 0.3);
  // const duration = 1000;

  const startValue = new Animated.Value(Math.round(height));
  // const endValue = Math.round(height - height * 2);
  const endValue = -1500;
  console.log('envalue apa', endValue);
  const duration = 1000;

  const _showBottomView = key => {
    const toValue = key === 'HIDE' ? height : endValue;

    // Animated.timing(startValue, {
    //   toValue,
    //   duration: duration,
    //   useNativeDriver: true,
    // }).start();
    navigation.navigate('HomeScreen');
  };

  useEffect(() => {
    if (isFocused) {
      setModalVisible(true);
      getMenuUser();
    }
    Animated.timing(startValue, {
      toValue: endValue,
      duration: duration,
      useNativeDriver: true,
    }).start();
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
      <ImageBackground
        source={require('@assets/images/OnboardFirst.png')}
        style={{width: '100%'}}>
        {/* Bottom view */}

        <Animated.View
          style={[
            {
              // position: 'absolute',
              height: height,
              width: width,

              alignItems: 'center',
              justifyContent: 'center',
              borderTopRightRadius: 23,
              borderTopLeftRadius: 23,
              transform: [
                {
                  translateY: startValue,
                },
              ],
            },
          ]}>
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
            <TouchableOpacity
              // onPress={() => button()}
              onPress={() => _showBottomView('HIDE')}>
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
        </Animated.View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default CustomModal;

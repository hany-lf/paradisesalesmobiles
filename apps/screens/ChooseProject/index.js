import {Text, Header, Icon} from '@components';
import data_dummy from '../Home/data_dummy.json';
import React, {useEffect, useState} from 'react';
import {View, ScrollView, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BaseStyle, Fonts, BaseColor} from '@config';
import {useTranslation} from 'react-i18next';

import {useSelector, useDispatch, connect} from 'react-redux';
import getUser from '../../selectors/UserSelectors';
import axios from 'axios';
import {API_URL} from '@env';

const ChooseProject = props => {
  console.log('data dummy', data_dummy);
  const datas = data_dummy.data_dummy;
  console.log('image', datas[0].image);
  const {navigation} = props;
  const {t} = useTranslation();
  const user = useSelector(state => getUser(state));
  console.log('props dari home di choose project', props);
  const goToScreen = props.route.params.goTo;
  console.log('goto???', goToScreen);
  const [dataProject, setDataProject] = useState([]);
  useEffect(() => {
    goTo();
    getDataProject();
  }, []);

  const getDataProject = () => {
    const config = {
      method: 'get',
      // url: 'http://dev.ifca.co.id:8080/apiciputra/api/approval/groupMenu?approval_user=MGR',
      url: API_URL + '/project/index',
      headers: {
        'content-type': 'application/json',
        // 'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${user.Token}`,
      },
      // params: {approval_user: user.userIDToken.UserId},
      params: {group_cd: user.Group},
    };
    console.log('formdaata get project', config);

    axios(config)
      .then(result => {
        // let load = {
        //   success: true,
        // };
        const pasing = result.data.Data;
        console.log('data di chooseproject', pasing);
        setDataProject(pasing);
      })
      .catch(error =>
        console.log('error getdata project error', error.response),
      );
  };

  const goTo = () => {};
  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={[BaseStyle.safeAreaView, {backgroundColor: BaseColor.whiteColor}]}>
      <Header
        title={t('choose_project')}
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
          // navigation.goBack();
          navigation.navigate('HomeScreen');
        }}
      />
      <ScrollView>
        <View style={{marginBottom: 100}}>
          {dataProject.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate(goToScreen, item)}>
              <View
                key={index}
                // style={styles.item}
                style={{
                  width: '100%',
                  height: 300,
                  paddingHorizontal: 30,
                  marginVertical: 10,
                  // marginHorizontal
                }}>
                {/* <Text>{item.image}</Text> */}
                <Image
                  source={{uri: item.picture_path}}
                  // source={require('@assets/images/home/slider-project/sudirmansuite.jpeg')}
                  // src={item.image}
                  // source={}
                  // containerStyle={styles.imageContainer}
                  // style={styles.image}
                  style={{
                    width: '100%',
                    // width: 300,
                    height: 300,
                    // marginTop: 10,
                    // paddingTop: 10,
                    // ...StyleSheet.absoluteFillObject,
                    resizeMode: 'cover',
                    borderRadius: 25,
                  }}
                />

                <View
                  style={{
                    position: 'absolute',
                    backgroundColor: BaseColor.grey10,
                    // top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: 80,

                    marginHorizontal: 55,
                    marginVertical: 20,
                    borderRadius: 20,
                    opacity: 0.8,
                    // justifyContent: 'center',
                    // alignItems: 'center',
                  }}>
                  <View style={{marginVertical: 10, marginHorizontal: 25}}>
                    <Text
                      style={{
                        fontFamily: Fonts.type.LatoBlack,
                        color: BaseColor.corn90,
                        marginVertical: 5,
                        fontSize: 16,
                      }}>
                      {item.descs}
                    </Text>
                    <Text
                      style={{
                        fontFamily: Fonts.type.LatoBold,
                        color: BaseColor.corn50,
                        marginVertical: 5,
                      }}>
                      {item.descs}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChooseProject;

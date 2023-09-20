import {Text, Button, Header, Icon} from '@components';
import {useDispatch, useSelector} from 'react-redux';
import React, {useState, useEffect, useRef} from 'react';
import {BaseStyle, Fonts, BaseColor} from '@config';
import data_dummy from '../Home/data_dummy.json';
import {
  View,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {UserAuth} from '@actions';
import getUser from '../../selectors/UserSelectors';
import {ButtonMenuHome} from '@components';
import menu_profil from './menu_profil.json';

const Profile = props => {
  const [loading, setLoading] = useState(false);
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {navigation} = props;
  const user = useSelector(state => getUser(state));
  console.log('user diprofil', user);
  const [data_menu_profil, setDataMenuProfil] = useState(
    menu_profil.menu_profil,
  );
  // const login = user.login.success;
  const {authentication} = UserAuth;

  useEffect(() => {}, [menu_profil]);
  useEffect(() => {
    if (user == null) {
      props.navigation.navigate('SignIn');
    }
  });
  // console.log('login', login);
  console.log('userz', user);

  const onLogOut = () => {
    setLoading(true);
    dispatch(
      authentication(false, response => {
        setLoading(false);
      }),
    );
  };

  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={[BaseStyle.safeAreaView, {backgroundColor: BaseColor.whiteColor}]}>
      <Header
        title={t('profile')}
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
      <View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 20,
            // backgroundColor: BaseColor.corn30,
            alignItems: 'center',
            paddingBottom: 10,
            borderBottomWidth: 1,
            borderBottomColor: BaseColor.corn30,
          }}>
          {user != null ? (
            <Image
              source={{uri: user.pict}}
              style={{
                width: 80,
                height: 80,
                margin: 10,
                borderRadius: 40,
              }}></Image>
          ) : (
            <View
              style={{
                backgroundColor: BaseColor.corn90,
                borderRadius: 35,
                width: 70,
                height: 70,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon
                name="user"
                size={40}
                color={BaseColor.corn50}
                style={{margin: 10}}></Icon>
            </View>
            // <Image
            //   source={{uri: user.pict}}
            //   style={{width: 80, height: 80, margin: 10}}></Image>
          )}

          {/* <Image
            style={{width: 80, height: 80, margin: 10}}
            source={require('@assets/images/logo-paradise.png')}></Image> */}
          <View style={{marginHorizontal: 10}}>
            <Text
              style={{
                fontFamily: Fonts.type.LatoBold,
                color: BaseColor.corn90,
                fontSize: 16,
                paddingVertical: 5,
              }}>
              {/* {user.UserId}  */}
              {user.name}
            </Text>
            <Text
              style={{
                fontFamily: Fonts.type.Lato,
                color: BaseColor.corn50,
                fontSize: 16,
              }}>
              {user.Group}
              {/* ini harusnya tetep kesimpen di reducer selector, coba ya. kalo ga bisa juga terpaksa minta sama API buat save Group juga saat callback sukses save profil */}
            </Text>
          </View>
        </View>
      </View>

      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 30,
          }}>
          <ButtonMenuHome
            onPress={() => navigation.navigate('CalculatorScreen')}
            title={'Calculator KPA/R'}
            nameicon={'calculator'}></ButtonMenuHome>
          <ButtonMenuHome
            onPress={() => navigation.navigate('HelpCenter')}
            title={'Help center'}
            nameicon={'headset'}></ButtonMenuHome>
          <ButtonMenuHome
            onPress={() => navigation.navigate('FAQ')}
            title={'FAQ'}
            nameicon={'question-circle'}></ButtonMenuHome>
          <ButtonMenuHome
            onPress={() => navigation.navigate('AboutUs')}
            title={'About us'}
            nameicon={'book-reader'}></ButtonMenuHome>
        </View>
      </View>

      <View style={{marginTop: 40}}>
        <FlatList
          data={data_menu_profil}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate(item.component)}>
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // marginVertical: 15,
                    marginHorizontal: 20,
                    height: 55,

                    borderBottomWidth: 1,
                    borderBottomColor: BaseColor.corn30,

                    borderTopWidth: index == 0 ? 1 : 0,
                    borderTopColor: BaseColor.corn30,
                  }}>
                  <View
                    style={{
                      // backgroundColor: 'yellow',
                      flexDirection: 'row',
                      // marginHorizontal: 20,
                      alignSelf: 'center',
                    }}>
                    <Icon
                      name={item.icon_menu}
                      size={24}
                      color={BaseColor.corn70}
                      style={{alignSelf: 'center'}}></Icon>
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontFamily: Fonts.type.Lato,
                        fontSize: 16,
                        paddingVertical: 3,
                        paddingHorizontal: 15,
                        color: BaseColor.corn70,
                      }}>
                      {item.nama_menu}
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'flex-end',
                      // marginHorizontal: 20,
                      alignSelf: 'center',
                    }}>
                    <Icon
                      name={'chevron-right'}
                      size={14}
                      color={BaseColor.corn50}></Icon>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}></FlatList>
      </View>

      <View style={{position: 'absolute', bottom: 50, left: 0, right: 0}}>
        <Button
          onPress={() => onLogOut()}
          // outline
          medium
          style={{borderRadius: 15, backgroundColor: BaseColor.corn50}}>
          <Text
            style={{
              color: BaseColor.whiteColor,
              fontFamily: Fonts.type.LatoBold,
            }}>
            Sign Out
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

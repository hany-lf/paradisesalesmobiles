import {
  View,
  Image,
  Dimensions,
  Animated,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Button, Text, Icon} from '@components';

import {ButtonMenuHome} from '../../components';

import {useDispatch, useSelector} from 'react-redux';
import {UserAuth} from '@actions';
import getUser from '../../selectors/UserSelectors';
import React, {useState, useEffect, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';
import ActionButton from 'react-native-action-button';
import {BaseStyle, BaseColor, Fonts, DefaultTheme, useFont} from '@config';
// import Carousel from 'react-native-reanimated-carousel';
import Carousel, {ParallaxImage, Pagination} from 'react-native-snap-carousel';
import {CardHomePromo} from '../../components';
const {width: screenWidth} = Dimensions.get('window');

const Home = props => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {authentication} = UserAuth;
  const {navigation} = props;
  const user = useSelector(state => getUser(state));
  console.log('user dihome', user);
  const carouselRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    if (user == null) {
      props.navigation.navigate('SignIn');
    }
  }, [user]);

  const data_dummy = [
    {
      key: 1,
      project_no: 1,
      image: require('@assets/images/home/slider-project/sudirmansuite.jpeg'),
      // image: 'https://i.imgur.com/UYiroysl.jpg',
      project_name: '31 Sudirman Suites',
      location: 'Makassar, Indonesia',
    },
    // {
    //   key: 2,
    //   project_no: 2,
    //   // image: require('@assets/images/home/slider-project/sudirmansuite.jpeg'),
    //   image: 'https://i.imgur.com/UYiroysl.jpg',
    //   project_name: '31 Sudirman Suites',
    //   location: 'Makassar, Indonesia',
    // },
    {
      key: 2,
      project_no: 2,
      image: require('@assets/images/home/slider-project/beachwalk.jpeg'),
      project_name: 'Beachwalk Residence',
      location: 'Bali, Indonesia',
    },
    {
      key: 3,
      project_no: 3,
      image: require('@assets/images/home/slider-project/antasariplace.jpeg'),
      project_name: 'Antasari Place',
      location: 'Jakarta, Indonesia',
    },
  ];

  useEffect(() => {
    setDatas(data_dummy);
  }, []);

  const MENUS = {
    news: {
      id: 'news',
      iconName: 'book',
      title: 'News',
      navigate: 'NewsMenu',
    },
    eCommerce: {
      id: 'eCommerce',
      iconName: 'shopping-cart',
      title: 'E-commerce',
      navigate: 'ECommerceMenu',
    },
  };

  const menuChoosed = useSelector(state => state.application.menu);

  const handleChangeMenu = menu => {
    navigation.replace(menu.navigate);
    dispatch({
      type: actionTypes.SET_MENU,
      menu: menu.id,
    });
  };

  const _renderItem = ({item, index, dataIndex}, parallaxProps) => {
    console.log('item render', item);
    console.log('index', index);
    return (
      <View style={styles.item}>
        {/* <Text>{item.image}</Text>
        <Text>{item.project_name}</Text> */}
        <ParallaxImage
          // source={{uri: item.image}}
          source={item.image}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          // apparitionDelay={2}
          // currentIndex={0}
          // onSnapToItem={index => console.log(index)}
          // onBeforeSnapToItem={index}
          // onScrollIndexChanged={index => setActiveSlide(index)}
          onSnapToItem={index => setActiveSlide(index)}
          {...parallaxProps}
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

            marginHorizontal: 30,
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
              {item.project_name}
            </Text>
            <Text
              style={{
                fontFamily: Fonts.type.LatoBold,
                color: BaseColor.corn50,
                marginVertical: 5,
              }}>
              {item.location}
            </Text>
          </View>
        </View>

        {/* <Text numberOfLines={2} style={{color: 'red'}}>
          {item.project_name}
        </Text> */}
      </View>
    );
  };

  const _renderItem_ = ({item, index, dataIndex}, parallaxProps) => {
    console.log('item render', item);
    console.log('index', index);
    return (
      <View style={styles.item}>
        <ParallaxImage
          // source={{uri: item.image}}
          source={item.image}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
        {/* <Text>{index}</Text>
        <Text style={styles.title} numberOfLines={2}>
          {item.project_name}
        </Text> */}
      </View>
    );
  };

  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={[BaseStyle.safeAreaView, {backgroundColor: BaseColor.whiteColor}]}>
      <ScrollView>
        <View style={{marginTop: 40}}>
          <View
            style={{
              alignItems: 'center',
              // borderColor: 'black',
              // borderWidth: 1,
            }}>
            <Image
              source={require('@assets/images/logo-paradise.png')}
              style={{width: 160, resizeMode: 'contain'}}></Image>
          </View>
        </View>
        <ScrollView>
          <View style={{flex: 1}}>
            {/* <Text>a</Text> */}
            {/* <Text>{activeSlide}</Text> */}
            <Carousel
              ref={carouselRef}
              sliderWidth={screenWidth}
              sliderHeight={screenWidth}
              itemWidth={screenWidth - 80}
              data={datas}
              renderItem={_renderItem}
              hasParallaxImages={true}
            />
          </View>
          {/* <Pagination
            dotsLength={datas.length}
            activeDotIndex={activeSlide}
            containerStyle={{
              paddingVertical: 10,
            }}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,

              backgroundColor: BaseColor.corn70,
            }}
            inactiveDotStyle={{
              backgroundColor: BaseColor.corn30,
              // Define styles for inactive dots here
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          /> */}
        </ScrollView>

        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 30,
            }}>
            <ButtonMenuHome
              title={'My Unit'}
              nameicon={'building'}></ButtonMenuHome>
            <ButtonMenuHome
              title={'NUP Online'}
              nameicon={'clipboard-check'}></ButtonMenuHome>
            <ButtonMenuHome
              title={'Download'}
              nameicon={'download'}></ButtonMenuHome>
            <ButtonMenuHome
              title={'Calculator KPA/R'}
              nameicon={'calculator'}></ButtonMenuHome>
          </View>

          <View
            style={{
              backgroundColor: BaseColor.corn10,
              marginTop: 40,
              marginBottom: 150,
            }}>
            {/* //INI PROMO OFFERS */}
            <View
              style={{
                // backgroundColor: BaseColor.corn10,
                flex: 1,
                marginTop: 20,
              }}>
              <View
                style={{
                  marginHorizontal: 20,
                  marginVertical: 20,
                  flex: 1,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Text style={{fontSize: 17, fontFamily: Fonts.type.Lato}}>
                  Promo & Offers
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: Fonts.type.Lato,
                    color: BaseColor.corn50,
                  }}>
                  See all
                </Text>
              </View>

              <View style={{marginHorizontal: 20, marginVertical: 10}}>
                <CardHomePromo
                  backgroundColor={BaseColor.corn50}
                  title={'Step into your new elegance design home.'}
                  subtitle={
                    'Each apartment showcase contemporary architecture, high-end finished, and top-of the-line appliance.'
                  }
                  onPressSeeDetails={() => alert('ini onpress see details')}
                  onPress={() => alert('ini onpress promo')}
                  image={require('@assets/images/home/slider-project/sudirmansuite.jpeg')}></CardHomePromo>
                {/* <View style={{width: '20%', height: 100}}></View> */}
              </View>
            </View>

            {/* //INI NEWS UPDATE */}
            <View
              style={{
                // backgroundColor: BaseColor.corn10,
                flex: 1,
                marginTop: 20,
                marginBottom: 20,
              }}>
              <View
                style={{
                  marginHorizontal: 20,
                  marginVertical: 20,
                  flex: 1,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Text style={{fontSize: 17, fontFamily: Fonts.type.Lato}}>
                  News & Update
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: Fonts.type.Lato,
                    color: BaseColor.corn50,
                  }}>
                  See all
                </Text>
              </View>

              <View style={{marginHorizontal: 20, marginVertical: 10}}>
                <CardHomePromo
                  backgroundColor={BaseColor.corn50}
                  title={'Step into your new elegance design home.'}
                  subtitle={
                    'Each apartment showcase contemporary architecture, high-end finished, and top-of the-line appliance.'
                  }
                  onPressSeeDetails={() => alert('ini onpress see details')}
                  onPress={() => alert('ini onpress news update')}
                  image={require('@assets/images/home/slider-project/sudirmansuite.jpeg')}></CardHomePromo>
                {/* <View style={{width: '20%', height: 100}}></View> */}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Home;

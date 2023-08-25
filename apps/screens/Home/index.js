import {View, Image, Dimensions, Animated, ScrollView} from 'react-native';
import {Button, Text} from '@components';

import {ButtonMenuHome} from '../../components';

import {useDispatch, useSelector} from 'react-redux';
import {UserAuth} from '@actions';
import getUser from '../../selectors/UserSelectors';
import React, {useState, useEffect, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';
import {BaseStyle, BaseColor, Fonts, DefaultTheme, useFont} from '@config';
// import Carousel from 'react-native-reanimated-carousel';
import Carousel, {ParallaxImage, Pagination} from 'react-native-snap-carousel';
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

  useEffect(() => {
    if (user == null) {
      props.navigation.navigate('SignIn');
    }
  }, [user]);

  const onLogOut = () => {
    setLoading(true);
    dispatch(
      authentication(false, response => {
        setLoading(false);
      }),
    );
  };

  const datas = [
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

  const _renderItem = ({item, index}, parallaxProps) => {
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
          // onSnapToItem={index => setActiveSlide(index)}
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

  // const _renderItem = ({item, index}) => {
  //   return <Text>{item.project_name}</Text>;
  // };
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
              onSnapToItem={index => setActiveSlide(index)}
              // removeClippedSubviews={false}
              // removeClippedSubviews={true}
              // useScrollView={false}
              // style={{borderWidth: 1, borderColor: 'black'}}
            />
          </View>
          <Pagination
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
          />
        </ScrollView>

        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
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

          <Text>My Unit</Text>
          <Button onPress={() => onLogOut()} outline style={{borderRadius: 24}}>
            <Text style={{color: BaseColor.green90}}>Logout</Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Home;

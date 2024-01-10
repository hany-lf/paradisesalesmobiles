import {
  View,
  Image,
  Dimensions,
  Animated,
  ScrollView,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
  Platform,
  RefreshControl,
  PixelRatio,
  ActivityIndicator,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import {Button, Text, Icon} from '@components';
import {useFocusEffect} from '@react-navigation/native';

import {ButtonMenuHome, CardHomePromoNews} from '../../components';

import {useDispatch, useSelector} from 'react-redux';
import {UserAuth} from '@actions';
import getUser from '../../selectors/UserSelectors';
import React, {useState, useEffect, useRef, useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';
import ActionButton from 'react-native-action-button';
import {BaseStyle, BaseColor, Fonts, DefaultTheme, useFont} from '@config';
// import Carousel from 'react-native-reanimated-carousel';
import Carousel, {ParallaxImage, Pagination} from 'react-native-snap-carousel';
import {CardHomePromo} from '../../components';
import {useSharedValue} from 'react-native-reanimated';
import {ExpandingDot} from 'react-native-animated-pagination-dots';
import {data_promo_dummy} from './data_promo_dummy.json';
import axios from 'axios';
import {API_URL} from '@env';
// import news_dummy from '../NewsScreen/news_dummy.json';
const SLIDER_1_FIRST_ITEM = 1;

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Home = props => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const {authentication} = UserAuth;
  const {navigation} = props;
  const user = useSelector(state => getUser(state));
  console.log('user dihome', user);
  const carouselRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [slider1ActiveSlide, setslider1ActiveSlide] =
    useState(SLIDER_1_FIRST_ITEM);
  const [datas, setDatas] = useState([]);
  const [datasIndicator, setDatasIndicator] = useState([]);
  const [dataProject, setProjectData] = useState([]);
  const [images, setImages] = useState([]);
  const data_promo = data_promo_dummy;
  // console.log('data promo ?', data_promo);
  const {width, height} = Dimensions.get('screen');

  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.85;
  const SPACING = 4;
  const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2;

  const ITEM_HEIGHT = height * 0.75;
  const DOT_SIZE = 8;
  const DOT_SPACING = 8;
  const DOT_INDICATOR_SIZE = DOT_SIZE + DOT_SPACING;

  const [dataPromo, setDataPromo] = useState([]);
  const [dataNews, setDataNews] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  // const [dummy_news, setDummyNews] = useState(news_dummy.Data);
  // console.log('dummynewsss', news_dummy);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getDataPromo();
    getDataNews();
    getProject();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (user == null) {
      props.navigation.navigate('SignIn');
    }
  }, [user]);

  // useEffect(() => {}, [datas]);

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
    {
      key: 4,
      project_no: 2,
      image: require('@assets/images/home/slider-project/beachwalk.jpeg'),
      project_name: 'Beachwalk Residence',
      location: 'Bali, Indonesia',
    },
    {
      key: 5,
      project_no: 3,
      image: require('@assets/images/home/slider-project/antasariplace.jpeg'),
      project_name: 'Antasari Place',
      location: 'Jakarta, Indonesia',
    },
    {
      key: 6,
      project_no: 3,
      image: require('@assets/images/home/slider-project/antasariplace.jpeg'),
      project_name: 'Antasari Place',
      location: 'Jakarta, Indonesia',
    },
  ];

  // useEffect(() => {
  //   getProject();
  // }, []);

  const getProject = () => {
    try {
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
        params: {email: user.user},
      };
      console.log('formdaata get project', config);
      axios(config)
        .then(result => {
          const pasing = result.data.Data;
          console.log('data di project', pasing);
          // setProjectData(pasing);
          const dataSpacerPasing = [
            {rowID: 'left-spacer'}, //harus ada left spacer dan right spacer biar tetep presisi posisinya
            ...pasing,
            {rowID: 'right-spacer'},
          ];
          console.log('dataspacer', dataSpacerPasing);
          setProjectData(dataSpacerPasing);
          // getProjectDetails(pasing);
        })
        .catch(error =>
          console.log('error getdata project error', error.response),
        );
    } catch (error) {
      console.log('ini konsol eror', error);
    }
  };

  // useEffect(() => {
  //   // setDatasIndicator(dataProject);
  //   setProjectData([
  //     {RowID: 'left-spacer'},
  //     ...dataProject,
  //     {RowID: 'right-spacer'},
  //   ]);
  //   console.log('dataprojek spacer', dataProject);
  // }, []);

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

  // useEffect(() => {
  //   setLoading(true);

  //   setTimeout(() => {
  //     getDataPromo();

  //     setLoading(false);
  //   }, 5000);
  // }, []);

  useEffect(() => {
    getDataNews();
    getProject();
    getDataPromo();
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  useEffect(() => {
    LayoutAnimation.configureNext({
      duration: 300,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    });
  });

  // useEffect(() => {
  //   getProject();
  //   // getDataNews();
  //   // getDataPromo();
  // }, []);
  // useEffect(() => {
  //   getDataPromo();
  //   // getDataNews();
  //   // getDataPromo();
  // }, []);

  const getDataPromo = () => {
    try {
      const config = {
        method: 'get',
        // url: 'http://dev.ifca.co.id:8080/apiciputra/api/approval/groupMenu?approval_user=MGR',
        url: API_URL + '/promo/index',
        headers: {
          'content-type': 'application/json',
          // 'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Bearer ${user.Token}`,
        },
        // params: {approval_user: user.userIDToken.UserId},
        params: {},
      };
      console.log('formdaata get promo di home', config);
      axios(config)
        .then(result => {
          const pasing = result.data.Data;
          const filterdata = pasing.filter(pasing => pasing.status == 'Active');

          console.log('data di promo', filterdata);
          const sliceFilterData = filterdata.slice(0, 4);
          setDataPromo(sliceFilterData);
          console.log('data di promo', dataPromo);
        })
        .catch(error =>
          console.log('error getdata promo error', error.response),
        );
    } catch (error) {
      console.log('ini konsol eror promo', error);
    }
  };

  const getDataNews = () => {
    try {
      const config = {
        method: 'get',
        // url: 'http://dev.ifca.co.id:8080/apiciputra/api/approval/groupMenu?approval_user=MGR',
        url: API_URL + '/news/index',
        headers: {
          'content-type': 'application/json',
          // 'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Bearer ${user.Token}`,
        },
        // params: {approval_user: user.userIDToken.UserId},
        params: {},
      };
      console.log('formdaata get news di home', config);
      axios(config)
        .then(result => {
          const pasing = result.data.Data;
          const filterdata = pasing.filter(pasing => pasing.status == 'Active');

          const sliceFilterData = filterdata.slice(0, 4);

          console.log('data di news', filterdata);
          setDataNews(sliceFilterData);
        })
        .catch(error =>
          console.log('error getdata news error', error.response),
        );
    } catch (error) {
      console.log('ini konsol eror news', error);
    }
  };

  const menuChoosed = useSelector(state => state.application.menu);

  const handleChangeMenu = menu => {
    navigation.replace(menu.navigate);
    dispatch({
      type: actionTypes.SET_MENU,
      menu: menu.id,
    });
  };

  const _renderItem = ({item, index}, parallaxProps) => {
    console.log('item render', item);
    console.log('index', index);
    // console.log('data index', dataIndex);
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
          showSpinner={true}
          // apparitionDelay={2}
          // currentIndex={0}
          // onSnapToItem={index => console.log(index)}
          // onBeforeSnapToItem={index}
          // onScrollIndexChanged={index => setActiveSlide(index)}

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

  const Indicator = ({scrollX}) => {
    return (
      <View
        style={{
          // position: 'absolute',
          flexDirection: 'row',
          // bottom: -20,
          justifyContent: 'center',
        }}>
        {datasIndicator.map((_, index) => {
          console.log('index', index);
          const inputRange = [
            (index - 1) * width,
            // (index - 2) * width,
            index * width,
            (index + 1) * width,
            // (index + 2) * width,
          ];
          // const scale = scrollX.interpolate({
          //   inputRange,
          //   outputRange: [0.8, 1.4, 0.8],
          //   extrapolate: 'clamp',
          // });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1.4, 0.8],
            extrapolate: 'clamp',
          });

          const colour = scrollX.interpolate({
            inputRange,
            outputRange: ['black', 'red', 'black'],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={index}
              style={{
                height: 10,
                width: 10,
                backgroundColor: colour,
                opacity,
                borderRadius: 5,

                margin: 5,
                // transform: [{scale}],
              }}>
              {/* <Text>{index}</Text> */}
            </Animated.View>
          );
        })}
      </View>
    );
  };

  const _renderItemPromo = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => navigation.navigate('PromoWithoutModal', {datas: item})}
        style={{
          marginHorizontal: SPACING,
          // padding: SPACING,
          padding: 5,
        }}>
        <View style={{width: 150, height: 200}}>
          <Image
            source={{uri: item?.url_image}}
            style={{
              resizeMode: 'cover',
              borderRadius: 15,

              width: '100%',
              height: 200,
            }}></Image>

          <View
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              height: 70,
              borderRadius: 15,
              padding: 10,
              backgroundColor: BaseColor.whiteColor,
            }}>
            <Text
              numberOfLines={3}
              style={{
                color: BaseColor.corn90,
                fontFamily: Fonts.type.LatoBold,
                fontSize: 12,
                //   marg
              }}>
              {/* Step into your new elegance design home. */}
              {item.promo_title}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      // <View>
      //   <Image
      //     width={100}
      //     height={100}
      //     source={require('@assets/images/home/slider-project/sudirmansuite.jpeg')}></Image>
      //   {/* <Image
      //     source={{
      //       uri: 'https://i.stack.imgur.com/280rI.png',
      //     }}
      //     width={100}
      //     height={100}></Image> */}
      // </View>
    );
  };

  const tesPromo = useCallback(
    ({item}) => (
      <TouchableOpacity>
        <View key={item.rowID} style={{}}>
          <Text>{item.url_image}</Text>
          <Text>{item.promo_title}</Text>
          <Image
            source={{uri: item.url_image}}
            style={
              ([styles.shadow],
              {
                height: 450,
                margin: 5,
                width: 250,
                borderRadius: 10,
              })
            }
            resizeMode={'cover'}></Image>
        </View>
      </TouchableOpacity>
    ),
    [],
  );

  const _renderItemNews = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => navigation.navigate('NewsWithoutModal', {datas: item})}
        style={{
          marginHorizontal: SPACING,
          // padding: SPACING,
          padding: 5,
        }}>
        <View style={{width: 150, height: 200}}>
          <Image
            source={{uri: item.url_image}}
            // source={require('@assets/images/home/slider-project/sudirmansuite.jpeg')}
            // source={{
            //   uri: 'https://i.stack.imgur.com/280rI.png',
            // }}
            style={{
              resizeMode: 'cover',
              borderRadius: 15,

              width: '100%',
              height: 200,
            }}></Image>
          {/* <Text>{item.image}</Text> */}
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              height: 70,
              borderRadius: 15,
              padding: 10,
              backgroundColor: BaseColor.whiteColor,
            }}>
            <Text
              numberOfLines={3}
              style={{
                color: BaseColor.corn90,
                fontFamily: Fonts.type.LatoBold,
                fontSize: 12,
                //   marg
              }}>
              {/* Step into your new elegance design home. */}
              {item.news_title}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const ref = useRef(null);
  const refPromo = useRef(null);
  // const [viewableIndex, setViewableIndex] = useState(null);
  const [viewableIndex, setViewableIndex] = useState(null);
  const [middleItemFlatlist, setMiddleItemFlatlist] = useState([]);
  const currentIndex = useRef(0);
  const onViewableItemsChanged = ({viewableItems, changed}) => {
    // Do stuff
    console.log('haloo ini kah items tengah', viewableItems);
    if (viewableItems.length > 0) {
      // Ambil index dari item yang berada di tengah layar
      const middleIndex = Math.floor(viewableItems.length / 2);
      console.log('middleindx', viewableItems[middleIndex].index);
      console.log('middleitems', viewableItems[middleIndex].item);
      setViewableIndex(viewableItems[middleIndex].index);
      setMiddleItemFlatlist(viewableItems[middleIndex].item);
    }
  };

  const viewabilityConfigCallbackPairs = useRef([{onViewableItemsChanged}]);

  const changeProjectAuto = () => {
    console.log('project apakah ini?', middleItemFlatlist);
    navigation.navigate('DownloadBrochure', middleItemFlatlist);
    // navigation.navigate('ChooseProject', {goTo: 'DownloadBrochure'});
  };

  // const getProjectDetails = pasing => {
  //   console.log('pasing untuk project detail', pasing);
  //     pasing.forEach((item, id) => {
  //       console.log('item databrosur project no', item.project_no);
  //       console.log('params prject_nno', paramsData.project_no);
  //       item.project_no === paramsData.project_no ? setDataBrosur(item) : null;
  //     });
  //   try {
  //     const config = {
  //       method: 'get',
  //       // url: 'http://dev.ifca.co.id:8080/apiciputra/api/approval/groupMenu?approval_user=MGR',
  //       url: API_URL + '/project/project-details',
  //       headers: {
  //         'content-type': 'application/json',
  //         // 'X-Requested-With': 'XMLHttpRequest',
  //         Authorization: `Bearer ${user.Token}`,
  //       },
  //       params: {entity_cd: entity_cd, project_no: project_no},
  //     };
  //     console.log('formdaata get project', config);
  //     axios(config)
  //       .then(result => {
  //         const pasing = result.data.Data;
  //         console.log('data di project', pasing);

  //         setProjectAddress(pasing.project);
  //       })
  //       .catch(error =>
  //         console.log('error getdata project error', error.response),
  //       );
  //   } catch (error) {
  //     console.log('ini konsol eror', error);
  //   }
  // };

  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={[BaseStyle.safeAreaView, {backgroundColor: BaseColor.whiteColor}]}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
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

        <View style={{flex: 1}}>
          {loading == true ? (
            <ActivityIndicator color={BaseColor.corn70}></ActivityIndicator>
          ) : (
            <Animated.FlatList
              ref={ref}
              showsHorizontalScrollIndicator={false}
              data={dataProject}
              keyExtractor={item => item.rowID}
              horizontal
              contentContainerStyle={{alignItems: 'center'}}
              snapToInterval={ITEM_SIZE}
              decelerationRate={0}
              bounces={false}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX}}}],
                {useNativeDriver: true},
              )}
              // onViewableItemsChanged={onViewableItemsChanged} //diganti ya
              viewabilityConfigCallbackPairs={
                viewabilityConfigCallbackPairs.current
              }
              viewabilityConfig={{
                waitForInteraction: true,
                viewAreaCoveragePercentThreshold: 60,
              }}
              scrollEventThrottle={16}
              pagingEnabled
              renderItem={({item, index}) => {
                if (!item.picture_url) {
                  return <View style={{width: SPACER_ITEM_SIZE}}></View>;
                }
                const inputRange = [
                  (index - 2) * ITEM_SIZE,
                  (index - 1) * ITEM_SIZE,
                  index * ITEM_SIZE,
                  // (index + 1) * ITEM_SIZE,
                ];
                const translateY = scrollX.interpolate({
                  inputRange,
                  outputRange: [0, -5, 0],
                });
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => navigation.navigate('ProjectDetails', item)}>
                    <View style={{width: ITEM_SIZE}}>
                      <Animated.View
                        style={{
                          marginHorizontal: SPACING,
                          // padding: SPACING,
                          padding: Platform.OS == 'ios' ? 4 : 5,
                          alignItems: 'center',
                          backgroundColor: 'white',
                          borderRadius: 20,
                          transform: [{translateY}],
                        }}>
                        <Image
                          // source={item.picture_url}
                          source={{uri: item.picture_url}}
                          style={{
                            width: '100%',
                            height:
                              Platform.OS == 'ios'
                                ? ITEM_SIZE - 18
                                : ITEM_SIZE - 10,
                            resizeMode: 'contain',
                            borderRadius: 24,
                          }}></Image>

                        <View
                          style={{
                            position: 'absolute',
                            backgroundColor: BaseColor.grey10,
                            // top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            // height: Platform.OS == 'android' ? 95 : 110, //height ditutup agar responsive tulisan besar kotak abu nya

                            marginHorizontal: 30,
                            marginVertical: 20,
                            borderRadius: 20,
                            opacity: 0.8,
                            // justifyContent: 'center',
                            // alignItems: 'center',
                          }}>
                          <View
                            style={{
                              marginVertical: 10,
                              marginHorizontal: 25,
                            }}>
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
                              {item.caption_address}
                            </Text>
                          </View>
                        </View>
                      </Animated.View>
                    </View>
                  </TouchableOpacity>
                );
              }}></Animated.FlatList>
          )}

          {/* <Indicator scrollX={scrollX} />
          <ExpandingDot
            data={datasIndicator}
            expandingDotWidth={20}
            scrollX={scrollX}
            inActiveDotColor={'#347af0'}
            activeDotColor={'#347af0'}
            inActiveDotOpacity={0.5}
            // dotStyle={styles.dotStyles}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 3,
            }}
            containerStyle={styles.constainerStyles}
          /> */}
        </View>

        <View>
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 30,
            }}> */}
          {/* <ButtonMenuHome
              title={'My Unit'}
              nameicon={'building'}></ButtonMenuHome>
            <ButtonMenuHome
              title={'NUP Online'}
              nameicon={'clipboard-check'}></ButtonMenuHome> */}
          {/* <ButtonMenuHome
              goToProject={true}
              onPress={() =>
                // navigation.navigate('ChooseProject', {goTo: 'DownloadBrochure'})
                changeProjectAuto()
              }
              title={'Download'}
              nameicon={'download'}></ButtonMenuHome>
            <ButtonMenuHome
              title={'Calculator KPA/R'}
              nameicon={'calculator'}
              onPress={() =>
                navigation.navigate('CalculatorScreen')
              }></ButtonMenuHome> */}
          {/* </View> */}

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
                <Text style={{fontSize: 18, fontFamily: Fonts.type.LatoBold}}>
                  Promo & Offers
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ChooseProject', {goTo: 'PromoScreen'})
                  }>
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: Fonts.type.Lato,
                      color: BaseColor.corn50,
                    }}>
                    See all
                  </Text>
                </TouchableOpacity>
              </View>
              {loading == true ? (
                <ActivityIndicator color={BaseColor.corn70}></ActivityIndicator>
              ) : (
                <View style={{marginHorizontal: 20, marginVertical: 10}}>
                  <FlatList
                    data={dataPromo}
                    horizontal
                    pagingEnabled={true}
                    contentContainerStyle={{alignItems: 'center'}}
                    showsHorizontalScrollIndicator={false}
                    legacyImplementation={false}
                    snapToInterval={ITEM_SIZE}
                    decelerationRate={0}
                    bounces={false}
                    keyExtractor={item => item.rowID}
                    renderItem={_renderItemPromo}></FlatList>
                </View>
              )}
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
                <Text style={{fontSize: 18, fontFamily: Fonts.type.LatoBold}}>
                  News & Update
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ChooseProject', {goTo: 'NewsScreen'})
                  }>
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: Fonts.type.Lato,
                      color: BaseColor.corn50,
                    }}>
                    See all
                  </Text>
                </TouchableOpacity>
              </View>
              {loading == true ? (
                <ActivityIndicator color={BaseColor.corn70}></ActivityIndicator>
              ) : (
                <View style={{marginHorizontal: 20, marginVertical: 10}}>
                  <FlatList
                    data={dataNews}
                    horizontal
                    pagingEnabled={true}
                    contentContainerStyle={{alignItems: 'center'}}
                    showsHorizontalScrollIndicator={false}
                    legacyImplementation={false}
                    snapToInterval={ITEM_SIZE}
                    decelerationRate={0}
                    bounces={false}
                    keyExtractor={item => item.rowID}
                    renderItem={_renderItemNews}></FlatList>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Home;

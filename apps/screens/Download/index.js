import {
  Text,
  SafeAreaView,
  Header,
  Icon,
  Image,
  Button,
  TextInput,
} from '@components';
import {BaseStyle, BaseColor, Fonts} from '../../config';
import {useTranslation} from 'react-i18next';
import {
  View,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
  Alert,
  Linking,
  Dimensions,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import React, {useState, useEffect, useCallback} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Modal} from 'react-native';
import ContactBrochure from './Modals/ContactBrochure';
import dummy_brochure from './dummy_brochure.json';
import {useIsFocused} from '@react-navigation/native';
import styles from './styles';
import {useSelector, useDispatch, connect} from 'react-redux';
import getUser from '../../selectors/UserSelectors';
import {API_URL} from '@env';
import axios from 'axios';
const DownloadBrochure = props => {
  const {t} = useTranslation();
  //   const dummyFAQ = dummy_faq.menu_faq;
  const {navigation} = props;
  const {width} = useWindowDimensions().width;
  console.log('params dari choose project', props.route.params);
  // const paramsData = props.route.params;
  const [paramsData, setParamsData] = useState(props.route.params);
  const [showModal, setShowModal] = useState(false);
  // const [project_name, setProjectName] = useState(
  //   props.route.params.project_name,
  // );
  const [showAlert, setShowAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');
  const user = useSelector(state => getUser(state));
  const userToken = useSelector(state => state.user.userIDToken);
  console.log('user di brosur', user);
  const [dataBrosurFetch, setDataBrosur] = useState([]);

  const isFocused = useIsFocused();
  const [name, setName] = useState(user.name);
  const namechanged = useCallback(value => setName(value), []);
  const [phoneNumber, setPhoneNumber] = useState(user.handphone);
  const phonechanged = useCallback(value => setPhoneNumber(value), []);
  const [email, setEmail] = useState(user.user);
  const emailchanged = useCallback(value => setEmail(value), []);

  useEffect(() => {
    getData();
  });
  const getData = () => {
    const projectNo = paramsData;
    console.log('cek projek no', projectNo);
    const dataBrosur = dummy_brochure.data;

    dataBrosur.forEach((item, id) => {
      console.log('item databrosur project no', item.project_no);
      console.log('params prject_nno', paramsData.project_no);
      item.project_no === paramsData.project_no ? setDataBrosur(item) : null;
    });

    //  const config = {
    //    method: 'get',
    //    // url: 'http://dev.ifca.co.id:8080/apiciputra/api/approval/groupMenu?approval_user=MGR',
    //    url: API_URL + '/project/index',
    //    headers: {
    //      'content-type': 'application/json',
    //      // 'X-Requested-With': 'XMLHttpRequest',
    //      Authorization: `Bearer ${user.Token}`,
    //    },
    //    // params: {approval_user: user.userIDToken.UserId},
    //    params: {group_cd: user.Group},
    //  };
    //  console.log('formdaata get project', config);

    //  axios(config)
    //    .then(result => {
    //      // let load = {
    //      //   success: true,
    //      // };
    //      const pasing = result.data.Data;
    //      console.log('data di chooseproject', pasing);
    //      setDataProject(pasing);
    //    })
    //    .catch(error =>
    //      console.log('error getdata project error', error.response),
    //    );
  };

  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={[BaseStyle.safeAreaView, {backgroundColor: BaseColor.whiteColor}]}>
      <Header
        title={t('download')}
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
      <ScrollView>
        <View
          //   key={index}
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
            source={{uri: paramsData.picture_url}}
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
                {paramsData.entity_name}
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.type.LatoBold,
                  color: BaseColor.corn50,
                  marginVertical: 5,
                }}>
                {paramsData.location}
              </Text>
            </View>
          </View>
        </View>
        {/* <TouchableOpacity> */}
        <Button
          full
          medium
          round
          style={{backgroundColor: BaseColor.corn50, height: 50}}
          onPress={() => navigation.navigate('RequestBrosur', paramsData)}>
          <Text
            style={{
              fontFamily: Fonts.type.Lato,
              fontSize: 14,
              color: BaseColor.whiteColor,
            }}>
            Request Brochure
          </Text>
        </Button>
        {/* </TouchableOpacity> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DownloadBrochure;

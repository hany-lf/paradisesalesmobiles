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
const RequestBrosur = props => {
  const {t} = useTranslation();
  //   const dummyFAQ = dummy_faq.menu_faq;
  const {navigation} = props;
  const {width} = useWindowDimensions().width;
  console.log('params dari choose project', props.route.params);
  // const paramsData = props.route.params;
  const [paramsData, setParamsData] = useState(props.route.params);
  const [showModal, setShowModal] = useState(false);
  const [project_name, setProjectName] = useState(
    props.route.params.project_name,
  );
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

  const sendReq_ = () => {
    const datasend = {
      handphone: phoneNumber,
      // email: user.user,
      email: email,
      userID: user.UserId,
      name: name,
      entity_cd: paramsData.entity_cd,
      project_no: paramsData.project_no,
    };
    console.log('datasend', datasend);
    console.log('token user ', userToken);
    // setShowAlert(true);
    // setMessageAlert('heh');
    const config = {
      method: 'post',

      // url: 'http://dev.ifca.co.id:8080/apiciputra/api/approval/processApproval',
      url: API_URL + '/project/save-prospect-brosur',
      headers: {
        'content-type': 'application/json',

        Authorization: `Bearer ${userToken.Token}`,
      },
      data: datasend,
    };
    axios(config)
      .then(function (response) {
        console.log('POST DATA STATUS----->', response.data);
        // getDataApprove();
        // getDataUnApprove();
        // alertSave(response);
        // navigation.navigate('Home');
        const msg = response.data.Pesan;
        setMessageAlert(msg);
        setShowAlert(true);
      })
      .catch(error => {
        console.log('ERROR POST STATUS----->', error.response);
      });
  };

  const pressClose = () => {
    setShowAlert(false);
    navigation.navigate('HomeScreen');
  };

  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={[BaseStyle.safeAreaView, {backgroundColor: BaseColor.whiteColor}]}>
      <Header
        title={t('Request Brochure')}
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
      <View
        style={[
          styles.centeredView,
          {
            //   backgroundColor: 'rgba(152, 128, 78, 0.8)', //modal transparan
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
            height: '100%',
          },
        ]}>
        <ScrollView>
          <View style={{marginHorizontal: 30, marginVertical: 20}}>
            <Text
              style={{
                fontFamily: Fonts.type.LatoBold,
                fontSize: 16,
                color: BaseColor.corn70,
              }}>
              Request a Brochure
            </Text>

            <View style={{marginTop: 15, marginBottom: 10}}>
              <Text
                style={{
                  fontFamily: Fonts.type.LatoBold,
                  fontSize: 12,
                  color: BaseColor.corn70,
                  marginBottom: 15,
                }}>
                Your Name
              </Text>
              <TextInput
                // style={[
                //   // BaseStyle.textInput,/
                //   {marginVertical: 30},
                // ]}
                onChangeText={text => namechanged(text)}
                //   onChangeText={text => console.log('type', text)}
                autoCorrect={false}
                placeholder={t('your_name')}
                value={name}
                selectionColor={BaseColor.primary}
                // multiline
                // numberOfLines={4}
                position={'left'}
                icon={
                  <Icon
                    style={{marginHorizontal: 10}}
                    name={'user'}
                    size={16}
                    color={BaseColor.corn50}
                  />
                }
              />
            </View>
            <View style={{marginTop: 15, marginBottom: 10}}>
              <Text
                style={{
                  fontFamily: Fonts.type.LatoBold,
                  fontSize: 12,
                  color: BaseColor.corn70,
                  marginBottom: 15,
                }}>
                Email
              </Text>
              <TextInput
                style={[BaseStyle.textInput]}
                onChangeText={text => emailchanged(text)}
                // onChangeText={text => console.log('type', text)}
                autoCorrect={false}
                placeholder={t('your_email')}
                value={email}
                selectionColor={BaseColor.primary}
                position={'left'}
                autoCapitalize={'none'}
                icon={
                  <Icon
                    style={{marginHorizontal: 10}}
                    name={'envelope'}
                    size={24}
                    color={BaseColor.corn50}
                  />
                }
              />
            </View>
            <View style={{marginTop: 15, marginBottom: 10}}>
              <Text
                style={{
                  fontFamily: Fonts.type.LatoBold,
                  fontSize: 12,
                  color: BaseColor.corn70,
                  marginBottom: 15,
                }}>
                Phone Number
              </Text>
              <TextInput
                style={[BaseStyle.textInput]}
                // onChangeText={text => setPhoneCust(text)}
                onChangeText={text => phonechanged(text)}
                autoCorrect={false}
                placeholder={t('your_phone_number')}
                value={phoneNumber}
                selectionColor={BaseColor.primary}
                position={'left'}
                keyboardType={'phone-pad'}
                icon={
                  <Icon
                    style={{marginHorizontal: 10}}
                    name={'whatsapp'}
                    size={24}
                    color={BaseColor.corn50}
                  />
                }
              />
            </View>

            <Button
              onPress={() => sendReq_()}
              round
              style={{
                height: 50,
                backgroundColor: BaseColor.corn50,
                // borderRadius: 15,
              }}
              medium>
              <Text
                style={{
                  fontFamily: Fonts.type.Lato,
                  fontSize: 14,
                  color: BaseColor.whiteColor,
                  alignSelf: 'center',
                }}>
                Send
              </Text>
            </Button>
          </View>
        </ScrollView>
      </View>
      {/* //modal alert custom  */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showAlert}

        // onRequestClose={() => {
        //   Alert.alert('Modal has been closed.');
        //   setModalShowUsername(!showModalUsername);
        // }}
      >
        <View
          style={{
            // backgroundColor: BaseColor.corn50,
            backgroundColor: 'rgba(152, 128, 78, 0.8)', //modal transparan
            // opacity: 0.5,
            height: Dimensions.get('screen').height,
            // height: 100,
            alignContent: 'center',

            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: BaseColor.whiteColor,
              borderRadius: 10,
              marginHorizontal: 20,

              justifyContent: 'center',
              padding: 10,
            }}>
            <Text
              style={{
                justifyContent: 'center',
                color: BaseColor.greenStateColor,
                fontFamily: Fonts.type.Lato,
                fontSize: 14,
                textAlign: 'center',
                marginTop: 10,
                marginBottom: 5,
              }}>
              {/* {editProfilStatus.Pesan} */}
              {messageAlert}
            </Text>

            <TouchableOpacity onPress={() => pressClose()}>
              <View
                // small
                style={{
                  borderRadius: 10,
                  height: 35,
                  width: 120,
                  padding: 0,
                  margin: 0,
                  backgroundColor: BaseColor.corn50,
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    justifyContent: 'center',
                    color: BaseColor.whiteColor,
                    fontFamily: Fonts.type.Lato,
                    fontSize: 13,
                    textAlign: 'center',
                    margin: 3,
                  }}>
                  Okay
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default RequestBrosur;

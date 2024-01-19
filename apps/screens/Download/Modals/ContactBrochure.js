import {Text, Button, Icon, Image, TextInput} from '@components';
// import Image from '../../../../components/Image';
import {View, TouchableOpacity, Modal, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './styles';
import {useTranslation} from 'react-i18next';

import {BaseStyle, Fonts, BaseColor} from '@config';
import {ScrollView} from 'react-native-gesture-handler';
import {useIsFocused} from '@react-navigation/native';

const ContactBrochure = props => {
  const {datas, icon, ...attrs} = props;
  console.log('attrs ?', attrs);
  console.log('datas nya', datas);
  const {t} = useTranslation();
  const [emailCust, setEmailCust] = useState('');
  const [phoneCust, setPhoneCust] = useState('');
  const isFocused = useIsFocused();
  console.log('isofcus apasih', isFocused);
  // useEffect(() => {

  // }, [isFocused]);

  const sendReq_ = () => {
    if (emailCust == '' && phoneCust == '') {
      console.log('Please fill in one of this field');
      Alert.alert('Please fill in one of this field');
    } else if (emailCust != '' || emailCust != null) {
      console.log('kirim email');
      console.log('const email', emailCust);
      Alert.alert('kirim email');
    } else if (phoneCust != '' || phoneCust != null) {
      console.log('kirim whatsapp');
      console.log('const phone', phoneCust);
      Alert.alert('kirim whatsapp');
    } else {
      console.log('sudah di isi keduanya');
      Alert.alert('sudah di isi keduanya');
    }
    // if (emailCust == null) {
    //   console.log('kirim whatsapp');
    // } else if (phoneCust == null){
    //   console.log('kirim email');
    // }
  };
  return (
    <Modal {...attrs} animationType="slide" transparent={true}>
      <View
        style={[
          styles.centeredView,
          {
            backgroundColor: BaseColor.whiteColor,
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
          },
        ]}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 20,
              marginVertical: 20,
            }}>
            {icon}

            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: Fonts.type.LatoBold,
                  color: BaseColor.corn70,
                  fontSize: 16,
                }}>
                Brochure
              </Text>
            </View>
          </View>
          {/* --- border  */}
          <View
            style={{
              borderWidth: 0.3,
              borderColor: BaseColor.corn70,
              borderStyle: 'solid',
            }}></View>
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

              <TextInput
                style={[BaseStyle.textInput, {marginVertical: 30}]}
                // onChangeText={text => setEmailCust(text)}
                onChangeText={text => console.log('type', text)}
                autoCorrect={false}
                placeholder={t('your_email')}
                value={emailCust}
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

              <Text
                style={{
                  fontFamily: Fonts.type.LatoBold,
                  fontSize: 12,
                  color: BaseColor.corn70,
                  alignSelf: 'center',
                }}>
                Or
              </Text>

              <TextInput
                style={[BaseStyle.textInput, {marginVertical: 30}]}
                // onChangeText={text => setPhoneCust(text)}
                onChangeText={test => console.log('phone type', test)}
                autoCorrect={false}
                placeholder={t('your_phone_number')}
                value={phoneCust}
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

              <Button
                onPress={() => (isFocused ? sendReq_() : sendReq_())}
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
      </View>

      {/* <Button onPress={() => close()} style={{backgroundColor: 'red'}}>
        <Text>close</Text>
      </Button> */}
    </Modal>
  );
};

export default ContactBrochure;

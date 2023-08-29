import {Text, Button, Header, Icon} from '@components';
import {useDispatch, useSelector} from 'react-redux';
import React, {useState, useEffect, useRef} from 'react';
import {BaseStyle, Fonts, BaseColor} from '@config';
import data_dummy from '../Home/data_dummy.json';
import {View, ScrollView, Image} from 'react-native';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';

const Profile = props => {
  const [loading, setLoading] = useState(false);
  const {t} = useTranslation();
  const dispatch = useDispatch();

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
        <Text>ini profile</Text>
      </View>
      <Button
        onPress={() => onLogOut()}
        // outline
        medium
        style={{borderRadius: 24, backgroundColor: BaseColor.corn50}}>
        <Text
          style={{
            color: BaseColor.whiteColor,
            fontFamily: Fonts.type.LatoBold,
          }}>
          Sign Out
        </Text>
      </Button>
    </SafeAreaView>
  );
};

export default Profile;

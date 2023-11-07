import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';

import {Text, Header, Icon, ComingSoon} from '@components';

import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BaseStyle, Fonts, BaseColor} from '@config';
import {useTranslation} from 'react-i18next';

import {useSelector, useDispatch, connect} from 'react-redux';
import getUser from '../../selectors/UserSelectors';
import axios from 'axios';
import {API_URL} from '@env';

const PrivacyPolicy = props => {
  const {navigation} = props;
  const {t} = useTranslation();
  const user = useSelector(state => getUser(state));
  console.log('props dari home di choose project', props);

  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={[BaseStyle.safeAreaView, {backgroundColor: BaseColor.whiteColor}]}>
      <Header
        title={t('privacy_policy')}
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
          //   navigation.navigate('HomeScreen');
        }}
      />

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <ComingSoon></ComingSoon>
      </View>
    </SafeAreaView>
  );
};
export default PrivacyPolicy;

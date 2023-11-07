import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';

import {Text, Header, Icon} from '@components';

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
import * as Animatable from 'react-native-animatable';

export default function ComingSoon(props) {
  const {colors} = useTheme();
  const {
    style,
    loading,
    children,
    backgroundColor,
    title,
    subtitle,
    onPressSeeDetails,
    onPress,
    image,
    data,
    ...rest
  } = props;

  return (
    <View style={{alignItems: 'center'}}>
      <Animatable.View
        // name={'hour'}
        animation="swing"
        easing="linear"
        // easing="ease"
        iterationCount="infinite"
        style={{textAlign: 'center'}}>
        {/* ❤️halo */}
        <Icon name={'hourglass-half'} color={BaseColor.corn70} size={24}></Icon>
      </Animatable.View>
      <View>
        <Text
          style={{
            fontSize: 14,
            color: BaseColor.corn70,
            fontFamily: Fonts.type.Lato,
          }}>
          Coming Soon
        </Text>
      </View>
    </View>
  );
}

ComingSoon.propTypes = {
  loading: PropTypes.bool,

  backgroundColor: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  onPressSeeDetails: PropTypes.func,
  onPress: PropTypes.func,
  image: PropTypes.node,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  loading: PropTypes.bool,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

ComingSoon.defaultProps = {
  style: {},
  loading: false,
  image: '',
  onPress: () => {},
  onPressSeeDetails: () => {},
  subtitle: '',
  title: '',
  backgroundColor: '',
  data: {},
};

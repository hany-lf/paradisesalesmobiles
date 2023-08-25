import Text from '@components/Text';
import {Images} from '@config';
import {useTheme} from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import {
  Image as RNImage,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import Loading from './Loading';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {BaseColor} from '../../config';

const ButtonMenuHome = props => {
  let {date, title, image, style, onPress, loading, nameicon} = props;
  const {colors} = useTheme();
  if (loading) {
    return <Loading style={style} />;
  }
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: BaseColor.corn10,
          borderColor: BaseColor.corn10,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
      onPress={onPress}>
      <IconFontAwesome5 name={nameicon} solid size={20}></IconFontAwesome5>
      <Text
        body2
        semibold
        style={[styles.title, {textAlign: 'center'}]}
        numberOfLines={2}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

ButtonMenuHome.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  date: PropTypes.string,
  title: PropTypes.string,
  nameicon: PropTypes.string,
  onPress: PropTypes.func,
};

ButtonMenuHome.defaultProps = {
  style: {},
  image: Images.antasari,
  date: '',
  title: '',
  title: '',
  onPress: () => {},
};

export default ButtonMenuHome;

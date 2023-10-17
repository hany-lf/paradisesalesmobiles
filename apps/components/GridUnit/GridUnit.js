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

const GridUnit = props => {
  let {
    date,
    title,
    type,
    image,
    style,
    onPress,
    loading,
    nameicon,
    goToProject,
    status_unit,
  } = props;
  const {colors} = useTheme();
  if (loading) {
    return <Loading style={style} />;
  }
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor:
            status_unit == 'A'
              ? BaseColor.greenStateColor
              : status_unit == 'B'
              ? BaseColor.yellowStateColor
              : status_unit == 'NA'
              ? BaseColor.redStateColor
              : BaseColor.corn10,
          borderColor: BaseColor.corn10,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
      onPress={onPress}>
      <IconFontAwesome5
        name={nameicon}
        solid
        size={20}
        color={BaseColor.whiteColor}></IconFontAwesome5>
      <Text
        body2
        semibold
        style={[
          styles.title,
          {
            textAlign: 'center',
            // alignItems: 'center',
            // alignContent: 'center',
            // alignSelf: 'center',
          },
        ]}
        numberOfLines={2}>
        {title}
      </Text>
      <Text
        body2
        style={[
          styles.titleBold,
          {
            textAlign: 'center',
            // alignItems: 'center',
            // alignContent: 'center',
            // alignSelf: 'center',
          },
        ]}
        numberOfLines={2}>
        {type}
      </Text>
    </TouchableOpacity>
  );
};

GridUnit.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  date: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  status_unit: PropTypes.string,
  nameicon: PropTypes.string,
  onPress: PropTypes.func,
};

GridUnit.defaultProps = {
  style: {},
  image: Images.antasari,
  date: '',
  title: '',
  nameicon: '',
  type: '',
  status_unit: '',
  onPress: () => {},
};

export default GridUnit;

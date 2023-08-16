import Text from '@components/Text';
import {BaseColor} from '@config';
import PropTypes from 'prop-types';
import React from 'react';
import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import styles from './styles';
import {useTheme} from '@react-navigation/native';

export default function Button(props) {
  const {colors} = useTheme();
  const {
    style,
    styleText,
    icon,
    outline,
    full,
    medium,
    round,
    loading,
    children,
    backgroundColor,
    ...rest
  } = props;

  return (
    <TouchableOpacity
      {...rest}
      style={StyleSheet.flatten([
        [styles.default, {backgroundColor: backgroundColor}],
        outline && [
          styles.outline,
          {
            backgroundColor: colors.card,
            borderColor: colors.primary,
          },
        ],
        full && styles.full,
        medium && styles.medium,
        round && styles.round,
        style,
      ])}
      activeOpacity={0.9}>
      {icon ? icon : null}
      <Text
        style={StyleSheet.flatten([
          styles.textDefault,
          outline && {color: colors.primary},
          styleText,
        ])}
        numberOfLines={1}>
        {children}
      </Text>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={outline ? colors.primary : BaseColor.whiteColor}
          style={{paddingLeft: 5}}
        />
      ) : null}
    </TouchableOpacity>
  );
}

Button.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  icon: PropTypes.node,
  outline: PropTypes.bool,
  full: PropTypes.bool,
  medium: PropTypes.bool,
  round: PropTypes.bool,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  style: {},
  icon: null,
  outline: false,
  full: false,
  medium: false,
  round: false,
  loading: false,
};

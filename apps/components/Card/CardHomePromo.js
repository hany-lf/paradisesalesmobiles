import Text from '@components/Text';
import {BaseColor} from '@config';
import PropTypes from 'prop-types';
import React from 'react';
import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
// import styles from './styles';
import {useTheme} from '@react-navigation/native';
import {Image, View} from 'react-native';
import {Fonts} from '@config';

export default function CardHomePromo(props) {
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
    ...rest
  } = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          // flex: 1,
          flexDirection: 'row',
          // borderWidth: 1,
          // borderColor: 'black',
          width: '100%',
          height: 180, // height ini harus sama kayak height image ataupun sebaliknya, karena biar sejajar panjangnya
          alignSelf: 'center',
          borderRadius: 25,
          // alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'space-between',
          marginHorizontal: 20,
          // backgroundColor: BaseColor.corn50,
          backgroundColor: backgroundColor,
        }}>
        <View
          style={{
            width: '70%',
            paddingHorizontal: 25,
            paddingVertical: 15,
          }}>
          <Text
            style={{
              color: BaseColor.grey10,
              fontFamily: Fonts.type.LatoBold,
              fontSize: 16,
              marginBottom: 10,
            }}>
            {/* Step into your new elegance design home. */}
            {title}
          </Text>
          <Text
            style={{
              color: BaseColor.grey10,
              fontFamily: Fonts.type.Lato,
              fontSize: 12,
              marginBottom: 10,
            }}>
            {/* Each apartment showcase contemporary architecture, high-end finished, and
      top-of the-line appliance. */}
            {subtitle}
          </Text>

          <TouchableOpacity
            onPress={onPressSeeDetails}
            style={{
              backgroundColor: BaseColor.corn70,
              width: 100,
              paddingVertical: 10,
              paddingHorizontal: 10,
              borderRadius: 18,
              marginTop: 10,
            }}>
            <View>
              <Text
                style={{
                  color: BaseColor.corn10,
                  fontFamily: Fonts.type.Lato,
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}>
                See details
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{width: '30%'}}>
          <Image
            source={image}
            //   source={require('@assets/images/home/slider-project/sudirmansuite.jpeg')}
            // width={80}
            style={{
              resizeMode: 'cover',
              borderTopRightRadius: 25,
              borderBottomRightRadius: 25,
              // alignItems: 'center',
              width: '100%',
              height: 180,
            }}
            // height={80}
          ></Image>
        </View>
      </View>
    </TouchableOpacity>

    // <TouchableOpacity
    //   {...rest}
    //   style={StyleSheet.flatten([
    //     [styles.default, {backgroundColor: backgroundColor}],
    //     outline && [
    //       styles.outline,
    //       {
    //         backgroundColor: colors.card,
    //         borderColor: colors.primary,
    //       },
    //     ],
    //     full && styles.full,
    //     medium && styles.medium,
    //     round && styles.round,
    //     style,
    //   ])}
    //   activeOpacity={0.9}>
    //   {icon ? icon : null}
    //   <Text
    //     style={StyleSheet.flatten([
    //       styles.textDefault,
    //       outline && {color: colors.primary},
    //       styleText,
    //     ])}
    //     numberOfLines={1}>
    //     {children}
    //   </Text>
    //   {loading ? (
    //     <ActivityIndicator
    //       size="small"
    //       color={outline ? colors.primary : BaseColor.whiteColor}
    //       style={{paddingLeft: 5}}
    //     />
    //   ) : null}
    // </TouchableOpacity>
  );
}

CardHomePromo.propTypes = {
  loading: PropTypes.bool,

  backgroundColor: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  onPressSeeDetails: PropTypes.func,
  onPress: PropTypes.func,
  image: PropTypes.node,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  loading: PropTypes.bool,
};

CardHomePromo.defaultProps = {
  style: {},
  loading: false,
  image: '',
  onPress: () => {},
  onPressSeeDetails: () => {},
  subtitle: '',
  title: '',
  backgroundColor: '',
};

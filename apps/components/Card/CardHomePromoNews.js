import Text from '@components/Text';
import {BaseColor} from '@config';
import PropTypes from 'prop-types';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
// import styles from './styles';
import {useTheme} from '@react-navigation/native';
import {Image, View} from 'react-native';
import {Fonts} from '@config';

export default function CardHomePromoNews(props) {
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

  console.log('data promo news', image);
  return (
    // <FlatList
    //   data={data}
    //   horizontal
    //   showsHorizontalScrollIndicator={false}
    //   renderItem={(item, index) => {
    //     return (
    <TouchableOpacity onPress={onPress}>
      <View style={{width: 150, height: 150}}>
        <Image
          source={{
            uri: 'https://www.shutterstock.com/image-photo/webinar-banner-aerial-top-view-cargo-1846546738',
          }}
          style={{
            // flex: 1,
            resizeMode: 'cover',
            borderRadius: 15,
            // borderTopRightRadius: 25,
            // borderBottomRightRadius: 25,
            // alignItems: 'center',
            width: '100%',
            height: 180,
          }}></Image>
        <Text>{image}</Text>
        <View
          style={{
            position: 'absolute',
            bottom: -50,
            width: '100%',
            height: 75,
            borderRadius: 10,
            padding: 10,
            backgroundColor: BaseColor.whiteColor,
          }}>
          <Text
            style={{
              color: BaseColor.redColor,
              fontFamily: Fonts.type.LatoBold,
              fontSize: 12,
              //   marg
            }}>
            {/* Step into your new elegance design home. */}
            {title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
    //     );
    //   }}></FlatList>
  );
}

CardHomePromoNews.propTypes = {
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

CardHomePromoNews.defaultProps = {
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

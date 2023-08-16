import {StyleSheet} from 'react-native';
import {BaseColor, Typography, FontWeight, Fonts} from '@config';

export default StyleSheet.create({
  default: {
    height: 56,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  textDefault: {
    ...Typography.headline,
    color: BaseColor.whiteColor,
    fontWeight: FontWeight.semibold,
    fontFamily: Fonts.type.Lato,
  },
  outline: {
    borderWidth: 1,
  },

  full: {
    width: '100%',
    alignSelf: 'auto',
  },
  medium: {
    width: '80%',
    alignSelf: 'auto',
    alignSelf: 'center',
  },
  round: {
    borderRadius: 15,
  },
});

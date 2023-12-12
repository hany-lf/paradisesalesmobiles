import {StyleSheet} from 'react-native';
import {BaseColor, Fonts} from '@config';

export default StyleSheet.create({
  header: {
    backgroundColor: '#000',
    // marginLeft: 20,
    paddingLeft: 20,
    // top: 40,
    width: '100%',
    zIndex: 9999,
  },
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    width: 200,
    marginVertical: 10,
    borderColor: BaseColor.corn50,
    borderWidth: 0.5,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginHorizontal: 20,

    // backgroundColor: 'red',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,

    color: BaseColor.corn50,
    fontFamily: Fonts.type.Lato,
  },
  placeholderStyle: {
    fontSize: 14,
    color: BaseColor.corn50,

    fontFamily: Fonts.type.Lato,
    // backgroundColor: 'red',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: BaseColor.corn70,
    fontFamily: Fonts.type.Lato,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    // fontSize: 16,
    fontSize: 14,
    color: BaseColor.corn70,
    fontFamily: Fonts.type.Lato,
  },
  itemTextStyle: {
    // fontSize: 16,
    fontSize: 14,
    color: BaseColor.corn70,
    fontFamily: Fonts.type.Lato,
  },
});

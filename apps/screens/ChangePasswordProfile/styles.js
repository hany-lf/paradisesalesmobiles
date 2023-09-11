import {StyleSheet} from 'react-native';
import {BaseColor, Fonts} from '@config';

export default StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    // marginTop: 10,
    padding: 10,
    width: '100%',
  },
  forgotPassword: {
    fontFamily: Fonts.type.Lato,
    width: '30%',
    borderBottomColor: BaseColor.corn70,
    borderBottomWidth: 1,
    textAlign: 'center',
  },
  contain: {
    padding: 20,
    paddingTop: 0,
    flex: 1,
    justifyContent: 'center', // ini untuk center tengah dari atas ke bawah
  },
  contentActionBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textTitle: {
    color: '#dadada',
    // fontSize: Fonts.moderateScale(20),
    alignSelf: 'center',
    marginBottom: 450,
    fontFamily: Fonts.type.Lato,
  },
  text: {
    color: '#ffffff',
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'space-around',
    // justifyContent: 'space-evenly',

    justifyContent: 'center',
  },
});

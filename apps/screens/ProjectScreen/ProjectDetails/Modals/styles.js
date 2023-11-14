import {StyleSheet, Dimensions, Platform} from 'react-native';
import {BaseColor, Fonts} from '@config';
const {width: screenWidth} = Dimensions.get('window');
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
    color: BaseColor.corn50,
    fontFamily: Fonts.type.Lato,
    fontSize: 14,
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
  item: {
    // width: screenWidth - 50,
    // height: screenWidth - 70,
    width: screenWidth - 80,
    height: screenWidth - 80,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 25,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
    // width: screenWidth - 50,
    // height: screenWidth - 70,
  },
  centeredView: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: Platform.OS == 'ios' ? 30 : 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  badgeSurrounding: {
    width: 100,
    padding: 10,
    //   height: 20,
    backgroundColor: BaseColor.whiteColor,
    borderColor: BaseColor.corn50,
    borderWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
    borderRadius: 15,
    marginHorizontal: 15,
    marginBottom: 15,
    // marginVertical: 20,
  },
  shadowimageSurrounding: {
    width: 100,
    height: 100,
    borderRadius: 15,
    ...Platform.select({
      android: {
        elevation: 3,
      },
      default: {
        shadowColor: BaseColor.corn50,
        shadowOffset: {height: 0, width: 0},
        shadowOpacity: 3,
        shadowRadius: 3,
      },
    }),
  },
});

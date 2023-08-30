import {Text, Header, Icon} from '@components';
import data_dummy from '../Home/data_dummy.json';
import {View, ScrollView, Image} from 'react-native';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BaseStyle, Fonts, BaseColor} from '@config';
import {useTranslation} from 'react-i18next';

const ProjectScreen = props => {
  console.log('data dummy', data_dummy);
  const datas = data_dummy.data_dummy;
  console.log('image', datas[0].image);
  const {navigation} = props;
  const {t} = useTranslation();
  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={[BaseStyle.safeAreaView, {backgroundColor: BaseColor.whiteColor}]}>
      <Header
        title={t('choose_project')}
        renderLeft={() => {
          return (
            <Icon
              // name="angle-left"
              name="arrow-left"
              size={18}
              color={BaseColor.corn70}
              enableRTL={true}
            />
          );
        }}
        style={{height: 80}}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <View style={{marginBottom: 100}}>
          {datas.map((item, index) => (
            <View
              // style={styles.item}
              style={{
                width: '100%',
                height: 300,
                paddingHorizontal: 30,
                marginVertical: 10,
                // marginHorizontal
              }}>
              {/* <Text>{item.image}</Text> */}
              <Image
                // source={{uri: item.image}}
                source={require('@assets/images/home/slider-project/sudirmansuite.jpeg')}
                // src={item.image}
                // source={}
                // containerStyle={styles.imageContainer}
                // style={styles.image}
                style={{
                  width: '100%',
                  // width: 300,
                  height: 300,
                  // marginTop: 10,
                  // paddingTop: 10,
                  // ...StyleSheet.absoluteFillObject,
                  resizeMode: 'cover',
                  borderRadius: 25,
                }}
              />

              <View
                style={{
                  position: 'absolute',
                  backgroundColor: BaseColor.grey10,
                  // top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: 80,

                  marginHorizontal: 55,
                  marginVertical: 20,
                  borderRadius: 20,
                  opacity: 0.8,
                  // justifyContent: 'center',
                  // alignItems: 'center',
                }}>
                <View style={{marginVertical: 10, marginHorizontal: 25}}>
                  <Text
                    style={{
                      fontFamily: Fonts.type.LatoBlack,
                      color: BaseColor.corn90,
                      marginVertical: 5,
                      fontSize: 16,
                    }}>
                    {item.project_name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: Fonts.type.LatoBold,
                      color: BaseColor.corn50,
                      marginVertical: 5,
                    }}>
                    {item.location}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProjectScreen;
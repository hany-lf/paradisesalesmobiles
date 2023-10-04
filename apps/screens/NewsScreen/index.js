import {View} from 'react-native';
import {Text, Header, Icon} from '@components';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BaseStyle, BaseColor, BaseSetting} from '../../config';
import {useTranslation} from 'react-i18next';
const NewsScreen = props => {
  const {navigation} = props;
  const {t} = useTranslation();
  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={[BaseStyle.safeAreaView, {backgroundColor: BaseColor.whiteColor}]}>
      <Header
        title={t('news_screen')}
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
          //   navigation.navigate('HomeScreen');
        }}
      />
      <View>
        <Text>ini news screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default NewsScreen;

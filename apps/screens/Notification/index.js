import {Text, SafeAreaView, Header, Icon, ComingSoon} from '@components';
import {BaseStyle, BaseColor} from '../../config';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';

const Notification = props => {
  const {t} = useTranslation();
  const {navigation} = props;
  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={[BaseStyle.safeAreaView, {backgroundColor: BaseColor.whiteColor}]}>
      <Header
        title={t('notification')}
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

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <ComingSoon></ComingSoon>
      </View>
    </SafeAreaView>
  );
};
export default Notification;

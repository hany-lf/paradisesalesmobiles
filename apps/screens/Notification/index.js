import {Text, SafeAreaView, Header, Icon} from '@components';
import {BaseStyle, BaseColor} from '../../config';
import {useTranslation} from 'react-i18next';
const Notification = props => {
  const {t} = useTranslation();
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
      <Text>inni notif</Text>
    </SafeAreaView>
  );
};
export default Notification;

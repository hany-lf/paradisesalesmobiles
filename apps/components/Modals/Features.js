import {Text, Button, Icon} from '@components';
import {View, TouchableOpacity, Modal} from 'react-native';
const Features = props => {
  const {onPress, datas, ...attrs} = props;
  console.log('attrs ?', attrs);
  return (
    <Modal {...attrs}>
      <View>
        <Text>ini akan jadi modal feature</Text>
      </View>
    </Modal>
  );
};

export default Features;

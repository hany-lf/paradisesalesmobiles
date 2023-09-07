import {useState} from 'react';
import {View, Text, Modal} from 'react-native';
const UsernameNull = props => {
  //   console.log('props dari useraction', props);
  const {status, pesan} = props;
  console.log('status username null', status);
  const [modalVisible, setModalVisible] = useState(props.status);
  return (
    // <View style={{flex: 1}}>
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Hello World!</Text>
        </View>
      </View>
    </Modal>
    // </View>
  );
};

export default UsernameNull;

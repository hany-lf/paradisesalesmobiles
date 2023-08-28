import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {Text, Button} from '@components';

// const CustomModal = ({
//   children,
//   refRBSheet,
//   borderRadius,
//   height,
//   animationType,
//   onClose,
//   onOpen,
// }) => {
//   return (
//     <RBSheet
//       animationType={animationType}
//       height={height}
//       onClose={onClose}
//       onOpen={onOpen}
//       ref={refRBSheet}
//       closeOnDragDown={true}
//       closeOnPressMask={true}
//       customStyles={{
//         container: {
//           backgroundColor: 'white',
//           borderTopLeftRadius: borderRadius,
//           borderTopRightRadius: borderRadius,
//         },
//       }}>
//       {children}
//     </RBSheet>
//   );
// };

const CustomModal = props => {
  const {navigation} = props;
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 30}}>This is a modal!</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
};

export default CustomModal;

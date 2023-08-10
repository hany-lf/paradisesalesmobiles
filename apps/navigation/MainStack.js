import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {useWindowDimensions, View, Text, TouchableOpacity} from 'react-native';

import HomeScreen from '../screens/Home';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const MainStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        // name="HomeStack"
        // component={DrawerStack}
        name="HomeStack"
        component={HomeScreen}
        options={{headerShown: false}}></Stack.Screen>
    </Stack.Navigator>
  );
};
export default MainStack;

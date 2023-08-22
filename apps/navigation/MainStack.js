import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {useWindowDimensions, View, Text, TouchableOpacity} from 'react-native';
import ForgotPassword from '../screens/ForgotPassword';
import HomeScreen from '../screens/Home';
import Register from '../screens/Register';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// import ForgotPassword from '../screens/ForgotPassword';

const MainStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        // name="HomeStack"
        // component={DrawerStack}
        name="HomeStack"
        component={HomeScreen}
        options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen
        // name="HomeStack"
        // component={DrawerStack}
        name="ForgotPassword"
        component={ForgotPassword}
        options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen
        // name="HomeStack"
        // component={DrawerStack}
        name="Register"
        component={Register}
        options={{headerShown: false}}></Stack.Screen>
    </Stack.Navigator>
  );
};
export default MainStack;

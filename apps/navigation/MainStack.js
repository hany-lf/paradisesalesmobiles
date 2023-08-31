import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {BaseColor} from '@config';
import {Button} from '@components';
import {
  BottomTabNavigatorMazi,
  tabBarFloat,
  tabBarIcon,
  CustomTabBarButton,
} from './components';
import {useWindowDimensions, View, Text, TouchableOpacity} from 'react-native';
import ForgotPassword from '../screens/ForgotPassword';
import HomeScreen from '../screens/Home';
import Register from '../screens/Register';
import ProfileScreen from '../screens/Profile';
import ProjectScreen from '../screens/ProjectScreen';
import CustomModal from '../screens/CustomModal';
import Notification from '../screens/Notification';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// import ForgotPassword from '../screens/ForgotPassword';
export const WalletMenu = () => (
  <BottomTabNavigatorMazi tabScreens={WalletTabScreens} />
);

export const WalletTabScreens = {
  HomeScreen: {
    component: HomeScreen,
    options: {
      title: 'Home',
      headerShown: false,
      tabBarIcon: ({focused, color}) =>
        tabBarIcon({focused, color, name: 'home'}),
    },
  },
  ProjectScreen: {
    component: ProjectScreen,
    options: {
      title: 'Project',
      headerShown: false,
      tabBarIcon: ({focused, color}) =>
        tabBarIcon({focused, color, name: 'city'}),
    },
  },
  CustomModal: {
    component: CustomModal,
    // mode: 'modal',
    // component: CreateNewPlaceholder,
    options: {
      // title: 'Menu',
      headerShown: true,
      // animationEnabled: true,
      // mode: 'modal',
      presentation: 'modal',
      // tabBarStyle: {display: 'none'},
      // headerLeft: () => (
      //   <TouchableOpacity
      //     onPress={
      //       () => alert('hah n back')
      //       // props.navigation.setOptions({
      //       //   tabBarVisible: true,
      //       // })
      //     }>
      //     {/* <View> */}
      //     <Text>on back</Text>
      //     {/* </View> */}
      //   </TouchableOpacity>
      // ),

      tabBarButton: ({focused, onPress, props, color}) =>
        CustomTabBarButton({
          onPress,
          props,
          color,
          focused,
          // color: '#58D68D',
          bgColor: BaseColor.corn10, //inni background belakang bawah button bulet
          nameIcon: 'align-justify',
          nameTitle: 'Menu',
        }),
      // tabBarFloat: ({focused, color}) =>
      // tabBarFloat({focused, color, name: 'history'}),
      // tabBarIcon: ({focused, color}) =>
      //   tabBarIcon({focused, color, name: 'history'}),
    },
  },
  NotificationScreen: {
    component: Notification,
    options: {
      title: 'Notification',
      headerShown: false,

      tabBarIcon: ({focused, color}) =>
        tabBarIcon({focused, color, name: 'bell'}),
    },
  },
  ProfileScreen: {
    component: ProfileScreen,
    options: {
      title: 'Profile',
      headerShown: false,

      tabBarIcon: ({focused, color}) =>
        tabBarIcon({focused, color, name: 'user'}),
    },
  },
};

const MainStack = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
        presentation: 'modal',
      }}>
      <Stack.Group>
        <Stack.Screen
          // name="HomeStack"
          // component={DrawerStack}
          name="HomeStack"
          // component={HomeScreen}
          component={WalletMenu}
          options={{
            headerShown: false,
            animationEnabled: 'true',
          }}></Stack.Screen>

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
      </Stack.Group>
      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen
          // name="HomeStack"
          // component={DrawerStack}
          name="CustomModal"
          component={CustomModal}
          options={{headerShown: false, animationEnabled: true}}></Stack.Screen>
      </Stack.Group>
    </Stack.Navigator>
  );
};
export default MainStack;

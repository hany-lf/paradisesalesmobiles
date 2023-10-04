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
import CalculatorScreen from '../screens/CalculatorScreen';
import UsernameNull from '../actions/modalAlert/usernameNull';
import HelpCenter from '../screens/HelpCenter';
import FAQ from '../screens/FAQ';
import AboutUs from '../screens/AboutUs';
import EditProfile from '../screens/EditProfile';
import ChangePasswordProfile from '../screens/ChangePasswordProfile';
import ProjectDetails from '../screens/ProjectScreen/ProjectDetails';
import DownloadBrochure from '../screens/Download';
import ChooseProject from '../screens/ChooseProject';
import SignIn from '../screens/SignIn';
import ResetPass from '../screens/ResetPass';
import PromoScreen from '../screens/PromoScreen';
import NewsScreen from '../screens/NewsScreen';
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
        <Stack.Screen
          // name="HomeStack"
          // component={DrawerStack}
          name="CalculatorScreen"
          component={CalculatorScreen}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          // name="HomeStack"
          // component={DrawerStack}
          name="UsernameNull"
          component={UsernameNull}
          options={{headerShown: false}}></Stack.Screen>

        <Stack.Screen
          // name="HomeStack"
          // component={DrawerStack}
          name="HelpCenter"
          component={HelpCenter}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          // name="HomeStack"
          // component={DrawerStack}
          name="FAQ"
          component={FAQ}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          // name="HomeStack"
          // component={DrawerStack}
          name="AboutUs"
          component={AboutUs}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          // name="HomeStack"
          // component={DrawerStack}
          name="EditProfile"
          component={EditProfile}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          // name="HomeStack"
          // component={DrawerStack}
          name="ChangePasswordProfile"
          component={ChangePasswordProfile}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          // name="HomeStack"
          // component={DrawerStack}
          name="ProjectDetails"
          component={ProjectDetails}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          // name="HomeStack"
          // component={DrawerStack}
          name="ChooseProject"
          component={ChooseProject}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          // name="HomeStack"
          // component={DrawerStack}
          name="DownloadBrochure"
          component={DownloadBrochure}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          // name="HomeStack"
          // component={DrawerStack}
          name="PromoScreen"
          component={PromoScreen}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          // name="HomeStack"
          // component={DrawerStack}
          name="NewsScreen"
          component={NewsScreen}
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

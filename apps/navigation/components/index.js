/** @format */

import React from 'react';
import {Icon, Text} from '@components';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import {useTranslation} from 'react-i18next';
import {BaseColor, BaseStyle} from '@config';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import {useTheme} from '@react-navigation/native';
// import styles from '../../screens/SignIn/styles';
import {TabBg} from './TabBg';
import {Button} from '../../components';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CustomModal from '../../screens/CustomModal';
import {Fonts} from '../../config';
import {CardStyleInterpolators} from '@react-navigation/stack';

export const tabBarIcon = ({focused, color, name}) => (
  // console.log('colorrr', color);
  //   console.log('name icon', name),
  //   (
  // (<FontAwesome5 name={'comments'} solid />)
  <Icon name={name} size={20} solid color={color} focused={focused} />
);

export const tabBarFloat = ({focused, color, nameIcon, nameTitle}) => (
  <View style={{alignItems: 'center'}}>
    <Icon name={nameIcon} size={24} solid color={color} focused={focused} />
    <Text
      style={{
        color: color,
        marginTop: 5,
        fontSize: 12,
        fontFamily: Fonts.type.Lato,
      }}
      focused={focused}>
      {nameTitle}
    </Text>
  </View>
);

//   )
//   tesicon

export const CustomTabBarButton = ({
  children,
  onPress,
  color,
  nameTitle,
  nameIcon,
  bgColor,
  focused,
  //   component,
  navigation,
  props,
}) => {
  console.log('onpress', onPress);
  console.log('color', color);
  console.log('navigation', props);
  return (
    <View
      style={{position: 'relative', width: 75, alignItems: 'center'}}
      pointerEvents="box-none">
      <TabBg color={bgColor} style={{position: 'absolute', top: 0}} />

      <TouchableOpacity
        style={{
          top: -40.5,
          justifyContent: 'center',
          alignItems: 'center',
          width: 70,
          height: 70,
          borderRadius: 35,
          // backgroundColor: 'pink', //
          backgroundColor: BaseColor.corn30, //
        }}
        onPress={onPress}
        // onPress={() => console.log('first')}
      >
        {/* {tabBarIcon({color, name})} */}
        {tabBarFloat({color, nameIcon, nameTitle})}
      </TouchableOpacity>
    </View>
    // <View>
    //   <IconFontAwesome5
    //     name={'home'}
    //     size={14}
    //     color={'red'}></IconFontAwesome5>
    //   <Text style={{color: focused ? color : 'black'}}>halo</Text>
    // </View>
  );
};

export const tabBarIconHaveNoty = ({color, name}) => {
  const {colors} = useTheme();
  const data = useSelector(state => state.apiReducer.data);
  let sum = 0;
  data.map((item, index) => {
    sum += parseInt(item.IsRead);
  });

  const counter = useSelector(state => state.counter);
  console.log('counter badge di tabbar', counter);
  const total = data.length;
  const finalCount = total - sum;

  return (
    <View>
      {/* {tabBarIcon({color, name})} */}
      {tabBarFloat({color, name})}
      <View
        style={{
          borderWidth: 1,
          borderColor: BaseColor.whiteColor,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          width: 20,
          height: 20,
          backgroundColor: 'red',
          top: -5,
          right: -12,
          borderRadius: 10,
        }}>
        <Text whiteColor caption2>
          {/* {notifData_FromRed} */}
          {finalCount < 0 ? 0 : finalCount}
        </Text>
      </View>
    </View>
  );
};

const CreateNew = () => {
  <View style={{flex: 1, backgroundColor: 'red'}}></View>;
};
const placeholder = () => <View />;
const BottomTab = createBottomTabNavigator();

export const BottomTabNavigatorMazi = ({tabScreens = {}}) => {
  const {t} = useTranslation();
  const {colors} = useTheme();
  return (
    <BottomTab.Navigator
      mode="modal"
      screenOptions={{
        presentation: 'modal',

        headerShown: false,
        // headerMode: 'screen',
        animationEnabled: false,
        tabBarShowIcon: true,
        tabBarShowLabel: true,
        tabBarInactiveTintColor: BaseColor.corn30,
        tabBarActiveTintColor: BaseColor.corn70,
        tabBarStyle: {
          //cek
          position: 'absolute',

          elevation: 0,
          backgroundColor: BaseColor.corn10,
          borderRadius: 15,
          height: 60,
          ...styles.shadow,
        },
        tabBarLabelStyle: {
          fontSize: 11,

          paddingBottom: 8,
        },
        tabBarItemStyle: {
          borderTopWidth: 0,

          // backgroundColor: '#FFFFFF',
          // backgroundColor: 'red',
          // backgroundColor: 'transparent',

          //   elevation: 30,
        },
      }}>
      {Object.keys(tabScreens).map((name, index) => {
        const {options, component} = tabScreens[name];
        console.log('name tab', name);
        console.log('index tab', index);
        return name == 'CustomModal' ? (
          <BottomTab.Screen
            key={index}
            name={name}
            component={component}
            listeners={({navigation, route}) => ({
              tabPress: e => {
                console.log('ini yg diklik', e),
                  // Prevent default action
                  e.preventDefault();

                // Do something with the `navigation` object
                navigation.navigate('CustomModal');
              },
            })}
            options={{
              tabBarIconStyle: {paddingVertical: 0, marginVertical: 0},
              ...options,
              title: t(options.title),
              animationEnabled: true,
            }}
          />
        ) : (
          <BottomTab.Screen
            key={index}
            name={name}
            component={component}
            options={{
              tabBarIconStyle: {paddingVertical: 0, marginVertical: 0},
              ...options,
              title: t(options.title),
            }}
          />
        );
      })}
    </BottomTab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

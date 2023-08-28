<BottomTab.Navigator
  // initialRouteName="Home"
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
  }}
  options={{modalPresentationStyle: 'fullScreen'}}>
  {Object.keys(tabScreens).map((name, index) => {
    const {options, component} = tabScreens[name];
    console.log('name tab', name);
    console.log('index tab', index);
    return name == 'CustomModal' ? (
      <BottomTab.Screen
        key={index}
        name={name}
        component={component}
        // component={CustomModal}
        // listeners={({navigation}) => ({
        //   tabPress: event => {
        //     event.preventDefault();
        //     navigation.navigate('CustomModal');
        //   },
        // })}
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
  {/* </BottomTab.Group> */}
  {/* <BottomTab.Group screenOptions={{presentation: 'modal'}}>
        <BottomTab.Screen name="MyModal" component={CustomModal} />
      </BottomTab.Group> */}
</BottomTab.Navigator>;

<Modal animationType="slide" transparent={true} visible={modalVisible}>
  <View
    style={{
      position: 'absolute',
      bottom: 0,
      // left: 0,
      // right: 0,
      backgroundColor: BaseColor.corn30,
      // alignSelf: 'center',
      // width: '100%',
      paddingHorizontal: 10,
      paddingVertical: 20,
      borderRadius: 25,
      marginBottom: 100,
      marginLeft: 10,
      marginRight: 10,
      alignSelf: 'center',
    }}>
    <View
      style={{
        paddingTop: 10,
        justifyContent: 'center',
      }}>
      <FlatList
        data={dataMenu}
        numColumns={4}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                padding: 5,
                // paddingLeft: index % 2 == 0 ? 3 : 10,
                // paddingRight: index % 2 == 0 ? 3 : 10,
                paddingBottom: 15,
              }}>
              <ButtonMenuHome
                onPress={() => goToScreen(item)}
                title={item.Title}
                nameicon={item.IconClass}
              />
            </View>
          );
        }}
        keyExtractor={item => item.MenuID}
      />
    </View>
  </View>

  <View
    style={{
      position: 'absolute',
      bottom: 0,
      alignSelf: 'center',
      marginBottom: 10, //margin bottom untuk button bulet bawah
    }}>
    <TouchableOpacity onPress={() => button()}>
      <View
        style={{
          backgroundColor: BaseColor.corn30,
          borderRadius: 35,
          width: 70,
          height: 70,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon
          name="times-circle"
          size={40}
          color={BaseColor.corn50}
          style={{margin: 0}}></Icon>
      </View>
    </TouchableOpacity>

    {/* <Button
              onPress={() => button()}
              style={{
                backgroundColor: BaseColor.corn30,
                borderRadius: 40,
                width: 70,
                height: 70,
              }}>
              <Icon
                name={'times-circle'}
                size={30} //size maksimal 30 krn kalo 31 hilang
                color={BaseColor.corn50}></Icon>
            </Button> */}
  </View>
</Modal>;

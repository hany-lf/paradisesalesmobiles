import {  StatusBar,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Image,
    ScrollView,
    View,
    Alert,
    ActivityIndicator,
    LogBox,
    Text,

    PermissionsAndroid} from 'react-native';
import React, {Component} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {SafeAreaView} from 'react-native-safe-area-context';

const NupScreen = props => {

    return (
        <SafeAreaView
            edges={['right', 'top', 'left']}

            style={[BaseStyle.safeAreaView, {backgroundColor: BaseColor.whiteColor}]}
        >
        <View>
            <Text>NUPScreen</Text>
        </View>
      </SafeAreaView>  
       
    )
}

export default NupScreen;
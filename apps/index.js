import {Text} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableScreens} from 'react-native-screens';
import {persistor, store} from '../apps/store/index';
import App from './navigation';
import * as Utils from '@utils';

enableScreens(false);
Utils.setupLayoutAnimation();

const AppParadise = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <App />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};
export default AppParadise;

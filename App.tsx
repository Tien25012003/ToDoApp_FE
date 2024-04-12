import {StatusBar} from 'react-native';
import React, {useEffect, useLayoutEffect} from 'react';
import HomeScreen from './src/screens/HomeScreen';
import {COLORS} from '@utils/colors';
import {Host} from 'react-native-portalize';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider, useAtom} from 'jotai';
import {store, updateDeviceId} from '@state/store';
import Draft from '@screens/draft';
import DeviceInfo from 'react-native-device-info';
const App = () => {
  const [_, update] = useAtom(updateDeviceId);
  useLayoutEffect(() => {
    const getDeviceInfo = async () => {
      const id = await DeviceInfo.getUniqueId();
      update(id);
    };
    getDeviceInfo();
  }, []);
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <Host>
          <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
          <HomeScreen />
          {/* <Draft /> */}
        </Host>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;

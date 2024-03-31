import {StatusBar} from 'react-native';
import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import {COLORS} from '@utils/colors';
import {Host} from 'react-native-portalize';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'jotai';
import {store} from '@state/store';
const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <Host>
          <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
          <HomeScreen />
        </Host>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;

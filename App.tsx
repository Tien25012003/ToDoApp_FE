import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import {COLORS} from '@utils/colors';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <HomeScreen />
    </>
  );
};

export default App;

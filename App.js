import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { StatusBar } from 'react-native';
import UploadScreen from './src/screens/UploadScreen';
import CloudScreen from './src/screens/CloudScreen';





const App = () => {

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <CloudScreen />
    </>
  );
};


export default App;
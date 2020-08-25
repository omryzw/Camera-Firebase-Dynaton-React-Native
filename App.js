import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { StatusBar, Image,StyleSheet, SafeAreaView, TouchableHighlight } from 'react-native';
import UploadScreen from './src/screens/UploadScreen';
import CloudScreen from './src/screens/CloudScreen';
import { useState }from "react";






const App = () => {

  const [page, setPageMarker] = useState(false);
  // true for home // false for 2nd Page


   const styles = StyleSheet.create({
    logo:{
    width: 60, height: 60,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#ffffff'
  }
   })

  function goBack() {
    // go to homepage
    setPageMarker(true)
  }

  function goForward() {
    // go to cloud section
    setPageMarker(false)
  }

  // fix might be needed for memory leak

  return (
    <>
    <SafeAreaView style={styles.container}>
        { page == false ? (
          <TouchableHighlight onPress={goBack}>
          <Image source = {require('/Users/gorongatapiwa/Documents/reactapps/mycamera/src/img/back.png')} style={styles.logo}/>
          </TouchableHighlight>
        ) : false}

        { page == true ? (
          <TouchableHighlight onPress={goForward}>
          <Image source = {require('/Users/gorongatapiwa/Documents/reactapps/mycamera/src/img/forward.png')} style={styles.logo}/>
          </TouchableHighlight>
        ) : true}
    </SafeAreaView>

      {page == false ? (
        <CloudScreen />
      ) : false}

      {page == true ? (
      <UploadScreen />
      ) : true}

    </>
  );
};


export default App;
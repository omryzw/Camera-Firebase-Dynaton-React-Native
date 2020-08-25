import React ,{useEffect}from 'react';
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  Platform,
  Alert,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  Image
} from 'react-native';
import storage from '@react-native-firebase/storage';
import { useState }from "react";
import { StatusBar } from 'react-native';



export default function CloudScreen() {

  const [cloudFiles,setcloudFiles] = useState([]);

 function  loadFiles() {
      // Get Photos from cloud
      const storageRef = storage().ref('files/')
      storageRef.listAll().then(async result => {
        const promises = result.items.map(async ref => {
          const response = ref.getDownloadURL()
          return response
        })
        var results = await Promise.all(promises)
        setcloudFiles(results)
      })
     
}

// Call Files On Init
  useEffect(()=>{
    loadFiles()
  } ,[])



if(cloudFiles == []){
  return <Text> Loading... </Text>
} else {
  useEffect(() => {
    arrayToList(cloudFiles)
  }, [])
}

function arrayToList(array) {
  // convert response array to List to render in FlatList
  let list = null;
  for (let i = array.length - 1; i >= 0; i--) {
    list = {
      value: array[i],
      rest: list
    };
  }
  return list;
}

const Item = ({ title }) => (
  <View style={styles.item}>
       <Image source={{ uri: title }} style={styles.avatar} />
  </View>
);

  
 const renderItem = ({ item }) => (
    <Item title={item.title} />
  );
  


  const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginTop:100
  },
  avatar:{
    width: 90, height: 90,
    marginTop: 40,
    borderRadius: 15
    
  },
  logo:{
    width: 80, height: 80,
    marginBottom: 40
  },
  selectButton: {
    borderRadius: 3,
    width: 420,
    height: 50,
    marginBottom: 20,
    backgroundColor: '#0000FF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold'
  }

  });


   return (
    <>
    <SafeAreaView style={styles.container}>
    <View>
       { cloudFiles.map((item, key)=>(
        <Image key={key} source={{ uri: item }} style={styles.avatar} />)
         )}
    </View>
 
    </SafeAreaView>

    <TouchableOpacity style={styles.selectButton} onPress={loadFiles}>
        <Text style={styles.buttonText}>Refresh</Text>
    </TouchableOpacity>

    </>

    );


  }
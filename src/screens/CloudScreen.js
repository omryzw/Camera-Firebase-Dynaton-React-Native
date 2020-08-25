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
        console.log(results)
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


function formatUrlForDeletion(unformattedUrl) {
	var leadingUrl = "gs://mycamera-f3063.appspot.com/files/";
	var filenameWithToken = unformattedUrl.substring(unformattedUrl.lastIndexOf('2F') + 2);
	filenameWithToken = filenameWithToken.substring(0, filenameWithToken.indexOf('?'));
	var finalUrl = leadingUrl + filenameWithToken
	deletePicture(finalUrl)
}

function deletePicture(url) {
  var desertRef = storage().refFromURL(url)
  // Delete the file
  desertRef.delete().then(function() {
    // alert 
    console.log('deleted successfully')
  }).catch(function(error) {
    // Uh-oh, an error occurred!
    console.log(error)
  });

  
}


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

  function check(a){
    console.log(a)
  }

   return (
    <>
    <SafeAreaView style={styles.container}>
    <View>
       { cloudFiles.map((item, key)=>(
        <TouchableHighlight onPress={check(9)}>
        <Image key={key} source={{ uri: item }} style={styles.avatar}/> 
        </TouchableHighlight>
        )
         )}
    </View>
 
    </SafeAreaView>

    <TouchableOpacity style={styles.selectButton} onPress={loadFiles}>
        <Text style={styles.buttonText}>Refresh</Text>
    </TouchableOpacity>

    </>

    );


  }
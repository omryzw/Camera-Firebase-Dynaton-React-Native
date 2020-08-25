import * as React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  FlatList,
  Platform,
  Alert,
  Image
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { useState }from "react";
import * as Progress from 'react-native-progress';


export default function UploadScreen() {

  const [image, setImage] = useState(null);
  const [transferred, setTransferred] = useState(0);
  const [uploading, setUploading] = useState(false);
 
  const selectImage = () => {
  const options = {
    maxWidth: 2000,
    maxHeight: 2000,
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };


  ImagePicker.showImagePicker(options, response => {
    if (response.didCancel) {
      console.log('cancelled');
    } else if (response.error) {
      console.log('Image Picker Error: ', response.error);
    } else if (response.customButton) {
      console.log('Button Pressed: ', response.customButton);
    } else {
      const source = { uri: response.uri };
      console.log(source);
      setImage(source);
    }
  });
};

const uploadImage = async () => {
  const { uri } = image;
  const filename = uri.substring(uri.lastIndexOf('/') + 1);
  const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
  setUploading(true);
  setTransferred(0);
  // Firebase init
  const task = storage()
    .ref('files/' + filename)
    .putFile(uploadUri);
  task.on('state_changed', snapshot => {
    setTransferred(
      Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
    );
  });
  try {
    await task;
  } catch (e) {
    console.error(e);
  }
  setUploading(false); // dismiss the progress bar
  
  Alert.alert(
    'Success',
    'Uploaded to Cloud, Press Top Button To View'
  );

  setImage(null);
};

const styles = StyleSheet.create({

  container: {

    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff'
    
  },

  selectButton: {

    borderRadius: 3,
    width: 420,
    height: 50,
    marginTop: 645,
    backgroundColor: '#0000FF',
    alignItems: 'center',
    justifyContent: 'center'

  },
  
  avatar: {

    width: 120, height: 120

  },

  uploadButton: {

    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: '#0000FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20

  },
  
  buttonText: {

    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold'

  },

  imageContainer: {

    marginTop: 30,
    marginBottom: 50,
    alignItems: 'center'

  },

  progressBarContainer: {

    marginTop: 20

  },

  imageBox: {

    width: 300,
    height: 300,
    borderRadius: 55,
    
  }
});

 return (

    <SafeAreaView style = { styles.container }>

    <View style = { styles.imageContainer }>
         
        { image !== null ? (
          <Image source = {{ uri: image.uri }} style = {styles.imageBox} />
        ) : null }

        { uploading ? (
          <View style = {styles.progressBarContainer}>
            <Progress.Bar progress = {transferred} width = {300} />
          </View>
        ) : false }
        
        { image != null ?(
          <TouchableOpacity style={ styles.uploadButton } onPress={ uploadImage }>
            <Text style = { styles.buttonText }>Upload to Cloud</Text>
          </TouchableOpacity>
        ) : null }

      </View>
      <TouchableOpacity style = { styles.selectButton } onPress = { selectImage }>
        <Text style = { styles.buttonText }>Take Photo</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
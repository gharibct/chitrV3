import React, { useState } from 'react';
import { View, Button, Image, Text, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Colors from '../../constants/Colors';

const ImgPicker = props => {
  const [pickedImage, setPickedImage] = useState();

  const verifyPermissions = async () => {

    let permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if(permission.status !== 'granted')
    {
      const result = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      //const result = await ImagePicker.requestCameraRollPermissionsAsync();
      if (result.status !== 'granted') {
        Alert.alert(
          'Insufficient permissions!',
          'You need to grant camera permissions to use this app. (E-105)',
          [{ text: 'Okay' }]
        );
        return false;
      }
    }
    return true;
  };

  const takeImageHandler = async () => {
    if(props.remainingPhotos <= 0){
      return;
    }
    
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    

    const image = await ImagePicker.launchCameraAsync({ 
      /*
      aspect: [16, 9],
     
      quality: 0.5
      */
     mediaTypes: ImagePicker.MediaTypeOptions.All,
     //aspect: [4, 3],
     allowsEditing: true,
     quality: 0.5    
    });
    setPickedImage(image.uri);
    props.onImageTaken(image.uri);
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>No image picked yet.</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <Button
        title="Take Photo"
        color={Colors.primary}
        disabled={props.remainingPhotos<=0}
        onPress={takeImageHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center',
    marginBottom: 15
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1
  },
  image: {
    width: '100%',
    height: '100%'
  }
});

export default ImgPicker;

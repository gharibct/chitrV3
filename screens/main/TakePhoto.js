import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Button,
  Text,
  TextInput,
  Alert,
  StyleSheet
} from 'react-native';

import Colors from '../../constants/Colors';
import {ImgPicker,ActivityLoading, CountDownTimer} from '../../components/UI/Index';

import { useDispatch, useSelector } from 'react-redux';
import * as photoActions from '../../store/actions/photo';

import * as Location from 'expo-location';
import * as Device from 'expo-device';

import * as Permissions from 'expo-permissions';
import * as Cellular from 'expo-cellular';


const TakePhoto = props => {
  const [selectedImage, setSelectedImage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [pickedLocation, setPickedLocation] = useState({lat:"",lng:""});
  const [currLat,setCurrLat]=useState(0);
  const [currLng,setCurrLng]=useState(0);
  const [error, setError] = useState();

  const authValues = useSelector(state =>
    state.auth
  );

  const photoValues = useSelector(state =>
    state.photo
  );


  useEffect(() => {
    if (error && error != "") {
      Alert.alert('An error occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const dispatch = useDispatch();
  /*Reusable code -- Ends */

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant location permissions to use this app.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    try {
      //setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 20000
      });
      dispatch(photoActions.setLocation(location.coords.latitude,location.coords.longitude));
    } catch (err) {
      console.log("Could not fetch location!",err)
    }
    //setIsFetching(false);
  };


  const titleChangeHandler = text => {
    // you could add validation
    setTitleValue(text);
  };

  const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
 
  /*Screen - Init Logic*/
  useEffect(() => {
   screenInitHandler();
  }, [dispatch]); 

  const screenInitHandler = async () => {
    setError(null);
    setIsLoading(true);

    const uuid = uuidv4();
    //const uuid = '8d746d5e-6747-4335-8c8a-aa14d3a0a226';
    try {
      await dispatch(photoActions.getServerTime(authValues.userId))
      //console.log("photo gid - ",uuid)
      dispatch(photoActions.setGuid(uuid))
      await getLocationHandler();
      setIsLoading(false);
    }
    catch (err) {
      setIsLoading(false);
      //setError(err.message)
      console.log(err.message)
    }
  }

  const imageTakenHandler = async(imagePath) => {
    setSelectedImage(imagePath);
    const currentTime = new Date();
    setIsLoading(true);
  try {
      await dispatch(photoActions.uploadCertPhoto(
        authValues.userId,
        photoValues.gid,
        photoValues.time,
        currentTime,
        //"13.88,70.88",
        photoValues.lat +"," +photoValues.lng,
        "abc_xyz",
        1000,
        imagePath,
        "imei",
        Device.modelName + "-" +Device.deviceName
      ))
      setIsLoading(false);
    }
    catch (err) {
      setIsLoading(false);
      //setError(err.message)
      console.log(err.message)
    }
  };

  const reviewAndCertify = () => {
    //props.navigation.goBack();
    props.navigation.navigate("reviewCertify")
  };

  const timeOutFn = () => {
    //props.navigation.goBack();
    setError("Photo certification session timed out. Please try again")
    props.navigation.navigate("home")
  };  
  

  return (
    <ScrollView
    keyboardShouldPersistTaps='always'
    >
      <View style={styles.form}>
        <ImgPicker onImageTaken={imageTakenHandler} remainingPhotos={photoValues.photo_remaining} />

        <View style={styles.remainingPhotoContainer}>
          <Text
            style={styles.remainingPhotoText}
          >Remaining Photos
              </Text>
        </View>

        <View style={styles.generalContainerWrapper}>
          <View style={styles.photoValueContainer}>
            <Text
              style={styles.phototValueText}
            >{photoValues.photo_remaining}
              </Text>
          </View>
        </View>

        <View style={styles.photoInfoContainer}>
          <Text
            style={styles.photoInfoText}
          >**You can take maximum {photoValues.max_photos} photos before review
              </Text>
        </View>
        <View style={styles.reviewBtnContainer}>
        <Button
          title="Review and Certify"
          color={Colors.primary}
          onPress={reviewAndCertify}
          disabled={photoValues.max_photos == photoValues.photo_remaining}
        />
        </View>

        <CountDownTimer maxTime={photoValues.cert_end_time} timeOutFn={timeOutFn}/>
      </View>
      {isLoading && <ActivityLoading />}
    </ScrollView>
  );
};

TakePhoto.navigationOptions = {
  headerTitle: 'Certification'
};

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  label: {
    fontSize: 18,
    marginBottom: 15
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2
  },
  generalContainerWrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  remainingPhotoContainer: {
    marginTop: 5
  },
  remainingPhotoText: {
    textAlign: 'center',
    fontFamily: 'open-sans-bold',
    fontSize: 18
  },
  photoValueContainer: {
    marginTop: 5,
    backgroundColor: Colors.bright,
    height: 40,
    width: '30%',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phototValueText: {
    textAlign: 'center',
    fontFamily: 'open-sans',
    color: Colors.ascent,
    fontSize: 24
  },
  photoInfoContainer: {
    marginTop: 5
  },
  photoInfoText: {
    textAlign: 'center',
    fontFamily: 'open-sans-bold',
    fontSize: 12
  },
  reviewBtnContainer:{
    marginTop: 5
  },

});

export default TakePhoto;

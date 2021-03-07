import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  FlatList,
  Button,
  Text,
  CheckBox,
  Picker,
  ActivityIndicator,
  Alert,
  TouchableOpacity
} from 'react-native';

import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import InputPicker from '../../components/UI/InputPicker';
import InputCheckbox from '../../components/UI/InputCheckbox';
import SampleData from '../../data/SampleData'
import ReviewCertifyItem from '../../components/screen/ReviewCertifyItem';
//import ReviewData from '../../data/ReviewData'

import { useDispatch, useSelector } from 'react-redux';
import * as photoActions from '../../store/actions/photo';
import * as certActions from '../../store/actions/cert';

import {ActivityLoading, CountDownTimer} from '../../components/UI/Index';

const ReviewAndCertify = props => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const authValues = useSelector(state =>
    state.auth
  );

  const photoValues = useSelector(state =>
    state.photo
  );

  const ReviewData = useSelector(state =>
    state.photo.review_photo
  );


  useEffect(() => {
    if (error && error != "") {
      Alert.alert('An error occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const dispatch = useDispatch();
  /*Reusable code -- Ends */

  /*Screen - Init Logic*/
  useEffect(() => {
    screenInitHandler();
    
  }, [dispatch]);

  const screenInitHandler = async () => {
    setError(null);
    setIsLoading(true);

    //const uuid = uuidv4();
    try {
      await dispatch(photoActions.reviewPhotos(authValues.userId,photoValues.gid))
      /*
      ReviewData.forEach(element => {
        console.log("ReviewData");
        console.log(element)
      });
      */
      //await dispatch(photoActions.getPhotoInfo(34,"84e28b36ddc642a197fb82819475162b"))

      setIsLoading(false);
    }
    catch (err) {
      setIsLoading(false);
      //setError(err.message)
    }
  }

  const deleteHandler = (photo_id) => {
    setError(null);
    
    dispatch(photoActions.deletePhoto(authValues.userId,photoValues.gid,photo_id))
  }

  const submitForCertificationHandler = async () => {
    setError(null);
    setIsLoading(true);

    
    let cert_photo_ids = ReviewData.map(element => {
      return element.photo_id
    })
    //const uuid = uuidv4();
    try {
      await dispatch(photoActions.submitForCertification(authValues.userId,photoValues.gid,cert_photo_ids))
      await dispatch(certActions.getCertList(authValues.userId))
      props.navigation.navigate('home');
    }
    catch (err) {
      //setError(err.message)
      console.log(err.message)
    }
  }
  return (
    <KeyboardAvoidingView
      style={styles.screen}
    >
      <View style={styles.gradient}>

        <View style={styles.confirmContainer}>
          <Text style={styles.confirmText}>
            Photos below would be certified
          </Text>
          <View style={styles.actions}>
            <Button
              color={Colors.primary}
              title="Submit for Certification"
              onPress={() => {
                submitForCertificationHandler();
                //props.navigation.navigate('home');
              }}
            />
          </View>
          <CountDownTimer maxTime={photoValues.cert_end_time}/>
          <Text style={styles.deleteText}>
            **Delete unwanted photos before confirmation.
          </Text>
        </View>

        <FlatList
          data={ReviewData}
          keyExtractor={item => item.id}
          renderItem={reviewData => (
            <ReviewCertifyItem
              photo_id={reviewData.item.photo_id}
              userId={authValues.userId}
              onDelete={deleteHandler}
            />
          )}
        />
      </View>
      {isLoading && <ActivityLoading />}
    </KeyboardAvoidingView>
  );
};

ReviewAndCertify.navigationOptions = {
  headerTitle: 'Review and Certify'
  //headerShown: false
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  generalContainerWrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  mainContainer: {
    width: '100%',
    flex: 1,
    padding: 20
  },

  confirmContainer: {
    marginTop: 15
  },
  confirmText: {
    textAlign: 'center',
    fontFamily: 'open-sans-bold',
    fontSize: 24
  },
  deleteText: {
    textAlign: 'center',
    fontFamily: 'open-sans',
    color: Colors.ascent,
    fontSize: 14
  },

  actions: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 5
  }

});
export default ReviewAndCertify;

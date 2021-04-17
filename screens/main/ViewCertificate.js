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

import ActivityLoading from '../../components/UI/ActivityLoading';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import InputPicker from '../../components/UI/InputPicker';
import InputCheckbox from '../../components/UI/InputCheckbox';
import SampleData from '../../data/SampleData'
import CertificateItem from '../../components/screen/CertificateItem';
import CertificationData from '../../data/CertificationData'

import { useDispatch, useSelector } from 'react-redux';
import * as certActions from '../../store/actions/cert';


const ViewCertificate = props => {
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const authValues = useSelector(state =>
    state.auth
  );


  const certListValues = useSelector(state =>
    state.cert.certList
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

    try {
      await dispatch(certActions.getCredits(authValues.userId))
      await dispatch(certActions.getCertList(authValues.userId))
      setIsLoading(false)
    }
    catch (err) {
      setIsLoading(false)
      setError(err.message)
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
    >
      <View style={styles.gradient}>
      <FlatList
        data={certListValues}
        keyExtractor={item => item.gid + item.id}
        renderItem={cerData => (
          <CertificateItem
            UserId = {authValues.userId} 
            Desc={cerData.item.id} 
            CertificationID={cerData.item.id} 
            PhotoCount={cerData.item.photos_count}
            CreditCharged={cerData.item.credit_charged}
            PhotoSize={cerData.item.all_photo_size/1024}
            Status={cerData.item.status}
            DateTime={cerData.item.time}
            setIsLoading={setIsLoading}
          />

        )}
      />
      </View>
      {isLoading && <ActivityLoading />}
    </KeyboardAvoidingView>
  );
};

ViewCertificate.navigationOptions = {
  headerTitle: 'Download Certificate'
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
    alignItems: 'center'
  },
  mainContainer: {
    width: '100%',
    flex: 1,
    padding: 20
  },

  welcomeContainer: {
    marginTop: 15
  },
  welcomeText: {
    textAlign: 'center',
    fontFamily: 'open-sans',
    color: Colors.ascent,
    fontSize: 24
  },

  newCertContainer: {
    width:'80%',
    marginTop: 30,
    flex: 1,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius:20
  },
  newcertButton: {
    padding:10,
    fontFamily: 'open-sans',
    fontSize: 24,
    textAlign: 'center',
    color:'white'
  },


 
  creditContainer: {
    marginTop: 30
  },
  creditText: {
    textAlign: 'center',
    fontFamily: 'open-sans-bold',
    fontSize: 24
  },
  creditValueContainer: {
    marginTop: 10,
    backgroundColor: Colors.bright,
    height: 80,
    width: '40%',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  creditValueText: {
    textAlign: 'center',
    fontFamily: 'open-sans',
    color: Colors.ascent,
    fontSize: 48
  },
  rechargeContainer: {
    marginTop: 10
  },
  rechargeText: {
    textAlign: 'center',
    fontFamily: 'open-sans-bold',
    fontSize: 16
  },

 
  certificateContainer: {
    marginTop: 30
  },
  certificateText: {
    textAlign: 'center',
    fontFamily: 'open-sans-bold',
    fontSize: 24
  },
  certificateValueContainer: {
    marginTop: 10,
    backgroundColor: Colors.primary,
    height: 80,
    width: '40%',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  certificateValueText: {
    textAlign: 'center',
    fontFamily: 'open-sans',
    color: 'white',
    fontSize: 36
  },  

});
export default ViewCertificate;

import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  Text,
  CheckBox,
  Picker,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import ActivityLoading from '../../components/UI/ActivityLoading';
import Colors from '../../constants/Colors';
import InputPicker from '../../components/UI/InputPicker';
import InputCheckbox from '../../components/UI/InputCheckbox';
import SampleData from '../../data/SampleData'
import { useDispatch, useSelector } from 'react-redux';
import * as certActions from '../../store/actions/cert';
import * as photoActions from '../../store/actions/photo';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';

const HomePage = props => {
  /*Reusable code -- Starts */
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const authValues = useSelector(state =>
    state.auth
  );

  const certValues = useSelector(state =>
    state.cert
  );
  const photoValues = useSelector(state =>
    state.photo
  );


  useEffect(() => {
    if (error && error != "") {
      Alert.alert('An error occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  /*
  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );
  */

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
      await dispatch(photoActions.getGlobals(authValues.userId))
      setIsLoading(false)
    }
    catch (err) {
      setIsLoading(false)
      setError(err.message)
    }
  }

  const onViewCertificate = async () => {
    setError(null);
    setIsLoading(true);

    try {
      await dispatch(certActions.getCredits(authValues.userId))
      await dispatch(certActions.getCertList(authValues.userId))
      props.navigation.navigate('viewCert')
      setIsLoading(false)
    }
    catch (err) {
      setIsLoading(false)
      setError(err.message)
    }
  }

  const onNewCertificate = async () => {
    setError(null);
    setIsLoading(true);

    try {
      await dispatch(photoActions.getGlobals(authValues.userId))
      props.navigation.navigate('takePhoto')
      setIsLoading(false)
    }
    catch (err) {
      setIsLoading(false)
      setError(err.message)
    }
  }



  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
    >
      <View style={styles.gradient}>
        <Card style={styles.mainContainer}>
          <ScrollView
            keyboardShouldPersistTaps='always'
          >
            <View style={styles.welcomeContainer}>
              <Text
                style={styles.welcomeText}
              >Welcome {authValues.first_name}
              </Text>
            </View>

            <TouchableCmp useForeground
              onPress={() => {
                onNewCertificate();
              }}
            >
              <View style={styles.generalContainerWrapper}>
                <View style={styles.newCertContainer}>

                  <Text style={styles.newcertButton}>New Certification?</Text>

                </View>
              </View>
            </TouchableCmp>

            <View style={styles.creditContainer}>
              <Text
                style={styles.creditText}
              >Your Available Creditss
              </Text>
            </View>

            <View style={styles.generalContainerWrapper}>
              <View style={styles.creditValueContainer}>
                <Text
                  style={styles.creditValueText}
                >{certValues.credit}
                </Text>
              </View>
            </View>

            <View style={styles.rechargeContainer}>
              <Text
                style={styles.rechargeText}
              >Recharge?
              </Text>
            </View>

            <View style={styles.certificateContainer}>
              <Text
                style={styles.certificateText}
              >Your Certificates
              </Text>
            </View>

            <TouchableCmp useForeground
              onPress={() => {
                onViewCertificate()
                //props.navigation.navigate('login')
              }}
            >
              <View style={styles.generalContainerWrapper}>
                <View style={styles.certificateValueContainer}>

                  <Text
                    style={styles.certificateValueText}
                  >{certValues.certCount}
                  </Text>

                </View>
              </View>
            </TouchableCmp>
          </ScrollView>
        </Card>
      </View>
      {isLoading && <ActivityLoading />}
    </KeyboardAvoidingView>
  );
};


HomePage.navigationOptions = navData => {
  return {
    headerTitle: 'Home',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
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
    width: '80%',
    marginTop: 30,
    flex: 1,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 20
  },
  newcertButton: {
    padding: 10,
    fontFamily: 'open-sans',
    fontSize: 24,
    textAlign: 'center',
    color: 'white'
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
    fontSize: 24
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
  }


});
export default HomePage;

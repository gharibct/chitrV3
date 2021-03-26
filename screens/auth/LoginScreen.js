import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  Text,
  Alert,
  Image,
  ToastAndroid
} from 'react-native';


import { Input, Card, ActivityLoading } from '../../components/UI/Index';
import Colors from '../../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';

import * as authActions from '../../store/actions/auth';
import * as certActions from '../../store/actions/cert';
import * as photoActions from '../../store/actions/photo';

/*Reusable code for handling user inputs -- Starts */
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

/*Reusable code for handling user inputs -- Ends */

const LoginScreen = props => {
  /*Reusable code -- Starts */

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const authValues = useSelector(state =>
    state.auth
  );
 

  useEffect(() => {
    if (error && error != "") {
      Alert.alert('An error occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);


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

  const dispatch = useDispatch();
  /*Reusable code -- Ends */

  //Get the state slice using "useSelector"


  /*FormInput Starts*/
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      user: authValues.user ? authValues.user : '',
      pass: authValues.pass ? authValues.pass : ''
    },
    inputValidities: {
      user: authValues.user ? true : false,
      pass: authValues.pass ? true : false
    },
    formIsValid: authValues.user ? true : false
  });
  /*FormInput Ends*/

    /*Screen - Init Logic*/
    useEffect(() => {
      screenInitHandler();
    }, [dispatch]);
  
    const screenInitHandler = async () => {
      setError(null);
      setIsLoading(true);
  
      try {
        
        await dispatch(certActions.clearData())
        await dispatch(authActions.clearData())
        await dispatch(photoActions.clearData())
        
        setIsLoading(false)
      }
      catch (err) {
        setIsLoading(false)
        setError(err.message)
      }
    }
  

  const loginHandler = async () => {
    /*
    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [
        { text: 'Okay' }
      ]);
      return;
    }
    */
    setError(null);
    setIsLoading(true);

    try {
      console.log(formState.inputValues.user,
        formState.inputValues.pass)
      await dispatch(authActions.login(
        formState.inputValues.user,
        formState.inputValues.pass
        
      ))
      setIsLoading(false)
    }
    catch (err) {
      setIsLoading(false);
      setError(err.message)
    }
  }

  useEffect(() => {
    if (authValues.submit_flag) {
      dispatch(authActions.resetSubmitFlag())
      if (authValues.email_verification && authValues.mobile_verification) {
        props.navigation.navigate('mainNav')
      }
      else {
        props.navigation.navigate('verifyOTP')
      }
    }
  })


  const forgotPasswordHandler = () => {
    dispatch(authActions.saveUserName(
      formState.inputValues.user
    ))
    props.navigation.navigate('forgotPassword')
  }

  return (

    <KeyboardAvoidingView
      style={styles.screen}
    >
      <View style={styles.gradient}>
        <Card style={styles.authContainer}>
          <View style={styles.topImageBG}>
            <Image source={require('../../assets/logo.png')} />
          </View>
          <View style={styles.headerContainer}>
            <Text
              style={styles.headerText}>
              LoBaViCerty
                </Text>
          </View>
          <View style={styles.taglineContainer}>
            <Text
              style={styles.taglineText}>
              Location Based Visual Certification
                </Text>
          </View>
          <ScrollView
          keyboardShouldPersistTaps='always'
          >
            <Input
              id="user"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue={authValues.user ? authValues.user : ''}
            />
            <Input
              id="pass"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue={authValues.pass ? authValues.pass : ''}
            />
            <View style={styles.forgotPasswordContainer}>
              <Text
                style={styles.forgotPasswordText}
                onPress={() => {
                  //props.navigation.navigate('forgotPassword')
                  forgotPasswordHandler()
                }}
              >Forgot Password?
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title='Login'
                color={Colors.primary}
                onPress={() => {
                  loginHandler();
                  //props.navigation.navigate('mainNav')             
                }}
              />
            </View>
            <View style={styles.signupContainer}>
              <Text
                style={styles.signupGenText}
                onPress={() => {
                  props.navigation.navigate('signup')
                }}
              >Do not have an account?
                <Text
                  style={styles.signupMainText}
                > SignUp
                </Text>
              </Text>
            </View>
          </ScrollView>
        </Card>
      </View>
      {isLoading && <ActivityLoading />}
    </KeyboardAvoidingView>
  );
};

LoginScreen.navigationOptions = {
  //headerTitle: 'Authenticate'
  headerShown: false
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  screen: {
    flex: 1
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  authContainer: {
    width: '80%',
    padding: 20
  },

  topImage: {
    paddingTop: 40,
    paddingHorizontal: 45,
    paddingBottom: 15,
    backgroundColor: Colors.primary
  },
  topImageBG: {
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center'
  },

  headerContainer:{
    paddingTop: 10,
    alignItems: 'center'
  },
  headerText: {
    textAlign: 'center',
    fontFamily: 'open-sans',
    fontSize: 36
  },
  taglineContainer:{
    paddingBottom: 10,
    alignItems: 'center'
  },
  taglineText: {
    textAlign: 'center',
    fontFamily: 'open-sans',
    fontSize: 14
  },

  buttonContainer: {
    marginTop: 10
  },
  forgotPasswordContainer: {
    marginTop: 10
  },
  forgotPasswordText: {
    textAlign: 'right',
    fontFamily: 'open-sans-bold',
    fontSize: 12
  },
  signupContainer: {
    marginTop: 15
  },
  signupGenText: {
    textAlign: 'center',
    fontFamily: 'open-sans-bold',
    color: Colors.ascent,
    fontSize: 14
  },
  signupMainText: {
    marginLeft: 5,
    fontFamily: 'open-sans-bold',
    color: Colors.primary,
    fontSize: 14
  }
});

export default LoginScreen;

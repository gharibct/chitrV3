import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  Text,
  Alert
} from 'react-native';

import Colors from '../../constants/Colors';
import { Card, Input,ActivityLoading } from '../../components/UI/Index';

import { useDispatch, useSelector } from 'react-redux';
import * as authActions from '../../store/actions/auth';

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

const ForgetPassword = props => {
  /*Reusable code -- Starts */

  const [isLoading, setIsLoading] = useState(false);
  const [submitFlag, setSubmitFlag] = useState(false);
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
      email: authValues.email ? authValues.email : ''
    },
    inputValidities: {
      email: authValues.email ? authValues.email : true
    },
    formIsValid: authValues.email ? true : false
  });
  /*FormInput Ends*/

  const forgotPasswordHandler = async () => {
    setSubmitFlag(true);
    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [
        { text: 'Okay' }
      ]);
      return;
    }
    
    setError(null);
    setIsLoading(true);

    try {
      await dispatch(authActions.forgotPassword(
        formState.inputValues.email
      ))
      Alert.alert('Success', "OTP for change password is generated. Check your email.",
        [{
          text: 'Okay',
          onPress: () => {
            props.navigation.replace('newPassword')
          }
        }]
      );
      //props.navigation.navigate('mainNav')
    }
    catch (err) {
      setError(err.message)
    }
  }


  return (
    <KeyboardAvoidingView
      style={styles.screen}
    >
      <View style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView
          keyboardShouldPersistTaps='always'
          >
            <View style={styles.headerContainer}>
              <Text
                style={styles.headerText}
              >Reset Password
              </Text>
            </View>
            <View style={styles.forgotPasswordContainer}>
              <Text
                style={styles.forgotPasswordText}
              >Enter your email address to reset password
              </Text>
            </View>
            <View style={styles.emailContainer}>
              <Input
                id="email"
                label="E-Mail"
                keyboardType="email-address"
                required
                email
                autoCapitalize="none"
                errorText="Please enter a valid email address."
                onInputChange={inputChangeHandler}
                initialValue={authValues.email ? authValues.email : ''}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title='Reset Password'
                color={Colors.primary}
                onPress={() => {
                  forgotPasswordHandler();
                  //props.navigation.replace('login')
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
};

ForgetPassword.navigationOptions = {
  //headerTitle: 'Authenticate'
  headerShown: false
};

const styles = StyleSheet.create({
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
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  buttonContainer: {
    marginTop: 10
  },
  forgotPasswordContainer: {
    marginTop: 10
  },
  forgotPasswordText: {
    textAlign: 'center',
    fontFamily: 'open-sans',
    fontSize: 12
  },
  headerContainer: {
    marginTop: 15
  },
  headerText: {
    textAlign: 'center',
    fontFamily: 'open-sans-bold',
    color: Colors.ascent,
    fontSize: 18
  },
  emailContainer: {
    marginTop: 15
  }
});
export default ForgetPassword;

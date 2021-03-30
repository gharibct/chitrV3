import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  Alert
} from 'react-native';

import Colors from '../../constants/Colors';

import {
  Input,
  Card,
  InputPicker,
  InputCheckbox,
  ActivityLoading
} from '../../components/UI/Index';

import SampleData from '../../data/SampleData'

import { useDispatch, useSelector } from 'react-redux';
import * as authActions from '../../store/actions/auth';
import User from '../../models/User';

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

const Signup = props => {

  /*Reusable code -- Starts */

  const [isLoading, setIsLoading] = useState(false);
  const [submitFlag,setSubmitFlag] = useState(false);
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
  /*
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      first_name: authValues.first_name ? authValues.first_name : '',
      last_name: authValues.last_name ? authValues.last_name : '',
      email: authValues.email ? authValues.email : '',
      password: authValues.password ? authValues.password : '',
      mob: authValues.mob ? authValues.mob : '',
      secret_ques1: authValues.secret_ques1 ? authValues.secret_ques1 : '',
      ans1: authValues.ans1 ? authValues.ans1 : '',
    },
    inputValidities: {
      first_name: authValues.first_name ? authValues.first_name : true,
      last_name: authValues.last_name ? authValues.last_name : true,
      email: authValues.email ? authValues.email : true,
      password: authValues.password ? authValues.password : true,
      mob: authValues.mob ? authValues.mob : true,
      secret_ques1: authValues.secret_ques1 ? authValues.secret_ques1 : true,
      ans1: authValues.ans1 ? authValues.ans1 : true,
    },
    formIsValid: authValues.first_name ? true : false
  });
  */
 const [formState, dispatchFormState] = useReducer(formReducer, {
  inputValues: {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    mob: '',
    agree:false
  },
  inputValidities: {
    first_name: false,
    last_name: false,
    email: false,
    password: false,
    mob: false,
    agree:true
  },
  formIsValid: false
});
  /*FormInput Ends*/

  const signUpHandler = async () => {
    setSubmitFlag(true);    
    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [
        { text: 'Okay' }
      ]);
      return;
    }

    if (!formState.inputValues.agree) {
      Alert.alert('Accept Terms & Conditions', 'Please Accept Terms & Conditions to proceed further', [
        { text: 'Okay' }
      ]);
      return;
    }    

    setError(null);
    setIsLoading(true);
    try {
      await dispatch(authActions.signUp(
        new User(
          formState.inputValues.first_name,
          formState.inputValues.last_name,
          formState.inputValues.email,
          formState.inputValues.password,
          formState.inputValues.mob,
          formState.inputValues.secret_ques1,
          formState.inputValues.ans1        
        )
      ))
      setIsLoading(false);
      props.navigation.navigate('verifyOTP')
    }
    catch (err) {
      setIsLoading(false);
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
            <View style={styles.inputContainer}>
              <Input
                id="first_name"
                label="First Name"
                required
                submitFlag={submitFlag}
                autoCapitalize="none"
                errorText="Please enter first name"
                onInputChange={inputChangeHandler}
                initialValue={authValues.first_name ? authValues.first_name : ''}
              />
              <Input
                id="last_name"
                label="Last Name"
                required
                submitFlag={submitFlag}
                autoCapitalize="none"
                errorText="Please enter last name"
                onInputChange={inputChangeHandler}
                initialValue={authValues.last_name ? authValues.last_name : ''}
              />
              <Input
                id="email"
                label="E-Mail"
                keyboardType="email-address"
                required
                submitFlag={submitFlag}
                email
                autoCapitalize="none"
                errorText="Please enter a valid email address."
                onInputChange={inputChangeHandler}
                initialValue={authValues.email ? authValues.email : ''}
              />
              <Input
                id="password"
                label="Password"
                keyboardType="default"
                secureTextEntry
                submitFlag={submitFlag}
                required
                minLength={5}
                autoCapitalize="none"
                errorText="Please enter a valid password."
                onInputChange={inputChangeHandler}
                initialValue={authValues.pass ? authValues.pass : ''}
              />
              <Input
                id="mob"
                label="Mobile"
                required
                submitFlag={submitFlag}
                autoCapitalize="none"
                errorText="Please enter a valid Mobile."
                onInputChange={inputChangeHandler}
                initialValue={authValues.mob ? authValues.mob : ''}
              />
              {/*
              <InputPicker
                id="secret_ques1"
                required
                submitFlag={submitFlag}
                label="Secret Question - 1"
                errorText="Please enter a valid Question."
                questions={SampleData.SECRETQUESTIONS1}
                onInputChange={inputChangeHandler}
                initialValue={authValues.secret_ques1 ? authValues.secret_ques1 : ''}
              />
              <Input
                id="ans1"
                label="Answer - 1"
                submitFlag={submitFlag}
                required
                autoCapitalize="none"
                errorText="Please enter answer"
                onInputChange={inputChangeHandler}
                initialValue={authValues.ans1 ? authValues.ans1 : ''}
              />
              
              <InputPicker
                id="secret_ques2"
                required
                submitFlag={submitFlag}
                label="Secret Question - 2"
                errorText="Please enter a valid Question."
                questions={SampleData.SECRETQUESTIONS2}
                onInputChange={inputChangeHandler}
                initialValue={authValues.secret_ques2 ? authValues.secret_ques2 : ''}
              />
              <Input
                id="ans2"
                submitFlag={submitFlag}
                label="Answer - 2"
                required
                autoCapitalize="none"
                errorText="Please enter answer"
                onInputChange={inputChangeHandler}
                initialValue={authValues.ans2 ? authValues.ans2 : ''}
              />
              */}
              <InputCheckbox
                id="agree"
                initialValue={false}
                label="I Accept terms and conditions"
                onInputChange={inputChangeHandler}
              />
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title='Sign Up'
                color={Colors.primary}
                onPress={() => {
                  signUpHandler();
                  //props.navigation.replace('login')
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </View>
      {isLoading && <ActivityLoading/>}
    </KeyboardAvoidingView>
  );
};

Signup.navigationOptions = {
  headerTitle: 'Sign Up'
  //headerShown: false
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
    width: '100%',
    flex: 1,
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
  },
  pickerContainer: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center"
  }
});
export default Signup;

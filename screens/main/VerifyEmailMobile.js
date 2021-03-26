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
  Alert
} from 'react-native';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import InputPicker from '../../components/UI/InputPicker';
import InputCheckbox from '../../components/UI/InputCheckbox';
import SampleData from '../../data/SampleData'

const VerifyEmailMobile = props => {

  const [selectedValue, setSelectedValue] = useState("");

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
    },
    []
  );

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
              >Sign Up
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <Input
                id="first_name"
                label="First Name"
                required
                autoCapitalize="none"
                errorText="Please enter first name"
                onInputChange={inputChangeHandler}
                initialValue=""
              />
              <Input
                id="last_name"
                label="Last Name"
                required
                autoCapitalize="none"
                errorText="Please enter last name"
                onInputChange={inputChangeHandler}
                initialValue=""
              />
              <Input
                id="email"
                label="E-Mail"
                keyboardType="email-address"
                required
                email
                autoCapitalize="none"
                errorText="Please enter a valid email address."
                onInputChange={inputChangeHandler}
                initialValue=""
              />
              <InputPicker
              abc="abc"
              label="Secret Question - 1"
              questions={SampleData.SECRETQUESTIONS1}
              />
              <Input
                id="answer1"
                label="Answer - 1"
                required
                autoCapitalize="none"
                errorText="Please enter answer"
                onInputChange={inputChangeHandler}
                initialValue=""
              />              
              <InputPicker
              abc="abc"
              label="Secret Question - 2"
              questions={SampleData.SECRETQUESTIONS2}
              />
              <Input
                id="answer1"
                label="Answer - 2"
                required
                autoCapitalize="none"
                errorText="Please enter answer"
                onInputChange={inputChangeHandler}
                initialValue=""
              /> 
             <InputCheckbox
              label="I Accept terms and conditions"
              />                                         
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title='Sign Up'
                color={Colors.primary}
                onPress={() => {
                  props.navigation.replace('login')
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
};

VerifyEmailMobile.navigationOptions = {
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
    width: '100%',
    flex:1,
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
export default VerifyEmailMobile;

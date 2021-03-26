import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Image,
  Button,
  Text,
  CheckBox,
  Picker,
  ActivityIndicator,
  Alert
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';

import { Input, Card, InputPicker, InputCheckbox, Display } from '../../components/UI/Index'

import Colors from '../../constants/Colors';

import SampleData from '../../data/SampleData'

const ViewProfile = props => {

  const authValues = useSelector(state =>
    state.auth
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
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                defaultSource={
                  uri=require('./../../assets/default_profile.jpg')
                }
                cache='reload'
              />
            </View>

            <View style={styles.inputContainer}>
              <Display
                label="First Name"
                value={authValues.first_name}
              />
              <Display
                label="Last Name"
                value={authValues.last_name}
              />
              <Display
                label="E-Mail"
                value={authValues.email}
              />
              <Display
                label="Mobile"
                value={authValues.mob}
              />

            </View>
          </ScrollView>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
};

ViewProfile.navigationOptions = navData => {
  return {
    headerTitle: 'Your Profile',
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
export default ViewProfile;

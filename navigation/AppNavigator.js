import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import LoginScreen from '../screens/auth/LoginScreen';
import HomePage from '../screens/main/HomePage';
import ReviewAndCertify from '../screens/main/ReviewAndCertify'
import TakePhoto from '../screens/main/TakePhoto';
import ViewCertificate from '../screens/main/ViewCertificate';
import ForgetPassword from '../screens/auth/ForgotPassword';
import SignUp from '../screens/auth/Signup';
import ViewProfile from '../screens/main/ViewProfile';
import ChangePassword from '../screens/main/ChangePassword';
import ChangeMobileNumber from '../screens/main/ChangeMobileNumber';
import VerifyEmailMobile from '../screens/main/VerifyEmailMobile';


import Colors from '../constants/Colors'
import NavigationComp from './NavigationComp';
import VerifyOTP from '../screens/auth/VerifyOTP';
import NewPassword from '../screens/auth/NewPassword';



/*Screen Names*/
/*
    LoginScreen
    SignUp
    ForgetPassword

    HomePage
    TakePhoto
    ReviewAndCertify
    ViewCertificate

*/

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.primary
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: 'white'
};


const HomeNavigator = createStackNavigator(
  {
    home: HomePage,
    takePhoto: TakePhoto,
    reviewCertify: ReviewAndCertify,
    viewCert: ViewCertificate
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

const ViewProfileNavigator = createStackNavigator(
  {
    viewProfile: ViewProfile
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);


const ChangePasswordNavigator = createStackNavigator(
  {
    changePassword: ChangePassword
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);


const ChangeMobileNumberNavigator = createStackNavigator(
  {
    changeMobileNumber: ChangeMobileNumber
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

const AuthNavigator = createStackNavigator(
  {
    verifyOTP: VerifyOTP,
    login: LoginScreen,
    forgotPassword: ForgetPassword,
    signup: SignUp,
    newPassword:NewPassword
  },
  {
    defaultNavigationOptions: defaultNavOptions,
    initialRouteName:'login'
  }
);

const MainNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        drawerLabel: 'Home',
        drawerIcon: drawerConfig => (
          <AntDesign name="home" size={23} color="black" />)
      }
    }
    
    ,
    ViewProfile: {
      screen: ViewProfileNavigator,
      navigationOptions: {
        drawerLabel: 'View Profile',
        drawerIcon: drawerConfig => (
          <AntDesign name="profile" size={23} color="black" />
        )
      }
    },
    ChangePassword: {
      screen: ChangePasswordNavigator,
      navigationOptions: {
        drawerLabel: 'Change Password',
        drawerIcon: drawerConfig => (
          <MaterialCommunityIcons name="key-change" size={23} color="black" />
        )
      }
    },    

    ChangeMobileNumber: {
      screen: ChangeMobileNumberNavigator,
      navigationOptions: {
        drawerLabel: 'Change Mobile Number',
        drawerIcon: drawerConfig => (
          <AntDesign name="mobile1" size={23} color="black" />
        )
      }
    },     
    /*
    VerifyEmailMobile: {
      screen: VerifyEmailMobile,
      navigationOptions: {
        drawerLabel: 'Verify Email / Mobile',
        drawerIcon: drawerConfig => (
          <AntDesign name="exclamationcircleo" size={23} color="black" />
        )

      }
    }*/
  },
  {
    contentOptions: {
      activeTintColor: Colors.accentColor,
      labelStyle: {
        fontFamily: 'open-sans-bold'
      }
    },
    contentComponent: NavigationComp,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
  }
);


const AppNavigator = createSwitchNavigator({
  authNav: AuthNavigator,
  mainNav: MainNavigator
});



export default createAppContainer(AppNavigator);

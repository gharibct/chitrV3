import React from 'react';
import {
  View,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Button,
  Text,
} from 'react-native';

import Colors from '../constants/Colors';
import { AntDesign } from '@expo/vector-icons';

import { SafeAreaView } from 'react-navigation'
import { DrawerItems } from 'react-navigation-drawer'

const NavigationComp = props => {

  return (
    <View
      style={styles.screen}
    >
      <SafeAreaView>
        <View style={styles.topImage}>
          <View style={styles.topImageBG}>
            <Image source={require('../assets/logo.png')} />
          </View>
        </View>
        <View >
          <DrawerItems {...props} />
          <TouchableOpacity onPress={() =>
            Alert.alert(
              'Log out',
              'Do you want to logout?',
              [
                { text: 'Cancel', onPress: () => { return null } },
                {
                  text: 'Confirm', onPress: () => {
                    props.navigation.navigate('login')
                  }
                },
              ],
              { cancelable: false }
            )
          }>
            <View style={styles.logoutContainer}>
              <AntDesign name="logout" size={23} />
              <Text style={styles.logout}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};


const styles = StyleSheet.create({
  screen: {
    flex: 1
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
  logoutContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 15
  },
  logout: {
    marginLeft: 30,
    fontWeight: 'bold',
    color: Colors.accent
  }

});
export default NavigationComp;

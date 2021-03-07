import React, { useReducer, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';



const Display = props => {




  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <Text
        {...props}
        style={styles.input}
      >{props.value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    marginVertical:2,
    paddingVertical:5,
    width: '100%'
  },
  label: {
    fontFamily: 'open-sans-bold',
    fontSize:12,
    marginVertical: 2
  },
  input: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor:"#DCDCDC",
    fontFamily: 'open-sans',
    fontSize:15,
    marginTop:5
  }
});

export default Display;

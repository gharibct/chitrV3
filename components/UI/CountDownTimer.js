import React, { useState, useEffect } from 'react';
import moment, { max } from 'moment';
import { View, Button, Image, Text, StyleSheet, Alert, } from 'react-native';


import Colors from '../../constants/Colors';

const CountDownTimer = props => {
  const [remainingMinute, setRemainingMinute] = useState(4);
  const [remainingSec, setRemainingSec] = useState(10);

  useEffect(() => {
    let myInterval = setInterval(() => {
      let maxTime = moment(props.maxTime)
      let remainingTime = maxTime.diff(moment(), 'seconds')
      
      if (remainingTime <= 0) {
        setRemainingMinute('00');
        setRemainingSec('00')
        clearInterval(myInterval)
        if(props.timeOutFn) props.timeOutFn();
      }
      else {
        setRemainingMinute('0' + Math.trunc(remainingTime / 60, 0))
        let tmpSec = remainingTime % 60;

        if (tmpSec < 10) {
          setRemainingSec('0' + tmpSec);
        }
        else {
          setRemainingSec(tmpSec);
        }
      }
    }, 1000)
    return () => {
      clearInterval(myInterval);
    };
  },[]);


  return (
    <View style={styles.mainContainer}>
      <Text
        style={styles.certText}
      >Remaining time for Certification
        </Text>
      <Text
        style={styles.certValue}
      >{remainingMinute}:{remainingSec}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default CountDownTimer;

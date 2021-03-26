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

import { Card, Input, ActivityLoading } from '../../components/UI/Index';
import { useDispatch, useSelector } from 'react-redux';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';

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

const ChangeMobileNumber = props => {
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
            otp_mobile: '',
            newMobile: ''
        },
        inputValidities: {
            otp_mobile: false,
            newMobile: ''
        },
        formIsValid: false
    });
    /*FormInput Ends*/

    /*Screen - Init Logic*/
    /*
    useEffect(() => {
        screenInitHandler();
    }, [dispatch]);
    */

    const screenInitHandler = async () => {
        setError(null);
        setIsLoading(true);

        try {
            await dispatch(authActions.requestMobileOTP(
                authValues.userId
            ))
            setIsLoading(false)
        }
        catch (err) {
            setIsLoading(false)
            setError(err.message)
        }
    }

    const submitHandler = async () => {
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
            await dispatch(authActions.verifyOTP(
                authValues.userId,
                formState.inputValues.otp_mobile
            ))
            await dispatch(authActions.changeMobile(
                authValues.userId,
                formState.inputValues.newMobile
            ))
            Alert.alert('Success', 'Mobile number updated successfully', [
                {
                    text: 'Okay',
                    onPress: () => props.navigation.navigate('Home'),
                    style: 'cancel'
                }
            ]);
            setIsLoading(false);
        }
        catch (err) {
            setIsLoading(false);
            setError(err.message)
        }
    }

    const requestmobileOTPHandler = async () => {
        setIsLoading(true);
        try {
            console.log("authValues.userId",authValues.userId)
            await dispatch(authActions.requestMobileOTP(
                authValues.userId
            ))
            setIsLoading(false);
            Alert.alert('Success', 'OTP Generated Successfully. Please check your mobile.', [
                { text: 'Okay' }
            ]);
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
                        <View style={styles.headerContainer}>
                            <Text
                                style={styles.headerText}
                            >Change Mobile Number
                            </Text>
                        </View>
                        <View style={styles.mobileContainer}>
                            <Text
                                style={styles.mobileText}
                            >{authValues.mob}
                            </Text>
                        </View>  
                        <View style={styles.submitContainer}>
                            <Button
                                title='Request OTP for Mobile Number Change'
                                color={Colors.bright}
                                onPress={() => {
                                    requestmobileOTPHandler();
                                    //props.navigation.navigate('mainNav')             
                                }}
                            />
                        </View>                                              
                        <Input
                            id="otp_mobile"
                            label="Mobile OTP"
                            required
                            autoCapitalize="none"
                            errorText="Please enter mobile OTP"
                            onInputChange={inputChangeHandler}
                            initialValue=''
                        />
                        <View style={styles.resendOTPContainer}>
                            <Text
                                style={styles.resendOTPText}
                                onPress={() => {
                                    requestmobileOTPHandler()
                                }}
                            >Resend mobile OTP
                            </Text>
                        </View>
                        <Input
                            id="newMobile"
                            label="New Mobile Number"
                            keyboardType="default"
                            required
                            minLength={5}
                            autoCapitalize="none"
                            errorText="Please enter a valid mobile number."
                            onInputChange={inputChangeHandler}
                            initialValue=''
                        />

                        <View style={styles.submitContainer}>
                            <Button
                                title='Submit'
                                color={Colors.primary}
                                onPress={() => {
                                    submitHandler();
                                    //props.navigation.navigate('mainNav')             
                                }}
                            />
                        </View>
                    </ScrollView>
                </Card>
            </View>
            {isLoading && <ActivityLoading />}
        </KeyboardAvoidingView>
    );
};

/*
ChangeMobileNumber.navigationOptions = {
    headerShown: false
};
*/

ChangeMobileNumber.navigationOptions = navData => {
    return {
      headerTitle: 'Change Mobile Number',
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
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    remarksContainer: {
        marginTop: 10
    },
    remarksText: {
        textAlign: 'center',
        fontFamily: 'open-sans',
        fontSize: 12
    },
    headerContainer: {
        marginTop: 5
    },
    headerText: {
        textAlign: 'center',
        fontFamily: 'open-sans-bold',
        color: Colors.ascent,
        fontSize: 18
    },

    mobileContainer: {
        marginVertical: 10
    },
    mobileText: {
        textAlign: 'center',
        fontFamily: 'open-sans-bold',
        color: Colors.primary,
        fontSize: 32
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
        width: '90%',
        maxWidth: 400,
        maxHeight: 500,
        padding: 20
    },
    buttonContainer: {
        marginTop: 5
    },
    resendOTPContainer: {
        marginTop: 5
    },
    resendOTPText: {
        textAlign: 'right',
        fontFamily: 'open-sans-bold',
        fontSize: 12
    },
    submitContainer: {
        marginTop: 25
    },
    submitGenText: {
        textAlign: 'center',
        fontFamily: 'open-sans-bold',
        color: Colors.ascent,
        fontSize: 14
    },
    submitMainText: {
        marginLeft: 5,
        fontFamily: 'open-sans-bold',
        color: Colors.primary,
        fontSize: 14
    }
});

export default ChangeMobileNumber;

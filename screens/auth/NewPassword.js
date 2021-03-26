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

const NewPassword = props => {
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
            otp_email: '',
            pass: '',
            verify_pass: ''
        },
        inputValidities: {
            otp_email: false,
            pass: false,
            verify_pass: false
        },
        formIsValid: false
    });
    /*FormInput Ends*/

    const submitHandler = async () => {
        setSubmitFlag(true);
        if (!formState.formIsValid) {
            Alert.alert('Wrong input!', 'Please check the errors in the form.', [
                { text: 'Okay' }
            ]);
            return;
        }

        if (formState.inputValues.pass != formState.inputValues.verify_pass) {
            Alert.alert('Wrong input!', 'New Password is not matching with Verify Password', [
                { text: 'Okay' }
            ]);
            return;
        }

        setError(null);
        setIsLoading(true);

        try {
            await dispatch(authActions.verifyForgotOTP(
                authValues.email,
                formState.inputValues.otp_email
            ))
            await dispatch(authActions.setNewPassword(
                authValues.email,
                formState.inputValues.pass
            ))
            Alert.alert('Success', 'Password updated successfully', [
                {
                    text: 'Okay',
                    onPress: () => props.navigation.navigate('login'),
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

    const requestEmailOTPHandler = async () => {
        setIsLoading(true);
        try {
            await dispatch(authActions.forgotPassword(
                authValues.email
            ))
            setIsLoading(false);
            Alert.alert('Success', 'OTP Generated Successfully. Please check your email.', [
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
                            >Set New Password
                            </Text>
                        </View>
                        <View style={styles.remarksContainer}>
                            <Text
                                style={styles.remarksText}
                            >Enter the OTP send to your email
                            </Text>
                        </View>
                        <View style={styles.emailContainer}>
                            <Text
                                style={styles.emailText}
                            >{authValues.email}
                            </Text>
                        </View>
                        <Input
                            id="otp_email"
                            label="E-Mail OTP"
                            required
                            autoCapitalize="none"
                            errorText="Please enter email OTP"
                            onInputChange={inputChangeHandler}
                            initialValue=''
                        />
                        <View style={styles.resendOTPContainer}>
                            <Text
                                style={styles.resendOTPText}
                                onPress={() => {
                                    requestEmailOTPHandler()
                                }}
                            >Resend Email OTP
              </Text>
                        </View>
                        <Input
                            id="pass"
                            label="New Password"
                            keyboardType="default"
                            secureTextEntry
                            required
                            minLength={5}
                            autoCapitalize="none"
                            errorText="Please enter a valid password."
                            onInputChange={inputChangeHandler}
                            initialValue=''
                        />
                        <Input
                            id="verify_pass"
                            label="Verify Password"
                            keyboardType="default"
                            secureTextEntry
                            required
                            minLength={5}
                            autoCapitalize="none"
                            errorText="Please enter a valid password."
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

NewPassword.navigationOptions = {
    //headerTitle: 'EMail & Mobile Verification'
    headerShown: false
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

    emailContainer: {
        marginVertical: 5
    },
    emailText: {
        textAlign: 'left',
        fontFamily: 'open-sans-bold',
        color: Colors.primary,
        fontSize: 15
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

export default NewPassword;

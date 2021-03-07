/*
File Name : auth.js
*/
import { BASEURL } from '../../constants/api'
import {
    ToastAndroid
  } from 'react-native';

import * as Crypto from 'expo-crypto';  
import User from '../../models/User'

export const LOGIN = 'LOGIN';
export const RESET_SUBMIT_FLAG = 'RESET_SUBMIT_FLAG';
export const EMAIL_VERIFIED = 'EMAIL_VERIFIED';
export const SAVE_USERNAME = 'SAVE_USERNAME';
export const ID_UPDATE = 'ID_UPDATE';
export const CHANGE_MOBILE = 'CHANGE_MOBILE';


export const login = (user, pass) => { 
    return async (dispatch) => {
        ToastAndroid.show("Login Processing...", ToastAndroid.SHORT);
        let resData = {};
        
        try {
            pass = await Crypto.digestStringAsync(
                Crypto.CryptoDigestAlgorithm.SHA1,
                pass
              );
            const response = await fetch(BASEURL + 'auth',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user: user,
                        pass: pass
                    })
                }
            );

            if (!response.ok) {
                throw new Error('Network Error. Please Retry')
            }
            else {
                resData = await response.json();
            }

            if (resData.result == 0) {
                dispatch({ type: LOGIN, user_data: resData.data})
            }
            else {
                throw new Error(resData.message)
            }
        }
        catch (err) {
            throw new Error(err);
        }
    }
}

export const signUp = (user) => {
    return async (dispatch) => {
        let resData = {};
        try {

            user.password = await Crypto.digestStringAsync(
                Crypto.CryptoDigestAlgorithm.SHA1,
                user.password
            );
            console.log("Registration",user);
            const response = await fetch(BASEURL + 'register',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                }
            );

            if (!response.ok) {
                throw new Error('Network Error. Please Retry')
            }
            else {
                resData = await response.json();
            }

            if (resData.result == 0) {
                dispatch({ type: ID_UPDATE, userId: resData.data })
            }
            else {
                throw new Error(resData.message)
            }
        }
        catch (err) {
            throw new Error(err);
        }
    }
}

export const forgotPassword = (email) => {
    return async (dispatch) => {
        let resData = {};
        try {
            const response = await fetch(BASEURL + 'requestResetPass',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({email})
                }
            );

            if (!response.ok) {
                throw new Error('Network Error. Please Retry')
            }
            else {
                resData = await response.json();
            }
            if (resData.result == 0) {
                dispatch({ type: SAVE_USERNAME, user: email })
            }
            else {
                throw new Error(resData.message)
            }
        }
        catch (err) {
            throw new Error(err);
        }
    }
}


export const verifyForgotOTP = (email,otp) => {
    return async (dispatch) => {
        let resData = {};
        try {
            const response = await fetch(BASEURL + 'verifyforgototp',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({email,otp})
                }
            );

            if (!response.ok) {
                throw new Error('Network Error. Please Retry')
            }
            else {
                resData = await response.json();
            }
            if (resData.result == 0) {
                //dispatch({ type: SAVE_USERNAME, user: email })
            }
            else {
                throw new Error(resData.message)
            }
        }
        catch (err) {
            throw new Error(err);
        }
    }
}

export const vadiateOTP = (email,otp_email,otp_mob) => {
    return async (dispatch) => {
        let resData = {};
        try {
            const response = await fetch(BASEURL + 'verifyRegOTP',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({email,otp_email,otp_mob})
                }
            );

            if (!response.ok) {
                throw new Error('Network Error. Please Retry')
            }
            else {
                resData = await response.json();
            }
            if (resData.result == 0) {
                //dispatch({ type: LOGIN, userId: resData.data })
            }
            else {
                throw new Error(resData.message)
            }
        }
        catch (err) {
            throw new Error(err);
        }
    }
}

export const setNewPassword = (email,new_pass) => {
    return async (dispatch) => {
        let resData = {};
        try {

            new_pass = await Crypto.digestStringAsync(
                Crypto.CryptoDigestAlgorithm.SHA1,
                new_pass
            );

            const response = await fetch(BASEURL + 'setPass',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({email,new_pass})
                }
            );
            
            if (!response.ok) {
                throw new Error('Network Error. Please Retry')
            }
            else {
                resData = await response.json();
            }
            if (resData.result == 0) {
                //dispatch({ type: SAVE_USERNAME, user: email })
            }
            else {
                throw new Error(resData.message)
            }
        }
        catch (err) {
            throw new Error(err);
        }
    }
}


export const requestEmailOTP = (id) => {
    return async (dispatch) => {
        let resData = {};
        try {
            const response = await fetch(BASEURL + 'requestEmailOTP',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({id})
                }
            );

            if (!response.ok) {
                throw new Error('Network Error. Please Retry')
            }
            else {
                resData = await response.json();
            }
            if (resData.result == 0) {
                //dispatch({ type: EMAIL_VERIFIED, email_verification: resData.data })
            }
            else {
                throw new Error(resData.message)
            }
        }
        catch (err) {
            throw new Error(err);
        }
    }
}


export const requestMobOTP = (id) => {
    return async (dispatch) => {
        let resData = {};
        try {
            const response = await fetch(BASEURL + 'requestMobOTP',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({id})
                }
            );

            if (!response.ok) {
                throw new Error('Network Error. Please Retry')
            }
            else {
                resData = await response.json();
            }
            if (resData.result == 0) {
                //dispatch({ type: EMAIL_VERIFIED, email_verification: resData.data })
            }
            else {
                throw new Error(resData.message)
            }
        }
        catch (err) {
            throw new Error(err);
        }
    }
}

export const resetSubmitFlag = () =>{
    return {
        type:RESET_SUBMIT_FLAG
    }
}

export const saveUserName = (user) =>{
    return {
        type:SAVE_USERNAME,
        user
    }
}

export const requestChangePassOTP = (userId) => {
    return async (dispatch) => {
        let resData = {};
        try {
            const response = await fetch(BASEURL + 'requestChangePass',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({id:userId})
                }
            );

            if (!response.ok) {
                throw new Error('Network Error. Please Retry')
            }
            else {
                resData = await response.json();
            }
            if (resData.result == 0) {
                //dispatch({ type: SAVE_USERNAME, user: email })
            }
            else {
                throw new Error(resData.message)
            }
        }
        catch (err) {
            throw new Error(err);
        }
    }
}

export const verifyOTP = (userId,otp) => {
    return async (dispatch) => {
        let resData = {};
        try {
            const response = await fetch(BASEURL + 'verifyotp',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({id:userId,otp})
                }
            );

            if (!response.ok) {
                throw new Error('Network Error. Please Retry')
            }
            else {
                resData = await response.json();
            }
            if (resData.result == 0) {
                //dispatch({ type: SAVE_USERNAME, user: email })
            }
            else {
                throw new Error(resData.message)
            }
        }
        catch (err) {
            throw new Error(err);
        }
    }
}

export const changePassword = (userId,new_pass) => {
    return async (dispatch) => {
        let resData = {};
        try {

            new_pass = await Crypto.digestStringAsync(
                Crypto.CryptoDigestAlgorithm.SHA1,
                new_pass
            );

            const response = await fetch(BASEURL + 'changePass',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({id:userId,pass:new_pass})
                }
            );
            
            if (!response.ok) {
                throw new Error('Network Error. Please Retry')
            }
            else {
                resData = await response.json();
            }
            if (resData.result == 0) {
                //dispatch({ type: SAVE_USERNAME, user: email })
            }
            else {
                throw new Error(resData.message)
            }
        }
        catch (err) {
            throw new Error(err);
        }
    }
}

export const requestMobileOTP = (userId) => {
    return async (dispatch) => {
        let resData = {};
        try {
            const response = await fetch(BASEURL + 'requestMobOTP',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({id:userId})
                }
            );

            if (!response.ok) {
                throw new Error('Network Error. Please Retry')
            }
            else {
                resData = await response.json();
            }
            if (resData.result == 0) {
                //dispatch({ type: SAVE_USERNAME, user: email })
            }
            else {
                throw new Error(resData.message)
            }
        }
        catch (err) {
            throw new Error(err);
        }
    }
}

export const changeMobile = (userId,mobile) => {
    return async (dispatch) => {
        let resData = {};
        try {

            const response = await fetch(BASEURL + 'changeMob',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({id:userId,mobile})
                }
            );
            
            if (!response.ok) {
                throw new Error('Network Error. Please Retry')
            }
            else {
                resData = await response.json();
            }
            if (resData.result == 0) {
                dispatch({ type: CHANGE_MOBILE, mobile: mobile })
            }
            else {
                throw new Error(resData.message)
            }
        }
        catch (err) {
            throw new Error(err);
        }
    }
}

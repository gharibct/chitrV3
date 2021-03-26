import { BASEURL } from '../../constants/api'

export const GET_CREDIT = 'GET_CREDIT';
export const GET_CERTLIST = 'GET_CERTLIST';
export const CLEAR_DATA = 'CLEAR_DATA';

export const clearData = () => {
    return {
        type: "CLEAR_DATA"
    }
}


export const getCredits = (userId) => {
    return async (dispatch) => {
        let resData = {};
        try {
            const response = await fetch(BASEURL + 'getCredits',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: userId
                    })
                }
            );

            if (!response.ok) {
                throw new Error('Cert.js - getCredits - Network Error. Please Retry')
            }
            else {
                resData = await response.json();
            }

            if (resData.result == 0) {
                dispatch({ type: GET_CREDIT, credit: resData.data })
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

export const getCertList = (userId) => {
    return async (dispatch) => {
        let resData = {};
        try {
            const response = await fetch(BASEURL + 'listCerts',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: userId
                    })
                }
            );

            if (!response.ok) {
                throw new Error('Cert.js - getCertList - Network Error. Please Retry')
            }
            else {
                resData = await response.json();
            }

            if (resData.result == 0) {
                dispatch({ type: GET_CERTLIST, certList: resData.data })
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


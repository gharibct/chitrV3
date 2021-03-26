import { BASEURL } from '../../constants/api'
import moment from 'moment'
export const ADD_GUID = 'ADD_GUID';
export const ADD_SERVERTIME = 'ADD_SERVERTIME';
export const SET_REVIEWPHOTO = 'SET_REVIEWPHOTO';
export const DELETE_PHOTO = 'DELETE_PHOTO';
export const SUBMIT_PHOTOS = 'SUBMIT_PHOTOS';
export const ADD_PHOTO = 'ADD_PHOTO';
export const SET_LOCATION = 'SET_LOCATION';
export const SET_GLOBAL = 'SET_GLOBAL';
export const PHOTO_INFO = 'PHOTO_INFO';
export const CLEAR_DATA = 'CLEAR_DATA';

export const clearData = () => {
    return {
        type: "CLEAR_DATA"
    }
}

export const setGuid = (gid) => {
    return {
        type: "ADD_GUID",
        gid: gid
    }
}

export const setLocation = (lat, lng) => {
    return {
        type: "SET_LOCATION",
        lat: lat,
        lng: lng
    }
}


export const deletePhoto = (userId, gid, photo_id) => {
    return async (dispatch) => {
        let resData = {};
        try {
            const response = await fetch(BASEURL + 'delphoto',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: userId,
                        gid,
                        photo_id
                    })
                }
            );

            if (!response.ok) {
                throw new Error('Photo.js - deletePhoto - Network Error. Please Retry')
            }
            else {
                resData = await response.json();
            }

            if (resData.result == 0) {
                dispatch({ type: "DELETE_PHOTO", photo_id })
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

export const getServerTime = (userId) => {
    return async (dispatch) => {
        let resData = {};
        try {
            const response = await fetch(BASEURL + 'getTime',
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
                throw new Error('Photo.js - getServerTime - Network Error. Please Retry')
            }
            else {
                resData = await response.json();
            }

            if (resData.result == 0) {
                dispatch({ type: ADD_SERVERTIME, time: resData.data })
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

export const reviewPhotos = (userId, gid) => {
    return async (dispatch) => {
        let resData = {};
        try {
            const response = await fetch(BASEURL + 'reviewPhotos',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: userId,
                        gid
                    })
                }
            );

            if (!response.ok) {
                throw new Error('Photo.js - reviewPhotos - Network Error. Please Retry')
            }
            else {
                resData = await response.json();
            }

            if (resData.result == 0) {
                dispatch({ type: SET_REVIEWPHOTO, review_photo: resData.data })
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


export const uploadCertPhoto = (userId, gid, time, photo_time, photo_coordinates, photo_cellid, photo_size, photo_location, imei_number, model_name) => {

    return async (dispatch) => {
        let resData = {};

        const uriParts = photo_location.split('/');
        const fileName = uriParts[uriParts.length - 1];
        const fileParts = fileName.split('.');
        const fileType = fileParts[uriParts.length - 1];
        //console.log("photo_coordinates", photo_coordinates)
        //photo_coordinates="16.899001,81.674698"

        const formData = new FormData();
        formData.append("id", userId);
        formData.append("gid", gid);
        formData.append("time", moment(time).format("YYYY-MM-DD HH:mm:ss.SSS"));
        formData.append("photo_time", moment(photo_time).format("YYYY-MM-DD HH:mm:ss.SSS"));
        formData.append("photo_coordinates", photo_coordinates);
        formData.append("photo_cellid", photo_cellid);
        formData.append("photo_size", 131175);
        formData.append("imei", imei_number);
        formData.append("model", model_name);
        formData.append("browser_loc", photo_coordinates);

        formData.append("file", {
            uri: photo_location,
            name: fileName,
            type: "image/jpg"
        })
        try {
            const response = await fetch(BASEURL + 'uploadCertPhoto',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data'
                    },
                    body: formData
                }
            );
            if (!response.ok) {
                throw new Error('Photo.js - uploadCertPhoto - Network Error. Please Retry')
            }
            else {

                resData = await response.json();
            }

            if (resData.result == 0) {
                dispatch({ type: ADD_PHOTO })
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

export const submitForCertification = (userId, gid, cert_photos_id) => {
    return async (dispatch) => {
        let resData = {};
        try {
            const response = await fetch(BASEURL + 'submitphotos',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: userId,
                        gid,
                        cert_photos_id
                    })
                }
            );

            if (!response.ok) {
                throw new Error('Photo.js - submitForCertification - Network Error. Please Retry')
            }
            else {
                resData = await response.json();
            }

            if (resData.result == 0) {
                dispatch({ type: SUBMIT_PHOTOS })
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

export const getGlobals = (userId) => {
    return async (dispatch) => {
        let resData = {};
        try {
            const response = await fetch(BASEURL + 'getglobals',
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
                throw new Error('Photo.js - getGlobals - Network Error. Please Retry')
            }
            else {
                resData = await response.json();
            }

            if (resData.result == 0) {
                dispatch({ type: SET_GLOBAL, globalValue: resData.data[0] })
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


export const getPhotoInfo = (userId, photoId) => {
    return async (dispatch) => {
        //console.log("getphotoinfo - dispatch",dispatch)
        let resData = {};
        try {
            const response = await fetch(BASEURL + 'getPhotoInfo',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: userId,
                        photo_id:photoId
                    })
                }
            );
            
            //console.log(response)

            if (!response.ok) {
                throw new Error('Photo.js - getPhotoInfo - Network Error. Please Retry')
                console.log("Photo.js","Error")
            }
            else {
                resData = await response.json();
                //console.log("Photo.js",resData)
            }

            if (resData.photo_location != undefined)
            {
                //console.log( " photo_location", photoId, resData.photo_location)
                //dispatch({ type: 'PHOTO_INFO', photo_id: photoId,  photo_location: resData.data.photo_location })
                dispatch({ type: 'PHOTO_INFO', photo_id: photoId,photo_location:resData.photo_location})
                //dispatch({ type: 'PHOTO_INFO'})
            }
            /*
            if (resData.result == 0) {
                console.log( " photo_location", resData.data.photo_location)
                dispatch({ type: PHOTO_INFO, photo_id: photoId, photo_location: resData.data.photo_location })
            }
            else {
                throw new Error(resData.message)
            }
            */
        }
        catch (err) {
            throw new Error(err);
        }
    }
}


/*
export const getPhotoInfo = (userId, photoId) => {
    return async (dispatch) => {
        let resData = {};
        try {
            console.log("photoId1", BASEURL + 'getPhotoInfo?id=' + userId + '&photo_id=' + photoId)
            
            const response = await fetch(BASEURL + 'getPhotoInfo',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: userId,
                        photo_id:photoId
                    })
                }
            );
                      
            console.log("photo id response", response)

            if (!response.ok) {
                throw new Error('Network Error. Please Retry')
            }
            else {
                resData = await response.json();
            }

            if (resData.result == 0) {
                //console.log(resData);
                dispatch({ type: PHOTO_INFO, photo_id: photoId, photo_location: resData.data.photo_location })
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
*/

// export const getPhotoInfo = (userId, photoId) => {
//     return (dispatch) => {
//         let resData = {};
//         try {
//             console.log("photoId1", BASEURL + 'getPhotoInfo?id=' + userId + '&photo_id=' + photoId)
//            fetch(BASEURL + 'getPhotoInfo?id=' + userId + '&photo_id=' + photoId)
//            .then( response => {
//                 if (!response.ok) {
//                     throw new Error('Network Error. Please Retry')
//                 }
//                 else {
//                     resData = response.json();
//                 }
//                 if (resData.result == 0) {
//                     //console.log(resData);
//                     dispatch({ type: PHOTO_INFO, photo_id: photoId, photo_location: resData.data.photo_location })
//                 }
//                 else {
//                     throw new Error(resData.message)
//                 }                
//            })
//         }
//         catch (err) {
//             throw new Error(err);
//         }
//     }
// }

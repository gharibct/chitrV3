import moment from 'moment'

import {
    ADD_GUID, ADD_SERVERTIME, SET_REVIEWPHOTO,
    DELETE_PHOTO, SUBMIT_PHOTOS, ADD_PHOTO, SET_LOCATION, SET_GLOBAL, PHOTO_INFO
} from '../actions/photo';

const initialState = {
    //token: null,
    gid: 0,
    time: null,
    photo_remaining: 5,
    max_photos: 5,
    lat: 0,
    lng: 0,
    review_photo: [],
    time_limit: 300,
    cert_end_time: null,
    photo_location: {}
}; 

export default (state = initialState, action) => {
    //console.log("photo-action.type",action.type)
    switch (action.type) {
        case ADD_GUID:
            return {
                //token: action.token,
                ...state,
                gid: action.gid
            };
        case SET_LOCATION:
            return {
                //token: action.token,
                ...state,
                lat: action.lat,
                lng: action.lng
            };
        case ADD_PHOTO:
            return {
                //token: action.token,
                ...state,
                photo_remaining: state.photo_remaining - 1
            };
        case ADD_SERVERTIME:
            return {
                //token: action.token,
                ...state,
                time: action.time
            };
        case SET_REVIEWPHOTO:
            const review_photo_array = []
            action.review_photo.forEach(element => {
                review_photo_array.push({ id: element, photo_id: element })
            });
            return {
                //token: action.token,
                ...state,
                review_photo: review_photo_array
            };
        case PHOTO_INFO:
            let tmp_photo_location = state.photo_location;
            
            tmp_photo_location[action.photo_id]=action.photo_location;
            //console.log("tmp_photo_location",tmp_photo_location,action.photo_location)
            return {
                //token: action.token,
                ...state,
                photo_location: tmp_photo_location
            };
        case DELETE_PHOTO:
            const modified_photo_array = [];
            state.review_photo.forEach(element => {
                if (element.photo_id != action.photo_id) {
                    modified_photo_array.push(element)
                }
            });
            return {
                //token: action.token,
                ...state,
                photo_remaining: state.photo_remaining + 1,
                review_photo: modified_photo_array
            };

        case SUBMIT_PHOTOS:
            return initialState;
        case SET_GLOBAL:

            //action.globalValue.allowed_time = 30
            let certEndTime = moment().add(action.globalValue.allowed_time, 'second');

            return {
                //token: action.token,
                ...state,
                max_photos: action.globalValue.allowed_num_of_photos,
                photo_remaining:action.globalValue.allowed_num_of_photos,
                //max_photos: 5,
                //photo_remaining: 2,
                time_limit: action.globalValue.allowed_time,
                cert_end_time: certEndTime
            };


        default:
            return state;
    }
};

import { GET_CREDIT, GET_CERTLIST, CLEAR_DATA } from '../actions/cert';

const initialState = {
    //token: null,
    credit: 0,
    certList: [],
    certCount: 0,
    maxPhotoCount: 5,
    certTime: 300
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_CREDIT:
            return {
                //token: action.token,
                ...state,
                credit: action.credit
            };
        case GET_CERTLIST:
            return {
                //token: action.token,
                ...state,
                certList: action.certList,
                certCount: action.certList.length
            };
        case CLEAR_DATA:
            return initialState;
        default:
            return state;
    }
};

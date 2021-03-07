import { GET_CREDIT, GET_CERTLIST } from '../actions/cert';

const initialState = {
    //token: null,
    credit: 0,
    certList: [],
    certCount: 0,
    maxPhotoCount:5,
    certTime:300
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
                       
        default:
            return state;
    }
};

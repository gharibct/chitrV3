import { ERROR } from '../actions/error';

const initialState = {
  //token: null,
  errorMsg:""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ERROR:
      return {
        //token: action.token,
        ...state,
        errorMsg: action.errorMsg
      };
    default:
      return state;
  }
};

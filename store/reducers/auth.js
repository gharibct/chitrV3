import { LOGIN, RESET_SUBMIT_FLAG, SAVE_USERNAME, ID_UPDATE, CHANGE_MOBILE } from '../actions/auth';

const initialState = {
  //token: null,
  /*
  user:"hari.g@bahwancybertek.com",
  pass:"abc321!@#",
  userId: 0,
  first_name:"Hari",
  last_name:"Sudhan",
  email:"hari.g@bahwancybertek.com",
  mob:"9840398108",
  email_verification:false,
  mobile_verification:false,
  photo:'',
  password:"abc321!@#",
  "secret_ques1": "What is your birth place?",
  "ans1": "abc",
  */
  user: "",
  pass: "",
  userId: 0,
  first_name: "",
  last_name: "",
  email: "",
  mob: "",
  email_verification: false,
  mobile_verification: false,
  photo: '',
  password: "",
  "secret_ques1": "",
  "ans1": "",
  "submit_flag": false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        //token: action.token,
        ...state,
        email: action.user_data.email,
        first_name: action.user_data.first_name,
        last_name: action.user_data.last_name,
        mob: action.user_data.mobile,
        email_verification: action.user_data.email_verification,
        mobile_verification: action.user_data.mobile_verification,
        userId: action.user_data.id,
        submit_flag: true
      };
    case RESET_SUBMIT_FLAG:
      return {
        //token: action.token,
        ...state,
        submit_flag: false
      };
    case SAVE_USERNAME:
      return {
        //token: action.token,
        ...state,
        email: action.user
      };
    case ID_UPDATE:
      return {
        //token: action.token,
        ...state,
        userId: action.userId
      };
    case CHANGE_MOBILE:
      return {
        //token: action.token,
        ...state,
        mob: action.mobile
      };
    default:
      return state;
  }
};

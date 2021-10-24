import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from '../Actions/types';


export default (state = [] , action) => {
  switch(action.type){
    case LOGIN_SUCCESS:
      localStorage.setItem('token',action.payload.token);
      return {
        ...state,
        ...action.payload,
      }
    case LOGIN_FAIL:
      return state;
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload,
      }
    case REGISTER_FAIL:
      return state;
    default:
      return state;
  }
}
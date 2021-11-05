import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  DATA_LOADED
} from '../Actions/types';

const initialState = {
  user: {}
}
export default (state = initialState, action) => {
  switch(action.type){
    case LOGIN_SUCCESS:
      localStorage.setItem('token',action.payload.token);
      return {
        ...state,
        user: action.payload.user,
      }
      
    case LOGIN_FAIL:
      return {
        state,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload.data,
      }
    case REGISTER_FAIL:
      return state;
    case DATA_LOADED:
      return {
        ...state,
        user: action.payload.user
      }
    default:
      return state;
  }
}
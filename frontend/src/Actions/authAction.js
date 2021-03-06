import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  DATA_LOADED
} from './types';
import * as api from '../api'

export const loginUser = (user,history) => async (dispatch) => {
  try{
    const { data } = await api.login(user);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data
    })
    window.alert("Account login sucessfully");
    history.push('/')
  }catch(err) {
    dispatch({
      type: LOGIN_FAIL
    })
    window.alert("Invalid credentials");
  }
}

export const signupUser = (user,history) => async (dispatch) => {
  try {
    const { data } = await api.signup(user);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: data
    })
    window.alert("Please verify your email address")
    history.push('/login')
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL
    })
    window.alert("Invalid credentials");
  } 
}

export const getUserDetails = (id) => async (dispatch) => {
  try {
    const { data } = await api.getUserDetails(id);
    dispatch({
      type: DATA_LOADED,
      payload: data 
    })
  } catch (error) {
    console.log(error);
  }
}

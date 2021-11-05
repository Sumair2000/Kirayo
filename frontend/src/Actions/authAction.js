import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  DATA_LOADED
} from './types';
import * as api from '../api'

export const loginUser = (user,history,showAlert) => async (dispatch) => {
  try{
    const { data } = await api.login(user);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data
    })
    console.log(data.user);
    showAlert("Account login sucessfully","success");
    history.push('/')
  }catch(err) {
    console.log(err)
    dispatch({
      type: LOGIN_FAIL
    })
    showAlert("Invalid credentials","danger");
  }
}

export const signupUser = (user,history,showAlert) => async (dispatch) => {
  try {
    const { data } = await api.signup(user);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: data
    })
    showAlert("Please verify your email address","success")
    history.push('/login')
  } catch (err) {
    console.log(err);
    dispatch({
      type: REGISTER_FAIL
    })
    showAlert("Invalid credentials","danger");
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

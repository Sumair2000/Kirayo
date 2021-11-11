import { combineReducers } from 'redux';
import products from './products';
import authReducer from './authReducer'

export default combineReducers({
  auth: authReducer,
  products
})
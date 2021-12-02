import {FETCH_ALL_PRODUCTS, FETCH_MY_POSTS,GET_CATEGORY_SUCCESSFULLY, FETCH_MY_RESERVATION, FETCH_BY_SEARCH} from "./types";
import * as api from "../api/index"

export const getProducts = (page) => async (dispatch) => {
  
  try {
    const { data } = await api.fetchPosts(page);
    console.log(data);
    dispatch({
      type: FETCH_ALL_PRODUCTS,
      payload: data
    })
  } catch (error) {
    console.log(error.message);
  }
}

export const getMyPosts = (id) => async (dispatch) => {
  try {
    
    const { data } = await api.getMyPosts(id);
    dispatch({
      type: FETCH_MY_POSTS,
      payload: data
    })
  } catch (error) {
    console.log(error.message);
  }
}

export const getMyReservation = (id) => async (dispatch) => {
  try {
    const { data } = await api.getMyReservation(id);
    dispatch({
      type: FETCH_MY_RESERVATION,
      payload: data
    })
  } catch (error) {
    console.log(error.message)
  }
}

export const searchProductByCategory = (cat) => async (dispatch) => {
  try {
    const { data } = await api.getProductByCategory(cat);
    dispatch({
      type: GET_CATEGORY_SUCCESSFULLY,
      payload: data
    })
  } catch (error) {
    console.log(error.message)
  }
}

export const getProductBySearch = (searchQuery) => async (dispatch) => {
  try {
    
    const {data} = await api.getProductBySearch(searchQuery);
    dispatch({
      type: FETCH_BY_SEARCH,
      payload: data
    })
  } catch (error) {
    console.log(error.message);
  }
}

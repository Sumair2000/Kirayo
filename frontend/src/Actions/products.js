import {FETCH_ALL_PRODUCTS, FETCH_MY_POSTS,RESERVATION_SUCCESSFULL} from "./types";
import * as api from "../api/index"

export const getProducts = (page) => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts(page);

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

import {FETCH_ALL_PRODUCTS} from "./types";
import * as api from "../api/index"

export const getProducts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();

    dispatch({
      type: FETCH_ALL_PRODUCTS,
      payload: data
    })
  } catch (error) {
    console.log(error);
  }
}
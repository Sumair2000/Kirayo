import {FETCH_ALL_PRODUCTS,FETCH_MY_POSTS, GET_CATEGORY_SUCCESSFULLY,FETCH_MY_RESERVATION, FETCH_BY_SEARCH} from "../Actions/types";

export default (state = [] , action) => {
  switch (action.type) {
    case FETCH_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_MY_POSTS:
      return action.payload
    case FETCH_MY_RESERVATION:
      return action.payload
    case FETCH_BY_SEARCH:
      console.log(action.payload)
      return {
        products: action.payload,
      }
    case GET_CATEGORY_SUCCESSFULLY:
      return {
        allProducts: action.payload.data,
        success: action.payload.success,
      }
    default:
      return state;
  }
}
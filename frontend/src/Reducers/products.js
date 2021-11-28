import {FETCH_ALL_PRODUCTS,FETCH_MY_POSTS, RESERVATION_SUCCESSFULL} from "../Actions/types";

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
    default:
      return state;
  }
}
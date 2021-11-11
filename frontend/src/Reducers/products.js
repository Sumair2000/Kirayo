import {FETCH_ALL_PRODUCTS} from "../Actions/types";

export default (products = [] , action) => {
  switch (action.type) {
    case FETCH_ALL_PRODUCTS:
      return action.payload;
    default:
      return products;
  }
}
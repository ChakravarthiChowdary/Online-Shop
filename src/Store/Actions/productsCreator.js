import axios from "axios";

import {
  GET_ALL_PRODUCTS_FAIL,
  GET_ALL_PRODUCTS_START,
  GET_ALL_PRODUCTS_SUCCESS,
} from "../Actions/actionTypes";

export const getAllProducts = () => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_PRODUCTS_START });
    try {
      const responce = await axios.get(
        "https://general-traders.firebaseio.com/products.json"
      );
      let productsArray = [];
      for (let key in responce.data) {
        productsArray.push(responce.data[key]);
      }
      dispatch({ type: GET_ALL_PRODUCTS_SUCCESS, payload: productsArray });
    } catch (error) {
      dispatch({ type: GET_ALL_PRODUCTS_FAIL, payload: error.message });
    }
  };
};

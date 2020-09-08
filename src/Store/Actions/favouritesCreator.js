import axios from "axios";

import {
  FAVOURITE_PRODUCTS_FAIL,
  GET_FAVOURITE_PRODUCTS_START,
  GET_FAVOURITE_PRODUCTS_FAIL,
  GET_FAVOURITE_PRODUCTS_SUCCESS,
  ADD_TO_FAVOURITE_PRODUCTS_SUCCESS,
  DELETE_FAVOURITE_PRODUCT_SUCCESS,
} from "./actionTypes";

export const addToFavourites = (productId) => {
  return async (dispatch, getState) => {
    try {
      const userId = localStorage.getItem("idUser");
      const product = getState().products.availableProducts.find(
        (prod) => prod.id === productId
      );
      await axios.patch(
        `https://general-traders.firebaseio.com/favourites/${userId}/${productId}.json`,
        product
      );
      dispatch({ type: ADD_TO_FAVOURITE_PRODUCTS_SUCCESS, payload: product });
    } catch (error) {
      dispatch({ type: FAVOURITE_PRODUCTS_FAIL, payload: error });
    }
  };
};

export const getFavouriteProducts = () => {
  return async (dispatch) => {
    dispatch({ type: GET_FAVOURITE_PRODUCTS_START });
    try {
      const userId = localStorage.getItem("idUser");

      const response = await axios.get(
        `https://general-traders.firebaseio.com/favourites/${userId}.json`
      );
      let favouritesArray = [];
      for (let key in response.data) {
        favouritesArray.push(response.data[key]);
      }
      dispatch({
        type: GET_FAVOURITE_PRODUCTS_SUCCESS,
        payload: favouritesArray,
      });
    } catch (error) {
      dispatch({ type: GET_FAVOURITE_PRODUCTS_FAIL, payload: error });
    }
  };
};

export const deleteFavouriteProduct = (productId) => {
  return async (dispatch, getState) => {
    try {
      const userId = localStorage.getItem("idUser");
      const product = getState().products.availableProducts.find(
        (prod) => prod.id === productId
      );
      await axios.delete(
        `https://general-traders.firebaseio.com/favourites/${userId}/${productId}.json`
      );
      dispatch({ type: DELETE_FAVOURITE_PRODUCT_SUCCESS, payload: product });
    } catch (error) {
      dispatch({ type: FAVOURITE_PRODUCTS_FAIL, payload: error });
    }
  };
};

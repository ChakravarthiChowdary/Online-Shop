import axios from "axios";

import {
  GET_CART_PRODUCTS,
  UPDATE_CART_QUANTITY,
  DELETE_CART_ITEM,
  ADD_TO_CART,
} from "./actionTypes";

export const getCartproducts = () => {
  return async (dispatch) => {
    try {
      const userId = localStorage.getItem("idUser");
      const responce = await axios.get(
        `https://general-traders.firebaseio.com/cart/${userId}.json`
      );
      let cartArray = [];
      for (let key in responce.data) {
        cartArray.push(responce.data[key]);
      }
      dispatch({ type: GET_CART_PRODUCTS, payload: cartArray });
    } catch (error) {
      throw error;
    }
  };
};

export const updateCartQuantity = (newQty, cartId) => {
  return async (dispatch, getState) => {
    const userId = localStorage.getItem("idUser");
    const cartItem = getState().cart.cartProducts.find(
      (cart) => cart.id === cartId
    );
    cartItem.quantity = parseInt(newQty, 10);
    dispatch({ type: UPDATE_CART_QUANTITY, payload: cartItem });
    await axios.patch(
      `https://general-traders.firebaseio.com/cart/${userId}/${cartId}.json`,
      cartItem
    );
  };
};

export const deleteCartItem = (cartId) => {
  return async (dispatch) => {
    const userId = localStorage.getItem("idUser");
    dispatch({ type: DELETE_CART_ITEM, payload: cartId });
    await axios.delete(
      `https://general-traders.firebaseio.com/cart/${userId}/${cartId}.json`
    );
  };
};

export const addProductToCart = (cartItem, quantity) => {
  return async (dispatch, getState) => {
    const userId = localStorage.getItem("idUser");
    const cartProduct = getState().cart.cartProducts.find(
      (product) => product.id === cartItem.id
    );
    if (cartProduct) {
      cartItem.quantity =
        parseInt(quantity, 10) + parseInt(cartProduct.quantity, 10);
    } else {
      cartItem.quantity = quantity;
    }

    dispatch({ type: ADD_TO_CART, payload: cartItem });
    await axios.patch(
      `https://general-traders.firebaseio.com/cart/${userId}/${cartItem.id}.json`,
      cartItem
    );
  };
};

import axios from "axios";

import {
  CLEAR_CART,
  ADD_TO_ORDER_ERROR,
  ADD_TO_ORDER_START,
  ADD_TO_ORDER_SUCCESS,
  GET_ORDERS_START,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAIL,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_START,
  DELETE_ORDER_FAIL,
} from "./actionTypes";

const randomStr = (len, arr) => {
  let ans = "";
  for (var i = len; i > 0; i--) {
    ans += arr[Math.floor(Math.random() * arr.length)];
  }
  return ans;
};

export const addNewOrder = (cartProducts, totalPrice) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ADD_TO_ORDER_START });
      const id = randomStr(8, "12345abcde");
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 7);
      const orderItem = {
        cartProducts,
        totalPrice,
        id: id.toString(),
        expectedDelivery: currentDate,
      };
      const userId = localStorage.getItem("idUser");
      await axios.patch(
        `https://general-traders.firebaseio.com/orders/${userId}/o${id}.json`,
        orderItem
      );
      await axios.delete(
        `https://general-traders.firebaseio.com/cart/${userId}.json`
      );
      dispatch({ type: CLEAR_CART });
      dispatch({ type: ADD_TO_ORDER_SUCCESS, payload: orderItem });
    } catch (error) {
      dispatch({ type: ADD_TO_ORDER_ERROR, payload: error });
    }
  };
};

export const getOrders = () => {
  return async (dispatch) => {
    try {
      const userId = localStorage.getItem("idUser");
      dispatch({ type: GET_ORDERS_START });
      const responce = await axios.get(
        `https://general-traders.firebaseio.com/orders/${userId}.json`
      );
      let ordersArray = [];
      for (let key in responce.data) {
        ordersArray.push(responce.data[key]);
      }
      dispatch({ type: GET_ORDERS_SUCCESS, payload: ordersArray });
    } catch (error) {
      dispatch({ type: GET_ORDERS_FAIL, payload: error });
    }
  };
};

export const deleteOrder = (orderId) => {
  return async (dispatch) => {
    try {
      const userId = localStorage.getItem("idUser");
      dispatch({ type: DELETE_ORDER_START });
      await axios.delete(
        `https://general-traders.firebaseio.com/orders/${userId}/o${orderId}.json`
      );
      dispatch({ type: DELETE_ORDER_SUCCESS, payload: orderId });
    } catch (error) {
      dispatch({ type: DELETE_ORDER_FAIL, payload: error });
    }
  };
};

import axios from "axios";

import {
  CLEAR_CART,
  ADD_TO_ORDER_ERROR,
  ADD_TO_ORDER_START,
  ADD_TO_ORDER_SUCCESS,
  GET_ORDERS_START,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAIL,
} from "./actionTypes";

export const addNewOrder = (cartProducts, totalPrice) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ADD_TO_ORDER_START });
      const id = (Math.random() * 10).toFixed(3);
      const pathId = Math.round(id);
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 7);
      const orderItem = {
        cartProducts,
        totalPrice,
        id: id.toString(),
        expectedDelivery: currentDate,
      };
      const userId = localStorage.getItem("idUser");
      const response = await axios.patch(
        `https://general-traders.firebaseio.com/orders/${userId}/o${pathId}.json`,
        orderItem
      );
      await axios.delete(
        `https://general-traders.firebaseio.com/cart/${userId}.json`
      );
      dispatch({ type: CLEAR_CART });
      dispatch({ type: ADD_TO_ORDER_SUCCESS, payload: orderItem });
    } catch (error) {
      console.log(error.response.data);
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

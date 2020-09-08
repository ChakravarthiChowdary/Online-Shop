import {
  ADD_TO_ORDER_START,
  ADD_TO_ORDER_ERROR,
  ADD_TO_ORDER_SUCCESS,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_START,
  GET_ORDERS_FAIL,
} from "../Actions/actionTypes";
import stateUpdate from "../../Utilities/stateUpdate";

const initialState = {
  loading: false,
  orders: [],
  error: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_ORDER_START:
      return stateUpdate(state, { loading: true });
    case ADD_TO_ORDER_SUCCESS:
      const addedOrder = state.orders.concat(action.payload);
      return stateUpdate(state, {
        orders: addedOrder,
        loading: false,
        error: null,
      });
    case ADD_TO_ORDER_ERROR:
      return stateUpdate(state, { loading: false, error: action.payload });
    case GET_ORDERS_START:
      return stateUpdate(state, { loading: true });
    case GET_ORDERS_SUCCESS:
      return stateUpdate(state, {
        loading: false,
        error: null,
        orders: action.payload,
      });
    case GET_ORDERS_FAIL:
      return stateUpdate(state, { loading: false, error: action.payload });
    default:
      return state;
  }
};

export default orderReducer;

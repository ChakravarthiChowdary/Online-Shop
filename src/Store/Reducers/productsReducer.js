import {
  GET_ALL_PRODUCTS_START,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_FAIL,
} from "../Actions/actionTypes";
import stateUpdate from "../../Utilities/stateUpdate";

const initialState = {
  loading: false,
  availableProducts: [],
  error: null,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS_START:
      return stateUpdate(state, { loading: true });
    case GET_ALL_PRODUCTS_SUCCESS:
      return stateUpdate(state, {
        loading: false,
        availableProducts: action.payload,
      });
    case GET_ALL_PRODUCTS_FAIL:
      return stateUpdate(state, { loading: false, error: action.payload });
    default:
      return state;
  }
};

export default productsReducer;

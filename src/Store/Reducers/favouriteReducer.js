import {
  GET_FAVOURITE_PRODUCTS_START,
  GET_FAVOURITE_PRODUCTS_SUCCESS,
  GET_FAVOURITE_PRODUCTS_FAIL,
  ADD_TO_FAVOURITE_PRODUCTS_SUCCESS,
  FAVOURITE_PRODUCTS_FAIL,
  DELETE_FAVOURITE_PRODUCT_SUCCESS,
  LOGOUT,
} from "../Actions/actionTypes";
import stateUpdate from "../../Utilities/stateUpdate";

const initialState = {
  loading: false,
  error: null,
  favouriteProducts: [],
};

const favouriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FAVOURITE_PRODUCTS_START:
      return stateUpdate(state, { loading: true });
    case GET_FAVOURITE_PRODUCTS_SUCCESS:
      return stateUpdate(state, {
        loading: false,
        error: null,
        favouriteProducts: action.payload,
      });
    case GET_FAVOURITE_PRODUCTS_FAIL:
      return stateUpdate(state, {
        loading: false,
        error: action.payload,
      });
    case ADD_TO_FAVOURITE_PRODUCTS_SUCCESS:
      const updatedFavAdd = state.favouriteProducts.concat(action.payload);
      return stateUpdate(state, {
        error: null,
        favouriteProducts: updatedFavAdd,
      });
    case DELETE_FAVOURITE_PRODUCT_SUCCESS:
      const updatedFav = state.favouriteProducts.filter(
        (product) => product.id !== action.payload.id
      );
      return stateUpdate(state, { error: null, favouriteProducts: updatedFav });
    case FAVOURITE_PRODUCTS_FAIL:
      return stateUpdate(state, { error: action.payload });
    case LOGOUT:
      return stateUpdate(state, initialState);
    default:
      return state;
  }
};

export default favouriteReducer;

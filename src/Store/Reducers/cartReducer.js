import {
  GET_CART_PRODUCTS,
  UPDATE_CART_QUANTITY,
  DELETE_CART_ITEM,
  ADD_TO_CART,
  CLEAR_CART,
} from "../Actions/actionTypes";
import stateUpdate from "../../Utilities/stateUpdate";

const initialState = {
  cartProducts: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART_PRODUCTS:
      return stateUpdate(state, { cartProducts: action.payload });
    case UPDATE_CART_QUANTITY:
      let updatedQuantity = state.cartProducts.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
      updatedQuantity = updatedQuantity.concat(action.payload);
      return stateUpdate(state, { cartProducts: updatedQuantity });
    case DELETE_CART_ITEM:
      const deletedCart = state.cartProducts.filter(
        (cartItem) => cartItem.id !== action.payload
      );
      return stateUpdate(state, { cartProducts: deletedCart });
    case ADD_TO_CART:
      let addedCart = state.cartProducts.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
      addedCart = addedCart.concat(action.payload);
      return stateUpdate(state, { cartProducts: addedCart });
    case CLEAR_CART:
      return stateUpdate(state, initialState);
    default:
      return state;
  }
};

export default cartReducer;

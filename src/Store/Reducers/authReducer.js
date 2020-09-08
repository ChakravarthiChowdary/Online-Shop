import {
  SIGNIN_START,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  LOGOUT,
} from "../Actions/actionTypes";
import stateUpdate from "../../Utilities/stateUpdate";

const initialState = {
  loading: false,
  error: null,
  authInfo: null,
  userData: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_START:
      return stateUpdate(state, { loading: true });
    case SIGNIN_SUCCESS:
      return stateUpdate(state, {
        loading: false,
        authInfo: action.payload.responce,
        userData: action.payload.userData,
        error: null,
      });
    case SIGNIN_FAIL:
      return stateUpdate(state, {
        loading: false,
        error: action.payload,
        authInfo: null,
      });
    case LOGOUT:
      return stateUpdate(state, initialState);
    default:
      return state;
  }
};

export default authReducer;

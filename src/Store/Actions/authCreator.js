import axios from "axios";

import {
  SIGNIN_START,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  LOGOUT,
} from "./actionTypes";
import { API_DETAILS } from "../../Constants/ENV";

export const signInUser = (email, password) => {
  return async (dispatch) => {
    try {
      const authInfo = {
        email,
        password,
        returnSecureToken: true,
      };
      dispatch({ type: SIGNIN_START });
      const responce = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_DETAILS.API_KEY}`,
        authInfo
      );
      const userData = await axios.get(
        `https://general-traders.firebaseio.com/users/${responce.data.localId}.json`
      );
      const expirationDate = new Date(
        new Date().getTime() + responce.data.expiresIn * 1000
      );

      localStorage.setItem("idToken", responce.data.idToken);
      localStorage.setItem("idUser", responce.data.localId);
      localStorage.setItem("expirationDate", expirationDate);
      dispatch({
        type: SIGNIN_SUCCESS,
        payload: {
          responce: responce.data,
          userData: userData.data,
        },
      });
    } catch (error) {
      dispatch({ type: SIGNIN_FAIL, payload: error });
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("idToken");
    localStorage.removeItem("idUser");
    localStorage.removeItem("expirationDate");
    dispatch({ type: LOGOUT });
  };
};

export const signupUser = (userDetails) => {
  return async (dispatch) => {
    try {
      const authInfo = {
        email: userDetails.email,
        password: userDetails.password,
        returnSecureToken: true,
      };
      dispatch({ type: SIGNIN_START });
      const responce = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_DETAILS.API_KEY}`,
        authInfo
      );
      userDetails.id = responce.data.localId;
      await axios.patch(
        `https://general-traders.firebaseio.com/users/${responce.data.localId}.json`,
        userDetails
      );

      const expirationDate = new Date(
        new Date().getTime() + responce.data.expiresIn * 1000
      );
      localStorage.setItem("idToken", responce.data.idToken);
      localStorage.setItem("idUser", responce.data.localId);
      localStorage.setItem("expirationDate", expirationDate);
      dispatch({ type: SIGNIN_SUCCESS, payload: responce.data });
    } catch (error) {
      dispatch({ type: SIGNIN_FAIL, payload: error });
    }
  };
};

export const autoLogin = () => {
  return async (dispatch) => {
    const expirationDate = new Date(localStorage.getItem("expirationDate"));
    const idUser = localStorage.getItem("idUser");
    const currentDate = new Date();

    if (expirationDate < currentDate) {
      dispatch(logout());
    } else {
      const userData = await axios.get(
        `https://general-traders.firebaseio.com/users/${idUser}.json`
      );
      dispatch({
        type: SIGNIN_SUCCESS,
        payload: {
          responce: userData.data,
          userData: userData.data,
        },
      });
    }
  };
};

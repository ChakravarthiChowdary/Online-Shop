import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import productsReducer from "./Store/Reducers/productsReducer";
import cartReducer from "./Store/Reducers/cartReducer";
import authReducer from "./Store/Reducers/authReducer";
import orderReducer from "./Store/Reducers/orderReducer";
import favouriteReducer from "./Store/Reducers/favouriteReducer";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  auth: authReducer,
  order: orderReducer,
  fav: favouriteReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();

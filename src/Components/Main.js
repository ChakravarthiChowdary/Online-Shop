import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";

import Navigation from "./Navigation";
import Products from "./Products";
import { getAllProducts } from "../Store/Actions/productsCreator";
import Cart from "./Cart";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { getCartproducts } from "../Store/Actions/cartCreator";
import Orders from "./Orders";
import { getOrders } from "../Store/Actions/orderCreator";
import { autoLogin } from "../Store/Actions/authCreator";
import { getFavouriteProducts } from "../Store/Actions/favouritesCreator";

const Main = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("");
  const products = useSelector((state) => state.products.availableProducts);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const authInfo = useSelector((state) => state.auth.authInfo);
  const filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(filter.toLowerCase());
  });
  const favouriteProducts = useSelector((state) => state.fav.favouriteProducts);
  const token = localStorage.getItem("idToken");

  const useStyles = makeStyles((theme) => ({
    loadError: {
      display: "flex",
      flexDirection: "column",
      height: "80vh",
      justifyContent: "center",
      alignItems: "center",
    },
  }));

  const loadData = () => {
    dispatch(getAllProducts());
    if (token) {
      dispatch(autoLogin());
      dispatch(getFavouriteProducts());
      dispatch(getCartproducts());
      dispatch(getOrders());
    }
  };

  useEffect(() => {
    loadData();
  }, [dispatch, token]);

  const classes = useStyles();

  const filterProducts = (searchValue) => {
    setFilter(searchValue);
  };

  let routes = null;

  if (token || authInfo) {
    routes = (
      <Switch>
        <Route
          path="/onlineshop/groceries"
          render={() => (
            <Products
              products={filteredProducts.filter(
                (product) => product.category === "groceries"
              )}
            />
          )}
        />
        <Route
          path="/onlineshop/electronics"
          render={() => (
            <Products
              products={filteredProducts.filter(
                (product) => product.category === "mobilesandelectronics"
              )}
            />
          )}
        />
        <Route
          path="/onlineshop/soapsanddetergents"
          render={() => (
            <Products
              products={filteredProducts.filter(
                (product) => product.category === "soapsanddetergents"
              )}
            />
          )}
        />
        <Route path="/onlineshop/cart" render={() => <Cart />} />
        <Route
          path="/onlineshop/favourites"
          render={() => <Products products={favouriteProducts} />}
        />
        <Route path="/onlineshop/orders" render={() => <Orders />} />
        <Route path="/onlineshop/signin" render={() => <SignIn />} />
        <Route path="/onlineshop/signup" render={() => <SignUp />} />
        <Route
          path="/"
          exact
          render={() => <Products products={filteredProducts} />}
        />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route
          path="/onlineshop/groceries"
          render={() => (
            <Products
              products={filteredProducts.filter(
                (product) => product.category === "groceries"
              )}
            />
          )}
        />
        <Route
          path="/onlineshop/electronics"
          render={() => (
            <Products
              products={filteredProducts.filter(
                (product) => product.category === "mobilesandelectronics"
              )}
            />
          )}
        />
        <Route
          path="/onlineshop/soapsanddetergents"
          render={() => (
            <Products
              products={filteredProducts.filter(
                (product) => product.category === "soapsanddetergents"
              )}
            />
          )}
        />
        <Route path="/onlineshop/signin" render={() => <SignIn />} />
        <Route path="/onlineshop/signup" render={() => <SignUp />} />
        <Route
          path="/"
          exact
          render={() => <Products products={filteredProducts} />}
        />
        <Redirect to="/onlineshop/signin" />
      </Switch>
    );
  }

  return (
    <Fragment>
      <Navigation filterProducts={filterProducts} />
      {!error ? (
        !loading ? (
          routes
        ) : (
          <Container className={classes.loadError} maxWidth="lg">
            <CircularProgress color="secondary" />
          </Container>
        )
      ) : (
        <Container className={classes.loadError} maxWidth="lg">
          <Typography variant="h6">{error}</Typography>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            style={{ marginTop: "1rem" }}
            onClick={loadData}
          >
            Try Again
          </Button>
        </Container>
      )}
    </Fragment>
  );
};

export default Main;

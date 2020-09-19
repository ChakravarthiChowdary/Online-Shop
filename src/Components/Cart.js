import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Paper,
  Button,
  Container,
  CircularProgress,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { getCartproducts } from "../Store/Actions/cartCreator";
import CartItem from "./CartItem";
import { addNewOrder } from "../Store/Actions/orderCreator";
import SnackBar from "./SnackBar";
import { useHistory, useLocation } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    padding: "1rem",
    marginTop: "1rem",
    marginBottom: "1rem",
    justifyContent: "space-between",
    alignItems: "center",
  },
  spinner: {
    display: "block",
    margin: "auto",
  },
  error: {
    textAlign: "center",
    padding: "1rem",
  },
  noproducts: {
    display: "flex",
    flexDirection: "column",
    height: "80vh",
    justifyContent: "center",
    alignItems: "center",
  },
  tryAgain: {
    marginTop: "1rem",
  },
}));

const Cart = () => {
  const classes = useStyles();
  //component level state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const fromButton = "cart";
  //redux state
  const cartProducts = useSelector((state) => state.cart.cartProducts);
  const orderLoading = useSelector((state) => state.order.loading);

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const userId = localStorage.getItem("idUser");

  const compare = (a, b) => {
    return a.sellingprice < b.sellingprice ? 1 : -1;
  };

  cartProducts.sort(compare);

  const loadCart = async () => {
    try {
      setLoading(true);
      await dispatch(getCartproducts(userId));
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  if (loading) {
    return <CircularProgress color="secondary" className={classes.spinner} />;
  }

  if (error) {
    return (
      <Container>
        <div className={classes.noproducts}>
          <Typography variant="h6">{error}</Typography>
          <Button
            color="secondary"
            variant="contained"
            className={classes.tryAgain}
            onClick={loadCart}
          >
            Try Again
          </Button>
        </div>
      </Container>
    );
  }

  let price = 0;
  let orderPrice = 0;
  cartProducts.forEach((cartitem) => {
    price = price + cartitem.sellingprice * cartitem.quantity;
  });
  if (price < 500) {
    orderPrice = price + 50;
  } else {
    orderPrice = price;
  }

  const orderClickedHandler = async () => {
    await dispatch(addNewOrder(cartProducts, orderPrice));
    const message = `Order was placed successfully !`;
    setOpen(true);
    setMessage(message);
  };
  const closeSnack = () => {
    setOpen(false);
  };

  const addSomeClickedHandler = () => {
    history.replace("/");
  };

  return (
    <Fragment>
      <Container>
        <Paper elevation={5}>
          <div className={classes.root}>
            <Typography variant="h6">
              Total Price: ₹{" "}
              {cartProducts.length > 0
                ? price >= 500
                  ? price
                  : price + 50
                : price}
              /-{" "}
            </Typography>
            <Typography>
              {price < 500 && cartProducts.length > 0 ? (
                <Typography color="secondary">
                  * Delivery charges(₹50/-) included
                </Typography>
              ) : null}
            </Typography>
            {orderLoading ? (
              <CircularProgress />
            ) : (
              <Button
                color="secondary"
                variant="contained"
                onClick={orderClickedHandler}
                disabled={!cartProducts.length > 0}
              >
                Order Now
              </Button>
            )}
          </div>
        </Paper>
        {cartProducts.length > 0 ? (
          cartProducts.map((cartitem) => (
            <CartItem cartitem={cartitem} key={cartitem.id} />
          ))
        ) : (
          <div className={classes.noproducts}>
            <Typography variant="h6" color="secondary">
              Oops ! No products in the cart
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className={classes.tryAgain}
              onClick={addSomeClickedHandler}
            >
              Add Some !
            </Button>
          </div>
        )}
      </Container>
      <SnackBar
        openStatus={open}
        closeSnack={closeSnack}
        message={message}
        button={fromButton}
      />
    </Fragment>
  );
};

export default Cart;

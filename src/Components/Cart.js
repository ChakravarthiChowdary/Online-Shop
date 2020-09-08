import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Paper,
  Button,
  Container,
  CircularProgress,
} from "@material-ui/core";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";

import { getCartproducts } from "../Store/Actions/cartCreator";
import { addNewOrder } from "../Store/Actions/orderCreator";

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
}));

const Cart = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cartProducts = useSelector((state) => state.cart.cartProducts);
  const orderLoading = useSelector((state) => state.order.loading);
  const dispatch = useDispatch();
  const userId = localStorage.getItem("idUser");

  const compare = (a, b) => {
    if (a.sellingprice < b.sellingprice) {
      return 1;
    }
    if (a.sellingprice > b.sellingprice) {
      return -1;
    }
    return 0;
  };

  cartProducts.sort(compare);

  useEffect(() => {
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
    loadCart();
  }, [dispatch]);

  if (loading) {
    return <CircularProgress color="secondary" className={classes.spinner} />;
  }

  if (error) {
    return (
      <Container>
        <Paper elevation={5}>
          <div className={classes.error}>
            <Typography variant="h6">{error}</Typography>
            <Button color="secondary">Try Again</Button>
          </div>
        </Paper>
      </Container>
    );
  }

  let price = 0;
  cartProducts.forEach((cartitem) => {
    price = price + cartitem.sellingprice * cartitem.quantity;
  });

  const orderClickedHandler = () => {
    dispatch(addNewOrder(cartProducts, price));
  };

  return (
    <Fragment>
      <Container>
        <Paper elevation={5}>
          <div className={classes.root}>
            <Typography variant="h6">Total Price: ₹ {price}/-</Typography>
            {orderLoading ? (
              <CircularProgress />
            ) : (
              <Button
                color="secondary"
                variant="contained"
                onClick={orderClickedHandler}
              >
                Order Now
              </Button>
            )}
          </div>
        </Paper>
        {cartProducts.map((cartitem) => (
          <CartItem cartitem={cartitem} key={cartitem.id} />
        ))}
      </Container>
    </Fragment>
  );
};

export default Cart;

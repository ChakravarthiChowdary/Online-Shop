import React, { Fragment } from "react";
import { Container, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import OrderItem from "./OrderItem";

const useStyles = makeStyles((theme) => ({
  noProducts: {
    display: "flex",
    flexDirection: "column",
    height: "80vh",
    justifyContent: "center",
    alignItems: "center",
  },
  orderNow: {
    marginTop: "1rem",
  },
}));

const Orders = () => {
  const classes = useStyles();
  const history = useHistory();
  //redux state
  const orders = useSelector((state) => state.order.orders);
  const cart = useSelector((state) => state.cart.cartProducts);

  const ordernowClickedHandler = () => {
    if (cart.length > 0) history.replace("/onlineshop/cart");
    else history.replace("/");
  };

  return (
    <Fragment>
      <Container>
        {orders.length > 0 ? (
          orders.map((order) => <OrderItem key={order.id} order={order} />)
        ) : (
          <div className={classes.noProducts}>
            <Typography variant="h6">No active orders found !</Typography>
            <Button
              variant="contained"
              color="primary"
              className={classes.orderNow}
              onClick={ordernowClickedHandler}
            >
              Order Now !
            </Button>
          </div>
        )}
      </Container>
    </Fragment>
  );
};

export default Orders;

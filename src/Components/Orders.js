import React, { Fragment } from "react";
import { Container } from "@material-ui/core";
import { useSelector } from "react-redux";

import OrderItem from "./OrderItem";

const Orders = () => {
  const orders = useSelector((state) => state.order.orders);

  return (
    <Fragment>
      <Container>
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </Container>
    </Fragment>
  );
};

export default Orders;

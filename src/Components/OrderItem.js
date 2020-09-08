import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import OrderDetailsItem from "./OrderDetailsItem";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: "1rem",
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightBold,
    marginRight: "1rem",
    minWidth: "200px",
  },
  delivery: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightBold,
    marginRight: "2rem",
  },
  order: {
    display: "flex",
    flexDirection: "row",
    marginTop: "1rem",
    marginBottom: "1rem",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  cartItem: {
    display: "flex",
    flexDirection: "column",
  },
}));

const OrderItem = ({ order }) => {
  const classes = useStyles();
  let deliveryDate = new Date(order.expectedDelivery);
  const month = deliveryDate.getMonth() + 1;
  deliveryDate =
    deliveryDate.getDate().toString() +
    "/" +
    month.toString() +
    "/" +
    deliveryDate.getFullYear().toString();
  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <div className={classes.order}>
            <Typography className={classes.heading} variant="h5">
              Order Id: {order.id}
            </Typography>
            <Typography className={classes.heading}>
              Total Price: ₹{order.totalPrice}/-
            </Typography>
            <Typography className={classes.delivery}>
              Expected Delivery: {deliveryDate}
            </Typography>
            <Button variant="contained" color="secondary">
              DELETE
            </Button>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.cartItem}>
            {order.cartProducts.map((cart) => (
              <OrderDetailsItem key={cart.id} cartItem={cart} />
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default OrderItem;

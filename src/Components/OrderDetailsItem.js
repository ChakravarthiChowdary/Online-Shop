import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginTop: "1rem",
  },
  title: {
    marginRight: "1rem",
  },
}));

const OrderDetailsItem = ({ cartItem }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        {cartItem.title}({cartItem.quantity})
      </Typography>
      <Typography variant="h6">Price : ₹{cartItem.sellingprice}/-</Typography>
    </div>
  );
};

export default OrderDetailsItem;

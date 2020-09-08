import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper, IconButton, TextField } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch } from "react-redux";

import {
  updateCartQuantity,
  deleteCartItem,
} from "../Store/Actions/cartCreator";

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
  quantity: {
    maxWidth: 50,
  },
  cardMedia: {
    //paddingTop: "56.25%", // 16:9
  },
  cartInfo: {
    display: "flex",
    alignItems: "center",
  },
  image: {
    height: "6rem",
    width: "6rem",
    marginRight: "1rem",
  },
  cartPrice: {
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
  },
}));

const CartItem = ({ cartitem }) => {
  const classes = useStyles();
  const [quantity, setQuantity] = useState(cartitem.quantity);
  const dispatch = useDispatch();
  const quantityChangedHandler = (event) => {
    const newQty = event.target.value;
    if (parseInt(newQty, 10) === 0) {
      cartDeleteClickedHandler();
      return;
    }
    setQuantity(newQty);
    dispatch(updateCartQuantity(newQty, cartitem.id));
  };
  const cartDeleteClickedHandler = () => {
    dispatch(deleteCartItem(cartitem.id));
  };
  return (
    <Fragment>
      <Paper elevation={5}>
        <div className={classes.root}>
          <div className={classes.cartInfo}>
            <img
              src="https://source.unsplash.com/user/@dels/ZEpZJ2IYNBw/800*600"
              alt={cartitem.title}
              className={classes.image}
            />
            {/* <CardMedia
              className={classes.cardMedia}
              image="https://source.unsplash.com/user/@dels/ZEpZJ2IYNBw/800*600"
              title="Image title"
            /> */}
            <div>
              <Typography variant="h6">{cartitem.title}</Typography>
              <Typography className={classes.cartPrice}>
                Price: ₹{cartitem.sellingprice}/-
              </Typography>
              <TextField
                id="standard-number"
                label="Quantity"
                size="small"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                value={quantity}
                onChange={quantityChangedHandler}
                className={classes.quantity}
              />
            </div>
          </div>
          <div>
            <IconButton
              aria-label="delete"
              color="secondary"
              onClick={cartDeleteClickedHandler}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      </Paper>
    </Fragment>
  );
};

export default CartItem;

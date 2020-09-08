import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { deleteCartItem } from "../Store/Actions/cartCreator";

import ProductItem from "./ProductItem";
import SnackBar from "./SnackBar";
import Categories from "./Categories";
import {
  deleteFavouriteProduct,
  addToFavourites,
} from "../Store/Actions/favouritesCreator";

const Products = ({ products }) => {
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [productId, setProductId] = useState(null);
  const [fromButton, setFromButton] = useState(null);
  const dispatch = useDispatch();

  const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    cardMedia: {
      paddingTop: "56.25%", // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
    button: {
      justifyContent: "center",
      alignItems: "space-between",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 10,
    },
    quantity: {
      maxWidth: 50,
    },
    clear: {
      marginTop: "1rem",
      flexDirection: "row",
      display: "flex",
      justifyContent: "center",
    },
    loadError: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyItems: "center",
      fontSize: "1.5rem",
    },
  }));

  const classes = useStyles();

  if (loading) {
    return (
      <Container className={classes.loadError} maxWidth="lg">
        <CircularProgress color="secondary" />
      </Container>
    );
  }
  if (error) {
    return (
      <Container className={classes.loadError} maxWidth="lg">
        <h6>{error}</h6>
      </Container>
    );
  }
  const openSnackBar = (message, productId, button) => {
    setOpen(true);
    setProductId(productId);
    setMessage(message);
    setFromButton(button);
  };
  const closeSnack = () => {
    setOpen(false);
  };
  const undoClickedHandler = () => {
    closeSnack();
    if (fromButton === "addtocart") dispatch(deleteCartItem(productId));
    else if (fromButton === "addtofavourites")
      dispatch(deleteFavouriteProduct(productId));
    else if (fromButton === "removefromfavourites")
      dispatch(addToFavourites(productId));
  };
  return (
    <Container className={classes.cardGrid} maxWidth="lg">
      {/* End hero unit */}
      <Categories />

      <Grid container spacing={4}>
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            openSnackBar={openSnackBar}
          />
        ))}
      </Grid>
      <SnackBar
        openStatus={open}
        closeSnack={closeSnack}
        message={message}
        undoClickedHandler={undoClickedHandler}
        button={fromButton}
      />
    </Container>
  );
};

export default Products;

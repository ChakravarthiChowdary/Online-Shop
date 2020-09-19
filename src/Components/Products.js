import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useDispatch } from "react-redux";
import { deleteCartItem } from "../Store/Actions/cartCreator";

import ProductItem from "./ProductItem";
import SnackBar from "./SnackBar";
import Categories from "./Categories";

const Products = ({ products }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [productId, setProductId] = useState(null);
  const [fromButton, setFromButton] = useState(null);

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
      height: "80vh",
      justifyContent: "center",
      alignItems: "center",
    },
  }));

  const classes = useStyles();

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

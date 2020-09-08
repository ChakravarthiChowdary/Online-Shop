import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavouriteBorder from "@material-ui/icons/FavoriteBorder";
import Favourite from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";

import { addProductToCart } from "../Store/Actions/cartCreator";
import { Redirect, useLocation } from "react-router";
import {
  addToFavourites,
  deleteFavouriteProduct,
} from "../Store/Actions/favouritesCreator";

const ProductItem = ({ product, openSnackBar }) => {
  const [quantity, setQuantity] = useState(1);
  const isFav = useSelector((state) =>
    state.fav.favouriteProducts.find((prod) => prod.id === product.id)
  );

  const [fav, setFav] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    setFav(isFav);
  }, []);

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
  }));

  const classes = useStyles();
  const idToken = localStorage.getItem("idToken");

  const addCartClickedHandler = () => {
    if (idToken) {
      setSignIn(false);
      dispatch(addProductToCart(product, quantity));
      const message = `${product.title} (${quantity}) added to cart`;
      openSnackBar(message, product.id, "addtocart");
    } else {
      setSignIn(true);
    }
  };

  const favouriteClickedHandler = () => {
    if (idToken) {
      if (!fav) {
        setSignIn(false);
        setFav(true);
        dispatch(addToFavourites(product.id));
        const message = `${product.title} is added to favourites`;
        openSnackBar(message, product.id, "addtofavourites");
      } else {
        setFav(false);
        dispatch(deleteFavouriteProduct(product.id));
        const message = `${product.title} is removed from favourites`;
        openSnackBar(message, product.id, "removefromfavourites");
      }
    } else {
      setSignIn(true);
    }
  };

  const quantityChangedHandler = (event) => {
    if (parseInt(event.target.value, 10) <= 0) {
      setQuantity(1);
    } else {
      setQuantity(event.target.value);
    }
  };

  if (signIn) {
    return <Redirect to="/onlineshop/signin" />;
  }

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image="https://source.unsplash.com/user/@dels/ZEpZJ2IYNBw/800*600"
          title="Image title"
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h6" component="h2">
            {product.title}
          </Typography>
          <Typography>MRP: ₹{product.mrp}/-</Typography>
          <Typography>Our Price : ₹{product.sellingprice}/-</Typography>
          <Typography>
            Discount :{" "}
            {(100 - (product.sellingprice / product.mrp) * 100).toFixed(2)} %
          </Typography>
        </CardContent>
        <CardActions className={classes.button}>
          {location.pathname !== "/onlineshop/favourites" && (
            <TextField
              id="standard-number"
              label="Quantity"
              size="small"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              value={quantity}
              className={classes.quantity}
              onChange={quantityChangedHandler}
            />
          )}
          <IconButton
            aria-label="favourite"
            color={fav ? "secondary" : "inherit"}
            onClick={favouriteClickedHandler}
          >
            {fav ? <Favourite /> : <FavouriteBorder />}
          </IconButton>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<ShoppingCartIcon />}
            size="small"
            onClick={addCartClickedHandler}
          >
            Add to cart
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductItem;

import React, { useState, Fragment } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import AccountCircle from "@material-ui/icons/AccountCircle";
import CartIcon from "@material-ui/icons/ShoppingCart";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import Favourite from "@material-ui/icons/Favorite";
import LogOutIcon from "@material-ui/icons/ExitToApp";
import { useHistory, useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { logout } from "../Store/Actions/authCreator";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    marginLeft: "1rem",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  customLink: {
    textDecoration: "none",
    color: "inherit",
  },
}));

const Navigation = ({ filterProducts }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [searchText, setSearchText] = useState("");
  const cartCount = useSelector((state) => state.cart.cartProducts.length);
  const ordersCount = useSelector((state) => state.order.orders.length);
  const userData = useSelector((state) => state.auth.userData);
  const idToken = localStorage.getItem("idToken");

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const searchChangedHandler = (event) => {
    setSearchText(event.target.value);
    filterProducts(event.target.value);
  };

  const buttonClickedHandler = (clickedButton) => {
    if (clickedButton === "cart") {
      if (location.pathname !== "/onlineshop/cart")
        history.push("/onlineshop/cart");
    } else if (clickedButton === "orders") {
      if (location.pathname !== "/onlineshop/orders")
        history.push("/onlineshop/orders");
    } else if (clickedButton === "profile") {
      if (location.pathname !== "/onlineshop/myprofile") {
        handleMenuClose();
        history.push("/onlineshop/myprofile");
      }
    } else if (clickedButton === "favourites") {
      if (location.pathname !== "/onlineshop/favourites") {
        handleMenuClose();
        history.push("/onlineshop/favourites");
      }
    }
  };

  const logoutClickedHandler = () => {
    handleMenuClose();
    dispatch(logout());
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {idToken ? (
        <div>
          <MenuItem>
            <IconButton
              aria-label="account of current user"
              color="inherit"
              onClick={() => buttonClickedHandler("profile")}
            >
              <AccountCircle />
            </IconButton>
            <p>My Profile</p>
          </MenuItem>
          <MenuItem>
            <IconButton
              aria-label="favourites of current user"
              color="inherit"
              onClick={() => buttonClickedHandler("favourites")}
            >
              <Favourite />
            </IconButton>
            <p>My Favourites</p>
          </MenuItem>
          <MenuItem>
            <IconButton
              aria-label="logout"
              color="inherit"
              onClick={logoutClickedHandler}
            >
              <LogOutIcon />
            </IconButton>
            <p>Log out</p>
          </MenuItem>
        </div>
      ) : (
        <div>
          {" "}
          <Link
            to="/onlineshop/signin"
            onClick={handleMenuClose}
            className={classes.customLink}
          >
            <MenuItem>Sign In</MenuItem>
          </Link>
          <Link
            to="/onlineshop/signup"
            onClick={handleMenuClose}
            className={classes.customLink}
          >
            <MenuItem>Sign Up</MenuItem>
          </Link>
        </div>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="cart" color="inherit">
          <Badge color="secondary">
            <CartIcon />
          </Badge>
        </IconButton>
        <p>My Cart</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="notifications" color="inherit">
          <Badge badgeContent={2} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="orders" color="inherit">
          <Badge color="secondary">
            <ShoppingBasketIcon />
          </Badge>
        </IconButton>
        <p>My Orders</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/" className={classes.customLink}>
            <Typography className={classes.title} variant="h5" noWrap>
              Online Shop
            </Typography>
          </Link>
          {location.pathname !== "/onlineshop/cart" && (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>

              <InputBase
                placeholder="Search products"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                value={searchText}
                inputProps={{ "aria-label": "search" }}
                onChange={searchChangedHandler}
              />
            </div>
          )}
          <Typography className={classes.title} variant="h5" noWrap>
            {idToken && userData
              ? `Welcome, ${userData.firstname} ${userData.lastname}`
              : "Welcome, Guest..Please SignIn"}
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={2} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            {idToken ? (
              <div>
                <IconButton
                  aria-label="orders"
                  color="inherit"
                  onClick={() => buttonClickedHandler("orders")}
                >
                  <Badge color="secondary" badgeContent={ordersCount}>
                    <ShoppingBasketIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  aria-label="cart"
                  color="inherit"
                  onClick={() => buttonClickedHandler("cart")}
                >
                  <Badge color="secondary" badgeContent={cartCount}>
                    <CartIcon />
                  </Badge>
                </IconButton>
              </div>
            ) : null}
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

export default Navigation;

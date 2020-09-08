import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { Button } from "@material-ui/core";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    backgroundColor: theme.palette.background.paper,
    justifyContent: "center",
    alignContent: "space-around",
  },
  button: {
    width: "100%",
  },
  customLink: {
    textDecoration: "none",
    color: "#fff",
    width: "100%",
  },
  customLinkBlack: {
    textDecoration: "none",
    color: "#000",
    width: "100%",
  },
}));

const Categories = () => {
  const classes = useStyles();
  const location = useLocation();
  const path = location.pathname;

  return (
    <List component="nav" className={classes.root} aria-label="mailbox folders">
      <ListItem button>
        <Link
          to="/"
          className={
            path === "/" ? classes.customLink : classes.customLinkBlack
          }
        >
          <Button
            variant={path === "/" ? "contained" : "outlined"}
            className={classes.button}
            color="primary"
          >
            All Products
          </Button>
        </Link>
      </ListItem>

      <ListItem button>
        <Link
          to="/onlineshop/groceries"
          className={
            path === "/onlineshop/groceries"
              ? classes.customLink
              : classes.customLinkBlack
          }
        >
          <Button
            variant={
              path === "/onlineshop/groceries" ? "contained" : "outlined"
            }
            className={classes.button}
            color="primary"
          >
            Groceries
          </Button>
        </Link>
      </ListItem>
      <ListItem button>
        <Link
          to="/onlineshop/electronics"
          className={
            path === "/onlineshop/electronics"
              ? classes.customLink
              : classes.customLinkBlack
          }
        >
          <Button
            variant={
              path === "/onlineshop/electronics" ? "contained" : "outlined"
            }
            className={classes.button}
            color="primary"
          >
            Electronics
          </Button>
        </Link>
      </ListItem>

      <ListItem button>
        <Link
          to="/onlineshop/soapsanddetergents"
          className={
            path === "/onlineshop/soapsanddetergents"
              ? classes.customLink
              : classes.customLinkBlack
          }
        >
          <Button
            variant={
              path === "/onlineshop/soapsanddetergents"
                ? "contained"
                : "outlined"
            }
            className={classes.button}
            color="primary"
          >
            Soaps And Detergents
          </Button>
        </Link>
      </ListItem>
    </List>
  );
};

export default Categories;

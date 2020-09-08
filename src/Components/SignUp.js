import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link, Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Container from "@material-ui/core/Container";

import Image from "../Images/signinImage.jpg";
import Copyright from "./Copyright";
import { signupUser } from "../Store/Actions/authCreator";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundImage: `url(${Image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
  },
  innerpaper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paper: {
    marginTop: theme.spacing(0),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  customLink: {
    textDecoration: "none",
    color: "secondary",
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  //redux state
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const authInfo = useSelector((state) => state.auth.authInfo);
  //component level state
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [err, setErr] = useState(null);
  //local storage value
  const idToken = localStorage.getItem("idToken");
  useEffect(() => {
    if (error) {
      if (error.response.data.error.message === "EMAIL_EXISTS") {
        setErr("Email already exists ! Try to SignIn.");
      }
    }
  }, [error]);

  const inputChangedHandler = (event, field) => {
    const value = event.target.value;
    setErr(null);
    if (field === "firstname") {
      setFirstname(value);
    } else if (field === "lastname") {
      setLastname(value);
    } else if (field === "email") {
      setEmail(value);
    } else if (field === "password") {
      setPassword(value);
    } else if (field === "newsletter") {
      setNewsletter((prevState) => !prevState);
    }
  };

  const submitClickedHandler = () => {
    if (
      firstname === "" ||
      lastname === "" ||
      email === "" ||
      password === ""
    ) {
      setErr("Please fill all mandatory fields !");
    } else {
      const userDetails = {
        firstname,
        lastname,
        email,
        password,
        newsletter,
      };
      dispatch(signupUser(userDetails));
    }
  };

  if (authInfo || idToken) {
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.container}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <div className={classes.innerpaper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={(event) =>
                      inputChangedHandler(event, "firstname")
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    onChange={(event) => inputChangedHandler(event, "lastname")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(event) => inputChangedHandler(event, "email")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(event) => inputChangedHandler(event, "password")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="allowExtraEmails"
                        color="primary"
                        onChange={(event) =>
                          inputChangedHandler(event, "newsletter")
                        }
                      />
                    }
                    label="I want to receive mails about offers and promotions."
                  />
                </Grid>
              </Grid>
              {error || err ? (
                <Typography color="secondary">{err}</Typography>
              ) : null}
              {loading ? (
                <CircularProgress />
              ) : (
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={submitClickedHandler}
                >
                  Sign Up
                </Button>
              )}
              <Grid container justify="flex-end">
                <Grid item>
                  <Link to="/onlineshop/signin" className={classes.customLink}>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
};

export default SignUp;

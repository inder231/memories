import React, { useEffect, useState } from "react";
import * as types from "../../redux/Authreducer/actionTypes";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import Icon from "./icon";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router-dom";

import useStyles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";
import { useDispatch, useSelector } from "react-redux";
import { signin, signup } from "../../redux/Authreducer/auth";
const initState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initState);

  // ================ FORM CHANGE HANDLES =====================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // ============= FORM SUBMIT =============================
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      // signup user
      dispatch(signup(formData,navigate));
    } else {
      // sign in user
      dispatch(signin(formData,navigate));
    }
  };

  // ============= TOOGLE PASSWORD VISIBILITY ========================
  const handleShowPassword = (e) => {
    setShowPassword((showPassword) => !showPassword);
  };
  // ========== SWITCH SIGN IN <==> SIGN UP =================
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    handleShowPassword();
  };
  // =========== GOOGLE SUCCESS RESPONSE ====================
  const responseGoogleSuccess = async (res) => {
    dispatch({ type: types.GOOGLE_SIGNIN_REQUEST });
    const result = res.profileObj;
    const token = res.tokenId;
    navigate("/");
    try {
      dispatch({
        type: types.GOOGLE_SIGNIN_SUCCESS,
        payload: { result, token },
      });
    } catch (error) {
      dispatch({ type: types.GOOGLE_SIGNIN_FAILURE });
    }
  };
  // ========== GOOGLE FAILURE RESPONSE ==================
  const responseGoogleError = async (err) => {
    console.log(err);
  };
  // ======================================================

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID });
    });
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus={true}
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign UP" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={responseGoogleSuccess}
            onFailure={responseGoogleError}
            cookiePolicy={"single_host_origin"}
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account Sign In"
                  : "Don't have an account Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;

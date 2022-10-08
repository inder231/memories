import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Avatar, Toolbar, Typography, Button } from "@material-ui/core";
import useStyles from "./styles";
import memories from "../../images/memories.png";
import { getFromLocalStorage } from "../../utils/localstorage";
import { useDispatch } from "react-redux";
import { GOOGLE_LOGOUT_SUCCESS } from "../../redux/Authreducer/actionTypes";
import { useNavigate,useLocation } from "react-router-dom";
import decode from "jwt-decode";

const Navbar = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [user, setUser] = useState(getFromLocalStorage("profile"));
  const logout = () => {
    dispatch({ type: GOOGLE_LOGOUT_SUCCESS });
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    const token = user?.tokenId;
    // JWT -- verification --
    if(token){
      const decodedToken = decode(token);
      if(decodedToken.exp*1000<new Date().getTime()) logout();
    }
    setUser(getFromLocalStorage("profile"));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" variant="h4" align="center">
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt="memories"
          height="60"
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result?.name}
              src={user.result?.imageUrl}
            >
              {user?.result?.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result?.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              LogOut
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            SignIn
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

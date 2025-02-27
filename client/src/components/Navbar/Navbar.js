
import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import { Link } from "react-router-dom";

import RightMenu from "./RightMenu/RightMenu";
// import logo from "../../images/";
import useStyles from "./styles";

const Navbar = () => {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <AppBar className={classes.appBar} position="static" color="inherit" elevation={0} width="100%">
      {user ? (
        <Link to="/home" className={classes.brandContainer}>
          {/* <img className={classes.image} src={logo} alt="icon" /> */}
          <p className={classes.title}>H.O.P.E</p>
        </Link>
      ) : (
        <Link to="/" className={classes.brandContainer}>
          {/* <img className={classes.image} src={logo} alt="icon" /> */}
          <p className={classes.title}>H.O.P.E</p>
        </Link>
      )}
      <Toolbar className={classes.toolbar} variant="dense">
        <RightMenu />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

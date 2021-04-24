import { useState, Fragment } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Drawer,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import MobileNavDrawer from "./MobileNavDrawer";

import logo_heart from '../assets/images/logo_heart.png'

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#ffffff',
    boxShadow: 'none',
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-between",


    "& a": {
      textDecoration: "none",
      color: "blue",
    },
  },
  authLinks: {
    "& button": {
      fontWeight: 600,

      "&:hover": {
        textDecoration: "underline",
      },
    },
    "& a": {
      textDecoration: "none",
      color: "white",
      margin: "0 0.5rem",
    },
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  burgerNav: {
    [theme.breakpoints.down("xs")]: {
      display: "flex",
    },
  },
  logoText: {
    marginLeft: 10,
    color: '#494b4b',
    fontWeight: 900,
    '& span': {
      color: '#0092b8'
    }
  },
  logoH6: {
    display: 'flex',
  }
}));

const Navbar = () => {
  const [drawerToggle, setDrawerToggle] = useState(false);
  const classes = useStyles();

  return (
    <Fragment>
      <Drawer
        anchor="right"
        open={drawerToggle}
        onClose={() => setDrawerToggle(false)}
      >
        <MobileNavDrawer setDrawerToggle={setDrawerToggle} />
      </Drawer>

      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <Link to="/">
            <Typography variant="h6" className={classes.logoH6}>
              <img alt="Housecall MD" style={{height: 30}} src={logo_heart} /><strong className={classes.logoText}>HouseCall<span>MD</span></strong>
            </Typography>
          </Link>

          <Box className={classes.authLinks}>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
            <Link to="/sign-up">
              <Button>Sign Up</Button>
            </Link>
          </Box>

          <Box display="none" className={classes.burgerNav}>
            <IconButton
              edge="start"
              // color="inherit"
              onClick={() => setDrawerToggle(!drawerToggle)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export default Navbar;

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

const useStyles = makeStyles((theme) => ({
  toolBar: {
    display: "flex",
    justifyContent: "space-between",
  },
  navLinks: {
    "& button": {
      fontWeight: 600,

      "&:hover": {
        textDecoration: "underline",
      },
    },
    "& a": {
      textDecoration: "none",
      color: "white",
      margin: "0 1rem",
    },
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  authLinks: {
    "& a": {
      margin: "0 0.5rem",
    },
  },
  burgerNav: {
    [theme.breakpoints.down("xs")]: {
      display: "flex",
    },
  },
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

      <AppBar position="static">
        <Toolbar className={classes.toolBar}>
          <Typography variant="h6">
            <strong>House Call MD</strong>
          </Typography>

          <Box display="flex" className={classes.navLinks}>
            <Box mr="2em">
              <Link to="/">
                <Button color="inherit">Home</Button>
              </Link>
              <Link to="/pharmacy">
                <Button color="inherit">Pharmacy</Button>
              </Link>
              <Link to="/visit-choice">
                <Button color="inherit">Visit Choice</Button>
              </Link>
            </Box>
            <Box className={classes.authLinks}>
              <Link to="/login">
                <Button color="inherit">Login</Button>
              </Link>
              <Link to="/sign-up">
                <Button color="inherit">Sign Up</Button>
              </Link>
            </Box>
          </Box>

          <Box display="none" className={classes.burgerNav}>
            <IconButton
              edge="start"
              color="inherit"
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

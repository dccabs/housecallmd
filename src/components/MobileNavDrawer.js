import { useState, useEffect, Fragment } from "react";
import { Box, List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  navLinks: {
    "& a": {
      textDecoration: "none",
      color: theme.palette.primary.main,
      fontWeight: "600",
    },
  },
  ".MuiListItem-gutters": {
    padding: "2em",
  },
}));

const MobileNavDrawer = ({ setDrawerToggle }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const classes = useStyles();

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  useEffect(() => {
    if (screenWidth >= 768) setDrawerToggle(false);
  }, [screenWidth, setDrawerToggle]);

  const handleWindowResize = () => {
    setScreenWidth(window.innerWidth);
  };

  return (
    <Fragment>
      <Box
        onClick={() => setDrawerToggle(false)}
        onKeyDown={() => setDrawerToggle(false)}
        minWidth="12rem"
      >
        <List className={classes.navLinks}>
          <Box mb="1em">
            <Link to="/">
              <ListItem button>Home</ListItem>
            </Link>
            <Link to="/pharmacy">
              <ListItem button>Pharmacy</ListItem>
            </Link>
            <Link to="/visit-choice">
              <ListItem button>Visit Choice</ListItem>
            </Link>
          </Box>
          <Box className={classes.authLinks}>
            <Link to="/login">
              <ListItem button>Login</ListItem>
            </Link>
            <Link to="/sign-up">
              <ListItem button>Sign Up</ListItem>
            </Link>
          </Box>
        </List>
      </Box>
    </Fragment>
  );
};

export default MobileNavDrawer;

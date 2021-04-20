import { AppBar, Toolbar, Typography, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  toolBar: {
    display: "flex",
    justifyContent: "space-between",
  },
  navLinks: {
    "& button": {
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: "50px",
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
  },
  authLinks: {
    "& a": {
      margin: "0 0.5rem",
    },
  },
}));

const Navbar = () => {
  const classes = useStyles();

  return (
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
            <Link to="/insurance">
              <Button color="inherit">Insurance</Button>
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
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

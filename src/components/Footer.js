import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    padding: "2em",

    "& a": {
      fontWeight: 600,
      textDecoration: "none",
      color: "#fff",
      margin: "0 2rem",
    },
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root} display="flex" justifyContent="center">
      <Link to="/contact">
        <Typography>Contact</Typography>
      </Link>
      <Link to="/login">
        <Typography>Login</Typography>
      </Link>
      <Link to="/sign-up">
        <Typography>Sign Up</Typography>
      </Link>
    </Box>
  );
};

export default Footer;

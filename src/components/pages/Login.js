import { Typography, Box, Button, TextField } from "@material-ui/core";
import Container from "../Container";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  textFields: {
    width: "100%",
    marginTop: "2em",
    maxWidth: "34rem",
  },
  buttonLinks: {
    "@media screen and (max-width: 700px)": {
      "&:nth-child(2)": {
        order: -1,
      },
    },

    "& button": {
      padding: "1em",
      fontWeight: 600,
      width: "16rem",

      "&:hover": {
        backgroundColor: theme.palette.primary.main,
      },
    },
    "& a": {
      textDecoration: "none",
    },
  },
}));

const Login = () => {
  const classes = useStyles();

  return (
    <Container>
      <Box p="1em">
        <Typography variant="h2">Login</Typography>
        <Container>
          <form action="/">
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              width="100%"
            >
              <TextField
                className={classes.textFields}
                type="email"
                label="Email"
                variant="outlined"
                color="secondary"
                required
              />
              <TextField
                className={classes.textFields}
                type="password"
                label="Password"
                variant="outlined"
                color="secondary"
                required
              />
            </Box>
            <Box
              mt="2em"
              display="flex"
              justifyContent="center"
              flexWrap="wrap"
            >
              <Box m="1em" className={classes.buttonLinks}>
                <Link to="#">
                  <Button color="secondary" variant="contained" size="large">
                    Forgot Password
                  </Button>
                </Link>
              </Box>
              <Box m="1em" className={classes.buttonLinks}>
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  size="large"
                >
                  Login
                </Button>
              </Box>
            </Box>
          </form>
        </Container>
      </Box>
    </Container>
  );
};

export default Login;

import { Typography, Box, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textFields: {
    width: "100%",
    marginTop: "2em",
    maxWidth: "34rem",
  },
  nameFields: {
    marginTop: "2em",
    width: "100%",

    "& div": {
      width: "100%",
      maxWidth: "16rem",

      "@media screen and (max-width: 680px)": {
        maxWidth: "100%",
      },
    },
  },
  nameField1: {
    margin: "1rem 1rem 1rem 0",

    "@media screen and (max-width: 680px)": {
      width: "100%",
      margin: "1rem 0",
    },
  },
  nameField2: {
    margin: "1rem 0 1rem 1rem",

    "@media screen and (max-width: 680px)": {
      width: "100%",
      margin: "1rem 0",
    },
  },
  buttonLinks: {
    "& button": {
      padding: "1em",
      fontWeight: 600,
      width: "16rem",

      "&:hover": {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
}));

const SignUp = () => {
  const classes = useStyles();

  return (
    <Box p="4em">
      <Typography variant="h2">Sign Up</Typography>
      <form action="/">
        <Box
          mt="4em"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            mt="1em"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            width="100%"
          >
            <Box
              className={classes.nameFields}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexWrap="wrap"
            >
              <Box className={classes.nameField1}>
                <TextField
                  type="text"
                  label="First Name"
                  variant="outlined"
                  color="secondary"
                  required
                />
              </Box>
              <Box className={classes.nameField2}>
                <TextField
                  type="text"
                  label="Last Name"
                  variant="outlined"
                  color="secondary"
                  required
                />
              </Box>
            </Box>
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
            <TextField
              className={classes.textFields}
              type="password"
              label="Confirm Password"
              variant="outlined"
              color="secondary"
              required
            />
          </Box>
          <Box mt="3em">
            <Box m="1em" className={classes.buttonLinks}>
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                size="large"
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default SignUp;

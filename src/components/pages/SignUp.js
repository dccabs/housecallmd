import { Typography, Box, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textFields: {
    marginTop: "2em",
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
    <Box p="1em">
      <Typography variant="h2">Sign Up</Typography>
      <form action="/" style={{width: '100%'}}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <TextField
            className={classes.textFields}
            fullWidth
            type="text"
            label="First Name"
            variant="outlined"
            color="secondary"
            required
          />
          <TextField
            className={classes.textFields}
            fullWidth
            type="text"
            label="Last Name"
            variant="outlined"
            color="secondary"
            required
          />
          <TextField
            className={classes.textFields}
            fullWidth
            type="email"
            label="Email"
            variant="outlined"
            color="secondary"
            required
          />
          <TextField
            className={classes.textFields}
            fullWidth
            type="password"
            label="Password"
            variant="outlined"
            color="secondary"
            required
          />
          <TextField
            fullWidth
            className={classes.textFields}
            type="password"
            label="Confirm Password"
            variant="outlined"
            color="secondary"
            required
          />
        </Box>
        <Box mt="2em" display="flex" justifyContent="center" flexWrap="wrap">
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
          <Box m="1em" className={classes.buttonLinks}>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              size="large"
            >
              Back
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default SignUp;

import { Typography, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  buttonLinks: {
    "& button": {
      padding: "1em",
      margin: "1em",
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

const Insurance = () => {
  const classes = useStyles();

  return (
    <Box p="4em">
      <Typography variant="h2">Insurance</Typography>
      <Box
        mt="8em"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h4">Do you have insurance?</Typography>
        <Box
          className={classes.buttonLinks}
          mt="3em"
          display="flex"
          justifyContent="center"
          flexWrap="wrap"
        >
          <Link to="/insurance/choose-provider">
            <Button color="secondary" variant="contained" size="large">
              Yes
            </Button>
          </Link>
          <Link to="/sign-up">
            <Button color="secondary" variant="contained" size="large">
              No
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Insurance;

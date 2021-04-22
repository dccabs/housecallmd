import { Typography, Box, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  textFields: {
    width: "100%",
    marginTop: "2em",
    maxWidth: "34rem",
  },
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

      "@media screen and (max-width: 700px)": {
        "&:nth-child(2)": {
          order: -1,
        },
      },
    },
  },
}));

const CardInformation = () => {
  const classes = useStyles();

  return (
    <Box p="4em">
      <Typography variant="h2">Insurance</Typography>
      <form action="/sign-up">
        <Box
          mt="8em"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h4">
            Please fill out your insurance card information
          </Typography>
          <Box
            mt="1em"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            width="100%"
          >
            <TextField
              className={classes.textFields}
              label="Plan number"
              variant="outlined"
              color="secondary"
              required
            />
            <TextField
              className={classes.textFields}
              label="Group number"
              variant="outlined"
              color="secondary"
              required
            />
          </Box>
          <Box
            className={classes.buttonLinks}
            mt="3em"
            display="flex"
            justifyContent="center"
            flexWrap="wrap"
          >
            <Link to="/insurance/choose-provider">
              <Button color="secondary" variant="contained" size="large">
                Back
              </Button>
            </Link>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              size="large"
            >
              Continue
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default CardInformation;

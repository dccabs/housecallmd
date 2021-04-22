import { useRef } from "react";
import { Typography, Box, Button, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
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

      "@media screen and (max-width: 700px)": {
        "&:nth-child(2)": {
          order: -1,
        },
      },
    },
  },
}));

const ChooseProvider = () => {
  const fieldInput = useRef(null);
  const classes = useStyles();

  const checkInput = () => {
    console.log(fieldInput.current.value);
  };

  return (
    <Box p="4em">
      <Typography variant="h2">Insurance</Typography>
      <form action="/insurance/card-information">
        <Box
          mt="8em"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h4">Please choose your provider</Typography>
          <Box
            mt="1em"
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Autocomplete
              freeSolo
              disableClearable
              options={["Blue Cross Blue Shielf", "Cigna", "Athena"]}
              style={{ width: "100%", maxWidth: "34rem" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Type to select provider"
                  margin="normal"
                  color="secondary"
                  variant="outlined"
                  inputRef={fieldInput}
                  InputProps={{ ...params.InputProps, type: "search" }}
                  required
                />
              )}
            />
          </Box>
          <Box
            className={classes.buttonLinks}
            mt="1em"
            display="flex"
            justifyContent="center"
            flexWrap="wrap"
            width="100%"
          >
            <Link to="/insurance">
              <Button color="secondary" variant="contained" size="large">
                Back
              </Button>
            </Link>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              size="large"
              onClick={checkInput}
            >
              Continue
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default ChooseProvider;

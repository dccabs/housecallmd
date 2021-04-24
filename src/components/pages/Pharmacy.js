import { Typography, Box, Button, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
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

const Pharmacy = () => {
  const classes = useStyles();

  return (
    <Box p="1em">
      <Typography variant="h2">Pharmacy</Typography>
      <form action="/visit-choice">
        <Box
          mt="2em"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h4">
            Please tell us what pharmacy you use
          </Typography>
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
              options={["Wallgreens 1011 Blue bonnet lane, Austin, TX 78704"]}
              style={{ width: "100%", maxWidth: "34rem" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Type pharmacy name here"
                  margin="normal"
                  color="secondary"
                  variant="outlined"
                  InputProps={{ ...params.InputProps, type: "search" }}
                  required
                />
              )}
            />
          </Box>
          <Box
            mt="1em"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
            width="100%"
          >
            <Box m="1em" className={classes.buttonLinks}>
              <Link to="/sign-up">
                <Button color="secondary" variant="contained" size="large">
                  Back
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
                Continue
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default Pharmacy;

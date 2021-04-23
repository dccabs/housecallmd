import { useState } from "react";
import {
  Typography,
  Box,
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from "@material-ui/core";
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

const VisitChoice = () => {
  const [value, setValue] = useState("Video/Telemedicine Visit");
  const classes = useStyles();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box p="4em">
      <Typography variant="h2">Visit Choice</Typography>
      <form action="/">
        <Box
          mt="8em"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h4">
            What type of visit would you like?
          </Typography>
          <Box
            mt="1em"
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <FormControl component="fieldset">
              <RadioGroup name="visit" value={value} onChange={handleChange}>
                <FormControlLabel
                  value="Video/Telemedicine Visit"
                  control={<Radio />}
                  label="Video/Telemedicine Visit"
                />
                <FormControlLabel
                  value="Phone Visit"
                  control={<Radio />}
                  label="Phone Visit"
                />
                <FormControlLabel
                  value="Housecall (In person visit at home)"
                  control={<Radio />}
                  label="Housecall (In person visit at home)"
                />
              </RadioGroup>
            </FormControl>
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
              <Link to="/pharmacy">
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

export default VisitChoice;

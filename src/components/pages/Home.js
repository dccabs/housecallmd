import { Box, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import banner from "../../assets/images/banner.jpg";

const useStyles = makeStyles((theme) => ({
  image: {
    maxHeight: "30rem",
    maxWidth: "100%",
  },
  textBody: {
    maxWidth: "60rem",
  },
  ctaButton: {
    fontSize: 24,
    width: "100%",

    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  linkButton: {
    textDecoration: "none",
  },
  divRight: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <>
      <Box>
        <img src={`${banner}`} alt="banner" className={classes.image} />
        <Box mt="2em" display="flex" justifyContent="center">
          <Box width="75%">
            <Link to="/insurance" className={classes.linkButton}>
              <Button
                className={classes.ctaButton}
                color="secondary"
                variant="contained"
              >
                Get Started
              </Button>
            </Link>
          </Box>
        </Box>
        <Box mt="2em">
          <Typography className={classes.textBody}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. In quidem
            aut accusamus ab? Enim perferendis quidem suscipit vitae tempora
            velit, reprehenderit laborum molestiae itaque culpa numquam dicta
            incidunt hic adipisci distinctio molestias ipsa modi cum error eum
            voluptatem odit ut? Fuga, excepturi.
            <br />
            <br /> Amet nisi debitis rerum recusandae. Dolorum, id quo dolore
            blanditiis aliquid sed esse excepturi voluptatem culpa qui sequi
            reprehenderit consectetur! Eos, delectus deleniti architecto
            officiis iure vel voluptatum blanditiis illum ipsam.
          </Typography>
        </Box>
      </Box>
      <Box mx="4em" className={classes.divRight}>
        <Link to="/insurance" className={classes.linkButton}>
          <Button
            className={classes.ctaButton}
            color="secondary"
            variant="contained"
          >
            Get Started
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default Home;

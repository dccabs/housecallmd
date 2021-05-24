import { Fragment } from 'react'
import { Box, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'

import ContactSection from '../components/ContactSection'
import Reviews from '../components/Reviews'

const useStyles = makeStyles((theme) => ({
  image: {
    maxHeight: '30rem',
    maxWidth: '100%',
  },
  textBody: {
    maxWidth: '60rem',
  },
  ctaButton: {
    width: '100%',
  },
  linkButton: {
    textDecoration: 'none',
  },
  divRight: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  backgroundContainer: {
    padding: '2em 1em',
    maxWidth: 1200,
    margin: 'auto',
    // backgroundImage: `url('/media/banner_phone.png')`,
    // backgroundPosition: 'top center',
    // backgroundAttachment: 'cover',
    // backgroundRepeat: 'no-repeat',
    color: '#000',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    // [theme.breakpoints.up('sm')]: {
    //   backgroundImage: `url('/media/banner.jpg')`,
    //   backgroundPosition: 'center center',
    //   alignItems: 'flex-start',
    //   padding: '20em 6em',
    //   color: theme.typography.color,
    // },
  },
  h4: {
    fontSize: '2.5em',
    fontWeight: 900,
    lineHeight: '1.5em',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '40rem',
    },
  },
  mainHeading: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: '40vw',
    },
  },
  content: {
    padding: '2em',
    background: '#e1215b',
    color: '#fff',

    [theme.breakpoints.up('sm')]: {
      padding: '6em',
    },
  },
  reviews: {
    [theme.breakpoints.up('sm')]: {
      padding: '6em',
    },
  },
}))

const Home = () => {
  const classes = useStyles()

  return (
    <Fragment>
      <Box p="1em" className={classes.backgroundContainer}>
        <Box className={classes.mainHeading}>
          <Typography className={classes.h4}>
            Schedule a housecall or telemedicine visit in minutes.
          </Typography>
        </Box>
        <Box mt="2em" display="flex" justifyContent="center">
          <Link href="/insurance" className={classes.linkButton}>
            <Button
              color="secondary"
              variant="contained"
              size="large"
              fullWidth
            >
              Get Started
            </Button>
          </Link>
        </Box>
      </Box>
      <Box p="1em" className={classes.content}>
        <Box mt="1em">
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
            
      <Box
        p="1em"
        className={classes.reviews}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box mb="2em">
          <Typography variant="h2">Reviews</Typography>
        </Box>
        <Reviews />
      </Box>

      <ContactSection />
    </Fragment>
  )
}

export default Home

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
  linkWhite: {
    color: 'white',
    fontWeight: 'bold',
  }
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
            Our team of experienced and qualified care professionals specializes in providing urgent care in Kitsap County, Washington for our patients, whether you are at home or in your office.
            <br /><br />
            Wherever you may be, whatever time of day or night it is, whichever ailment you may be suffering from, we will take care of your healthcare needs.
              <br /><br />
            <Link href="/insurance" className={classes.linkWhite}>Contact us today</Link> if you need mobile urgent care services.
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

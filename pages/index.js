import { Fragment } from 'react'
import useStore from '../zustand/store'
import { Box, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'

import Container from '../components/Container'
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
  linkButtons: {
    '& button': {
      margin: '0.5em 0',
      alignItems: 'center'
    },
  },
  divRight: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  backgroundContainer: {
    maxWidth: 1200,
    margin: 'auto',
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
  h2: {
    lineHeight: '1.5em',
    marginTop: 0,

    [theme.breakpoints.up('sm')]: {
      maxWidth: '50rem',
    },
  },
  mainHeading: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: '60vw',
    },
  },
  content: {
    padding: '2em',
    background: '#e1215b',
    color: '#fff',

    '& a': {
      color: 'white',
      fontWeight: 'bold',
    },

    [theme.breakpoints.up('sm')]: {
      padding: '6em',
    },
  },
  reviews: {
    [theme.breakpoints.up('sm')]: {
      padding: '6em',
    },
  },
  reviewH2: {
    marginTop: '.5em',
  }
}))

const Home = () => {
  const { isAuthenticated } = useStore()
  const classes = useStyles()

  return (
    <Fragment>
      <Container>
        <Box className={classes.mainHeading}>
          <Typography className={classes.h2} variant="h2">
            Schedule a housecall or telemedicine visit in minutes
          </Typography>
        </Box>
        <Box
          className={classes.linkButtons}
          mt="1em"
          display="flex"
          flexDirection="column"
          alignitems="center"
        >
          <Link href={isAuthenticated ? '/visit-choice' : '/insurance'}>
            <Button
              color="secondary"
              variant="contained"
              size="large"
            >
              Get Started
            </Button>
          </Link>
          {!isAuthenticated && (
            <Link href="/login">
              <Button
                color="secondary"
                variant="outlined"
                size="large"
              >
                Login
              </Button>
            </Link>
          )}
        </Box>
      </Container>
      <Box mt="1em" className={classes.content}>
          <Typography className={classes.textBody}>
            Our team of experienced and qualified care professionals specializes
            in providing urgent care in Kitsap County, Washington for our
            patients, whether you are at home or in your office.
            <br />
            <br />
            Wherever you may be, whatever time of day or night it is, whichever
            ailment you may be suffering from, we will take care of your
            healthcare needs.
            <br />
            <br />
            <Link href="/insurance">
              <a>Contact us today</a>
            </Link>{' '}
            if you need mobile urgent care services.
          </Typography>
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
          <Typography variant="h2" className={classes.reviewh2}>Reviews</Typography>
        </Box>
        <Reviews />
      </Box>

      <ContactSection />
    </Fragment>
  )
}

export default Home

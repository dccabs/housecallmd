import { Fragment } from 'react'
import useStore from '../zustand/store'
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
  linkButtons: {
    '& button': {
      margin: '0.5em 0',
      alignItems: 'center',
    },
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      '& button': {
        marginRight: '1em',
        minWidth: 150,
      },
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
  },
  h2: {
    lineHeight: '1.5em',
    marginTop: 0,
    fontWeight: 900,

    [theme.breakpoints.up('sm')]: {
      lineHeight: '1.2em',
      fontSize: '3.7em',
    },
  },
  mainHeading: {
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
      padding: '1em 0 5em',
    },
  },
  reviews: {
    backgroundColor: 'rgb(247, 249, 252)',
  },
  reviewH2: {
    margin: '.5em 0',
    fontSize: '2em,'
  },
  contentH2: {
    margin: '.5em 0',
    fontSize: '2em,',
    color: '#ffffff',
  },
  container: {
    padding: '1em',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      margin: '6em auto',
      padding: '0 6em',
      maxWidth: 1200,
    },
  },
  mainHeadingContainer: {
    [theme.breakpoints.up('sm')]: {
      width: '50%',
    },
  },
  imageContainer: {
    marginTop: '1em',
    [theme.breakpoints.up('sm')]: {
      marginTop: 0,
    },
  },
  contentInner: {
    [theme.breakpoints.up('sm')]: {
      margin: 'auto',
      maxWidth: 1200,
      width: '100%',
      padding: '0 6em',
    },
  },
  reviewsInner: {
    [theme.breakpoints.up('sm')]: {
      margin: 'auto',
      padding: '0 6em',
      maxWidth: 1200,
      width: '100%',
    },
  },
  reviewsContainer: {
    marginTop: '1.5em'
  },
  textBody: {
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.4em'
    },
  }
}))

const Home = () => {
  const { isAuthenticated } = useStore()
  const classes = useStyles()

  return (
    <div className={classes.pageContainer}>
      <div className={classes.container}>
        <div className={classes.mainHeadingContainer}>
          <Box className={classes.mainHeading} fontWeight="fontWeightBold">
            <Typography className={classes.h2} variant="h2">
              Housecall,<br />
              <span style={{color: '#e1215b'}}>ALWAYS ON-CALL</span>
            </Typography>

            <p style={{color: 'rgb(100, 110, 115)', fontSize: '1.25em', margin: '1.3em 0', fontWeight: 300}}>
              There is always a care professional from our team who will answer your call. Discover what our team can do for you and your loved ones.
            </p>
          </Box>
          <Box
            className={classes.linkButtons}
            mt="1em"
            display="flex"
            flexDirection="column"
            alignitems="center"
          >
            <Link href={isAuthenticated ? '/returning-user' : '/terms'}>
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
        </div>
        <div className={classes.imageContainer}>
          <img
            className={classes.doctor}
            src="/media/hospital_bed.png"
            width="100%"
            height="100%"
          />
        </div>
      </div>
      <Box mt="1em" className={classes.content}>
        <div className={classes.contentInner}>
          <Typography variant="h2" className={classes.reviewh2}
                      classes={{
                        root: classes.contentH2,
                      }}
          >What we do</Typography>
          <Typography classes={{root: classes.textBody}}>
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
            <Link href="/contact">
              <a>Contact us today</a>
            </Link>{' '}
            if you need mobile urgent care services.
          </Typography>
        </div>
      </Box>

      <Box
        p="1em"
        className={classes.reviews}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box mb="2em" className={classes.reviewsInner}>
          <Typography variant="h2" className={classes.reviewh2}
            classes={{
              root: classes.reviewH2,
            }}
          >Reviews</Typography>

          <div className={classes.reviewsContainer}>
            <Reviews />
          </div>
        </Box>
      </Box>

      <ContactSection />
    </div>
  )
}

export default Home

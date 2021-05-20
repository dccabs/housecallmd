import { Fragment } from 'react'
import { Box, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import { useAuth0 } from '@auth0/auth0-react'

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
    backgroundImage: `url('/media/banner_phone.png')`,
    backgroundPosition: 'top center',
    backgroundAttachment: 'cover',
    backgroundRepeat: 'no-repeat',
    height: 350,
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    [theme.breakpoints.up('sm')]: {
      backgroundImage: `url('/media/banner.jpg')`,
      backgroundPosition: 'center center',
      alignItems: 'flex-start',
      padding: '20em 6em',
      color: theme.typography.color,
    },
  },
  h4: {
    textAlign: 'center',

    [theme.breakpoints.up('sm')]: {
      maxWidth: '40rem',
      textAlign: 'left',
    },
  },
  mainHeading: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: '40vw',
    },
  },
  content: {
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
  const { isAuthenticated } = useAuth0()
  const classes = useStyles()

  return (
    <Fragment>
      <Box p="1em" className={classes.backgroundContainer}>
        <Box className={classes.mainHeading}>
          <Typography variant="h4" className={classes.h4}>
            Schedule a housecall or telemedicine visit with a healthcare
            professional in minutes.
          </Typography>
        </Box>
        <Box mt="2em" display="flex" justifyContent="center">
          <Link
            href={isAuthenticated ? '/visit-choice' : '/insurance'}
            className={classes.linkButton}
          >
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
    </Fragment>
  )
}

export default Home

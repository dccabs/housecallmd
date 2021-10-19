import { Typography, Box } from '@material-ui/core'
import Container from '../components/Container'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import Link from 'next/link'

const useStyles = makeStyles((theme) => ({
  h2: {
    marginTop: 0,
  },
  textFields: {
    width: '100%',
    marginTop: '2em',
    maxWidth: '34rem',
  },
  buttonLinks: {
    '@media screen and (max-width: 700px)': {
      '&:nth-child(2)': {
        order: -1,
      },
    },

    '& button': {
      padding: '1em',
      fontWeight: 600,
      width: '16rem',

      '&:hover': {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
  link: {
    '& a': {
      color: theme.palette.secondary.main,
      textDecoration: 'none',
    },
  },
  linkContainer: {
    fontSize: '2em',
  },
}))

const login = () => {
  const classes = useStyles()
  const router = useRouter()

  return (
    <Container>
      <Box>
        <Typography variant="h2" className={classes.h2}>
          Site Map
        </Typography>

        <div className={classes.linkContainer}>
          <h2>Static</h2>
          <Link href="/">Home</Link>
          <br />
          <Link href="/contact">Contact Us</Link>
          <br />
          <Link href="/services">Services</Link>
          <br />

          <h2>Account</h2>
          <Link href="/login">Login</Link>
          <br />
          <Link href="/forgot-password">Forgot Password</Link>
          <br />

          <h2>Insurance Flow</h2>
          <Link href="/insurance">
            Insurance Start Page (Will you be Using Insurance)
          </Link>
          <br />

          <h3>If they answer yes</h3>
          <Link href="/insurance/choose-provider">Choose Provider</Link>
          <br />
          <Link href="/insurance/card-information">Enter Card Number</Link>
          <br />
          <Link href="/insurance/enter-profile-information">
            Enter Profile Information
          </Link>
          <br />
          <Link href="/insurance/enter-login-information">
            Enter Login Email/Password Information
          </Link>
          <br />
          <Link href="/insurance/visit-choice">Visit Choice</Link>
          <br />
          <Link href="/insurance/payment">Payment</Link>
          <br />
          <Link href="/thank-you">Thank You Page (Confirmation)</Link>
          <br />

          <h3>If they answer no in insurance start page</h3>
          <Link href="/insurance/enter-profile-information">
            Enter Profile Information
          </Link>
          <br />
          <Link href="/insurance/enter-login-information">
            Enter Login Email/Password Information
          </Link>
          <br />
          <Link href="/insurance/visit-choice">Visit Choice</Link>
          <br />
          <Link href="/insurance/payment">Payment</Link>
          <br />
          <Link href="/thank-you">Thank You Page (Confirmation)</Link>
          <br />

          <h3>
            User administration (must be logged in and designated as an admin)
          </h3>
          <Link href="/user-admin">User admin page</Link>
          <br />
        </div>
      </Box>
    </Container>
  )
}

export default login

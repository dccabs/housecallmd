import { useState } from 'react'
import { Typography, Box, Button, TextField } from '@material-ui/core'
import Container from '../components/Container'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { supabase } from '../utils/initSupabase'
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
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
}))

const login = () => {
  const [password, setPassword] = useState('')
  const [localEmail, setLocalEmail] = useState('')
  const router = useRouter()
  const classes = useStyles()
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      email: localEmail,
      password,
    }
    supabase.auth
      .signIn(payload)
      .then((response) => {
        response.error ? alert(response.error.message) : setToken(response)
        router.push('/visit-choice');
      })
      .catch((err) => {
        alert(err.response.text)
      })
  }

  const setToken = (response) => {
    //alert('Logged in as ' + response.user.email)
    router.push('/')
  }

  const handlePasswordUpdate = (e) => {
    setPassword(e.target.value)
  }

  const handleEmailUpdate = (e) => {
    setLocalEmail(e.target.value)
  }

  return (
    <Container>
      <Box p="1em">
        <Typography variant="h2">Login</Typography>
        <Container>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <TextField
                value={localEmail}
                className={classes.textFields}
                fullWidth
                type="email"
                label="Email"
                variant="outlined"
                color="secondary"
                required
                onChange={handleEmailUpdate}
              />
              <TextField
                value={password}
                className={classes.textFields}
                fullWidth
                type="password"
                label="Password"
                variant="outlined"
                color="secondary"
                required
                onChange={handlePasswordUpdate}
              />
              <Box
                className={classes.link}
                mt="1em"
                width="100%"
                maxWidth="34rem"
              >
                <Box mt="0.5em">
                  <Typography align="right">
                    <Link href="/enter-login-information">
                      <a>Don't have an account? Click here to sign up</a>
                    </Link>
                  </Typography>
                </Box>
                <Box mt="0.5em">
                  <Typography align="right">
                    <Link href="/forgot-password">
                      <a>Forgot Password</a>
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              mt="2em"
              display="flex"
              justifyContent="center"
              flexWrap="wrap"
            >
              <Box m="1em" className={classes.buttonLinks}>
                <Button
                  disabled={!password || !localEmail}
                  type="submit"
                  color="secondary"
                  variant="contained"
                  size="large"
                >
                  Login
                </Button>
              </Box>
            </Box>
          </form>
        </Container>
      </Box>
    </Container>
  )
}

export default login

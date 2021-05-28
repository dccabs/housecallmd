import { useState } from 'react'
import { Typography, Box, Button, TextField } from '@material-ui/core'
import Container from '../components/Container'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'

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
  const classes = useStyles()

  const handleSubmit = (e) => {
    setEmail(localEmail)
    e.preventDefault()
    loginUser()
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
                <Typography align="right">
                  <Link href="/forgot-password">
                    <a>Forgot Password</a>
                  </Link>
                </Typography>
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

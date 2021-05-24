import { useEffect, useState } from 'react'

import { Typography, Box, Button, TextField, MenuItem } from '@material-ui/core'
import Container from '../components/Container'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import useStore from '../zustand/store';

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
  formControl: {
    marginTop: '2em',
    marginBottom: 0,
  },
  selectLabel: {
    background: '#fff',
  },
}))



const Contact = () => {
  const classes = useStyles();
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setLocalEmail] = useState('');
  const { setEmail } = useStore()

  console.log('useStore', useStore());

  const handleSubmit = (e) => {
    console.log('handle Submit')
    setEmail(email);
    e.preventDefault();
    router.push('/visit-choice');
  }

  const handlePasswordUpdate = (e) => {
    setPassword(e.target.value);
  }

  const handleConfirmPasswordUpdate = (e) => {
    setConfirmPassword(e.target.value);
  }

  const handleEmailUpdate = (e) => {
    setLocalEmail(e.target.value);
  }

  return (
    <Container>
      <Box p="1em">
        <Typography variant="h2">Please enter the following to finish creating your account:</Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <TextField
                value={email}
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
            <TextField
              value={confirmPassword}
              className={classes.textFields}
              fullWidth
              type="password"
              label="Confirm Password"
              variant="outlined"
              color="secondary"
              required
              onChange={handleConfirmPasswordUpdate}
            />
          </Box>
          <Box mt="2em" display="flex" justifyContent="center" flexWrap="wrap">
            <Box m="1em" className={classes.buttonLinks}>
              <Button
                disabled={
                  (!password || !confirmPassword) ||
                  (password !== confirmPassword) ||
                  !email
                }
                type="submit"
                color="secondary"
                variant="contained"
                size="large"
              >
                Create Account
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Container>
  )
}

export default Contact

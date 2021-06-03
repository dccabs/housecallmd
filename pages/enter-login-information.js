import { useState } from 'react'

import { Typography, Box, Button, TextField, MenuItem } from '@material-ui/core'
import Container from '../components/Container'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import useStore from '../zustand/store';
import { supabase } from '../utils/initSupabase'
import { Auth } from '@supabase/ui'

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
  const { session } = Auth.useUser()

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localEmail, setLocalEmail] = useState('');
  const {
    hasInsurance,
    provider,
    planNumber,
    groupNumber,
    visitChoice,
    firstName,
    lastName,
    email,
    address,
    city,
    state,
    zip,
    phone,
    setEmail,
  } = useStore();


  const handleSubmit = (e) => {
    setEmail(localEmail);
    e.preventDefault();
    loginUser();
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

  const fetchUsers = async () => {
    const token = session.access_token;

    fetch('/api/getAllUsers', {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'application/json', token }),
      credentials: 'same-origin',
    }).then((res) => res.json())
  }

  const addUser = async () => {
    let newUser = {
      hasInsurance,
      provider,
      planNumber,
      groupNumber,
      // visitChoice,
      firstName,
      lastName,
      email,
      address,
      city,
      state,
      zip,
      phone: phone.replace(/\s/g, '')
    }

    //setOpen(true)
    const payload = {
      newUser,
    }
    fetch('/api/addUser', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify(payload)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw Error(data.error);
        } else {
          alert("You successfully added a user");
          router.push('/visit-choice')
        }
      })
      .catch(error => {
        alert(error);
      });
  }
  const loginUser = () => {
    supabase.auth
      .signUp({ email: localEmail, password })
      .then((response) => {
        response.error ? alert(response.error.message) : setToken(response);
      })
  }

  const setToken = (response) => {
    if (response.data.confirmation_sent_at && !response.data.access_token) {
      alert('Confirmation Email Sent')
    } else {
      alert('Logged in as ' + response.user.email);
      addUser();
    }
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
                  !localEmail
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
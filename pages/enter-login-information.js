import { useEffect, useState } from 'react'

import { Typography, Box, Button, TextField, MenuItem } from '@material-ui/core'
import Container from '../components/Container'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import useStore from '../zustand/store';
import { supabase } from '../utils/initSupabase'


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

  console.log('useStore', useStore());

  const handleSubmit = (e) => {
    console.log('handle Submit')
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
    let { data: users, error } = await supabase.from('UserList').select('*').order('email', true)
    if (error){
      console.log('error', error)
    } else {
      console.log('users', users)
    }
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

    const { data, error } = await supabase
      .from('UserList')
      .insert([
        { ...newUser },
      ])
    if (error){
      console.log('error', error)
    } else {
      console.log('success')
    }
  }
  const loginUser = () => {
    console.log('localEmail', localEmail)
    supabase.auth
      .signUp({ email: localEmail, password })
      .then((response) => {
        response.error ? alert(response.error.message) : setToken(response);
      })
      .catch((err) => {
        console.log('err', err);
        alert(err.response.text)
      })
  }

  const setToken = (response) => {
    if (response.data.confirmation_sent_at && !response.data.access_token) {
      alert('Confirmation Email Sent')
    } else {
      document.querySelector('#access-token').value = response.data.access_token
      document.querySelector('#refresh-token').value = response.data.refresh_token
      alert('Logged in as ' + response.user.email)
    }
  }

  return (
    <Container>
      <Button onClick={fetchUsers}>
        Get Users
      </Button>

      <Button onClick={addUser}>
        New User
      </Button>
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

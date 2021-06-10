import { useState } from 'react'

import {
  Typography,
  Box,
  Button,
  TextField,
  Checkbox,
  FormControl,
  FormControlLabel,
} from '@material-ui/core'
import Container from '../components/Container'

import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import useStore from '../zustand/store'
import { supabase } from '../utils/initSupabase'
import { Auth } from '@supabase/ui'

const useStyles = makeStyles((theme) => ({
  h2: {
    marginTop: '.5em',
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
  formControl: {
    marginTop: '2em',
    marginBottom: 0,
  },
  selectLabel: {
    background: '#fff',
  },
}))

const Contact = () => {
  const classes = useStyles()
  const router = useRouter()
  const { session } = Auth.useUser()

  const [checked, setChecked] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [localEmail, setLocalEmail] = useState('')
  const [localId, setLocalId] = useState('')

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
  } = useStore()

  const handleSubmit = (e) => {
    setEmail(localEmail)
    e.preventDefault()
    loginUser()
  }

  const handlePasswordUpdate = (e) => {
    setPassword(e.target.value)
  }

  const handleConfirmPasswordUpdate = (e) => {
    setConfirmPassword(e.target.value)
  }

  const handleEmailUpdate = (e) => {
    setLocalEmail(e.target.value)
  }

  const addUser = async (newUser) => {

    //setOpen(true)
    const payload = {
      newUser,
    }
    fetch('/api/addUser', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw Error(data.error)
        } else {
          alert("You successfully added a user");
          router.push('/visit-choice');
          sendEmailToUser(payload);
        }
      })
      .catch((error) => {
        alert(error)
      })
  }
  const loginUser = () => {
    supabase.auth.signUp({ email: localEmail, password }).then((response) => {
      response.error ? alert(response.error.message) : setToken(response)
    })
  }

  const sendEmailToUser = (payload) => {
    fetch('/api/sendNewAppointmentEmail', {
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
          return data;
        }
      })
      .catch(error => {
        alert(error);
      });
  }

  const setToken = async (response) => {
    if (!response.data.access_token) {
      return;
    } else {
      console.log('response id', response.data.user.id)
      await setEmail(response.data.user.email);
      await setLocalEmail(response.data.user.email);
      await setLocalId(response.data.user.id);
      // TODO: fix this timeout
        alert('Logged in as ' + response.data.user.email)
        let newUser = {
          hasInsurance,
          provider,
          planNumber,
          groupNumber,
          // visitChoice,
          firstName,
          lastName,
          email: response.data.user.email,
          address,
          city,
          state,
          zip,
          phone: phone.replace(/\s/g, ''),
          uuid: response.data.user.id,
        }
        addUser(newUser)
    }
  }

  return (
    <Container>
      <Box>
        <Typography variant="h2" className={classes.h2}>
          Please enter the following to finish creating your account:
        </Typography>
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
            <Box mt="1em" width="100%" maxWidth="34rem">
              <FormControl component="fieldset">
                <FormControlLabel
                  value="Terms"
                  control={<Checkbox color="secondary" checked={checked} />}
                  label="Accept terms and conditions of HousecallMD"
                  labelPlacement="end"
                  onChange={() => setChecked(!checked)}
                />
              </FormControl>
            </Box>
          </Box>
          <Box mt="2em" display="flex" justifyContent="center" flexWrap="wrap">
            <Box m="1em" className={classes.buttonLinks}>
              <Button
                disabled={
                  !password ||
                  !confirmPassword ||
                  password !== confirmPassword ||
                  !localEmail ||
                  !checked
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

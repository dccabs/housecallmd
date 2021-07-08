import { useContext, useState } from 'react'

import {
  Typography,
  Box,
  Button,
  TextField,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
} from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Container from '../components/Container'

import { SnackBarContext } from '../components/SnackBar'

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
  const openSnackBar = useContext(SnackBarContext)

  const [fieldType, setFieldType] = useState('password')
  const [confirmFieldType, setConfirmFieldType] = useState('password')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordNotMatch, setPasswordNotMatch] = useState(false)
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

    if (e.target.value !== confirmPassword) setPasswordNotMatch(true)
    else setPasswordNotMatch(false)
  }

  const handleConfirmPasswordUpdate = (e) => {
    setConfirmPassword(e.target.value)

    if (password !== e.target.value) setPasswordNotMatch(true)
    else setPasswordNotMatch(false)
  }

  const handleEmailUpdate = (e) => {
    setLocalEmail(e.target.value)
  }

  const handlePasswordClick = () => {
    if (fieldType === 'password') setFieldType('text')
    else setFieldType('password')
    setShowPassword(!showPassword)
  }

  const handleConfirmPasswordClick = () => {
    if (confirmFieldType === 'password') setConfirmFieldType('text')
    else setConfirmFieldType('password')
    setShowConfirmPassword(!showConfirmPassword)
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
          router.push('/visit-choice')
        }
      })
      .catch((error) => {
        openSnackBar({ message: error, snackSeverity: 'error' })
      })
  }
  const loginUser = () => {
    supabase.auth.signUp({ email: localEmail, password }).then((response) => {
      response.error
        ? openSnackBar({
            message: response.error.message,
            snackSeverity: 'error',
          })
        : setToken(response)
    })
  }

  const setToken = async (response) => {
    if (!response.data.access_token) {
      return
    } else {
      await setEmail(response.data.user.email)
      await setLocalEmail(response.data.user.email)
      await setLocalId(response.data.user.id)
      // TODO: fix this timeout
      openSnackBar({
        message: 'Logged in as ' + response.data.user.email,
        snackSeverity: 'success',
      })
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
            <FormControl className={classes.textFields} variant="outlined">
              <InputLabel
                htmlFor="outlined-password"
                color="secondary"
                variant="outlined"
                required
                style={{background: '#ffffff'}}
              >
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-password"
                value={password}
                type={fieldType}
                variant="outlined"
                color="secondary"
                required
                onChange={handlePasswordUpdate}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handlePasswordClick} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
                error={passwordNotMatch}
              />
              {passwordNotMatch && (
                <FormHelperText error>Passwords do not match</FormHelperText>
              )}
            </FormControl>
            <FormControl className={classes.textFields} variant="outlined">
              <InputLabel
                htmlFor="outline-confirm-password"
                color="secondary"
                variant="outlined"
                required
                style={{background: '#ffffff'}}
              >
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="outline-confirm-password"
                value={confirmPassword}
                type={confirmFieldType}
                variant="outlined"
                color="secondary"
                required
                onChange={handleConfirmPasswordUpdate}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleConfirmPasswordClick} edge="end">
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
                error={passwordNotMatch}
              />
              {passwordNotMatch && (
                <FormHelperText error>Passwords do not match</FormHelperText>
              )}
            </FormControl>
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

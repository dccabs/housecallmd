import { useState, useContext } from 'react'
import {
  Typography,
  Box,
  Button,
  TextField,
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import Container from '../components/Container'
import { SnackBarContext } from '../components/SnackBar'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import { supabase } from '../utils/initSupabase'
import { useRouter } from 'next/router'
import validateEmail from '../utils/validateEmail'

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
}))

const login = () => {
  const [fieldType, setFieldType] = useState('password')
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [localEmail, setLocalEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const classes = useStyles()
  const router = useRouter()

  const handleUserNameSubmit = () => {
    const payload = {
      username: localEmail,
      password,
    }
    fetch('/api/login', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data.error) {
          throw Error(data.message)
        } else {
          const supabasePayload = {
            email: data.email,
            password: payload.password,
          }
          supabase.auth
            .signIn(supabasePayload)
            .then((response) => {
              response.error
                ? openSnackBar({
                    message: response.error.message,
                    snackSeverity: 'error',
                  })
                : setToken(response)
              setLoading(false)
            })
            .catch((err) => {
              openSnackBar({ message: err, snackSeverity: 'error' })
              setLoading(false)
            })
        }
      })
      .catch((error) => {
        openSnackBar({ message: error.toString(), snackSeverity: 'error' })
        setLoading(false)
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    const isValidEmail = validateEmail(localEmail)
    if (!isValidEmail) {
      handleUserNameSubmit()
      return false
    }
    const payload = {
      email: localEmail,
      password,
    }
    supabase.auth
      .signIn(payload)
      .then((response) => {
        response.error
          ? openSnackBar({
              message: response.error.message,
              snackSeverity: 'error',
            })
          : setToken(response)
        setLoading(false)
      })
      .catch((err) => {
        openSnackBar({ message: err.response.text, snackSeverity: 'error' })
        setLoading(false)
      })
  }

  const setToken = (response) => {
    openSnackBar({ message: 'Logged in as ' + response.user.email })
    if (response?.user?.user_metadata?.facility) {
      router.push('/facility/profile')
    } else {
      router.push('/returning-user')
    }
  }

  const handlePasswordUpdate = (e) => {
    setPassword(e.target.value)
  }

  const handleEmailUpdate = (e) => {
    setLocalEmail(e.target.value)
  }

  const handlePasswordClick = () => {
    if (fieldType === 'password') setFieldType('text')
    else setFieldType('password')
    setShowPassword(!showPassword)
  }

  const openSnackBar = useContext(SnackBarContext)

  return (
    <Container>
      <Box>
        <Typography variant="h2" className={classes.h2}>
          Login
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
              type="text"
              label="Email or Username"
              variant="outlined"
              color="secondary"
              required
              onChange={handleEmailUpdate}
              disabled={loading ? loading : false}
            />
            <FormControl className={classes.textFields} variant="outlined">
              <InputLabel
                style={{ background: '#ffffff' }}
                htmlFor="outlined-adornment-password"
                color="secondary"
                variant="outlined"
                required
              >
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={fieldType}
                value={password}
                color="secondary"
                required
                onChange={handlePasswordUpdate}
                disabled={loading ? loading : false}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handlePasswordClick} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
            <Box
              className={classes.link}
              mt="1em"
              width="100%"
              maxWidth="34rem"
            >
              <Box mt="0.5em">
                <Typography align="right">
                  <Link href="/insurance">
                    <a>Sign up for an account</a>
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
          <Box mt="2em" display="flex" justifyContent="center" flexWrap="wrap">
            <Box m="1em" className={classes.buttonLinks}>
              <Button
                disabled={!password || !localEmail}
                type="submit"
                color="secondary"
                variant="contained"
                size="large"
              >
                Login{' '}
                {loading && (
                  <CircularProgress color="text-white" size="1.3em" />
                )}
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Container>
  )
}

export default login

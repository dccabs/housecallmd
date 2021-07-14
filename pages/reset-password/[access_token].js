import { useContext, useState } from 'react'
import {
  Typography,
  Box,
  Button,
  TextField,
  Dialog,
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
import Container from '../../components/Container'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import { SnackBarContext } from '../../components/SnackBar'
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
}))

const ResetPassword = () => {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [open, setOpen] = useState(false)
  const [fieldType, setFieldType] = useState('password')
  const [confirmFieldType, setConfirmFieldType] = useState('password')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordNotMatch, setPasswordNotMatch] = useState(false)
  const classes = useStyles()
  const openSnackBar = useContext(SnackBarContext)
  const { user } = Auth.useUser()

  const { access_token } = router.query

  const handleSubmit = (e) => {
    e.preventDefault()
    //setOpen(true)
    const payload = {
      password,
    }
    fetch('/api/resetPassword', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        token: access_token,
      }),
      credentials: 'same-origin',
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw Error(data.error)
        } else {
          openSnackBar({
            message: `You successfully changed your password, you are logged in as ${user.email}`,
            snackSeverity: 'success',
          })
          router.push('/')
        }
      })
      .catch((error) => {
        openSnackBar({ message: error, snackSeverity: 'error' })
      })
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

  return (
    <Container>
      <Box>
        <Typography variant="h2">Enter new password</Typography>
        <Container>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
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
                      <IconButton
                        onClick={handleConfirmPasswordClick}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
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
            </Box>
            <Box
              mt="2em"
              display="flex"
              justifyContent="center"
              flexWrap="wrap"
            >
              <Box m="1em" className={classes.buttonLinks}>
                <Button
                  disabled={
                    !password ||
                    !confirmPassword ||
                    password !== confirmPassword
                  }
                  type="submit"
                  color="secondary"
                  variant="contained"
                  size="large"
                >
                  Reset Password
                </Button>
              </Box>
            </Box>
          </form>

          <Dialog open={open} keepMounted onClose={() => setOpen(false)}>
            <Box p="4em">
              <Typography variant="h4" align="center">
                Your password has been reset, please login to HouseCallMD
              </Typography>
            </Box>
          </Dialog>
        </Container>
      </Box>
    </Container>
  )
}

export default ResetPassword

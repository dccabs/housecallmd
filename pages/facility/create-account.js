import { useContext, useState } from 'react'
import Link from 'next/link'
import {
  Typography,
  Box,
  TextField,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
  Button,
  Select,
  MenuItem,
} from '@material-ui/core'
import { VisibilityOff, Visibility } from '@material-ui/icons'
import Container from '../../components/Container'
import PhoneField from '../../components/PhoneField'
import formatPhoneNumberE164 from '../../utils/formatPhoneNumberE164'

import { SnackBarContext } from '../../components/SnackBar'

import { makeStyles } from '@material-ui/core/styles'
import useStore from '../../zustand/store'
import { supabase } from '../../utils/initSupabase'
import MuiSelect from '../../components/MuiSelect'
import STATES from '../../public/constants/states'
import { useRouter } from 'next/router'

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
  const router = useRouter()
  const classes = useStyles()
  const openSnackBar = useContext(SnackBarContext)
  const [open, setOpen] = useState(true)
  const [fieldType, setFieldType] = useState('password')
  const [confirmFieldType, setConfirmFieldType] = useState('password')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordNotMatch, setPasswordNotMatch] = useState(false)
  const [checked, setChecked] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [localUsername, setLocalUsername] = useState('')
  const [localEmail, setLocalEmail] = useState('')
  const [localId, setLocalId] = useState('')
  const [localFacilityPhone, setLocalFacilityPhone] = useState('')
  const [localFacilityFax, setLocalFacilityFax] = useState('')
  const [localAddress, setLocalAddress] = useState('')
  const [localCenterName, setLocalCenterName] = useState('')
  const [localCity, setLocalCity] = useState('')
  const [localState, setLocalState] = useState('')
  const [localZip, setLocalZip] = useState('')
  const [localPrimaryContactName, setLocalPrimaryContactName] = useState('')
  const [localPrimaryContactShift, setLocalPrimaryContactShift] = useState('')
  const [usernameAvailable, setUsernameAvailable] = useState(true)
  const [usernameValid, setUsernameValid] = useState(true)
  const [
    localPrimaryContactMobilePhone,
    setLocalPrimaryContactMobilePhone,
  ] = useState('')
  const [localSecondaryContactName, setLocalSecondaryContactName] = useState('')
  const [
    localSecondaryContactMobilePhone,
    setLocalSecondaryContactMobilePhone,
  ] = useState('')
  const [localSecondaryContactShift, setLocalSecondaryContactShift] = useState(
    ''
  )

  const { setEmail } = useStore()

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

  const checkUsernameHasSpecialCharacters = () => {
    const specialChars = /[`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~ ]/

    const valid = specialChars.test(localUsername)

    return !valid
  }

  const checkUsername = async () => {
    const valid = checkUsernameHasSpecialCharacters()

    if (!valid) setUsernameValid(false)
    else {
      setUsernameValid(true)
      try {
        const res = await fetch('/api/checkUsernameExists', {
          method: 'POST',
          headers: new Headers({ 'Content-Type': 'application/json' }),
          credentials: 'same-origin',
          body: JSON.stringify({ username: localUsername }),
        })

        const data = await res.json()

        if (!data.length) setUsernameAvailable(true)
        else setUsernameAvailable(false)
      } catch (err) {
        throw Error(err)
      }
    }
  }

  const loginUser = () => {
    supabase.auth
      .signUp({
        email: localEmail,
        password,
        user_metadata: { faciltiy: true },
      })
      .then((response) => {
        response.error
          ? openSnackBar({
              message: response.error.message,
              snackSeverity: 'error',
            })
          : setToken(response)
      })
  }

  const addFacility = async (newFacility) => {
    setOpen(true)
    const payload = {
      newFacility,
    }
    fetch('/api/addFacility', {
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
          router.push('/facility/profile')
          // openSnackBar({ message: 'SUCCESS', snackSeverity: 'success' })
        }
      })
      .catch((error) => {
        openSnackBar({ message: error, snackSeverity: 'error' })
      })
  }

  const setToken = async (response) => {
    if (!response.data.access_token) {
      return null
    } else {
      const { user, error } = await supabase.auth.update({
        data: { facility: true },
      })
      await setEmail(response.data.user.email)
      await setLocalEmail(response.data.user.email)
      await setLocalId(response.data.user.id)
      // TODO: fix this timeout
      await openSnackBar({
        message: 'Logged in as ' + response.data.user.email,
        snackSeverity: 'success',
      })
      let newFacility = {
        name: localCenterName,
        address: localAddress,
        city: localCity,
        state: localState,
        zip: localZip,
        facility_phone: formatPhoneNumberE164(localFacilityPhone),
        fax_number: formatPhoneNumberE164(localFacilityFax),
        primary_contact_name: localPrimaryContactName,
        primary_contact_mobile_phone: formatPhoneNumberE164(
          localPrimaryContactMobilePhone
        ),
        primary_contact_shift: localPrimaryContactShift,
        secondary_contact_name: localSecondaryContactName,
        secondary_contact_mobile_phone: localSecondaryContactMobilePhone
          ? formatPhoneNumberE164(localSecondaryContactMobilePhone)
          : '',
        secondary_contact_shift: localSecondaryContactShift,
        user_name: localUsername,
        auth_id: response.data.user.id,
      }
      await addFacility(newFacility)
    }
  }

  return (
    <Container>
      <Box>
        <Typography variant="h2" className={classes.h2}>
          Create a Facility Account
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div>
            <Typography style={{ margin: '2em 0 2em' }}>
              Please enter your facility information below to create your
              account.
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <TextField
                className={classes.textFields}
                type="text"
                label="Choose Username"
                variant="outlined"
                color="secondary"
                helperText={
                  !usernameAvailable
                    ? 'Username already exists'
                    : !usernameValid
                    ? 'Username must not have special characters.'
                    : ''
                }
                onBlur={checkUsername}
                onChange={(e) => setLocalUsername(e.target.value)}
                error={!usernameAvailable || !usernameValid}
                required
                fullWidth
              />
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
              <FormControl
                className={classes.textFields}
                variant="outlined"
                fullWidth
              >
                <InputLabel
                  htmlFor="outlined-password"
                  color="secondary"
                  variant="outlined"
                  required
                  style={{ background: '#ffffff' }}
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
                  style={{ background: '#ffffff' }}
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
              <TextField
                fullWidth
                className={classes.textFields}
                label="Center Name"
                variant="outlined"
                color="secondary"
                required
                value={localCenterName}
                onChange={(e) => setLocalCenterName(e.target.value)}
              />
              <TextField
                fullWidth
                className={classes.textFields}
                label="Center Address"
                multiline
                rows={4}
                variant="outlined"
                color="secondary"
                value={localAddress}
                onChange={(e) => setLocalAddress(e.target.value)}
                required
              />
              <TextField
                fullWidth
                className={classes.textFields}
                label="City"
                variant="outlined"
                color="secondary"
                value={localCity}
                onChange={(e) => setLocalCity(e.target.value)}
                required
              />
              <MuiSelect
                name="state"
                label="State"
                defaultValue=""
                value={localState}
                onChange={(e) => {
                  setLocalState(e.target.value)
                }}
              >
                {STATES.map((state, index) => {
                  return (
                    <MenuItem key={index} value={state.abbreviation}>
                      {state.name}
                    </MenuItem>
                  )
                })}
              </MuiSelect>
              <TextField
                className={classes.textFields}
                type="number"
                label="Zip"
                variant="outlined"
                color="secondary"
                fullWidth
                required
                value={localZip}
                onChange={(e) => setLocalZip(e.target.value)}
              />
              <TextField
                className={classes.textFields}
                fullWidth
                type="tel"
                label="Facility Phone Number"
                variant="outlined"
                color="secondary"
                required
                value={localFacilityPhone}
                onChange={(e) => setLocalFacilityPhone(e.target.value)}
                InputProps={{
                  inputComponent: PhoneField,
                }}
              />
              <TextField
                className={classes.textFields}
                fullWidth
                type="tel"
                label="Facility Fax Number"
                variant="outlined"
                color="secondary"
                required
                value={localFacilityFax}
                onChange={(e) => setLocalFacilityFax(e.target.value)}
                InputProps={{
                  inputComponent: PhoneField,
                }}
              />

              <TextField
                fullWidth
                className={classes.textFields}
                label="Primary Contact Name"
                variant="outlined"
                color="secondary"
                value={localPrimaryContactName}
                onChange={(e) => setLocalPrimaryContactName(e.target.value)}
                required
              />

              <TextField
                className={classes.textFields}
                fullWidth
                type="tel"
                label="Primary Contact Mobile Phone"
                variant="outlined"
                color="secondary"
                required
                value={localPrimaryContactMobilePhone}
                onChange={(e) =>
                  setLocalPrimaryContactMobilePhone(e.target.value)
                }
                InputProps={{
                  inputComponent: PhoneField,
                }}
              />

              <FormControl variant="outlined" className={classes.textFields}>
                <InputLabel id="primary_contact_shift" color="secondary">
                  Primary Contact Shift
                </InputLabel>
                <Select
                  labelId="primary_contact_shift"
                  label="Primary Contact Shift"
                  color="secondary"
                  value={localPrimaryContactShift}
                  onChange={(e) => setLocalPrimaryContactShift(e.target.value)}
                >
                  <MenuItem value="day">Day</MenuItem>
                  <MenuItem value="night">Night</MenuItem>
                  <MenuItem value="both">Both</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                className={classes.textFields}
                label="Secondary Account Name"
                variant="outlined"
                color="secondary"
                value={localSecondaryContactName}
                onChange={(e) => setLocalSecondaryContactName(e.target.value)}
              />

              <TextField
                className={classes.textFields}
                fullWidth
                type="tel"
                label="Secondary Contact Mobile Phone"
                variant="outlined"
                color="secondary"
                value={localSecondaryContactMobilePhone}
                onChange={(e) =>
                  setLocalSecondaryContactMobilePhone(e.target.value)
                }
                InputProps={{
                  inputComponent: PhoneField,
                }}
              />

              <FormControl variant="outlined" className={classes.textFields}>
                <InputLabel id="primary_contact_shift" color="secondary">
                  Secondary Contact Shift
                </InputLabel>
                <Select
                  labelId="primary_contact_shift"
                  label="Primary Contact Shift"
                  color="secondary"
                  value={localSecondaryContactShift}
                  onChange={(e) =>
                    setLocalSecondaryContactShift(e.target.value)
                  }
                >
                  <MenuItem value="day">Day</MenuItem>
                  <MenuItem value="night">Night</MenuItem>
                  <MenuItem value="both">Both</MenuItem>
                </Select>
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
                    password !== confirmPassword ||
                    !localEmail ||
                    !checked ||
                    !localState ||
                    !localZip ||
                    !localFacilityPhone ||
                    !localFacilityFax ||
                    !localCenterName ||
                    !localCity ||
                    !localState ||
                    !localZip ||
                    !localPrimaryContactName ||
                    !localPrimaryContactShift ||
                    !localPrimaryContactMobilePhone ||
                    !usernameAvailable ||
                    !usernameValid
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
            <Box
              mt="1em"
              display="flex"
              justifyContent="center"
              flexWrap="wrap"
            >
              <Box m="1em">
                <Typography variant="body1">
                  Already have an account?{' '}
                  <Link passHref href={'/login'}>
                    <a>Login here</a>
                  </Link>
                  .
                </Typography>
              </Box>
            </Box>
          </div>
        </form>
      </Box>
    </Container>
  )
}

export default Contact

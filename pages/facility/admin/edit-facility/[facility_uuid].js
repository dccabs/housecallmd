import { useContext, useState, useEffect } from 'react'
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
import Container from '../../../../components/Container'
import PhoneField from '../../../../components/PhoneField'
import MuiSelect from '../../../../components/MuiSelect'
import STATES from '../../../../public/constants/states'
import formatPhoneNumberE164 from '../../../../utils/formatPhoneNumberE164'
import { SnackBarContext } from '../../../../components/SnackBar'
import { makeStyles } from '@material-ui/core/styles'
import { supabase } from '../../../../utils/initSupabase'
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

const EditFacilityPage = () => {
  const router = useRouter()
  const { facility_uuid } = router.query
  const classes = useStyles()
  const openSnackBar = useContext(SnackBarContext)
  const [open, setOpen] = useState(true)
  const [fieldType, setFieldType] = useState('password')
  const [confirmFieldType, setConfirmFieldType] = useState('password')
  const [checked, setChecked] = useState(false)
  const [localUsername, setLocalUsername] = useState('')
  const [localEmail, setLocalEmail] = useState('')
  const [localId, setLocalId] = useState('')
  const [localFacilityPhone, setLocalFacilityPhone] = useState('')
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

  useEffect(async () => {
    if (facility_uuid) {
      const res = await fetch('/api/getFacilityAccountById', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify({ id: facility_uuid }),
      })
      const data = await res.json()
      console.log(data)
      if (data.error) {
        throw Error(data.error)
      } else {
        setLocalUsername(data.user_name)
        // setLocalEmail(data.email)
        setLocalCenterName(data.name)
        setLocalAddress(data.address)
        setLocalCity(data.city)
        setLocalState(data.state)
      }
    }
  }, [facility_uuid])

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <Container>
      <Box>
        <Typography variant="h2" className={classes.h2}>
          Edit Facility Account
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div>
            <Typography style={{ margin: '2em 0 2em' }}>
              Please enter your facility information below.
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
                value={localUsername}
                onChange={(e) => setLocalUsername(e.target.value)}
                required
                fullWidth
                disabled
              />
              <TextField
                className={classes.textFields}
                fullWidth
                type="email"
                label="Email"
                variant="outlined"
                color="secondary"
                value={localEmail}
                onChange={(e) => setLocalEmail(e.target.value)}
                required
                disabled
              />
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
                    !localEmail ||
                    !localState ||
                    !localZip ||
                    !localFacilityPhone ||
                    !localCenterName ||
                    !localCity ||
                    !localState ||
                    !localZip ||
                    !localPrimaryContactName ||
                    !localPrimaryContactShift ||
                    !localPrimaryContactMobilePhone ||
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

export default EditFacilityPage

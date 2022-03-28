import { useContext, useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Typography,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core'
import Container from '../../components/Container'
import PhoneField from '../../components/PhoneField'
import formatPhoneNumberE164 from '../../utils/formatPhoneNumberE164'
import STATES from '../../public/constants/states'
import { SnackBarContext } from '../../components/SnackBar'

import { makeStyles } from '@material-ui/core/styles'
import useStore from '../../zustand/store'
import { Auth } from '@supabase/ui'
import isEmpty from '../../utils/isEmpty'
import MuiSelect from '../../components/MuiSelect'

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

const EditAccount = () => {
  const { user } = Auth.useUser()
  const [dataFetched, setDataFetched] = useState(false)
  const classes = useStyles()
  const openSnackBar = useContext(SnackBarContext)
  const [localEmail, setLocalEmail] = useState('')
  const [localFacilityPhone, setLocalFacilityPhone] = useState('')
  const [localFacilityFax, setLocalFacilityFax] = useState('')
  const [localAddress, setLocalAddress] = useState('')
  const [localCenterName, setLocalCenterName] = useState('')
  const [localCity, setLocalCity] = useState('')
  const [localState, setLocalState] = useState('')
  const [localZip, setLocalZip] = useState('')
  const [localPrimaryContactName, setLocalPrimaryContactName] = useState('')
  const [localPrimaryContactShift, setLocalPrimaryContactShift] = useState('')
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

  const getFacilities = async () => {
    const fetchData = await fetch('/api/getFacilities', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({ user }),
    })
    const json = await fetchData.json()
    const data = json[0]
    setDataFetched(true)
    if (!isEmpty(data)) {
      setLocalCenterName(data.name)
      setLocalAddress(data.address)
      setLocalCity(data.city)
      setLocalState(data.state)
      setLocalZip(data.zip)
      setLocalFacilityPhone(data.facility_phone)
      setLocalFacilityFax(data.fax_number)
      setLocalPrimaryContactName(data.primary_contact_name)
      setLocalPrimaryContactMobilePhone(data.primary_contact_mobile_phone)
      setLocalPrimaryContactShift(data.primary_contact_shift)
      setLocalSecondaryContactName(data.secondary_contact_name)
      setLocalSecondaryContactMobilePhone(data.secondary_contact_mobile_phone)
      setLocalSecondaryContactShift(data.secondary_contact_shift)

      setLocalEmail(user.email)
    }
  }

  const handleSubmit = (e) => {
    setEmail(localEmail)
    e.preventDefault()
    const payload = {
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
      auth_id: user.id,
    }
    updateFacilityData(payload).then(() => {
      openSnackBar({
        message: 'Success',
        snackSeverity: 'success',
      })
    })
  }

  const updateFacilityData = async (payload) => {
    const updateData = await fetch('/api/updateFacility', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify(payload),
    })
    const json = await updateData.json()
    if (!json.success) {
      openSnackBar({
        message: json.error.message,
        snackSeverity: 'error',
      })
    }
  }

  const handleEmailUpdate = (e) => {
    setLocalEmail(e.target.value)
  }

  useEffect(() => {
    if (user && !dataFetched) {
      getFacilities()
    }
  })

  return (
    <Container>
      <Box>
        <Typography variant="h2" className={classes.h2}>
          Edit account information.
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Box
            mt="1em"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Typography>
              Please enter your email and password to finish creating your
              account.
            </Typography>
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
                label="Center Email"
                variant="outlined"
                color="secondary"
                required
                onChange={handleEmailUpdate}
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
                label="Phone"
                variant="outlined"
                color="secondary"
                required
                value={localFacilityPhone}
                onChange={(e) => setLocalFacilityPhone(e.target.value)}
                InputProps={{
                  inputComponent: PhoneField,
                }}
                helperText="Please use a phone number that can create and receive sms notifications"
              />
              <TextField
                className={classes.textFields}
                fullWidth
                type="tel"
                label="Fax Number"
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
                label="Primary Account Name"
                variant="outlined"
                color="secondary"
                value={localPrimaryContactName}
                onChange={(e) => setLocalPrimaryContactName(e.target.value)}
                required
                helperText="Please enter the name of the primary administration contact"
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
                <InputLabel id="secondary_contact_shift" color="secondary">
                  Secondary Contact Shift
                </InputLabel>
                <Select
                  labelId="secondary_contact_shift"
                  label="Secondary Contact Shift"
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
                    !localFacilityFax ||
                    !localCenterName ||
                    !localCity ||
                    !localState ||
                    !localZip ||
                    !localPrimaryContactName ||
                    !localSecondaryContactMobilePhone ||
                    !localSecondaryContactShift
                  }
                  type="submit"
                  color="secondary"
                  variant="contained"
                  size="large"
                >
                  Update Account
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
                  <Link passHref href={'/facility/profile'}>
                    <a>Back to profile</a>
                  </Link>
                  .
                </Typography>
              </Box>
            </Box>
          </Box>
        </form>
      </Box>
    </Container>
  )
}

export default EditAccount

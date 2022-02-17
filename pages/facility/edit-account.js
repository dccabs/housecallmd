import { useContext, useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Typography,
  Box,
  TextField,
  Checkbox,
  FormControl,
  FormControlLabel,
  Button,
} from '@material-ui/core'
import Container from '../../components/Container'
import PhoneField from '../../components/PhoneField'
import formatPhoneNumberE164 from '../../utils/formatPhoneNumberE164'

import { SnackBarContext } from '../../components/SnackBar'

import { makeStyles } from '@material-ui/core/styles'
import useStore from '../../zustand/store'
import { Auth } from '@supabase/ui'
import isEmpty from '../../utils/isEmpty'

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
  const [checked, setChecked] = useState(false)
  const [localEmail, setLocalEmail] = useState('')
  const [localFacilityPhone, setLocalFacilityPhone] = useState('')
  const [localAddress, setLocalAddress] = useState('')
  const [localCenterName, setLocalCenterName] = useState('')
  const [localCity, setLocalCity] = useState('')
  const [localState, setLocalState] = useState('')
  const [localZip, setLocalZip] = useState('')
  const [localPrimaryContactName, setLocalPrimaryContactName] = useState('')

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
      setLocalPrimaryContactName(data.primary_contact_name)
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
      primary_contact_name: localPrimaryContactName,
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
              <TextField
                fullWidth
                className={classes.textFields}
                label="State"
                variant="outlined"
                color="secondary"
                value={localState}
                onChange={(e) => setLocalState(e.target.value)}
                required
              />
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
                    !checked ||
                    !localState ||
                    !localZip ||
                    !localFacilityPhone ||
                    !localCenterName ||
                    !localCity ||
                    !localState ||
                    !localZip ||
                    !localPrimaryContactName
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
                  <Link passHref href={'/assisted-living/profile'}>
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
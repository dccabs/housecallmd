import { useContext, useState, useEffect } from 'react'
import {
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Button,
  Select,
  MenuItem,
  CircularProgress,
} from '@material-ui/core'
import Container from 'components/Container'
import PhoneField from 'components/PhoneField'
import MuiSelect from 'components/MuiSelect'
import STATES from 'public/constants/states'
import formatPhoneNumberE164 from 'utils/formatPhoneNumberE164'
import { SnackBarContext } from 'components/SnackBar'
import { makeStyles } from '@material-ui/core/styles'
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
  const [loading, setLoading] = useState(true)
  const [updateLoading, setUpdateLoading] = useState(false)
  const [updated, setUpdated] = useState(false)
  const [localUsername, setLocalUsername] = useState('')
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

  useEffect(async () => {
    if (facility_uuid) {
      const res = await fetch('/api/getFacilityAccountById', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify({ id: facility_uuid }),
      })
      const data = await res.json()

      if (data.error) {
        throw Error(data.error)
      } else {
        setLocalUsername(data.user_name !== null ? data.user_name : '')
        // setLocalEmail(data.email)
        setLocalCenterName(data.name !== null ? data.name : '')
        setLocalAddress(data.address !== null ? data.address : '')
        setLocalCity(data.city !== null ? data.city : '')
        setLocalState(data.state !== null ? data.state : '')
        setLocalZip(data.zip !== null ? data.zip : '')
        setLocalFacilityPhone(
          data.facility_phone !== null ? data.facility_phone : ''
        )
        setLocalFacilityFax(data.fax_number !== null ? data.fax_number : '')
        setLocalPrimaryContactName(
          data.primary_contact_name !== null ? data.primary_contact_name : ''
        )
        setLocalPrimaryContactMobilePhone(
          data.primary_contact_mobile_phone !== null
            ? data.primary_contact_mobile_phone
            : ''
        )
        setLocalPrimaryContactShift(
          data.primary_contact_shift !== null ? data.primary_contact_shift : ''
        )
        setLocalSecondaryContactName(
          data.secondary_contact_name !== null
            ? data.secondary_contact_name
            : ''
        )
        setLocalSecondaryContactMobilePhone(
          data.secondary_contact_mobile_phone !== null
            ? data.secondary_contact_mobile_phone
            : ''
        )
        setLocalSecondaryContactShift(
          data.secondary_contact_shift !== null
            ? data.secondary_contact_shift
            : ''
        )

        setLoading(false)
      }
    }
  }, [facility_uuid])

  const handleSubmit = (e) => {
    e.preventDefault()

    const payload = {
      name: localCenterName,
      address: localAddress,
      city: localCity,
      state: localState,
      zip: localZip,
      facility_phone: formatPhoneNumberE164(localFacilityPhone),
      primary_contact_name: localPrimaryContactName,
      primary_contact_mobile_phone: localPrimaryContactMobilePhone,
      primary_contact_shift: localPrimaryContactShift,
      secondary_contact_name: localSecondaryContactName,
      secondary_contact_mobile_phone: localSecondaryContactMobilePhone,
      secondary_contact_shift: localSecondaryContactShift,
      fax_number: localFacilityFax,
    }
    setUpdateLoading(true)
    fetch('/api/updateFacilityInfo', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({ id: facility_uuid, updatedFacility: payload }),
    }).then((res) =>
      res.json().then((data) => {
        setUpdateLoading(false)
        if (!data.error) {
          openSnackBar({
            message: 'Facility updated',
            snackSeverity: 'success',
          })
          setUpdated(true)
        } else {
          openSnackBar({
            message: data.error,
            snackSeverity: 'error',
          })
        }
      })
    )
  }

  return (
    <>
      {loading ? (
        <Box
          mt="4em"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress />
        </Box>
      ) : (
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
                    disabled
                  />
                  <TextField
                    fullWidth
                    className={classes.textFields}
                    label="Center Name"
                    variant="outlined"
                    color="secondary"
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
                  />
                  <TextField
                    fullWidth
                    className={classes.textFields}
                    label="City"
                    variant="outlined"
                    color="secondary"
                    value={localCity}
                    onChange={(e) => setLocalCity(e.target.value)}
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
                    value={localFacilityPhone}
                    onChange={(e) => setLocalFacilityPhone(e.target.value)}
                    InputProps={{
                      inputComponent: PhoneField,
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />

                  <TextField
                    className={classes.textFields}
                    fullWidth
                    type="tel"
                    label="Facility Fax Number"
                    variant="outlined"
                    color="secondary"
                    value={localFacilityFax}
                    onChange={(e) => setLocalFacilityFax(e.target.value)}
                    InputProps={{
                      inputComponent: PhoneField,
                    }}
                    InputLabelProps={{
                      shrink: true,
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
                  />

                  <TextField
                    className={classes.textFields}
                    fullWidth
                    type="tel"
                    label="Primary Contact Mobile Phone"
                    variant="outlined"
                    color="secondary"
                    value={localPrimaryContactMobilePhone}
                    onChange={(e) =>
                      setLocalPrimaryContactMobilePhone(e.target.value)
                    }
                    InputProps={{
                      inputComponent: PhoneField,
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />

                  <FormControl
                    variant="outlined"
                    className={classes.textFields}
                  >
                    <InputLabel id="primary_contact_shift" color="secondary">
                      Primary Contact Shift
                    </InputLabel>
                    <Select
                      labelId="primary_contact_shift"
                      label="Primary Contact Shift"
                      color="secondary"
                      value={localPrimaryContactShift}
                      onChange={(e) =>
                        setLocalPrimaryContactShift(e.target.value)
                      }
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
                    onChange={(e) =>
                      setLocalSecondaryContactName(e.target.value)
                    }
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
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />

                  <FormControl
                    variant="outlined"
                    className={classes.textFields}
                  >
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
                </Box>
                <Box
                  mt="2em"
                  display="flex"
                  justifyContent="center"
                  flexWrap="wrap"
                >
                  {updateLoading ? (
                    <Box
                      m="1em"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <CircularProgress />
                    </Box>
                  ) : (
                    <Box m="1em" className={classes.buttonLinks}>
                      <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                        size="large"
                        disabled={updated}
                      >
                        Update
                      </Button>
                    </Box>
                  )}
                </Box>
              </div>
            </form>
          </Box>
        </Container>
      )}
    </>
  )
}

export default EditFacilityPage

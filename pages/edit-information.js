import { useState, useEffect, useContext } from 'react'
import {
  Typography,
  Box,
  Button,
  TextField,
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  FormControlLabel,
  CircularProgress,
  Collapse,
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'
import { Auth } from '@supabase/ui'
import Link from 'next/link'
import { useRouter } from 'next/router'
import moment from 'moment'

import providerOptions from '../public/constants/providerOptions'
import states from '../public/constants/states'

import Container from '../components/Container'
import { SnackBarContext } from '../components/SnackBar'
import PhoneField from '../components/PhoneField'

const useStyles = makeStyles((theme) => ({
  h2: {
    marginTop: '.5em',
  },
  textFields: {
    width: '100%',
    marginTop: '2em',
    maxWidth: '34rem',
  },
  buttons: {
    '& button': {
      marginBottom: '1em',
    },
  },
}))

const EditInformationPage = () => {
  const [policyHolderFirstName, setPolicyHolderFirstName] = useState('')
  const [policyHolderLastName, setPolicyHolderLastName] = useState('')
  const [policyHolderDob, setPolicyHolderDob] = useState('')
  const [policyHolderRelation, setPolicyHolderRelation] = useState('')

  const [provider, setProvider] = useState('')
  const [planNumber, setPlanNumber] = useState('')
  const [groupNumber, setGroupNumber] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [phone, setPhone] = useState('')
  const [dob, setDob] = useState('')

  const [checked, setChecked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [currentDate, setCurrentDate] = useState(false)

  const openSnackBar = useContext(SnackBarContext)
  const router = useRouter()
  const { user } = Auth.useUser()
  const classes = useStyles()

  useEffect(() => {
    const date = new Date()
    const dd = String(date.getDate()).padStart(2, '0')
    const mm = String(date.getMonth() + 1).padStart(2, '0')
    const yyyy = date.getFullYear()

    setCurrentDate(`${yyyy}-${mm}-${dd}`)
  }, [])

  useEffect(async () => {
    if (user) {
      try {
        setLoading(true)
        const res = await fetch('/api/getSingleUser', {
          method: 'POST',
          headers: new Headers({ 'Content-Type': 'application/json' }),
          credentials: 'same-origin',
          body: JSON.stringify({ email: user.email }),
        })
        const data = await res.json()

        setChecked(data.isPolicyCardHolder)
        setPolicyHolderFirstName(data.policyHolderFirstName)
        setPolicyHolderLastName(data.policyHolderLastName)
        setPolicyHolderRelation(data.policyHolderRelation)

        if (data.policyHolderDob && data.policyHolderDob !== 'Invalid date')
          setPolicyHolderDob(moment(data.policyHolderDob).format('YYYY-MM-DD'))

        setProvider(data.provider)
        setPlanNumber(data.planNumber)
        setGroupNumber(data.groupNumber)
        setFirstName(data.firstName)
        setLastName(data.lastName)
        setEmail(data.email)
        setAddress(data.address)
        setCity(data.city)
        setState(data.state)
        setZip(data.zip)
        setPhone(data.phone)

        if (data.dob && data.dob !== 'Invalid date')
          setDob(moment(data.dob).format('YYYY-MM-DD'))
      } catch (err) {
        throw err
      } finally {
        setLoading(false)
      }
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const updatedUser = {
      isPolicyCardHolder: checked,
      policyHolderFirstName,
      policyHolderLastName,
      policyHolderDob: moment(policyHolderDob).format('L'),
      policyHolderRelation,
      provider,
      planNumber,
      groupNumber,
      firstName,
      lastName,
      email,
      address,
      city,
      state,
      zip,
      phone,
      dob: moment(dob).format('L'),
    }

    try {
      const res = await fetch(`/api/updateUser`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      })
    } catch (error) {
      openSnackBar({ message: error, snackSeverity: 'error' })
    } finally {
      openSnackBar({
        message: 'Information updated successfuly',
        snackSeverity: 'success',
      })
      router.push('/visit-choice')
    }
  }

  return (
    <Container>
      <Typography variant="h2" className={classes.h2}>
        Edit your information
      </Typography>
      {!loading ? (
        <form onSubmit={handleSubmit}>
          <Box
            mt="1em"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Box mt="1em" width="100%" maxWidth="34rem">
              <FormControl component="fieldset">
                <FormControlLabel
                  value="Terms"
                  control={<Checkbox color="secondary" checked={checked} />}
                  label="Policy Card Holder"
                  labelPlacement="end"
                  onChange={() => setChecked(!checked)}
                />
              </FormControl>
            </Box>

            <Collapse in={!checked} style={{ width: '100%' }}>
              <Box
                display="flex"
                width="100%"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <TextField
                  className={classes.textFields}
                  type="text"
                  label="Policy Holder First Name"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  value={policyHolderFirstName}
                  onChange={(e) => setPolicyHolderFirstName(e.target.value)}
                />

                <TextField
                  className={classes.textFields}
                  type="text"
                  label="Policy Holder Last Name"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  value={policyHolderLastName}
                  onChange={(e) => setPolicyHolderLastName(e.target.value)}
                />

                <TextField
                  className={classes.textFields}
                  type="date"
                  label="Policy Holder Date of Birth"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  value={policyHolderDob}
                  onChange={(e) => setPolicyHolderDob(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    max: currentDate,
                  }}
                />

                <FormControl variant="outlined" className={classes.textFields}>
                  <InputLabel id="relation" color="secondary">
                    Policy Holder Relationship to Patient
                  </InputLabel>
                  <Select
                    labelId="relation"
                    label="Policy Holder Realtionship to Patient"
                    color="secondary"
                    value={policyHolderRelation}
                    onChange={(e) => setPolicyHolderRelation(e.target.value)}
                  >
                    <MenuItem value="Spouse">Spouse</MenuItem>
                    <MenuItem value="Mother">Mother</MenuItem>
                    <MenuItem value="Father">Father</MenuItem>
                    <MenuItem value="Child">Child</MenuItem>
                    <MenuItem value="Domestic Partner">
                      Domestic Partner
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Collapse>

            <TextField
              className={classes.textFields}
              type="email"
              label="Email"
              variant="outlined"
              color="secondary"
              fullWidth
              defaultValue={email}
              disabled
            />

            <TextField
              className={classes.textFields}
              type="text"
              label="First Name"
              variant="outlined"
              color="secondary"
              fullWidth
              defaultValue={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <TextField
              className={classes.textFields}
              type="text"
              label="Last Name"
              variant="outlined"
              color="secondary"
              fullWidth
              defaultValue={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <Autocomplete
              style={{ width: '100%', maxWidth: '34rem', marginTop: '1em' }}
              options={providerOptions}
              value={provider}
              onChange={(e, value) => setProvider(value)}
              freeSolo
              disableClearable
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Type to select provider"
                  margin="normal"
                  color="secondary"
                  variant="outlined"
                  onChange={(e) => setLocalProvider(e.target.value)}
                  InputProps={{ ...params.InputProps, type: 'search' }}
                />
              )}
            />

            <TextField
              className={classes.textFields}
              type="text"
              label="Plan Number"
              variant="outlined"
              color="secondary"
              fullWidth
              defaultValue={planNumber}
              onChange={(e) => setPlanNumber(e.target.value)}
            />

            <TextField
              className={classes.textFields}
              type="text"
              label="Group Number"
              variant="outlined"
              color="secondary"
              fullWidth
              defaultValue={groupNumber}
              onChange={(e) => setGroupNumber(e.target.value)}
            />

            <TextField
              className={classes.textFields}
              type="text"
              label="Address"
              variant="outlined"
              color="secondary"
              fullWidth
              defaultValue={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <TextField
              className={classes.textFields}
              type="text"
              label="City"
              variant="outlined"
              color="secondary"
              fullWidth
              defaultValue={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <FormControl variant="outlined" className={classes.textFields}>
              <InputLabel id="state" color="secondary">
                State
              </InputLabel>
              <Select
                labelId="state"
                label="State"
                color="secondary"
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                {states.map((s, i) => (
                  <MenuItem key={i} value={s.abbreviation}>
                    {s.name}, {s.abbreviation}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              className={classes.textFields}
              type="number"
              label="Zip"
              variant="outlined"
              color="secondary"
              fullWidth
              defaultValue={zip}
              onChange={(e) => setZip(e.target.value)}
            />

            <TextField
              className={classes.textFields}
              type="tel"
              label="Phone"
              variant="outlined"
              color="secondary"
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              InputProps={{
                inputComponent: PhoneField,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              className={classes.textFields}
              type="date"
              label="Date of Birth"
              variant="outlined"
              color="secondary"
              fullWidth
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                max: currentDate,
              }}
            />

            <Box
              className={classes.buttons}
              mt="2em"
              display="flex"
              flexDirection="column"
            >
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={
                  (!checked &&
                    (!policyHolderFirstName ||
                      !policyHolderLastName ||
                      !policyHolderDob ||
                      !policyHolderRelation)) ||
                  !provider ||
                  !planNumber ||
                  !groupNumber ||
                  !firstName ||
                  !lastName ||
                  !address ||
                  !city ||
                  !state ||
                  !zip ||
                  !phone ||
                  !dob
                }
              >
                Update Information
              </Button>

              <Link href="/returning-user">
                <Button variant="contained" color="secondary">
                  Cancel
                </Button>
              </Link>
            </Box>
          </Box>
        </form>
      ) : (
        <Box
          my="8em"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress />
        </Box>
      )}
    </Container>
  )
}

export default EditInformationPage

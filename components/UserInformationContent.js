import { useState, useEffect, useContext, memo } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  Select,
  Checkbox,
  InputLabel,
  MenuItem,
  Collapse,
  CircularProgress,
  Divider,
  Grid,
  Item,
} from '@material-ui/core'
import Link from 'next/link'
import moment from 'moment'
import PersonIcon from '@material-ui/icons/Person'
import { makeStyles } from '@material-ui/core/styles'

import { SnackBarContext } from './SnackBar'
import PhoneField from './PhoneField'
import MeetingCreated from './MeetingCreated'
import SendSMS from './SendSMS'

import states from '../public/constants/states'

const useStyles = makeStyles((theme) => ({
  fieldBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textFields: {
    width: '100%',
    marginTop: '2em',
    maxWidth: '34rem',
  },
  buttonLinks: {
    '& button': {
      height: '100%',
      padding: '1em',
      fontWeight: 600,
      width: '16rem',

      '&:hover': {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
}))

const UserInformationContent = memo(({ setOpen, rowData, users, setUsers }) => {
  const openSnackBar = useContext(SnackBarContext)
  const [policyHolderFirstName, setPolicyHolderFirstName] = useState('')
  const [policyHolderLastName, setPolicyHolderLastName] = useState('')
  const [policyHolderDob, setPolicyHolderDob] = useState('')
  const [policyHolderRelation, setPolicyHolderRelation] = useState('')

  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dob, setDob] = useState('')
  const [hasInsurance, setHasInsurance] = useState(false)
  const [provider, setProvider] = useState('')
  const [planNumber, setPlanNumber] = useState('')
  const [groupNumber, setGroupNumber] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')

  const [MeetingContent, setMeetingContent] = useState(false)
  const [currentDate, setCurrentDate] = useState(false)
  const [checked, setChecked] = useState(false)
  const [loading, setLoading] = useState(false)
  const classes = useStyles()

  useEffect(async () => {
    setFirstName(rowData.firstName)
    setLastName(rowData.lastName)
    setEmail(rowData.email)
    setHasInsurance(rowData.hasInsurance)
    setProvider(rowData.provider)
    setPlanNumber(rowData.planNumber)
    setGroupNumber(rowData.groupNumber)
    setPhone(rowData.phone)
    setAddress(rowData.address)
    setCity(rowData.city)
    setState(rowData.state)
    setZip(rowData.zip)
    setDob(moment(rowData.dob).format('YYYY-MM-DD'))

    try {
      setLoading(true)
      const res = await fetch('/api/getSingleUser', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify({ email: rowData.email }),
      })
      const data = await res.json()

      setChecked(data.isPolicyCardHolder)
      setPolicyHolderFirstName(data.policyHolderFirstName)
      setPolicyHolderLastName(data.policyHolderLastName)
      setPolicyHolderRelation(data.policyHolderRelation)

      if (data.policyHolderDob && data.policyHolderDob !== 'Invalid date')
        setPolicyHolderDob(moment(data.policyHolderDob).format('YYYY-MM-DD'))
    } catch (err) {
      throw err
    } finally {
      setLoading(false)
    }
  }, [rowData])

  useEffect(() => {
    const date = new Date()
    const dd = String(date.getDate()).padStart(2, '0')
    const mm = String(date.getMonth() + 1).padStart(2, '0')
    const yyyy = date.getFullYear()

    setCurrentDate(`${yyyy}-${mm}-${dd}`)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const rows = [...users]

    const updatedUser = {
      isPolicyCardHolder: checked,
      policyHolderFirstName,
      policyHolderLastName,
      policyHolderDob: moment(policyHolderDob).format('L'),
      policyHolderRelation,
      email,
      firstName,
      lastName,
      dob: moment(dob).format('L'),
      groupNumber,
      hasInsurance,
      phone,
      planNumber,
      provider,
      address,
      city,
      state,
      zip,
    }

    const newRows = rows.map((r) => {
      if (r.email === email) r = updatedUser
      return r
    })

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
      setUsers(newRows)
      setOpen(false)
      openSnackBar({
        message: 'Updated user information',
        snackSeverity: 'success',
      })
    }
  }

  return (
    <>
      {MeetingContent ? (
        <MeetingCreated
          name={`${firstName} ${lastName}`}
          email={email}
          phone={phone}
          setMeetingContent={setMeetingContent}
        />
      ) : !loading ? (
        <div>
          <Box display="flex" justifyContent="center" flexWrap="wrap">
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={6}>
                  <Box width="100%">
                    <FormControl component="fieldset">
                      <FormControlLabel
                        value="Terms"
                        control={
                          <Checkbox color="secondary" checked={checked} />
                        }
                        label="Policy Card Holder"
                        labelPlacement="end"
                        onChange={() => setChecked(!checked)}
                      />
                    </FormControl>
                  </Box>
                </Grid>
                <Collapse in={!checked} style={{ width: '100%' }}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={6}>
                      <TextField
                        className={classes.textFields}
                        type="text"
                        label="Policy Holder First Name"
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        value={policyHolderFirstName}
                        onChange={(e) =>
                          setPolicyHolderFirstName(e.target.value)
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <TextField
                        className={classes.textFields}
                        type="text"
                        label="Policy Holder Last Name"
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        value={policyHolderLastName}
                        onChange={(e) =>
                          setPolicyHolderLastName(e.target.value)
                        }
                      />
                    </Grid>{' '}
                    <Grid item xs={12} sm={12} md={6}>
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
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <FormControl
                        variant="outlined"
                        className={classes.textFields}
                      >
                        <InputLabel id="relation" color="secondary">
                          Policy Holder Relationship to Patient
                        </InputLabel>
                        <Select
                          labelId="relation"
                          label="Policy Holder Realtionship to Patient"
                          color="secondary"
                          value={policyHolderRelation}
                          onChange={(e) =>
                            setPolicyHolderRelation(e.target.value)
                          }
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
                    </Grid>
                  </Grid>
                </Collapse>
                <Grid item xs={12} sm={12} md={6}>
                  <Box className={classes.fieldBox}>
                    <TextField
                      value={firstName}
                      className={classes.textFields}
                      fullWidth
                      type="text"
                      label="First Name"
                      variant="outlined"
                      color="secondary"
                      required
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Box className={classes.fieldBox}>
                    <TextField
                      value={lastName}
                      className={classes.textFields}
                      fullWidth
                      type="text"
                      label="Last Name"
                      variant="outlined"
                      color="secondary"
                      required
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Box className={classes.fieldBox}>
                    <TextField
                      value={email}
                      className={classes.textFields}
                      fullWidth
                      type="text"
                      label="Email"
                      variant="outlined"
                      color="secondary"
                      disabled
                    />
                  </Box>
                </Grid>
              </Grid>

              {/* has insurance */}
              <Grid container spacing={1}>
                <Grid item sm={12}>
                  <Box mt="1em">
                    <FormControl component="fieldset">
                      <FormControlLabel
                        control={
                          <Checkbox color="secondary" checked={hasInsurance} />
                        }
                        label="Has Insurance"
                        labelPlacement="end"
                        onChange={() => setHasInsurance(!hasInsurance)}
                      />
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Box className={classes.fieldBox}>
                    <TextField
                      value={provider}
                      className={classes.textFields}
                      fullWidth
                      type="text"
                      label="Provider"
                      variant="outlined"
                      color="secondary"
                      required
                      onChange={(e) => setProvider(e.target.value)}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Box className={classes.fieldBox}>
                    <TextField
                      value={planNumber}
                      className={classes.textFields}
                      fullWidth
                      type="text"
                      label="Plan Number"
                      variant="outlined"
                      color="secondary"
                      required
                      onChange={(e) => setPlanNumber(e.target.value)}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Box className={classes.fieldBox}>
                    <TextField
                      value={groupNumber}
                      className={classes.textFields}
                      fullWidth
                      type="text"
                      label="Group Number"
                      variant="outlined"
                      color="secondary"
                      required
                      onChange={(e) => setGroupNumber(e.target.value)}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Box className={classes.fieldBox}>
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
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Box className={classes.fieldBox}>
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
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Box className={classes.fieldBox}>
                    <TextField
                      className={classes.textFields}
                      type="text"
                      label="Address"
                      variant="outlined"
                      color="secondary"
                      fullWidth
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Box className={classes.fieldBox}>
                    <TextField
                      className={classes.textFields}
                      type="text"
                      label="City"
                      variant="outlined"
                      color="secondary"
                      fullWidth
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  {' '}
                  <Box className={classes.fieldBox}>
                    <FormControl
                      variant="outlined"
                      className={classes.textFields}
                    >
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
                            {s.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Box className={classes.fieldBox}>
                    <TextField
                      className={classes.textFields}
                      type="number"
                      label="Zip"
                      variant="outlined"
                      color="secondary"
                      fullWidth
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Box my="2em">
                <Divider light />
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={5}>
                      <Button
                        color="secondary"
                        variant="outlined"
                        size="large"
                        onClick={() => setMeetingContent(true)}
                        style={{ marginRight: '10px' }}
                        fullWidth
                      >
                        Create Meeting
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={5}>
                      <Link
                        href={`/smsHistory/${rowData.id}`}
                        target={'_blank'}
                        passHref
                      >
                        <a
                          target="_blank"
                          rel="noreferrer"
                          style={{ textDecoration: 'none' }}
                        >
                          <Button
                            color="secondary"
                            size="large"
                            variant="outlined"
                            fullWidth
                          >
                            Send SMS
                          </Button>
                        </a>
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={12} md={4}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12}>
                      <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                        size="large"
                        fullWidth
                        disabled={
                          (!checked &&
                            (!policyHolderFirstName ||
                              !policyHolderLastName ||
                              !policyHolderDob ||
                              !policyHolderRelation)) ||
                          !firstName ||
                          !lastName ||
                          !dob ||
                          !groupNumber ||
                          !phone ||
                          !planNumber ||
                          !provider ||
                          !address ||
                          !city ||
                          !state ||
                          !zip
                        }
                      >
                        Update
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Box>
        </div>
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
    </>
  )
})

export default UserInformationContent

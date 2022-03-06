import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {
  Typography,
  Box,
  Button,
  TextField,
  MenuItem,
  IconButton,
  Tooltip,
  CircularProgress,
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import EditIcon from '@material-ui/icons/Edit'
import DateFnsUtils from '@date-io/date-fns'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'
import { Auth } from '@supabase/ui'
import Link from 'next/link'

import Container from '../../../../components/Container'
import MuiSelect from '../../../../components/MuiSelect'
import PhoneField from '../../../../components/PhoneField'
import providerOptions from '../../../../public/constants/providerOptions'

const useStyles = makeStyles((theme) => ({
  h2: {
    marginTop: '.5em',
  },
  facilityLink: {
    '& a': {
      textDecoration: 'none',
      color: theme.palette.secondary.main,
    },
  },
  textFields: {
    width: '100%',
    marginTop: '2em',
    maxWidth: '34rem',
  },
  buttonLinks: {
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

const UserDetailsPage = () => {
  const [editable, setEditable] = useState(false)
  const [userName, setUserName] = useState('')
  const [facilityId, setFacilityId] = useState('')
  const [facilityName, setFacilityName] = useState('')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    first_name: {
      type: 'textField',
      value: '',
      label: 'First Name',
      sequence: 10,
    },
    last_name: {
      type: 'textField',
      value: '',
      label: 'Last Name',
      sequence: 20,
    },
    room_number: {
      type: 'textField',
      value: '',
      label: 'Room Number',
      sequence: 30,
    },
    date_of_birth: {
      type: 'muiPicker',
      value: null,
      label: 'Date of birth',
      sequence: 40,
    },
    sex: {
      type: 'muiSelect',
      value: '',
      options: ['Male', 'Female'],
      label: 'Sex',
      required: true,
      sequence: 50,
    },
    policy_provider: {
      type: 'autoComplete',
      value: '',
      options: providerOptions,
      label: 'Insurance Policy Provider',
      sequence: 60,
    },
    policy_number: {
      type: 'textField',
      value: '',
      label: 'Insurance Policy Number',
      sequence: 70,
    },
    policy_image_front: {
      type: 'fileUpload',
      value: '',
      label: 'Upload Card Front Photo',
      sequence: 80,
    },
    policy_image_back: {
      type: 'fileUpload',
      value: '',
      label: 'Upload Card Back Photo',
      sequence: 90,
    },
    secondary_policy_provider: {
      type: 'autoComplete',
      value: '',
      options: providerOptions,
      label: 'Secondary Insurance Policy Provider',
      sequence: 100,
    },
    secondary_policy_number: {
      type: 'textField',
      value: '',
      label: 'Secondary Insurance Policy Number',
      sequence: 110,
    },
    secondary_policy_image_front: {
      type: 'fileUpload',
      value: '',
      label: 'Upload Secondary Card Front Photo',
      required: false,
      sequence: 120,
    },
    secondary_policy_image_back: {
      type: 'fileUpload',
      value: '',
      label: 'Upload Secondary Card Back Photo',
      required: false,
      sequence: 130,
    },
    poa_name: {
      type: 'textField',
      value: '',
      label: "Patient's Power of Attorney Name",
      sequence: 140,
    },
    poa_phone_number: {
      type: 'phoneNumber',
      value: '',
      label: "Patient's Power of Attorney Phone Number",
      sequence: 150,
    },
  })

  const classes = useStyles()
  const { user } = Auth.useUser()
  const router = useRouter()
  const { id: userId } = router.query

  useEffect(() => {
    let currentData = {}

    if (user && userId) {
      setLoading(true)
      fetch('/api/getFacilityPatientById', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify({ id: userId }),
      })
        .then((res) => res.json())
        .then((res) => {
          Object.keys(formData).forEach((key) => {
            currentData[key] = {
              ...formData[key],
              value: res[key],
            }
          })

          getFacility(res.facility_auth_id)

          setFormData(currentData)
          setUserName(
            `${currentData.last_name.value}, ${currentData.first_name.value}`
          )
        })
    }
  }, [user, userId])

  const getFacility = (id) => {
    if (id) {
      setLoading(true)
      fetch('/api/getFacilityById', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify({ id }),
      })
        .then((res) => res.json())
        .then((res) => {
          setFacilityId(id)
          setFacilityName(res.name)
          setLoading(false)
        })
    }
  }

  const handleUpdate = (args) => {
    const { val, objKey } = args

    const newFormData = {
      ...formData,
      [objKey]: {
        ...formData[objKey],
        value: val,
      },
    }

    setFormData(newFormData)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log('Form submitted', formData)
  }

  console.log('formData', formData)

  return (
    <Container>
      {formData && userName && facilityName && !loading ? (
        <>
          <Box>
            <Box display="flex" alignItems="end">
              <Typography variant="h2" className={classes.h2}>
                {userName}
              </Typography>
              <Tooltip title="Edit Patient Details">
                <IconButton
                  component="span"
                  onClick={() => setEditable(!editable)}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </Box>

            <Typography className={classes.facilityLink} variant="h6">
              <Link href={`/facility/admin/facility-details/${facilityId}`}>
                <a>Member of {facilityName}</a>
              </Link>
            </Typography>
          </Box>

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Box
              mt="1em"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              {Object.keys(formData).map((key) => {
                const field = formData[key]
                if (field.type === 'textField') {
                  console.log('field', field)
                  return (
                    <TextField
                      className={classes.textFields}
                      type="text"
                      label={field.label}
                      variant="outlined"
                      color="secondary"
                      value={field.value}
                      onChange={(e) =>
                        handleUpdate({ val: e.target.value, objKey: key })
                      }
                      disabled={!editable}
                      key={key}
                      fullWidth
                    />
                  )
                } else if (field.type === 'muiPicker') {
                  return (
                    <MuiPickersUtilsProvider utils={DateFnsUtils} key={key}>
                      <KeyboardDatePicker
                        autoComplete="nope"
                        className={classes.textFields}
                        inputVariant="outlined"
                        margin="normal"
                        label="Date of birth"
                        format="MM/dd/yyyy"
                        value={field.value}
                        onChange={(value) =>
                          handleUpdate({
                            val: moment(value).format('DD/MM/YYYY'),
                            objKey: key,
                          })
                        }
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        disabled={!editable}
                      />
                    </MuiPickersUtilsProvider>
                  )
                } else if (field.type === 'muiSelect') {
                  return (
                    <MuiSelect
                      name="sex"
                      defaultValue={field.value}
                      label={field.label}
                      value={field.value}
                      onChange={(e) =>
                        handleUpdate({ val: e.target.value, objKey: key })
                      }
                      key={key}
                      disabled={!editable}
                    >
                      {field.options.map((opt, index) => {
                        return (
                          <MenuItem key={index} value={opt}>
                            {opt}
                          </MenuItem>
                        )
                      })}
                    </MuiSelect>
                  )
                } else if (field.type === 'autoComplete') {
                  return (
                    <Autocomplete
                      className={classes.textFields}
                      options={field.options}
                      onChange={(e, value) =>
                        handleUpdate({ val: value, objKey: key })
                      }
                      key={key}
                      value={field.value}
                      freeSolo
                      disableClearable
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={field.label}
                          margin="normal"
                          color="secondary"
                          variant="outlined"
                          value={field.value}
                          onChange={(e, value) =>
                            handleUpdate({ val: value, objKey: key })
                          }
                          InputProps={{ ...params.InputProps, type: 'search' }}
                        />
                      )}
                      disabled={!editable}
                    />
                  )
                } else if (field.type === 'fileUpload') {
                  return (
                    <div style={{ width: '100%', maxWidth: '34rem' }} key={key}>
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="start"
                        style={{ marginTop: '2em' }}
                      >
                        <Typography
                          variant="h4"
                          style={{ marginBottom: '0.5em' }}
                        >
                          <strong>{field.label}</strong>
                        </Typography>
                        <Box display="flex">
                          <Button
                            variant="contained"
                            component="label"
                            style={{ marginRight: '0.5em' }}
                            disabled={!editable}
                          >
                            Upload File
                            <input
                              type="file"
                              accept="image/*"
                              hidden
                              onChange={(e) =>
                                handleUpdate({
                                  val: e.target.files[0],
                                  objKey: key,
                                })
                              }
                            />
                          </Button>
                          <p>
                            {field.value ? field.value.name : 'No file chosen'}
                          </p>
                        </Box>
                      </Box>
                    </div>
                  )
                } else if (field.type === 'phoneNumber') {
                  return (
                    <TextField
                      className={classes.textFields}
                      type="tel"
                      label={field.label}
                      variant="outlined"
                      color="secondary"
                      value={field.value}
                      onChange={(e) =>
                        handleUpdate({ val: e.target.value, objKey: key })
                      }
                      InputProps={{
                        inputComponent: PhoneField,
                      }}
                      key={key}
                      disabled={!editable}
                      fullWidth
                    />
                  )
                }
              })}
            </Box>

            <Box
              mt="2em"
              display="flex"
              justifyContent="center"
              flexWrap="wrap"
            >
              <Box m="1em" className={classes.buttonLinks}>
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  size="large"
                  disabled={!editable}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </form>
        </>
      ) : (
        <Box
          my="1em"
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

export default UserDetailsPage

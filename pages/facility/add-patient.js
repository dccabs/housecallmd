import { useState, useEffect, useContext } from 'react'
import { Typography, Box, Button, TextField, MenuItem, CircularProgress } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'

import Container from '../../components/Container'
import MuiSelect from '../../components/MuiSelect'
import PhoneField from '../../components/PhoneField'
import providerOptions from '../../public/constants/providerOptions'
import { supabase } from '../../utils/initSupabase';
import { Auth } from '@supabase/ui'

import { v4 as uuidv4 } from 'uuid'
import { SnackBarContext } from '../../components/SnackBar'
const NEXT_PUBLIC_SUPABASE_STORAGE_URL = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL;
import { useRouter} from 'next/router'

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


const addPatientPage = () => {
  const router = useRouter()
  const openSnackBar = useContext(SnackBarContext)
  const { user } = Auth.useUser()
  const [hasSecondary, setHasSecondary] = useState(false)
  const [formValid, setFormValid] = useState(false);
  const [loading, setLoading]= useState(false);
  const [formData, setFormData] = useState({
    firstName: {
      type: 'textField',
      value: '',
      label: 'First Name',
      required: true,
      key: 'first_name',
    },
    lastName: {
      type: 'textField',
      value: '',
      label: 'Last Name',
      required: true,
      key: 'last_name',
    },
    dateOfBirth: {
      type: 'muiPicker',
      value: null,
      label: 'Date of birth',
      required: true,
      key: 'date_of_birth'
    },
    sex: {
      type: 'muiSelect',
      value: '',
      options: ['Male', 'Female'],
      label: 'Sex',
      required: true,
      key: 'sex',
    },
    insurancePolicyProvider: {
      type: 'autoComplete',
      value: '',
      options: providerOptions,
      label: 'Insurance Policy Provider',
      required: true,
      key: 'policy_provider'
    },
    insurancePolicyNumber: {
      type: 'textField',
      value: '',
      label: 'Insurance Policy Number',
      required: true,
      key: 'policy_number',
    },
    uploadCardFront: {
      type: 'fileUpload',
      value: '',
      label: 'Upload Card Front Photo',
      required: true,
      key: 'policy_image_front',
    },
    uploadCardBack: {
      type: 'fileUpload',
      value: '',
      label: 'Upload Card Back Photo',
      required: true,
      key: 'policy_image_back',
    },
    secondaryInsurancePolicyProvider: {
      type: 'autoComplete',
      value: '',
      options: providerOptions,
      label: 'Secondary Insurance Policy Provider (Optional)',
      required: false,
      key: 'secondary_policy_provider',
    },
    secondaryInsurancePolicyNumber: {
      type: 'textField',
      value: '',
      label: 'Secondary Insurance Policy Number (Optional)',
      required: false,
      key: 'secondary_policy_number',
    },
    secondaryUploadCardFront: {
      type: 'fileUpload',
      value: '',
      label: 'Upload Card Front Photo (Optional)',
      required: false,
      key: 'secondary_policy_image_front',
    },
    secondaryUploadCardBack: {
      type: 'fileUpload',
      value: '',
      label: 'Upload Card Back Photo (Optional)',
      required: false,
      key: 'secondary_policy_image_back',
    },
    patientPowerOfAttorneyName: {
      type: 'textField',
      value: '',
      label: "Patient's Power of Attorney Name (Optional)",
      required: false,
      key: 'poa_name',
    },
    patientPowerOfAttorneyPhoneNumber: {
      type: 'phoneNumber',
      value: '',
      label: "Patient's Power of Attorney Phone Number (Optional)",
      required: false,
      key: 'poa_phone_number',
    },
  })

  const classes = useStyles()

  useEffect(() => {
    if (
      formData['secondaryInsurancePolicyProvider'].value ||
      formData['secondaryInsurancePolicyNumber'].value
    ) {
      setHasSecondary(true)
    } else {
      setHasSecondary(false)
      formData['secondaryUploadCardFront'].value = ''
      formData['secondaryUploadCardBack'].value = ''
    }
    validateForm();
  }, [formData])

  const validateForm = () => {
    console.log('validateForm')
    let isValid = true;
    console.log('formData', formData)

    Object.keys(formData).forEach(item => {
      console.log('item', item)
      if (formData[item].required && !formData[item].value) {
        isValid = false;
      }
    })
    setFormValid(isValid);
  }

  const returnToProfilePage = () => {
    router.push('/facility/profile')
  }

  const addPatient = async (newPatient) => {
    const payload = {};
    Object.keys(newPatient).forEach(item => {
      const key = newPatient[item].key;
      const value = newPatient[item].value;
      payload[key] = value;
    })

    payload.facility_auth_id = user.id;
    setLoading(true);

    fetch('/api/addFacilityPatient', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);

        if (data.error) {
          throw Error(data.error)
        } else {
          //console.log('success message')
          returnToProfilePage();
          openSnackBar({ message: "New Patient Added", snackSeverity: 'success' })
        }
      })
      .catch((error) => {
        openSnackBar({ message: error, snackSeverity: 'error' })
      })
  }


  const uploadPhoto = async (args) => {
    const { val, objKey } = args
    const type = val.type.split('/')[1];
    const uuid = uuidv4();
    const photo = val;
    const { data, error } = await supabase
      .storage
      .from('card-information')
      .upload(`card-information-images/facility/${uuid}.${type}`, photo, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      return res.status(401).json({ error: error.message })
    } else {
      const newFormData = {
        ...formData,
        [objKey]: {
          ...formData[objKey],
          value: data.Key,
        },
      }
      setFormData(newFormData)
    }
  }

  const handleUpdate = (args) => {
    const { val, objKey, type } = args
    if (type === 'fileUpload') {
      uploadPhoto(args)
      return false;
    }

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
    addPatient(formData);
  }

  return (
    <Container>

      <Typography variant="h2" className={classes.h2}>
        Add New Patient
      </Typography>

      {loading &&
      <Box
        my="8em"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
      }

      {!loading &&
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Box
          mt="1em"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Typography>
            Please enter all the information to add a new{' '}
            <strong style={{ color: '#0092b8' }}>patient</strong>. All fields
            are required unless marked optional.
          </Typography>
          {Object.keys(formData).map((key) => {
            const field = formData[key]
            if (field.type === 'textField') {
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
                />
              )
            } else if (field.type === 'fileUpload') {
              return (
                <div style={{ width: '100%', maxWidth: '34rem' }} key={key}>
                  {key === 'secondaryUploadCardFront' ||
                  key === 'secondaryUploadCardBack' ? (
                    hasSecondary && (
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
                        <Box>
                          <Button
                            variant="contained"
                            component="label"
                            style={{ marginRight: '0.5em' }}
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
                                  type: 'fileUpload',
                                })
                              }
                            />
                          </Button>
                          <div style={{position: 'relative', width: 500, marginTop: 10}}>
                            {field.value ?
                              <img
                                style={{maxWidth: 500}}
                                src={`${NEXT_PUBLIC_SUPABASE_STORAGE_URL}${field.value}`}
                                // layout="fill"
                              />
                              : 'No file chosen'}
                          </div>
                        </Box>
                      </Box>
                    )
                  ) : (
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
                      <Box>
                        <div style={{flex: 1}}>
                          <Button
                            variant="contained"
                            component="label"
                            style={{ marginRight: '0.5em' }}
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
                                  type: 'fileUpload',
                                })
                              }
                            />
                          </Button>
                        </div>
                        <div style={{position: 'relative', width: 500, marginTop: 10}}>
                          {field.value ?
                            <img
                              style={{maxWidth: 500}}
                              src={`${NEXT_PUBLIC_SUPABASE_STORAGE_URL}${field.value}`}
                            />
                            : 'No file chosen'}
                        </div>
                      </Box>
                    </Box>
                  )}
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
                  fullWidth
                />
              )
            }
          })}
        </Box>

        <Box mt="2em" display="flex" justifyContent="center" flexWrap="wrap">
          <Box m="1em" className={classes.buttonLinks}>
            <Button
              onClick={() => router.back()}
              color="secondary"
              variant="contained"
            >
              Back
            </Button>
          </Box>
          <Box m="1em" className={classes.buttonLinks}>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              size="large"
              disabled={!formValid}
            >
              Continue
            </Button>
          </Box>
        </Box>
      </form>
      }

    </Container>
  )
}

export default addPatientPage

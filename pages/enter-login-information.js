import { useContext, useState, useRef, useEffect } from 'react'

import {
  Typography,
  Box,
  Button,
  TextField,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
} from '@material-ui/core'
import { VisibilityOff, Visibility } from '@material-ui/icons'
import Container from '../components/Container'

import { SnackBarContext } from '../components/SnackBar'

import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import useStore from '../zustand/store'
import { supabase } from '../utils/initSupabase'
import { Auth } from '@supabase/ui'
import moment from 'moment'

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
  const form = useRef(null)
  const classes = useStyles()
  const router = useRouter()
  const { session } = Auth.useUser()
  const openSnackBar = useContext(SnackBarContext)

  const [fieldType, setFieldType] = useState('password')
  const [confirmFieldType, setConfirmFieldType] = useState('password')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordNotMatch, setPasswordNotMatch] = useState(false)
  const [checked, setChecked] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [localEmail, setLocalEmail] = useState('')
  const [localId, setLocalId] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    hasInsurance,
    isPolicyCardHolder,
    policyHolderFirstName,
    policyHolderLastName,
    policyHolderDob,
    policyHolderRelation,
    provider,
    planNumber,
    groupNumber,
    visitChoice,
    firstName,
    lastName,
    email,
    address,
    city,
    selectedFile,
    state,
    zip,
    phone,
    dob,
    setEmail,
  } = useStore()

  useEffect(async () => {
    if (isSuccess) {
      try {
        console.log(selectedFile);

        let updatedUser;
        let uploadedData;

        if (selectedFile) {
          uploadedData = await handleUploadImage(selectedFile);
          
        }

        if (uploadedData && uploadedData.Key) {
          updatedUser = {
            card_information_image: uploadedData.Key,
            email,
          }
      
            const res = await fetch(`/api/updateUser`, {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(updatedUser),
            })

            console.log('res', res);
        } 
        
          
        } catch (err) {
          console.log(err);
          openSnackBar({ message: err, snackSeverity: 'error' })
      } finally {
        router.push('/visit-choice')
        // router.back();
      }
    }
  }, [isSuccess])

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

  const handleUploadImage =  async (image) => {
    try {

      if (image) {
        const file = image;
        const fileExt = file.name.split('.').pop()
        const fileName = `card-information-images/${Math.random()}.${fileExt}`
        const filePath = `${fileName}`
  
        let {data:uploadData, error: uploadError } = await supabase.storage
          .from('card-information')
          .upload(filePath, file)
  
        if (uploadError) {
          throw uploadError
        }
  
        console.log('uploadData', uploadData)
        
  
        return uploadData;
        
      }

    } catch (error) {
      openSnackBar({ message: error, snackSeverity: 'error' })
    } finally {
      // setUploading(false)
    }
  }

  const addUser = async (newUser) => {
    //setOpen(true)
    try {
      const userResult = await fetch('/api/addUser', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newUser: newUser }),
      });
  
      if (userResult && userResult.error) {
        console.log('throw');
        throw Error(data.error)
      } else {
        setIsSuccess(true);
      }

    } catch (error) {
      console.log('Fetch catch error', error);
      openSnackBar({ message: error, snackSeverity: 'error' })
    }
  }


  const loginUser = () => {
    supabase.auth.signUp({ email: localEmail, password }).then((response) => {
      response.error
        ? openSnackBar({
            message: response.error.message,
            snackSeverity: 'error',
          })
        : setToken(response)
    })
  }

  const setToken = async (response) => {
    if (!response.data.access_token) {
      return
    } else {
      await setEmail(response.data.user.email)
      await setLocalEmail(response.data.user.email)
      await setLocalId(response.data.user.id)
      // TODO: fix this timeout
      openSnackBar({
        message: 'Logged in as ' + response.data.user.email,
        snackSeverity: 'success',
      })
      let newUser = {
        hasInsurance,
        isPolicyCardHolder,
        policyHolderFirstName,
        policyHolderLastName,
        policyHolderDob: moment(policyHolderDob).format('L'),
        policyHolderRelation,
        provider,
        planNumber,
        groupNumber,
        firstName,
        lastName,
        email: response.data.user.email,
        address,
        city,
        state,
        zip,
        dob: moment(dob).format('L'),
        phone: phone.replace(/\s/g, ''),
        uuid: response.data.user.id
      }
      addUser(newUser)
    }
  }

  return (
    <Container>
      <Box>
        <Typography variant="h2" className={classes.h2}>
          Create your account
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
                label="Email"
                variant="outlined"
                color="secondary"
                required
                onChange={handleEmailUpdate}
              />
              <FormControl className={classes.textFields} variant="outlined">
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
          </Box>
        </form>
      </Box>
    </Container>
  )
}

export default Contact

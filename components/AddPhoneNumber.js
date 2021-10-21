import { useState } from 'react'
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
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import PhoneField from './PhoneField'

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

const AddPhoneNumber = ({
  setOpen,
  phoneNumbers,
  setPhoneNumbers,
  openSnackBar,
}) => {
  const [phone, setPhone] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const classes = useStyles()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      phoneNumber: phone,
      firstName,
      lastName,
      isActive: true,
    }

    try {
      const res = await fetch('/api/addPhone', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await res.clone().json()

      setPhoneNumbers([...phoneNumbers, data[0]])
    } catch (error) {
      openSnackBar({ message: error, snackSeverity: 'error' })
    } finally {
      setOpen(false)
      openSnackBar({
        message: 'New phone number added',
        snackSeverity: 'success',
      })
    }
  }

  return (
    <div>
      <Box display="flex" justifyContent="center" flexWrap="wrap">
        <form onSubmit={handleSubmit}>
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
              required
            />
          </Box>

          <Box className={classes.fieldBox}>
            <TextField
              className={classes.textFields}
              fullWidth
              type="text"
              label="First Name"
              variant="outlined"
              color="secondary"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </Box>

          <Box className={classes.fieldBox}>
            <TextField
              className={classes.textFields}
              fullWidth
              type="text"
              label="Last Name"
              variant="outlined"
              color="secondary"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </Box>

          <Box my="2em" className={classes.buttonLinks}>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              disabled={!phone || !firstName || !lastName}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </div>
  )
}

export default AddPhoneNumber

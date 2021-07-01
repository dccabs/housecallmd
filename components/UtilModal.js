import { useState, useEffect } from 'react'
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Modal,
} from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person'
import { makeStyles } from '@material-ui/core/styles'

import MeetingCreated from './MeetingCreated'
import SendSMS from './SendSMS'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '8em auto',
    padding: '4em',
    maxWidth: '50rem',
    outline: 'none',
  },
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

const UtilModal = ({ open, setOpen, rowData, users, setUsers }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [hasInsurance, setHasInsurance] = useState('')
  const [provider, setProvider] = useState('')
  const [planNumber, setPlanNumber] = useState('')
  const [groupNumber, setGroupNumber] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [MeetingContent, setMeetingContent] = useState(false)
  const [MessageContent, setMessageContent] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    setName(rowData.name)
    setEmail(rowData.email)
    setHasInsurance(rowData.hasInsurance)
    setProvider(rowData.provider)
    setPlanNumber(rowData.planNumber)
    setGroupNumber(rowData.groupNumber)
    setPhone(rowData.phone)
    setAddress(rowData.address)
  }, [rowData])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const rows = [...users]
    const updatedRow = {
      name,
      email,
      hasInsurance,
      provider,
      planNumber,
      groupNumber,
      phone,
      address,
    }
    const newRows = rows.map((r) => {
      if (r.email === email) r = updatedRow
      return r
    })

    const updatedUser = {
      address: address.split(', ')[0],
      city: address.split(', ')[1],
      firstName: name.split(', ')[1],
      email,
      groupNumber,
      hasInsurance: hasInsurance === 'Yes' ? true : false,
      lastName: name.split(', ')[0],
      phone,
      planNumber,
      provider,
      state: address.split(', ')[2],
      zip: address.split(', ')[3],
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
      console.log(error)
    }

    setUsers(newRows)
    setOpen(false)
  }

  const reset = () => {
    setOpen(false)
    setMeetingContent(false)
    setMessageContent(false)
  }

  return (
    <Modal open={open} onClose={reset} style={{ overflow: 'scroll' }}>
      <Paper elevation={3} className={classes.root}>
        {MeetingContent ? (
          <MeetingCreated setMeetingContent={setMeetingContent} />
        ) : MessageContent ? (
          <SendSMS phone={phone} setMessageContent={setMessageContent} />
        ) : (
          <Box>
            <Box display="flex" alignItems="center">
              <PersonIcon fontSize="large" style={{ marginRight: '0.3em' }} />
              <Typography variant="h4" align="left">
                Update User Information
              </Typography>
            </Box>
            <Box
              mt="2em"
              display="flex"
              justifyContent="center"
              flexWrap="wrap"
            >
              <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <Box className={classes.fieldBox}>
                  <TextField
                    value={name}
                    className={classes.textFields}
                    fullWidth
                    type="text"
                    label="Name"
                    variant="outlined"
                    color="secondary"
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </Box>

                <Box className={classes.fieldBox}>
                  <TextField
                    value={email}
                    className={classes.textFields}
                    fullWidth
                    type="text"
                    label="Email"
                    variant="outlined"
                    color="secondary"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                  />
                </Box>

                <Box className={classes.fieldBox}>
                  <TextField
                    value={hasInsurance}
                    className={classes.textFields}
                    fullWidth
                    type="text"
                    label="Has Insurance"
                    variant="outlined"
                    color="secondary"
                    required
                    onChange={(e) => setHasInsurance(e.target.value)}
                  />
                </Box>

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

                <Box className={classes.fieldBox}>
                  <TextField
                    value={phone}
                    className={classes.textFields}
                    fullWidth
                    type="text"
                    label="Phone"
                    variant="outlined"
                    color="secondary"
                    required
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Box>

                <Box className={classes.fieldBox}>
                  <TextField
                    value={address}
                    className={classes.textFields}
                    fullWidth
                    type="text"
                    label="Address"
                    variant="outlined"
                    color="secondary"
                    required
                    onChange={(e) => setAddress(e.target.value)}
                  />
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
                    >
                      Update
                    </Button>
                  </Box>
                </Box>
              </form>
            </Box>
            <Box
              className={classes.buttonLinks}
              display="flex"
              justifyContent="center"
            >
              <Button
                color="secondary"
                variant="contained"
                onClick={() => setMeetingContent(true)}
              >
                Create Meeting
              </Button>
            </Box>

            <Box
              m="1em"
              className={classes.buttonLinks}
              display="flex"
              justifyContent="center"
            >
              <Button
                color="secondary"
                variant="contained"
                onClick={() => setMessageContent(true)}
              >
                Send SMS
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Modal>
  )
}

export default UtilModal

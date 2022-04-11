import { useContext, useEffect, useState } from 'react'
import {
  Typography,
  Box,
  CircularProgress,
  Button,
  Modal,
  TextField,
} from '@material-ui/core'
import { SnackBarContext } from 'components/SnackBar'
import { makeStyles } from '@material-ui/core/styles'

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
}))

const MessageModal = (
  {
    title,
    senderId,
    recipientId,
    patientId,
    patientName,
    open,
    onClose,
    callbackFn,
  }
  ) => {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const openSnackBar = useContext(SnackBarContext)


  const sendMessage = () => {
    const payload = {
      created_at: new Date(),
      sender: senderId,
      recipient: recipientId,
      patient_id: patientId,
      message,
      viewed_by_recipient: false,
    }
    setLoading(true)

    fetch('/api/addFacilityMessage', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false)
        onClose()
        callbackFn();
        if (data) {
          openSnackBar({
            message: 'Message successfully sent',
            // error: 'error',
          })
          onClose()
        } else {
          openSnackBar({
            message: 'There was an error.  Please try again later',
            error: 'error',
          })
        }
      })
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        style={{
          backgroundColor: '#fff',
          maxWidth: 700,
          width: '90%',
          margin: '10% auto',
          padding: 40,
          borderRadius: 10,
        }}
      >
        <Typography
          variant="h5"
          className={classes.h2}
          style={{ marginBottom: '1em' }}
        >
          <div>
            {title}:
          </div>
          {patientId &&
            <div style={{marginTop: 20}}>{patientName}</div>
          }
        </Typography>
        <TextField
          placeholder="Type your message here and click to send button."
          multiline
          rows={8}
          maxRows={8}
          fullWidth
          variant="outlined"
          onChange={(e) => setMessage(e.target.value)}
          disabled={loading}
        />
        <Button
          disabled={!message || loading}
          onClick={sendMessage}
          style={{ marginTop: '1em' }}
          size="small"
          variant="contained"
          color="secondary"
        >
          Send Message
        </Button>
        <div>
          {loading && (
            <Box
              my="2em"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <span style={{marginRight: 10}}>Sending Message</span> <CircularProgress />
            </Box>
          )}
        </div>
      </Box>
    </Modal>
  )
}

export default MessageModal

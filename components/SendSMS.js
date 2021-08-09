import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Button,
  TextField,
  CircularProgress,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  textFields: {
    width: '100%',
    maxWidth: '34rem',
    marginBottom: '2em',
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

const SendSMS = ({ phone, setMessageContent }) => {
  const [number, setNumber] = useState('')
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    phone && setNumber(phone)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const message = body.concat(
      '\n\nDO NOT REPLY TO THIS TEXT MESSAGE. MESSAGES TO THIS NUMBER ARE NOT MONITORED.'
    )

    try {
      setLoading(true)
      const res = await fetch('/api/sendMessage', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to: number, body: message }),
      })

      const data = await res.json()

      if (data.success) {
        setSuccess(true)
        setBody('')
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box className={classes.textFields}>
            <Typography style={{ marginBottom: '1em' }}>To: </Typography>
            <TextField
              variant="outlined"
              value={number}
              label="Please enter patient phone number"
              onChange={(e) =>
                setNumber(e.target.value.replace(/[\[\]'() ]+/g, ''))
              }
              fullWidth
            />
          </Box>

          <Box className={classes.textFields}>
            <Typography style={{ marginBottom: '1em' }}>Message: </Typography>
            <TextField
              multiline
              rows={6}
              variant="outlined"
              onChange={(e) => setBody(e.target.value)}
              fullWidth
            />
          </Box>

          {success ? (
            <Typography
              variant="h4"
              align="center"
              style={{ color: '#399945' }}
            >
              Message Sent!
            </Typography>
          ) : loading ? (
            <Box
              my="1em"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <CircularProgress />
            </Box>
          ) : (
            <Box className={classes.buttonLinks}>
              <Button
                type="submit"
                variant="contained"
                value={body}
                color="secondary"
              >
                Send
              </Button>
            </Box>
          )}
        </Box>
      </form>
      <Box
        m="1em"
        className={classes.buttonLinks}
        display="flex"
        justifyContent="center"
      >
        <Button
          color="secondary"
          variant="contained"
          onClick={() => setMessageContent(false)}
        >
          Back
        </Button>
      </Box>
    </Box>
  )
}

export default SendSMS

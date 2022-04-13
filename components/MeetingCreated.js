import { useState, useEffect, useContext } from 'react'
import { Box, Typography, Button, CircularProgress } from '@material-ui/core'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import { Auth } from '@supabase/ui'
import { SnackBarContext } from '../components/SnackBar'
import config from '../utils/config';

const useStyles = makeStyles((theme) => ({
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

const MeetingCreated = ({ name, email, phone, setMeetingContent, facilityName, residentName }) => {

  const [roomId, setRoomId] = useState()
  const [roomUrl, setRoomUrl] = useState()
  const [loading, setLoading] = useState(false)
  const [loadingSMS, setLoadingSMS] = useState(false)
  const [success, setSuccess] = useState(false)
  const classes = useStyles()
  const [message, setMessage] = useState('Default Message');
  const openSnackBar = useContext(SnackBarContext)
  const { user } = Auth.useUser()

  useEffect(async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/addMeeting', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user }),
      })
      const data = await res.json()

      setRoomId(data[0].cuid)
      setRoomUrl(`${config.default.host}/room/${data[0].cuid}`)
    } catch (err) {
      openSnackBar({
        message: err,
        snackSeverity: 'error',
      })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (roomUrl) {
      if (facilityName) {
        setMessage(`HousecallMD has set up your meeting room for ${residentName}, please click on the link to join the meeting.\n ${roomUrl}\n\nDO NOT REPLY TO THIS TEXT MESSAGE. MESSAGES TO THIS NUMBER ARE NOT MONITORED.`);
      } else {
        setMessage(`HousecallMD has set up your meeting room, please click on the link to join the meeting.\n ${roomUrl}\n\nDO NOT REPLY TO THIS TEXT MESSAGE. MESSAGES TO THIS NUMBER ARE NOT MONITORED.`)
      }
    }
  }, [roomUrl])

  const sendMeetingLink = () => {
    sendEmail()
    if (phone) {
      sendSMS()
    }
  }

  const sendEmail = async () => {
    const payload = {
      name,
      email,
      roomUrl,
      message: facilityName ? `HousecallMD has set up your meeting room for ${residentName}, please click on the link to join the meeting.` : 'HousecallMD has set up your meeting room, please click on the link to join the meeting.',
    }

    try {
      const res = await fetch(`/api/sendMailToClient`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
    } catch (err) {
      throw err
    }
  }
 
  const sendSMS = async () => {
    try {
      setLoadingSMS(true)
      const res = await fetch('/api/sendMessage', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to: phone, body: message }),
      })

      const data = await res.json()

      if (data.success) {
        setSuccess(true)
      }
    } catch (err) {
      openSnackBar({
        message: err,
        snackSeverity: 'error',
      })
    } finally {
      setLoadingSMS(false)
    }
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <MeetingRoomIcon
        style={{ height: '10rem', width: '10rem', color: '#b0b0b0' }}
      />
      {!loading ? (
        <>
          <Box my="1em">
            <Typography variant="h4">New meeting room created</Typography>
            <Link href={`${config.default.host}/room/${roomId}`}>
              <a target="_blank">
                <Typography variant="h6" align="center">
                  {roomUrl}
                </Typography>
              </a>
            </Link>
          </Box>

          {success ? (
            <Box my="1em">
              <Typography
                variant="h4"
                align="center"
                style={{ color: '#399945' }}
              >
                Message Sent!
              </Typography>
            </Box>
          ) : loadingSMS ? (
            <Box
              my="1em"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <CircularProgress />
            </Box>
          ) : (
            <Box
              m="1em"
              className={classes.buttonLinks}
              display="flex"
              justifyContent="center"
            >
              <Button
                color="secondary"
                variant="contained"
                onClick={() => sendMeetingLink()}
              >
                Send Meeting Link To {facilityName ? facilityName : 'Patient'}
              </Button>
            </Box>
          )}
        </>
      ) : (
        <Box
          fullWidth
          // my="1em"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress />
        </Box>
      )}

      <Box
        className={classes.buttonLinks}
        display="flex"
        justifyContent="center"
      >
        <Button
          color="secondary"
          variant="contained"
          onClick={() => setMeetingContent(false)}
        >
          Back
        </Button>
      </Box>
    </Box>
  )
}

export default MeetingCreated

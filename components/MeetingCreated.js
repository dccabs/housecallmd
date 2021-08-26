import { useState, useEffect, useContext } from 'react'
import { Box, Typography, Button, CircularProgress } from '@material-ui/core'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import { Auth } from '@supabase/ui'
import { SnackBarContext } from '../components/SnackBar'

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

const MeetingCreated = ({ name, email, phone, setMeetingContent }) => {
  const [roomId, setRoomId] = useState()
  const [roomUrl, setRoomUrl] = useState()
  const [loading, setLoading] = useState(false)
  const [loadingSMS, setLoadingSMS] = useState(false)
  const [success, setSuccess] = useState(false)
  const classes = useStyles()
  const message = `HousecallMD has set up your meeting room, please click on the link to join the meeting.\n${process.env.NEXT_PUBLIC_SITE_URL}/room/${roomId}\n\nDO NOT REPLY TO THIS TEXT MESSAGE. MESSAGES TO THIS NUMBER ARE NOT MONITORED.`
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
      setRoomUrl(`${process.env.NEXT_PUBLIC_SITE_URL}/room/${data[0].cuid}`)
    } catch (err) {
      openSnackBar({
        message: err,
        snackSeverity: 'error',
      })
    } finally {
      setLoading(false)
    }
  }, [])

  const sendMeetingLink = () => {
    sendEmail()
    sendSMS()
  }

  const sendEmail = async () => {
    const payload = {
      name,
      email,
      roomUrl,
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
        body: JSON.stringify({ to: phone, body: message, user }),
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
            <Link href={`${process.env.NEXT_PUBLIC_SITE_URL}/room/${roomId}`}>
              <a target="_blank">
                <Typography variant="h6" align="center">
                  {roomUrl}
                </Typography>
              </a>
            </Link>
          </Box>

          {success ? (
            <Typography
              variant="h4"
              align="center"
              style={{ color: '#399945' }}
            >
              Message Sent!
            </Typography>
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
                onClick={sendMeetingLink}
              >
                Send Meeting Link To Patient
              </Button>
            </Box>
          )}
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

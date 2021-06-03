import { useState, useEffect } from 'react'
import { Box, Typography, Button, CircularProgress } from '@material-ui/core'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'

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

const MeetingCreated = ({ setShowOtherContent }) => {
  const [roomId, setRoomId] = useState()
  const [loading, setLoading] = useState(false)
  const classes = useStyles()

  useEffect(async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/addMeeting`)
      const data = await res.json()

      setRoomId(data[0].cuid)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }, [])

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
        <Box my="1em">
          <Typography variant="h4">New meeting room created</Typography>
          <Link href={`${process.env.NEXT_PUBLIC_SITE_URL}/${roomId}`}>
            <a target="_blank">
              <Typography
                variant="h6"
                align="center"
              >{`${process.env.NEXT_PUBLIC_SITE_URL}/${roomId}`}</Typography>
            </a>
          </Link>
        </Box>
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
        m="1em"
        className={classes.buttonLinks}
        display="flex"
        justifyContent="center"
      >
        <Button color="secondary" variant="contained">
          Send Meeting Link To Patient
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
          onClick={() => setShowOtherContent(false)}
        >
          Back
        </Button>
      </Box>
    </Box>
  )
}

export default MeetingCreated

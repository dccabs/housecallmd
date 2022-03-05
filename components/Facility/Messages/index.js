import { useContext, useEffect, useState } from 'react'
import { NextSeo } from 'next-seo'
import { Typography, Box, CircularProgress, Button } from '@material-ui/core'
import Container from '../../../components/Container'
import { makeStyles } from '@material-ui/core/styles'
import { SnackBarContext } from '../../../components/SnackBar'
import { Auth } from '@supabase/ui'
// import MaterialTable from 'material-table'
// import Link from 'next/link'
import CustomModal from '../../CustomModal/CustomModal'
import { useRouter } from 'next/router'
import { AssignmentTurnedIn as AssignmentTurnedInIcon } from '@material-ui/icons'
import CompletedAppointmentsModalContent from '../../CompletedAppointmentsModalContent'

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

const Messages = () => {
  const router = useRouter()
  const classes = useStyles()
  const [reply, setReply] = useState(false)
  const [sendMessage, setSendMessage] = useState(false)
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState([])

  const { user } = Auth.useUser()

  useEffect(() => {
    console.log('messages')
    getAllMessages()
  }, [])

  const openSnackBar = useContext(SnackBarContext)

  const getAllMessages = () => {
    const payload = {
      // facilityId: '2bcc2d5d-7ddf-4b6a-86cb-714f1d348213',
      // patientId: 3,
    }

    fetch('/api/getAllFacilityMessages', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data)
        if (data) {
          setMessages(data)
          setLoading(false)
        } else {
          openSnackBar({
            message: 'There was an error.  Please try again later',
            error: 'error',
          })
          setLoading(false)
        }
      })
  }

  function handleCreateNewMessage() {
    setReply(true)
  }

  function handleSendMessage() {
    setSendMessage(true)
  }

  return (
    <>
      <Container>
        <Box>
          <Typography variant="h2" className={classes.h2}>
            Messages
          </Typography>
          <div style={{ margin: '4em 0 1em' }}>
            <Typography variant="h5">All messages</Typography>
          </div>
          <div>
            {messages &&
              messages.map((entry, index) => {
                return (
                  <div
                    style={{
                      background: entry.sentFromHouseCall
                        ? 'lightBlue'
                        : '#e3e3e3',
                      padding: 15,
                      borderRadius: 10,
                      marginBottom: 20,
                    }}
                    key={`message-${index}`}
                  >
                    <div>
                      <a onClick={handleSendMessage} href="#">
                        Send
                      </a>
                    </div>
                    <div>
                      <strong>From:</strong>{' '}
                      <strong>
                        {entry.sentFromHouseCall ? 'HOUSECALLMD:' : null}
                      </strong>
                      {entry?.sender?.name}
                    </div>
                    <div>
                      <strong>Message:</strong> {entry.message}
                    </div>
                    <div>
                      <strong>Patient: </strong> {entry.patient_name}
                    </div>
                    <div>
                      <a onClick={handleCreateNewMessage} href="#">
                        Reply
                      </a>
                    </div>
                  </div>
                )
              })}
          </div>
        </Box>
        <CustomModal
          open={reply}
          title={'Reply'}
          onClose={() => setReply(false)}
          icon={<AssignmentTurnedInIcon fontSize="small" />}
          component={<div>Modal data</div>}
        />

        <CustomModal
          open={sendMessage}
          title={'Send Message'}
          onClose={() => setSendMessage(false)}
          icon={<AssignmentTurnedInIcon fontSize="small" />}
          component={<div>Send Message Modal</div>}
        />
      </Container>
    </>
  )
}

export default Messages

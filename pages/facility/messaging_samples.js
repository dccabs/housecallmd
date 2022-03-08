import { useContext, useEffect, useState } from 'react'
import { NextSeo } from 'next-seo'
import {
  Typography,
  Box,
  CircularProgress,
  Button,
  TextField,
} from '@material-ui/core'
import Container from '../../components/Container'
import { makeStyles } from '@material-ui/core/styles'
import { SnackBarContext } from '../../components/SnackBar'
import { Auth } from '@supabase/ui'
import MaterialTable from 'material-table'
import Link from 'next/link';
import { useRouter } from 'next/router'
import Message from '../../components/Facility/Message'

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
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');


  const { user } = Auth.useUser()


  useEffect(() => {
    console.log('messages')
    getAllMessages();
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
    }).then((res) => res.json())
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

  const sendMessage = () => {
    /// payload should be like this
    /*
    newMessage = {
      created_at: new Date(),
      sender: string uuid,
      recipient: string uuid or null if housecall md
      patient_id: number or null if no patient associated
      message: string,
      viewed_by_recipient: false,
    }
    */
    const payload = {
      created_at: new Date(),
      sender: '2bcc2d5d-7ddf-4b6a-86cb-714f1d348213',
      recipient: null,
      patient_id: 3,
      message,
      viewed_by_recipient: false,
    }

    fetch('/api/addFacilityMessage', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify(payload),
    }).then((res) => res.json())
      .then((data) => {
        console.log('data', data)
        if (data) {
          //setMessages(data)
          openSnackBar({
            message: 'Message successfully sent',
            // error: 'error',
          })
          setLoading(false)
          getAllMessages();
        } else {
          openSnackBar({
            message: 'There was an error.  Please try again later',
            error: 'error',
          })
         // setLoading(false)
        }
      })

    console.log('payload', payload)
  }

  return (
    <>
      <Container>
        <Box>
          <Typography variant="h2" className={classes.h2}>
            Messaging Samples
          </Typography>
          <div style={{margin: '4em 0 1em'}}>
            <Typography variant="h5">
              All messages
            </Typography>
          </div>
          <Box style={{marginBottom: '2em'}}>
            <TextField
              placeholder="MultiLine with rows: 2 and rowsMax: 4"
              multiline
              rows={2}
              maxRows={4}
              fullWidth
              variant="outlined"
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              disabled={!message}
              onClick={sendMessage}
              style={{marginTop: '1em'}} size="small" variant="contained" color="secondary">Send Message</Button>
          </Box>
          <div>
            {messages && messages.map((entry, index) => {
              return (
                <Message entry={entry} index={index} />
              )
            })}
          </div>
        </Box>
      </Container>
    </>
  )
}

export default Messages

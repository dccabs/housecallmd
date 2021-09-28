import React, { memo, useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import MessageList from '../../components/MessageList'
import PhoneNumberList from '../../components/PhoneNumberList'
import { SnackBarContext } from '../../components/SnackBar'
import SkeletonChatPage from '../../components/SkeletonChatPage'
import {
  Typography,
  TextField,
  makeStyles,
  Container,
  Grid,
  Divider,
  Button,
  CircularProgress,
} from '@material-ui/core'
import { Auth } from '@supabase/ui'
import {
  Send as SendIcon,
  ChatBubbleOutlineTwoTone,
} from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  wrapIcon: {
    marginTop: '2rem',
    alignItems: 'center',
    display: 'inline-flex',
    '@media screen and (max-width: 767px)': {
      marginTop: '1rem',
    },
  },
  textField: {
    width: '100%',
    borderWidth: 0,
    borderColor: 'transparent',
  },
  
  gridItem: {
    paddingTop: 12,
    paddingBottom: 12,
  },
  gridItemChatList: {
    overflow: 'auto',
    height: '60vh',
  },
  buttonContainer: {
    '@media screen and (max-width: 767px)': {
      marginTop: 12,
      textAlign: 'right',
    },
  },
  gridItemMessage: {
    '@media screen and (max-width: 767px)': {
      backgeoundColor: '#fbfbfb',
    },
    marginTop: 12,
    marginBottom: 12,
  },
  mainGrid: {
    marginTop: '2em',
    marginBottom: '3em',
    borderWidth: 1,
    '@media screen and (max-width: 767px)': {
      marginTop: '1em',
      marginBottom: '1em',
    },
  },
  h4: {
    marginTop: 0,
  },
}))

const SmsHistoryPage = memo((props) => {
  const { userId } = props

  const [loading, setLoading] = useState(false)
  const [sendingMessage, setSendingMessage] = useState(false)
  const [success, setSuccess] = useState(false)
  const [authorized, setAuthorized] = useState(false)
  const [smsLogMessages, setSmsLogMessages] = useState(false)
  const [bodyMessage, setBodyMessage] = useState('')
  const [number, setNumber] = useState('')
  const classes = useStyles()
  const openSnackBar = useContext(SnackBarContext)
  const { user } = Auth.useUser()

  useEffect(() => {
    if (user && userId) {
      setLoading(true)
      fetch('/api/getSingleUser', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: user.email}),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.role === 'admin') {
            setAuthorized(true)
            setNumber(res.phone)
            setLoading(false)
          } else {
            openSnackBar({
              message: 'You are not authorized to view this page',
              snackSeverity: 'error',
            })
          }
        })
      
      const userById = { id: userId }

      const userWhoOwnSms = fetch('/api/getUserById', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userById),
      })
      .then((res) => res.json())
        .then((res) => {
          if (res) {
            console.log(user);
            setNumber(res.phone)
          } 
        })
    }

  }, [user, userId])

  if (loading) {
    return <SkeletonChatPage />
  }

  const handleOnSubmit = async (e) => {
    await e.preventDefault()

    try {
      setSendingMessage(true)

      const res = await fetch('/api/sendMessage', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: number,
          body: bodyMessage,
          isFromSmsHistory: true,
          user: {...user, userId},
        }),
      })

      const data = await res.json()

      if (data.success) {
        setSuccess(true)
        setBodyMessage('')
      }
    } catch (err) {
      console.log(err)
    } finally {
      setSendingMessage(false)
    }
  }

  return (
    <>
      {authorized && (
        <Container component="main" maxWidth="md">
          <Typography variant="h4" align="left" className={classes.wrapIcon}>
            <ChatBubbleOutlineTwoTone color="secondary" />
            SMS History
          </Typography>
          <form>
            <Grid container direction="row" justifyContent="center" className={classes.mainGrid}>
              {/* <PhoneNumberList user={user} /> */}
              <Grid item xs={12} sm={12} md={12}>
                <Grid className={classes.gridItemChatList}>
                  <MessageList user={{ ...user, userId }} />
                </Grid>
                <Divider />
                <Grid
                  container
                  direction="row"
                  className={classes.gridItemMessage}
                >
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={1}
                  >
                    <Grid
                      item
                      xs={12}
                      sm={10}
                      md={10}
                      className={classes.textFieldContainer}
                    >
                      <TextField
                        required
                        className={classes.textField}
                        placeholder="Enter message"
                        variant="outlined"
                        multiline
                        onChange={(e) => setBodyMessage(e.target.value)}
                        rows={2}
                        value={bodyMessage}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={2}
                      md={2}
                      className={classes.buttonContainer}
                    >
                      <Button
                        onClick={handleOnSubmit}
                        variant="contained"
                        color="secondary"
                        endIcon={
                          sendingMessage ? (
                            <CircularProgress color="inherit" size="1em" />
                          ) : (
                            <SendIcon />
                          )
                        }
                      >
                        Send
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Container>
      )}
    </>
  )
})

SmsHistoryPage.propTypes = { userId: PropTypes.string }
SmsHistoryPage.defaultProps = { userId: '' }

export default SmsHistoryPage

import React, { memo, useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import MessageList from '../../components/MessageList'
import PhoneNumberList from '../../components/PhoneNumberList'
import SnackBarContext from '../../components/SnackBar'
import SkeletonChatPage from '../../components/SkeletonChatPage'
import {
  Typography,
  TextField,
  makeStyles,
  Container,
  Grid,
  Box,
  Divider,
  Button,
  CircularProgress,
} from '@material-ui/core'
import { Auth } from '@supabase/ui'
import {
  Send as SendIcon,
  ChatBubbleOutlineTwoTone,
  CodeSharp,
} from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  wrapIcon: {
    marginTop: '3rem',
    alignItems: 'center',
    display: 'inline-flex',
  },
  textField: {
    width: '100%',
    borderWidth: 0,
    borderColor: 'transparent',
  },
  textFieldContainer: {
    flex: 1,
    marginRight: 12,
  },
  gridItem: {
    paddingTop: 12,
    paddingBottom: 12,
  },
  gridItemChatList: {
    overflow: 'auto',
    height: '50vh',
  },
  gridItemMessage: {
    '@media screen and (max-width: 767px)': {
      backgeoundColor: '#fbfbfb',
    },
    marginTop: 12,
    marginBottom: 12,
  },
  mainGrid: { paddingTop: '3em', paddingBottom: '3em', borderWidth: 1 },
  h4: {
    marginTop: 0,
  },
  borderRight500: {
    '@media screen and (max-width: 767px)': {
      borderRight: 'none',
      borderBottom: '1px solid #e0e0e0',
    },
    borderRight: '1px solid #e0e0e0',
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
      const userById = { id: userId }
      fetch('/api/getUserById', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userById),
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
    }
  }, [user, userId])

  if (loading) {
    return <SkeletonChatPage />
  }

  // const handleOnchange = (e) => {}

  const handleOnsubmit = async (e) => {
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

  const handleRedirectMessage = () => {}

  return (
    <>
      {authorized && (
        <Container component="main" maxWidth="md">
          <Typography
            mt="2rem"
            variant="h4"
            align="left"
            className={classes.wrapIcon}
          >
            <ChatBubbleOutlineTwoTone color="secondary" />
            SMS History
          </Typography>
          <form>
            <Grid container direction="row" className={classes.mainGrid}>
              <Grid
                item
                xs={11}
                sm={5}
                md={3}
                className={classes.borderRight500}
              >
                <PhoneNumberList user={user} />
              </Grid>
              <Grid item xs={11} sm={7} md={9}>
                <Grid className={classes.gridItemChatList}>
                  <MessageList user={{ ...user, userId }} />
                </Grid>
                <Divider />
                <Grid item className={classes.gridItemMessage}>
                  <Box px={1}>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item xs={10} className={classes.textFieldContainer}>
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
                      <Grid item xs={2}>
                        <Button
                          onClick={handleOnsubmit}
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
                  </Box>
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

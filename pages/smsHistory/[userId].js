import React, { memo, useState, useEffect, useContext } from 'react'
import moment from 'moment'
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
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Avatar,
  ListItemIcon,
  Button,
} from '@material-ui/core'
import { Auth } from '@supabase/ui'
import {
  Send as SendIcon,
  ChatBubbleOutlineTwoTone,
  PersonTwoTone,
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
    marginTop: 12,
    marginBottom: 12,
  },
  mainGrid: { paddingTop: '3em', borderWidth: 1 },
  h4: {
    marginTop: 0,
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0',
  },
}))

const SmsHistory = () => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [authorized, setAuthorized] = useState(false)
  const [smsLogMessages, setSmsLogMessages] = useState(false)
  const [bodyMessage, setBodyMessage] = useState('')
  const [number, setNumber] = useState('')
  const classes = useStyles()
  const openSnackBar = useContext(SnackBarContext)
  const { user } = Auth.useUser()

  useEffect(() => {
    if (user) {
      setLoading(true)
      fetch('/api/getUserById', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify({ id: 54 }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.role === 'admin') {
            setAuthorized(true)
            setLoading(false)
          } else {
            openSnackBar({
              message: 'You are not authorized to view this page',
              snackSeverity: 'error',
            })
          }
        })
    }
  }, [user])

  if (loading) {
    return <SkeletonChatPage />
  }

  // const handleOnchange = (e) => {}

  // const handleOnsubmit = async (e) => {
  //   await e.preventDefault()

  //   console.log('click send button')
  //   console.log('number--->', sendToNumber)
  //   console.log('bodyMessage--->', bodyMessage)

  //   try {
  //     setLoading(true)
  //     const res = await fetch(`api/sendMessage`, {
  //       method: 'POST',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ to: number, body: bodyMessage }),
  //     })

  //     const data = await res.json()

  //     if (data.success) {
  //       setSuccess(true)
  //       // setNumber('')
  //       setBodyMessage('')
  //     }
  //   } catch (err) {
  //     console.log(err)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

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
                  <MessageList user={user} />
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
                          // value={bodyMessage}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <Button
                          // onClick={handleOnsubmit}
                          variant="contained"
                          color="secondary"
                          endIcon={<SendIcon />}
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
}

SmsHistory.propTypes = {}
SmsHistory.defaultProps = {}

export default SmsHistory

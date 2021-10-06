import React, { memo, useEffect, useState, createRef, useRef } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import config from '../utils/config'
import {
  Box,
  List,
  ListItem,
  makeStyles,
  CircularProgress,
} from '@material-ui/core'
import Pusher from 'pusher-js'

const useStyles = makeStyles((theme) => ({
  author: { fontSize: 10, color: 'gray' },
}))

const styles = {
  listItem: (isOwnMessage) => ({
    flexDirection: 'column',
    alignItems: isOwnMessage ? 'flex-end' : 'flex-start',
  }),
  container: (isOwnMessage) => ({
    maxWidth: '75%',
    borderRadius: 12,
    fontSize: 14,
    padding: 16,
    color: isOwnMessage ? '#fff' : '#000',
    marginTop: 5,
    backgroundColor: isOwnMessage ? '#2C6DFB' : '#F6F6F8',
  }),
  timestamp: (isOwnMessage) => ({
    fontSize: 10,
    color: isOwnMessage ? '#fff' : 'gray',
    textAlign: isOwnMessage ? 'right' : 'left',
    paddingTop: 4,
  }),
}

const MessageList = memo((props) => {
  const { user, messageSent } = props

  const [loading, setLoading] = useState(false)
  const [smsLogMessages, setSmsLogMessages] = useState([])
  const classes = useStyles()

  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(async () => {
    if (user) {
      try {
        setLoading(true)
        const res = await fetch(`/api/getSmsLogMessageByUserId`, {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/json',
          }),
          credentials: 'same-origin',
          body: JSON.stringify({
            smsUserId: user.smsUserId,
            authEmail: user.email,
          }),
        })

        const smsData = await res.json()
        setSmsLogMessages(smsData)
        scrollToBottom()
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
  }, [])

  useEffect(() => {
    const pusher = new Pusher(config.pusher.PUSHER_KEY, {
      cluster: config.pusher.NEXT_PUSHER_CLUSTER,
    })
    const channel = pusher.subscribe('chat')

    channel.bind('chat-event', function (data) {
      console.log('data', data)
      if (data.isReply || data.user_id === user.id) {
        setSmsLogMessages((prevState) => [
          ...prevState,
          {
            id: Math.random(),
            from_phone_number: data.sender,
            message: data.body,
            isOwnMessage:
              data.isOwnMessage === false ? data.isOwnMessage : true,
          },
        ])
      }
      scrollToBottom()
    })
    return () => {
      pusher.unsubscribe('chat')
    }
  }, [])

  useEffect(() => {
    const { body, sender, user_id, adminName} = messageSent;
    if (Object.keys(messageSent).length !== 0) {
      console.log('sendMessage', messageSent);
      setSmsLogMessages((prevState) => [
        ...prevState,
        {
          id: Math.random(),
          from_phone_number: sender,
          message: body,
          isOwnMessage: true,
          name: adminName
        },
      ])
    }
  }, [messageSent])

  return (
    <List dense={true}>
      {smsLogMessages &&
        smsLogMessages?.map(
          ({ id, from_phone_number, message, created_at, isOwnMessage, name }) => (
            <ListItem key={`${id}`} style={styles.listItem(isOwnMessage)}>
              <div className={classes.author}>{name} - {from_phone_number}</div>
              <div style={styles.container(isOwnMessage)}>
                {message}
                <div style={styles.timestamp(isOwnMessage)}>{`${moment(
                  created_at
                ).format('MM/DD/YYY - hh:mm a')}`}</div>
              </div>
            </ListItem>
          )
        )}
      <div ref={messagesEndRef} />
    </List>
  )
})

MessageList.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }),
  messageSent: PropTypes.shape({
    body: PropTypes.string,
    sender: PropTypes.string,
    user_id: PropTypes.string
  })
}
MessageList.defaultProps = {
  user: {
    email: '',
  },
  messageSent: {
    body: '',
    sender: '',
    user_id: ''
  }
}

export default MessageList

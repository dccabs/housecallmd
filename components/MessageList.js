import React, { memo, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import config from '../utils/config';
import {
  Box,
  List,
  ListItem,
  makeStyles,
  CircularProgress,
} from '@material-ui/core'
import Pusher from "pusher-js";

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
  const { user } = props

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [smsLogMessages, setSmsLogMessages] = useState([])

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
            userId: user.userId,
          }),
        })

        const smsData = await res.json()
        setSmsLogMessages(smsData);
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
      });
      const channel = pusher.subscribe("chat");
      
      channel.bind("chat-event", function (data) {
        setSmsLogMessages((prevState) => [
          ...prevState,
          {
          from_phone_number: data.sender,
          message: data.body,
          isOwnMessage: true
        }]);
      });
    
    return () => {
      pusher.unsubscribe("chat");
    };
  }, []);

  const classes = useStyles()

  return (
    <List dense={true}>
      {smsLogMessages &&
        smsLogMessages?.map(
          ({ id, from_phone_number, message, created_at, isOwnMessage }) => (
            <ListItem key={`${id}`} style={styles.listItem(isOwnMessage)}>
              <div className={classes.author}>{from_phone_number}</div>
              <div style={styles.container(isOwnMessage)}>
                {message}
                <div style={styles.timestamp(isOwnMessage)}>{`${moment(
                  created_at
                ).format('MM/DD/YYY - hh:mm a')}`}</div>
              </div>
            </ListItem>
          )
        )}
    </List>
  )
})

MessageList.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }),
}
MessageList.defaultProps = {
  user: {
    email: '',
  },
}

export default MessageList

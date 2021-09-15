import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { ListItem, makeStyles, Avatar } from '@material-ui/core'

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
    padding: 16,
    color: isOwnMessage ? '#fff' : '#000',
    fontSize: 12,
    marginTop: 5,
    backgroundColor: isOwnMessage ? '#2C6DFB' : '#F6F6F8',
  }),
  timestamp: (isOwnMessage) => ({
    fontSize: 8,
    color: isOwnMessage ? '#fff' : 'gray',
    textAlign: isOwnMessage ? 'right' : 'left',
    paddingTop: 4,
  }),
}

const MessageItem = memo((props) => {
  const { message, email } = props
  const isOwnMessage = message.from === 'lourdes@yucaba.com'
  const classes = useStyles()

  return (
    <ListItem style={styles.listItem(isOwnMessage)}>
      <div className={classes.author}>{message.from}</div>
      <div style={styles.container(isOwnMessage)}>
        {message.text}
        <div style={styles.timestamp(isOwnMessage)}>{message.date}</div>
      </div>
    </ListItem>
  )
})

MessageItem.propTypes = { email: PropTypes.string }
MessageItem.defaultProps = { email: '' }

export default MessageItem

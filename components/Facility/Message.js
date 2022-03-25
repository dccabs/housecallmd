import {
  List,
  ListItem,
  makeStyles,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  author: { fontSize: 10, color: 'gray' },
}))

const styles = {
  listItem: ({ isAdmin, entry }) => ({
    flexDirection: 'column',
    alignItems:
      isAdmin && entry?.sentFromHouseCall
        ? 'flex-end'
        : !isAdmin && entry.sentFromHouseCall
        ? 'flex-start'
        : 'flex-end',
  }),
  container: ({ isAdmin, entry }) => ({
    maxWidth: '75%',
    borderRadius: 12,
    fontSize: 14,
    padding: 16,
    color: isAdmin && entry?.sentFromHouseCall ? '#fff' : '#000',
    marginTop: 5,
    backgroundColor:
      isAdmin && entry?.sentFromHouseCall
        ? 'lightBlue'
        : !isAdmin && entry.sentFromHouseCall
        ? '#e3e3e3'
        : 'lightBlue',
  }),

  timestamp: ({ isAdmin, entry }) => ({
    fontSize: 10,
    color: isAdmin && entry?.sentFromHouseCall ? '#fff' : 'gray',
    textAlign: isAdmin && entry?.sentFromHouseCall ? 'right' : 'left',
    paddingTop: 4,
  }),
}

const Message = ({ entry, index, isAdmin }) => {
  const classes = useStyles()
  return (
    <ListItem
      style={styles.listItem({ isAdmin, entry })}
      key={`message-${index}`}
      className="Facility-Message"
    >
      <div className={classes.author}>
        <strong>From:</strong>{' '}
        <strong>{entry.sentFromHouseCall ? 'HOUSECALLMD:' : null}</strong>
        {entry?.sender?.name}
      </div>
      <div style={styles.container({ isAdmin, entry })}>
        <strong>To:</strong> {entry.recipient?.name}
        <div>
          <strong>Message:</strong> {entry.message}
        </div>
        <div>
          <strong>Patient: </strong> {entry.patient_name}
        </div>
        <div style={styles.timestamp({ isAdmin, entry })}>
          <strong>Timestamp</strong>: {entry.created_at}
        </div>
      </div>
    </ListItem>
  )
}

export default Message

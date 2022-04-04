import {
  List,
  ListItem,
  makeStyles,
} from '@material-ui/core'

import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  author: { fontSize: 10, color: 'gray' },
}))

const styles = {
  listItem: ({ isAdmin, entry }) => ({
    flexDirection: 'column',
    alignItems:
      isAdmin && entry?.sentFromHouseCall
        ? 'flex-end'
        : isAdmin && !entry.sentFromHouseCall
        ? 'flex-start'
        : !isAdmin && entry.sentFromHouseCall
        ? 'flex-start'
        : 'flex-end',
  }),
  container: ({ isAdmin, entry }) => ({
    maxWidth: '75%',
    borderRadius: 12,
    fontSize: 14,
    padding: 16,
    color: isAdmin && entry?.sentFromHouseCall ? '#000' : '#000',
    marginTop: 5,
    backgroundColor:
      isAdmin && entry?.sentFromHouseCall
        ? 'lightBlue'
        : isAdmin && !entry.sentFromHouseCall
        ? '#e3e3e3'
        : !isAdmin && entry.sentFromHouseCall
        ? '#e3e3e3'
        : 'lightBlue',
  }),

  timestamp: ({ isAdmin, entry }) => ({
    fontSize: 10,
    color: isAdmin && entry?.sentFromHouseCall ? 'gray' : 'gray',
    textAlign: isAdmin && entry?.sentFromHouseCall ? 'right' : 'left',
    paddingTop: 4,
  }),
}

const Message = ({ entry, index, isAdmin, onReplyClick }) => {
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
        {entry?.patient_first_name && entry.patient_last_name &&
        <div>
          <strong>Patient: </strong>
          <Link href={isAdmin ? `/facility/admin/user-details/${entry.patient_id}` : `/facility/patient/${entry.patient_id}`}>
            <a>
              {entry.patient_first_name} {entry.patient_last_name}
            </a>
          </Link>
        </div>
        }
        <div style={styles.timestamp({ isAdmin, entry })}>
          <strong>Timestamp</strong>: {entry.created_at}
        </div>
        {!isAdmin && entry.sentFromHouseCall && onReplyClick &&
        <div style={{marginTop: 20, cursor: 'pointer', textDecoration: 'underline', color: '#e1215b',}} onClick={onReplyClick}>
          Reply To This Message
        </div>
        }
      </div>
    </ListItem>
  )
}

export default Message

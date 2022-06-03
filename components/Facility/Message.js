import { List, ListItem, makeStyles, Button } from '@material-ui/core'

import Link from 'next/link'
import moment from 'moment'

const NEXT_PUBLIC_SUPABASE_STORAGE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL

const useStyles = makeStyles((theme) => ({
  author: { fontSize: 12, color: 'gray' },
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
    fontSize: 12,
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
        {!isAdmin && (
          <>
            <strong>{entry.sentFromHouseCall ? 'HOUSECALLMD:' : null}</strong>
            {entry?.sender?.name}
          </>
        )}
        {isAdmin && (
          <>
            {entry.sentFromHouseCall && <strong>HOUSECALLMD:</strong>}
            {!entry.sentFromHouseCall && (
              <Link
                href={`/facility/admin/facility-details/${entry.sender.id}`}
              >
                <a>{entry?.sender?.name}</a>
              </Link>
            )}
          </>
        )}
      </div>
      <div style={styles.timestamp({ isAdmin, entry })}>
        {moment(entry.timestamp).format('LLL')}
      </div>
      <div style={styles.container({ isAdmin, entry })}>
        <strong>To:</strong> {entry.recipient?.name}
        <div>
          <strong>Message:</strong> {entry.message}
        </div>
        {entry?.mediaUrl && (
          <div>
            <strong>
              Image Preview: <br />
            </strong>
            <Link
              href={`${NEXT_PUBLIC_SUPABASE_STORAGE_URL}${entry?.mediaUrl}`}
            >
              <a target="_blank">
                <img
                  style={{ maxWidth: 400 }}
                  src={`${NEXT_PUBLIC_SUPABASE_STORAGE_URL}${entry?.mediaUrl}`}
                />
              </a>
            </Link>
          </div>
        )}
        {entry?.patient_first_name && entry.patient_last_name && (
          <div>
            <strong>Patient: </strong>
            <Link
              href={
                isAdmin
                  ? `/facility/admin/user-details/${entry.patient_id}`
                  : `/facility/patient/${entry.patient_id}`
              }
            >
              <a>
                <strong>
                  {entry.patient_first_name} {entry.patient_last_name}
                </strong>
              </a>
            </Link>
          </div>
        )}
        {!isAdmin && entry.sentFromHouseCall && onReplyClick && (
          <div style={{ marginTop: 20 }} onClick={onReplyClick}>
            <Button size="small" variant="contained" color="secondary">
              Reply
            </Button>
          </div>
        )}
        {isAdmin && !entry.sentFromHouseCall && onReplyClick && (
          <div style={{ marginTop: 20 }} onClick={onReplyClick}>
            <Button size="small" variant="contained" color="secondary">
              Reply
            </Button>
          </div>
        )}
      </div>
    </ListItem>
  )
}

export default Message

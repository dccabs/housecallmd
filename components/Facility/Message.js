const Message = ({ entry, index, isAdmin }) => {

  return (
    <div
      style={{
        background: isAdmin && entry.sentFromHouseCall ? 'lightBlue' : !isAdmin && entry.sentFromHouseCall ? '#e3e3e3' : 'lightBlue',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
      }}
      key={`message-${index}`}
    >
      <div><strong>From:</strong> <strong>{entry.sentFromHouseCall ? 'HOUSECALLMD:' : null}</strong>{entry?.sender?.name}</div>
      <div><strong>To:</strong> {entry.recipient?.name}</div>
      <div>
        <strong>Message:</strong> {entry.message}
      </div>
      <div>
        <strong>Timestamp</strong>: {entry.created_at}
      </div>
      <div>
        <strong>Patient: </strong> {entry.patient_name}
      </div>
    </div>
  )
}

export default Message

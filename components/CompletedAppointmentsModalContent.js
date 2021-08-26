import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  Select,
  Checkbox,
  InputLabel,
  MenuItem,
  Collapse,
  CircularProgress,
} from '@material-ui/core'
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'

import MeetingCreated from './MeetingCreated'
import SendSMS from './SendSMS'

const useStyles = makeStyles((theme) => ({
  fieldBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textFields: {
    width: '100%',
    marginTop: '2em',
    maxWidth: '34rem',
  },
  buttonLinks: {
    marginTop: '1em',

    '& button': {
      height: '100%',
      padding: '1em',
      fontWeight: 600,
      width: '16rem',

      '&:hover': {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
}))

const CompletedAppointmentsModalContent = ({
  setOpen,
  rowData,
  completedAppointments,
  setCompletedAppointments,
  openSnackBar,
}) => {
  const [clientNotes, setClientNotes] = useState('')
  const [completed, setCompleted] = useState(false)
  const [MeetingContent, setMeetingContent] = useState(false)
  const [MessageContent, setMessageContent] = useState(false)

  const classes = useStyles()

  useEffect(() => {
    setClientNotes(rowData.clientNotes)
    setCompleted(rowData.completed)
  }, [rowData])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const rows = [...completedAppointments]

    const updatedAppointment = {
      id: rowData.id,
      userId: rowData.userId,
      time: rowData.time,
      usingInsurance: rowData.usingInsurance,
      visitReason: rowData.visitReason,
      visitChoice: rowData.visitChoice,
      completed,
      clientNotes,
    }

    const updatedRow = {
      ...rowData,
      clientNotes,
      completed,
    }

    const newRows = rows.map((r) => {
      if (r.id === updatedRow.id) r = updatedRow

      if (r.completed) return r
    })

    const filteredRows = newRows.filter((r) => r !== undefined)

    try {
      const res = await fetch(`/api/updateAppointment`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAppointment),
      })
    } catch (error) {
      openSnackBar({ message: error, snackSeverity: 'error' })
    } finally {
      setCompletedAppointments(filteredRows)
      setOpen(false)
      openSnackBar({
        message: 'Updated user information',
        snackSeverity: 'success',
      })
    }
  }

  return (
    <>
      {MeetingContent ? (
        <MeetingCreated
          phone={rowData.UserList.phone}
          setMeetingContent={setMeetingContent}
        />
      ) : MessageContent ? (
        <SendSMS
          phone={rowData.UserList.phone}
          setMessageContent={setMessageContent}
        />
      ) : (
        <>
          <Box display="flex" alignItems="center">
            <AssignmentTurnedInIcon
              fontSize="large"
              style={{ marginRight: '0.3em' }}
            />
            <Typography variant="h4" align="left">
              Update Appointment
            </Typography>
          </Box>

          <Box mt="2em">
            <form onSubmit={handleSubmit}>
              <Box display="flex" justifyContent="center" flexWrap="wrap">
                <Box
                  mb="1em"
                  width="100%"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  <TextField
                    className={classes.textFields}
                    fullWidth
                    type="text"
                    label="Name"
                    variant="outlined"
                    color="secondary"
                    value={`${rowData.UserList.firstName} ${rowData.UserList.lastName}`}
                    disabled
                  />

                  <TextField
                    className={classes.textFields}
                    fullWidth
                    type="text"
                    label="Date/Time of Appointment"
                    variant="outlined"
                    color="secondary"
                    value={moment(rowData.time).format(
                      'DD/MM/YYYY - h:mm:ss a'
                    )}
                    disabled
                  />

                  <TextField
                    className={classes.textFields}
                    fullWidth
                    type="text"
                    label="Visit Choice"
                    variant="outlined"
                    color="secondary"
                    value={rowData.visitChoice}
                    disabled
                  />

                  <TextField
                    className={classes.textFields}
                    fullWidth
                    type="text"
                    label="Visit Reason"
                    variant="outlined"
                    color="secondary"
                    value={rowData.visitReason}
                    disabled
                  />

                  <TextField
                    className={classes.textFields}
                    fullWidth
                    type="text"
                    label="Client Notes"
                    variant="outlined"
                    color="secondary"
                    value={clientNotes}
                    onChange={(e) => setClientNotes(e.target.value)}
                  />

                  <Box mt="1em" width="100%" maxWidth="34rem">
                    <FormControl component="fieldset">
                      <FormControlLabel
                        value="Terms"
                        control={
                          <Checkbox color="secondary" checked={completed} />
                        }
                        label="Appointment Completed"
                        labelPlacement="end"
                        onChange={() => setCompleted(!completed)}
                      />
                    </FormControl>
                  </Box>
                </Box>

                <Box className={classes.buttonLinks}>
                  <Button type="submit" color="secondary" variant="contained">
                    Update
                  </Button>
                </Box>
              </Box>
            </form>
          </Box>

          <Box
            className={classes.buttonLinks}
            display="flex"
            justifyContent="center"
          >
            <Button
              color="secondary"
              variant="contained"
              onClick={() => setMeetingContent(true)}
            >
              Create Meeting
            </Button>
          </Box>

          <Box
            className={classes.buttonLinks}
            display="flex"
            justifyContent="center"
          >
            <Button
              color="secondary"
              variant="contained"
              onClick={() => setMessageContent(true)}
            >
              Send SMS
            </Button>
          </Box>
        </>
      )}
    </>
  )
}

export default CompletedAppointmentsModalContent

import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'

import {
  Typography,
  Box,
  Button,
  TextField,
  Tooltip,
  CircularProgress,
} from '@material-ui/core'

import CheckIcon from '@material-ui/icons/Check';
import { makeStyles } from '@material-ui/core/styles'
import { Auth } from '@supabase/ui'
import Container from 'components/Container'
import { SnackBarContext } from 'components/SnackBar'
import xhrHeader from '../../../../constants/xhrHeader'
import FacilityMessageModal from '../../../../components/FacilityMessageModal'

const useStyles = makeStyles((theme) => ({
  h2: {
    marginTop: '.5em',
  },
  facilityLink: {
    '& a': {
      textDecoration: 'none',
      color: theme.palette.secondary.main,
    },
  },
  textFields: {
    width: '100%',
    marginTop: '2em',
    maxWidth: '34rem',
  },
  buttonLinks: {
    '& button': {
      padding: '1em',
      fontWeight: 600,
      width: '16rem',

      '&:hover': {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
}))

const TabPanel = (props) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}



const AppointmentDetailsPage = () => {
  const openSnackBar = useContext(SnackBarContext)
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [note, setNote] = useState('');
  const [completed, setCompleted] = useState('');
  const [messageModalOpen, setMessageModalOpen] = useState(false)

  const classes = useStyles()
  const { user } = Auth.useUser()
  const router = useRouter()
  const { id: appointmentId } = router.query


  useEffect(() => {
    if (user && appointmentId) {

    }
  }, [user])
  useEffect(() => {
    if (user && appointmentId) {
      // setLoading(true)
      fetch('/api/getFacilityAppointmentById', {
        ...xhrHeader,
        body: JSON.stringify({ id: Number(appointmentId)}),
      })
        .then((res) => res.json())
        .then((res) => {
          setData(res);
          setNote(res?.note);
          setCompleted(res?.completed);
          setLoading(false);
        })
    }
  }, [user, appointmentId])

  const handleStatusClick = ({status}) => {
    const payload = {
      id: Number(appointmentId),
      status,
    }
    fetch('/api/updateFacilityAppointmentStatus', {
      ...xhrHeader,
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        openSnackBar({
          message: 'Appointment Status Updated',
          snackSeverity: 'success',
        })
        setCompleted(status);
      })
  }

  const handleUpdateNotes = () => {
    const payload = {
      id: Number(appointmentId),
      note,
    }
    fetch('/api/updateFacilityAppointmentNote', {
      ...xhrHeader,
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        openSnackBar({
          message: 'Appointment Note Updated',
          snackSeverity: 'success',
        })
      })
  }


  const { user_info, facility_info } = data || {};

  return (
    <Container>
      {loading ?
          <Container>
            <div style={{textAlign: 'center'}}>
              <CircularProgress />
            </div>
          </Container>

        :
        <>
          <Box display="flex" alignItems="end">
            <Typography variant="h2" className={classes.h2}>
              Appointment
              <Button
                style={{marginLeft: 30, backgroundColor: completed ? '#13bb0a' : null}}
                size="small"
                variant="contained"
                onClick={() => { handleStatusClick({status: !completed}) }}
              >
                <Tooltip title={`${completed ? 'Mark Incomplete' : 'Mark Complete'}`}>
                  <CheckIcon style={{fill: completed ? '#fff' : null}} />
                </Tooltip>
              </Button>
            </Typography>
          </Box>
          <Box style={{margin: '40px 0 0'}}>
            <Box style={{margin: '40px 0 0'}}>
              <Box>
                <strong>Name:</strong> {user_info?.first_name} {user_info?.last_name}
              </Box>
              <Box>
                <strong>Facility:</strong> {facility_info?.name}
              </Box>
              <Box>
                <strong>Facility Phone:</strong> {facility_info?.facility_phone}
              </Box>
              <Box>
                <strong>Room Number:</strong> {user_info?.room_number}
              </Box>
              <Box>
                <strong>Date:</strong> {data?.created_at}
              </Box>
              <Box>
                <strong>Power of Attorney Info:</strong> {user_info?.poa_name} - {user_info?.poa_phone_number}
              </Box>

              <Box style={{margin: '40px 0 0'}}>
                <Box>
                  <strong>Visit Reason:</strong>
                </Box>
                <Box>
                  {data?.visitReason}
                </Box>
              </Box>
              <Box style={{margin: '40px 0 0px'}}>
                <Box style={{marginBottom: 10}}>
                  <strong>HousecallMD Notes:</strong>
                </Box>
                <Box>
                  <TextField
                    placeholder="Visit Reason"
                    value={note}
                    multiline
                    rows={8}
                    maxrows={8}
                    fullWidth
                    variant="outlined"
                    onChange={(e) => setNote(e.target.value)}
                    // disabled={messagesLoading}
                  />
                  <Button
                    style={{marginTop: 10}}
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={handleUpdateNotes}
                  >
                    Update Notes
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box style={{margin: '40px 0 0px'}}>
              <Button
                color="secondary"
                style={{marginTop: 10}}
                size="large"
                variant="contained"
                onClick={() => setMessageModalOpen(true)}
              >
                Send Message to {facility_info?.name} about this appointment
              </Button>
            </Box>
            <Box style={{margin: '10px 0 0px'}}>
              <Button
                color="secondary"
                style={{marginTop: 10}}
                size="large"
                variant="contained"
              >
                Create a video chat room for this appointment
              </Button>
            </Box>
          </Box>
        </>
      }
      <FacilityMessageModal
        open={messageModalOpen}
        onClose={() => setMessageModalOpen(false)}
        title="Your are sending a message to HouseCall MD about the following patient"
        patientName={`${user_info?.first_name} ${user_info?.last_name}`}
        patientId={user_info?.patient_id}
        recipientId={null}
        senderId={user?.id}
        callbackFn={() => {}}
      />
    </Container>
  )
}

export default AppointmentDetailsPage

import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'

import {
  Typography,
  Box,
  Button,
  CircularProgress,
} from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check';
import { makeStyles } from '@material-ui/core/styles'
import { Auth } from '@supabase/ui'
import Message from 'components/Facility/Message'
import Container from 'components/Container'
import { SnackBarContext } from 'components/SnackBar'
import xhrHeader from 'constants/xhrHeader'
import FacilityMessageModal from '../../../components/FacilityMessageModal'

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

const AppointmentDetailsPage = () => {
  const openSnackBar = useContext(SnackBarContext)
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [note, setNote] = useState('');
  const [messageModalOpen, setMessageModalOpen] = useState(false)
  const [completed, setCompleted] = useState('');

  const classes = useStyles()
  const { user } = Auth.useUser()
  const router = useRouter()
  const { id: appointmentId } = router.query

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
          <Box>
            <div onClick={() => router.back()} className="link">
              Go Back
            </div>
          </Box>
          <Box display="flex" alignItems="baseline">
            <Typography variant="h2" className={classes.h2}>
              Appointment
            </Typography>
            {completed &&
            <Box style={{marginLeft: 40, display: 'flex', alignItems: 'center'}}>
              <CheckIcon style={{fill: completed ? '#13bb0a' : null}} /> <span style={{marginLeft: 10}}>Completed</span>
            </Box>
            }
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

              <Box style={{margin: '40px 0 0'}}>
                <Box>
                  <strong>Visit Reason:</strong>
                </Box>
                <Box>
                  {data?.visitReason}
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
                Send Message to HouseCallMD about this appointment
              </Button>
            </Box>
          </Box>
          <FacilityMessageModal
            open={messageModalOpen}
            onClose={() => setMessageModalOpen(false)}
            title="Your are sending a message to HouseCall MD about the following patient"
            patientName={`${user_info?.first_name} ${user_info?.last_name}`}
            patientId={user_info?.id}
            recipientId={null}
            senderId={user?.id}
            callbackFn={() => {}}
          />
        </>
      }
    </Container>
  )
}

export default AppointmentDetailsPage

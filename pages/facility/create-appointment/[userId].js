import { useState, useEffect, useContext } from 'react'
import {
  Typography,
  Box,
  Button,
  TextField,
  CircularProgress,
} from '@material-ui/core'
import Container from '../../../components/Container'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import { Auth } from '@supabase/ui'
import xhrHeader from '../../../constants/xhrHeader'
import { SnackBarContext } from 'components/SnackBar'


const useStyles = makeStyles((theme) => ({
  h2: {
    marginTop: '.5em',
  },
}))

const maxCharacters = 240

const CreateAppointment = () => {
  const openSnackBar = useContext(SnackBarContext)

  const [localReason, setLocalReason] = useState('');
  const [loading, setLoading] = useState(true)
  const [patientData, setPatientData] = useState(null)
  const [visitReason, setVisitReason] = useState(null)

  const classes = useStyles()
  const router = useRouter()
  const { user, session } = Auth.useUser()
  const { userId } = router.query

  useEffect(() => {
    if (userId) {
      fetchPatientInformation()
    }
  }, [userId])

  const fetchPatientInformation = () => {
    const payload = {
      id: userId,
    }

    fetch('/api/getFacilityPatientById', {
      ...xhrHeader,
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setPatientData({ ...data })
          setLoading(false)
        } else {
          openSnackBar({
            message: 'There was an error.  Please try again later',
            error: 'error',
          })
          setLoading(false)
        }
      })
  }

  const createAppointment = () => {
    const payload = {
      user,
      appointmentData: {
        visitReason,
        userId,
        facilityId: patientData?.facility_info?.id,
        completed: false,
        time: new Date(),
        note: '',
        created_at: new Date(),
      }
    }


    setLoading(true);
    fetch('/api/addFacilitiesAppointment', {
      ...xhrHeader,
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setLoading(false)
          openSnackBar({
            message: 'Appointment Sent to HouseCall MD',
            snackSeverity: 'success',
          })
          setVisitReason(null)
          router.back();
        } else {
          openSnackBar({
            message: 'There was an error.  Please try again later',
            error: 'error',
          })
          setLoading(false)
        }
      })
  }

  const handleSubmit = () => {
    createAppointment();
  }

  return (
    <>
      <Container>
        <Box>
          {loading && (
            <Box
              my="8em"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <CircularProgress />
            </Box>
          )}
          {!loading &&
            <div>
              <Typography className={classes.h2} variant="h2">
                Create An Appointment for {patientData?.first_name}
              </Typography>

              <div style={{
                margin: '40px 0',
                fontSize: 16,
              }}>
                <div>
                  {patientData?.first_name} {patientData?.last_name}
                </div>
                <div>
                  Member of {patientData?.facility_info?.name}
                </div>
                {patientData?.date_of_birth &&
                <div>
                  Date of Birth: {patientData?.date_of_birth}
                </div>
                }
                {patientData?.room_number &&
                <div>Room Number: {patientData.room_number}</div>
                }
              </div>

              <div style={{marginBottom: 40}}>
                <TextField
                  placeholder="Visit Reason"
                  multiline
                  rows={8}
                  maxRows={8}
                  fullWidth
                  variant="outlined"
                  onChange={(e) => setVisitReason(e.target.value)}
                  // disabled={messagesLoading}
                />
              </div>

              <div>
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  onClick={handleSubmit}
                  disabled={!visitReason}
                >Submit</Button>
              </div>
            </div>
          }
        </Box>
      </Container>
    </>
  )
}

export default CreateAppointment

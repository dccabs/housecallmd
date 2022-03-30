import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import {
  Typography,
  Box,
  Button,
  TextField,
  CircularProgress,
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'

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

  const [localReason, setLocalReason] = useState('')
  const [loading, setLoading] = useState(true)
  const [patientData, setPatientData] = useState(null)
  const [visitReason, setVisitReason] = useState(null)
  const [cardImageError, setCardImageError] = useState(false)
  const [seconaryCardImageError, setSecondaryCardImageError] = useState(false)
  const [idError, setIdError] = useState(false)

  const classes = useStyles()
  const router = useRouter()
  const { user, session } = Auth.useUser()
  const { userId } = router.query

  useEffect(() => {
    if (userId) {
      fetchPatientInformation()
    }
  }, [userId])

  useEffect(() => {
    if (patientData) {
      console.log('patient', patientData)
      !patientData.policy_image_back || !patientData.policy_image_front
        ? setCardImageError(true)
        : setCardImageError(false)
      patientData.id_image === null ? setIdError(true) : setIdError(false)

      if (patientData.secondary_policy_number) {
        if (
          !patientData.secondary_policy_image_back ||
          !patientData.secondary_policy_image_front
        ) {
          setSecondaryCardImageError(true)
        }
      }
    }
  }, [patientData])

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
      },
    }

    setLoading(true)
    fetch('/api/addFacilitiesAppointment', {
      ...xhrHeader,
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          sendMessage()
        } else {
          openSnackBar({
            message: 'There was an error.  Please try again later',
            error: 'error',
          })
          setLoading(false)
        }
      })
  }

  const sendMessage = () => {
    const phone = process.env.NEXT_PUBLIC_CLIENT_PHONE_NUMBER
    const message = `${patientData?.facility_info?.name} has just requested an appointment for ${patientData?.first_name} ${patientData?.last_name}.`

    fetch('/api/sendMessage', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ to: phone, body: message }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setLoading(false)
          openSnackBar({
            message: 'Appointment Sent to HouseCall MD',
            snackSeverity: 'success',
          })
          setVisitReason(null)
          router.back()
        }
      })
  }

  const handleSubmit = () => {
    createAppointment()
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
          {!loading && (
            <div>
              <Typography className={classes.h2} variant="h2">
                Create An Appointment for {patientData?.first_name}
              </Typography>

              <div
                style={{
                  margin: '40px 0',
                  fontSize: 16,
                }}
              >
                <div>
                  {patientData?.first_name} {patientData?.last_name}
                </div>
                <div>Member of {patientData?.facility_info?.name}</div>
                {patientData?.date_of_birth && (
                  <div>Date of Birth: {patientData?.date_of_birth}</div>
                )}
                {patientData?.room_number && (
                  <div>Room Number: {patientData.room_number}</div>
                )}
              </div>

              {(cardImageError || seconaryCardImageError || idError) && (
                <div style={{ margin: '40px 0' }}>
                  <Alert severity="error">
                    Before you can make an appointment for this resident. You
                    need to address the following issues.
                    <ul>
                      {cardImageError && (
                        <li style={{ margin: '20px 0' }}>
                          Upload front and back images of{' '}
                          <strong>primary</strong> insurance policy card
                        </li>
                      )}
                      {seconaryCardImageError && (
                        <li style={{ margin: '20px 0' }}>
                          Upload front and back images of{' '}
                          <strong>secondary</strong> insurance policy card
                        </li>
                      )}

                      {idError && (
                        <li style={{ margin: '20px 0' }}>
                          Upload image of resident identification (Passport,
                          State id, DL)
                        </li>
                      )}
                    </ul>
                    <Link
                      href={`/facility/patient/edit-patient/${patientData.id}`}
                    >
                      <a>Click here to add this information.</a>
                    </Link>
                  </Alert>
                </div>
              )}

              <div style={{ marginBottom: 40 }}>
                <TextField
                  placeholder="Visit Reason"
                  multiline
                  rows={8}
                  maxrows={8}
                  fullWidth
                  variant="outlined"
                  onChange={(e) => setVisitReason(e.target.value)}
                  disabled={cardImageError || idError || seconaryCardImageError}
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
                >
                  Submit
                </Button>
              </div>
            </div>
          )}
        </Box>
      </Container>
    </>
  )
}

export default CreateAppointment

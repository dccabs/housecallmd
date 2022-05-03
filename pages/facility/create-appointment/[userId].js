import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import {
  Typography,
  Box,
  Button,
  TextField,
  CircularProgress, FormControl, FormControlLabel, Checkbox
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import PhoneField from 'components/PhoneField'
import Container from 'components/Container'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import { Auth } from '@supabase/ui'
import xhrHeader from '../../../constants/xhrHeader'
import { SnackBarContext } from 'components/SnackBar'
import formatPhoneNumberE164 from '../../../utils/formatPhoneNumberE164'

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
  const [notificationRequest, setNotificationRequest] = useState(false)
  const [notificationNumber, setNotificationNumber] = useState('');
  const [override, setOverride] = useState(false)


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
        notification_phone: notificationNumber ? formatPhoneNumberE164(notificationNumber) : null,
      },
    }

    setLoading(true)
    fetch('/api/addFacilitiesAppointment', {
      ...xhrHeader,
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data) {
          sendSMSToHouseCall()
          console.log('send mail')
          sendMail();
        } else {
          openSnackBar({
            message: 'There was an error. Please try again later',
            snackSeverity: 'error',
          })
          setLoading(false)
        }
      })
  }

  const sendSMSToHouseCall = () => {
    const message = `${patientData?.facility_info?.name} has just requested an appointment for ${patientData?.first_name} ${patientData?.last_name}.`

    fetch('/api/getPhoneNumbers', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({
        user,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const activePhones = data.filter(phone => {
          return phone.isActive;
        })

        const phones = activePhones.map(phone => {
          return phone.phoneNumber;
        })

        phones.forEach(async (phone) => {
          try {
            await fetch('/api/sendMessage', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                to: phone,
                body: message,
              }),
            })
          } catch (err) {
            throw err
          }
        })

      })
      .catch((error) => {
        openSnackBar({ message: error.toString(), snackSeverity: 'error' })
      })
  }

  const sendMail = () => {
    const subject = `${patientData?.facility_info?.name} has just requested an appointment for ${patientData?.first_name} ${patientData?.last_name}`
    const recipient_email = process.env.SENDGRID_DEFAULT_EMAIL
    console.log('process.env', process.env)
    const email = process.env.NEXT_PUBLIC_DEFAULT_EMAIL
    const name = 'House Call MD'
    const message = `
      <b>Facility Name:</b> ${patientData?.facility_info?.name}<br />
      <b>Patient Name:</b> ${patientData?.first_name} ${patientData?.last_name}<br />
      <b>Visit Reason:</b> ${visitReason}      
    `

    console.log('recipient_email', recipient_email);


    fetch('/api/sendMail', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ subject, recipient_email, email, name, message }),
    }).then((res) => {
      setLoading(false)
      openSnackBar({
        message: 'Appointment Sent to HouseCall MD',
        snackSeverity: 'success',
      })
      setLoading(false)
      setVisitReason(null)
      router.back()
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
              <Box>
                <div onClick={() => router.back()} className="link">
                  Go Back
                </div>
              </Box>
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
                    <div>
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
                    </div>

                    <div style={{ marginTop: 20 }}>
                      <FormControl component="fieldset">
                        <FormControlLabel
                          value="Terms"
                          control={<Checkbox color="secondary" checked={override} />}
                          label="Skip uploading information and provide these items later or in person.  They will be required to complete the appointment."
                          labelPlacement="end"
                          onChange={() => setOverride(true)}
                        />
                      </FormControl>
                    </div>
                  </Alert>
                </div>
              )}


              <div style={{ marginBottom: 20 }}>
                <TextField
                  placeholder="Visit Reason"
                  multiline
                  rows={8}
                  maxrows={8}
                  fullWidth
                  variant="outlined"
                  onChange={(e) => setVisitReason(e.target.value)}
                  disabled={(cardImageError || idError || seconaryCardImageError) && !override}
                  // disabled={messagesLoading}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <FormControl component="fieldset">
                  <FormControlLabel
                    value="Terms"
                    control={<Checkbox color="secondary" checked={notificationRequest} />}
                    label="Notify Me When HousecallMD replies to this appointment request"
                    labelPlacement="end"
                    onChange={() => setNotificationRequest(!notificationRequest)}
                  />
                </FormControl>
              </div>

              {notificationRequest &&
              <div style={{ marginBottom: 30 }}>
                <TextField
                  className={classes.textFields}
                  type="text"
                  label="Add Mobile Number"
                  variant="outlined"
                  color="secondary"
                  InputProps={{
                    inputComponent: PhoneField,
                  }}
                  onChange={(e) =>
                    setNotificationNumber(e.target.value)
                  }
                  // fullWidth
                />
              </div>
              }

              <div>
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  onClick={handleSubmit}
                  disabled={!visitReason || (notificationRequest && !notificationNumber) && !override}
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

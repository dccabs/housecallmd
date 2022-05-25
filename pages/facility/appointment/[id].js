import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import {
  Typography,
  Box,
  Button,
  CircularProgress,
  TextField,
} from '@material-ui/core'
import { Check as CheckIcon, Print as PrintIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { Auth } from '@supabase/ui'
import Message from 'components/Facility/Message'
import Container from 'components/Container'
import { SnackBarContext } from 'components/SnackBar'
import xhrHeader from 'constants/xhrHeader'
import FacilityMessageModal from '../../../components/FacilityMessageModal'
import getAppointments from 'pages/api/getAppointments'

const useStyles = makeStyles((theme) => ({
  hideOnPrintPage: {
    '@media print': {
      display: 'none',
    },
  },
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
  printButton: {
    marginTop: '1em',
    textDecoration: 'underline',
    fontSize: '0.8em',
  },
}))

const AppointmentDetailsPage = () => {
  const openSnackBar = useContext(SnackBarContext)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [note, setNote] = useState('')
  const [orders, setOrders] = useState('')
  const [messageModalOpen, setMessageModalOpen] = useState(false)
  const [completed, setCompleted] = useState('')
  const [authorized, setAuthorized] = useState(false)

  const classes = useStyles()
  const { user } = Auth.useUser()
  const router = useRouter()
  const { id: appointmentId } = router.query

  useEffect(() => {
    if (appointmentId) {
      if (user) {
        fetch('/api/getSingleUser', {
          method: 'POST',
          headers: new Headers({ 'Content-Type': 'application/json' }),
          credentials: 'same-origin',
          body: JSON.stringify({ email: user.email }),
        })
          .then((res) => res.json())
          .then((res) => {
            getAppointments(res)
          })
      } else {
        setLoading(false)
        openSnackBar({
          message: 'You are not authorized to view this page',
          snackSeverity: 'error',
        })
      }
    }
  }, [user, appointmentId])

  const getAppointments = (userData) => {
    fetch('/api/getFacilityAppointmentById', {
      ...xhrHeader,
      body: JSON.stringify({ id: Number(appointmentId) }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (userData?.role === 'admin' || userData?.id === res?.facilityId) {
          setAuthorized(true)
          setData(res)
          setNote(res?.note)
          setOrders(res?.orders)
          setCompleted(res?.completed)
        } else {
          openSnackBar({
            message: 'You are not authorized to view this page',
            snackSeverity: 'error',
          })
        }
        setLoading(false)
      })
  }

  const { user_info, facility_info } = data || {}

  return (
    <Container>
      {loading ? (
        <Container>
          <div style={{ textAlign: 'center' }}>
            <CircularProgress />
          </div>
        </Container>
      ) : (
        <>
          {user && data && authorized && (
            <>
              <Box className={classes.hideOnPrintPage}>
                <div onClick={() => router.back()} className="link">
                  Go Back
                </div>
              </Box>
              <Box display="flex" alignItems="baseline">
                <Typography variant="h2" className={classes.h2}>
                  Appointment
                </Typography>
                {completed && (
                  <Box
                    style={{
                      marginLeft: 40,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <CheckIcon
                      className={classes.hideOnPrintPage}
                      style={{ fill: completed ? '#13bb0a' : null }}
                    />{' '}
                    <span
                      className={classes.hideOnPrintPage}
                      style={{ marginLeft: 10 }}
                    >
                      Completed
                    </span>
                  </Box>
                )}
              </Box>
              <Button
                color="secondary"
                onClick={() => window.print()}
                className={clsx(classes.printButton, classes.hideOnPrintPage)}
              >
                <span style={{ marginRight: 5 }}>Print this page</span>
                <PrintIcon />
              </Button>
              <Box style={{ margin: '40px 0 0' }}>
                <Box style={{ margin: '40px 0 0' }}>
                  <Box>
                    <strong>Name:</strong> {user_info?.first_name}{' '}
                    {user_info?.last_name}
                  </Box>
                  <Box>
                    <strong>Facility:</strong> {facility_info?.name}
                  </Box>
                  <Box>
                    <strong>Facility Phone:</strong>{' '}
                    {facility_info?.facility_phone}
                  </Box>
                  <Box>
                    <strong>Room Number:</strong> {user_info?.room_number}
                  </Box>
                  <Box>
                    <strong>Date:</strong> {data?.created_at}
                  </Box>

                  <Box style={{ margin: '40px 0 0' }}>
                    <Box>
                      <strong>Visit Reason:</strong>
                    </Box>
                    <Box>{data?.visitReason}</Box>
                  </Box>
                </Box>
                <Box
                  className={classes.hideOnPrintPage}
                  style={{ margin: '40px 0 0px' }}
                >
                  <Button
                    color="secondary"
                    style={{ marginTop: 10 }}
                    size="large"
                    variant="contained"
                    onClick={() => setMessageModalOpen(true)}
                  >
                    Send Message to HouseCallMD about this appointment
                  </Button>
                </Box>
                <Box style={{ margin: '40px 0 0px' }}>
                  <Box style={{ marginBottom: 10 }}>
                    <strong>
                      HousecallMD Orders for {user_info?.first_name}{' '}
                      {user_info?.last_name}:
                    </strong>
                  </Box>
                  <Box>
                    <TextField
                      style={{
                        color: 'red',
                      }}
                      placeholder="Enter Orders"
                      value={orders}
                      multiline
                      rows={8}
                      maxrows={8}
                      fullWidth
                      variant="outlined"
                      onChange={(e) => setOrders(e.target.value)}
                      readOnly
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Box>
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
          )}
        </>
      )}
    </Container>
  )
}

export default AppointmentDetailsPage

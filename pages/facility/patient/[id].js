import { useContext, useEffect, useState } from 'react'
import useStore from '../../../zustand/store'
import {
  Typography,
  Box,
  CircularProgress,
  Button,
  Tabs,
  Tab,
  IconButton,
  Tooltip,
  Modal,
  TextField,
} from '@material-ui/core'
import Container from 'components/Container'
import { makeStyles } from '@material-ui/core/styles'
import { SnackBarContext } from 'components/SnackBar'
import EditIcon from '@material-ui/icons/Edit'
import { Auth } from '@supabase/ui'
import { supabase } from 'utils/initSupabaseService'
import AppointmentTable from '../../../components/AppointmentTable'
import { useRouter } from 'next/router'
import Message from 'components/Facility/Message'
import RefreshIcon from '@material-ui/icons/Refresh'
import xhrHeader from '../../../constants/xhrHeader'
import FacilityMessageModal from 'components/FacilityMessageModal'

const useStyles = makeStyles((theme) => ({
  h2: {
    marginTop: '.5em',
  },
  textFields: {
    width: '100%',
    marginTop: '2em',
    maxWidth: '34rem',
  },
  buttonLinks: {
    '@media screen and (max-width: 700px)': {
      '&:nth-child(2)': {
        order: -1,
      },
    },

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

const Patient = () => {
  const router = useRouter()
  const classes = useStyles()
  const [state, setState] = useState({})
  const [tabValue, setTabValue] = useState(0)
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState([])
  const [messagesLoading, setMessagesLoading] = useState(true)
  const [messageModalOpen, setMessageModalOpen] = useState(false)
  const [appointments, setAppointments] = useState([])
  const [authorized, setAuthorized] = useState(false)
  const { facilityPatientTableTab, setFacilityPatientTableTab } = useStore()

  const openSnackBar = useContext(SnackBarContext)

  const user = supabase.auth.user()

  const patientId = router.query.id

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }

  useEffect(() => {
    setTabValue(facilityPatientTableTab)
  }, [facilityPatientTableTab])

  useEffect(() => {
    if (patientId) {
      if (user) {
        fetch('/api/getSingleUser', {
          method: 'POST',
          headers: new Headers({ 'Content-Type': 'application/json' }),
          credentials: 'same-origin',
          body: JSON.stringify({ email: user.email }),
        })
          .then((res) => res.json())
          .then((res) => {
            setAuthorized(true)
            if (res.role === 'admin' || user.id === patientId) {
              fetchPatientInformation()
              if (state) {
                fetchFacilityAppointments().then((appointments) => {
                  setAppointments(appointments)
                })
              }
            } else {
              setLoading(false)
              openSnackBar({
                message: 'You are not authorized to view this page',
                snackSeverity: 'error',
              })
            }
          })
      } else {
        setLoading(false)
        openSnackBar({
          message: 'You are not authorized to view this page',
          snackSeverity: 'error',
        })
      }
    }
    setTimeout(() => {
      // requestTimer();
    }, 1000)
  }, [patientId])

  const requestTimer = () => {
    setTimeout(() => {
      console.log('requestTimer')
      getPatientMessages()
      openSnackBar({
        message: 'Fetching messages',
        // error: 'error',
      })
      requestTimer()
    }, 10000)
  }

  useEffect(() => {
    if (tabValue === 0 && patientId) {
      getPatientMessages()
    }
  }, [tabValue, patientId])

  const fetchPatientInformation = () => {
    const payload = {
      id: patientId,
    }

    fetch('/api/getFacilityPatientById', {
      ...xhrHeader,
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setState({ ...data })
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

  const fetchFacilityAppointments = async () => {
    const payload = {
      patientId,
      user,
    }
    const getFacilityAppointments = await fetch(
      '/api/getFacilityAppointments',
      {
        ...xhrHeader,
        body: JSON.stringify(payload),
      }
    )
    return await getFacilityAppointments.json()
  }

  let intervalTimeout;

  const getPatientMessages = () => {
    clearTimeout(intervalTimeout)

    const payload = {
      // facilityId: '2bcc2d5d-7ddf-4b6a-86cb-714f1d348213',
      patientId,
    }

    setMessagesLoading(true)

    fetch('/api/getAllFacilityMessages', {
      ...xhrHeader,
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setMessages(data)
          setMessagesLoading(false)
          intervalTimeout = setTimeout(() => {
            getPatientMessages();
          }, 60000)
        } else {
          openSnackBar({
            message: 'There was an error.  Please try again later',
            error: 'error',
          })
          setMessagesLoading(false)
        }
      })
  }

  return (
    <>
      {loading ? (
        <Box
          my="8em"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {user && (user.id === patientId || authorized) && (
            <>
              <Container>
                <Box>
                  <Box>
                    <div onClick={() => router.back()} className="link">
                      Go Back
                    </div>
                  </Box>
                  <Typography variant="h2" className={classes.h2}>
                    {state.first_name} {state.last_name}
                    <Tooltip title="Edit Patient Details">
                      <IconButton
                        component="span"
                        onClick={() =>
                          router.push(
                            `/facility/patient/edit-patient/${patientId}`
                          )
                        }
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                </Box>
                {state.room_number && (
                  <Box>Room Number: {state.room_number}</Box>
                )}
                <Box style={{ display: 'flex', marginTop: 40 }}>
                  <Box style={{ marginRight: 20 }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      onClick={() =>
                        router.push(`/facility/create-appointment/${patientId}`)
                      }
                    >
                      Request New Appointment
                    </Button>
                  </Box>
                  <Box>
                    <Button
                      onClick={() => setMessageModalOpen(true)}
                      variant="contained"
                      color="secondary"
                      size="large"
                    >
                      Send a Message About This Patient
                    </Button>
                  </Box>
                </Box>
                <Box style={{ marginTop: 40 }}>
                  <Tabs
                    value={tabValue}
                    onChange={(e, newValue) =>
                      setFacilityPatientTableTab(newValue)
                    }
                  >
                    <Tab label="Messages" {...a11yProps(0)} />
                    <Tab label="Appointments" {...a11yProps(1)} />
                    <Tab label="Completed Appointments" {...a11yProps(2)} />
                  </Tabs>

                  <TabPanel value={tabValue} index={0}>
                    {messagesLoading && (
                      <Box
                        my="8em"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <CircularProgress />
                      </Box>
                    )}
                    {!messagesLoading && (
                      <Box style={{ marginBottom: '1em' }}>
                        <Tooltip title="Check for new messages">
                          <IconButton
                            component="span"
                            onClick={getPatientMessages}
                          >
                            <RefreshIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    )}
                    {messages.length === 0 && !messagesLoading && (
                      <div>No messages for this user</div>
                    )}
                    <Box>
                      {messages.length > 0 &&
                        !messagesLoading &&
                        messages.map((entry, index) => {
                          return (
                            <Message
                              entry={entry}
                              index={index}
                              onReplyClick={() => setMessageModalOpen(true)}
                            />
                          )
                        })}
                    </Box>
                  </TabPanel>
                  <TabPanel value={tabValue} index={1}>
                    <AppointmentTable
                      appointments={appointments}
                      hideName
                      hideNote
                      hideCompleted
                    />
                  </TabPanel>
                  <TabPanel value={tabValue} index={2}>
                    <AppointmentTable
                      appointments={appointments}
                      hideName
                      hideNote
                      hideNonCompleted
                    />
                  </TabPanel>
                </Box>
              </Container>

              <FacilityMessageModal
                open={messageModalOpen}
                onClose={() => setMessageModalOpen(false)}
                title="Your are sending a message to HouseCall MD about the following patient"
                patientName={`${state.first_name} ${state.last_name}`}
                patientId={patientId}
                recipientId={null}
                senderId={user?.id}
                callbackFn={getPatientMessages}
              />
            </>
          )}
        </>
      )}
    </>
  )
}

export default Patient

import { useState, useEffect, useContext } from 'react'
import {
  Typography,
  Box,
  Tabs,
  Tab,
  CircularProgress,
  Tooltip,
  IconButton,
} from '@material-ui/core'

import { Auth } from '@supabase/ui'
import { SnackBarContext } from '../../../components/SnackBar'
import useStore from '../../../zustand/store'
import Users from '../../../components/Facility/Users'
import Centers from '../../../components/Facility/Centers'
import AppointmentTable from 'components/AppointmentTable'
import xhrHeader from '../../../constants/xhrHeader'
import RefreshIcon from '@material-ui/icons/Refresh'
import Message from '../../../components/Facility/Message'
import { makeStyles } from '@material-ui/core/styles'
import Container from 'components/Container'


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

const a11yProps = (index) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
})

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      //hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <>
          {children}
        </>
      )}
    </div>
  )
}

function UserAdmin(props) {
  const classes = useStyles()

  const [authorized, setAuthorized] = useState(false)
  const [tabValue, setTabValue] = useState(1)
  const [appointments, setAppointments] = useState([])
  const [messages, setMessages] = useState([])
  const [messagesLoading, setMessagesLoading] = useState(true)
  const [messageModalOpen, setMessageModalOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messageLoading, setMessageLoading] = useState(false)

  const openSnackBar = useContext(SnackBarContext)
  const { user } = Auth.useUser()
  const { facilityAdminTableTab, setFacilityAdminTableTab, isAdmin } = useStore()
  console.log('isAdmin', isAdmin)

  useEffect(() => {
    if (!isAdmin) {
      openSnackBar({
        message: 'You are not authorized to view this page',
        snackSeverity: 'error',
      })
      setAuthorized(false);
    } else {
      setAuthorized(true);
    }
  }, [user])

  useEffect(() => {
    if (!messagesLoading && !user) {
      openSnackBar({
        message: 'You are not authorized to view this page',
        snackSeverity: 'error',
      })
    }
  }, [user, messagesLoading])

  useEffect(async () => {
    if (authorized && user) {
      const getAllAppointments = await fetch('/api/getFacilityAppointments', {
        ...xhrHeader,
        body: JSON.stringify({ user }),
      })

      const getAllFacilityPatients = await fetch(
        '/api/getAllFacilityPatients',
        {
          ...xhrHeader,
          body: JSON.stringify({ user }),
        }
      )

      const appointmentData = await getAllAppointments.json()
      const patientData = await getAllFacilityPatients.json()

      appointmentData.map((appointment) => {
        const user = patientData.filter(
          (patient) => patient.id === appointment.userId
        )
        appointment.firstName = user[0].first_name
        appointment.lastName = user[0].last_name
      })

      setAppointments(appointmentData)
    }
  }, [authorized, user])

  useEffect(() => {
    setTabValue(facilityAdminTableTab)
  }, [facilityAdminTableTab])

  useEffect(() => {
    if (tabValue === 0) {
      getAllMessages()
    }
  }, [tabValue])

  const getAllMessages = () => {
    const payload = {}

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
        } else {
          openSnackBar({
            message: 'There was an error.  Please try again later',
            error: 'error',
          })
          setMessagesLoading(false)
        }
      })
  }

  const sendMessage = () => {
    const payload = {
      created_at: new Date(),
      sender: user.id,
      recipient: null,
      patient_id: patientId,
      message,
      viewed_by_recipient: false,
    }
    setMessagesLoading(true)

    fetch('/api/addFacilityMessage', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessagesLoading(false)
        setMessageModalOpen(false)
        if (data) {
          openSnackBar({
            message: 'Message successfully sent',
            // error: 'error',
          })
          getAllMessages()
        } else {
          openSnackBar({
            message: 'There was an error.  Please try again later',
            error: 'error',
          })
        }
      })
  }

  return (
    <>
      {authorized && (
        <Container
          style={{
            maxWidth: 1200,
            margin: '0 auto',
          }}
        >
          <Typography variant="h2" className={classes.h2}>
            Facility Admin
          </Typography>
          <Box mt="1em">
            <Tabs
              value={tabValue}
              onChange={(e, newValue) => setFacilityAdminTableTab(newValue)}
            >
              <Tab label="Messages" {...a11yProps(0)} wrap />
              <Tab label="Appointments" {...a11yProps(1)} />
              <Tab label="Completed Appointments" {...a11yProps(2)} />
              <Tab label="Users" {...a11yProps(3)} wrap />
              <Tab label="Centers" {...a11yProps(4)} />
            </Tabs>
          </Box>

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
                  <IconButton component="span" onClick={getAllMessages}>
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
                  return <Message entry={entry} index={index} />
                })}
            </Box>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <AppointmentTable appointments={appointments} admin hideCompleted />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <AppointmentTable appointments={appointments} admin hideNonCompleted />
          </TabPanel>
          <TabPanel value={tabValue} index={3}>
            <Users user={user} />
          </TabPanel>
          <TabPanel value={tabValue} index={4}>
            <Centers user={user} />
          </TabPanel>
        </Container>
      )}
    </>
  )
}

export default UserAdmin

import { useContext, useEffect, useState } from 'react'
import { NextSeo } from 'next-seo'
import {
  Typography,
  Box,
  CircularProgress,
  Button,
  Tabs,
  Tab,
  Tooltip,
  IconButton,
  Modal,
  Paper,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from '@material-ui/core'
import Container from '../../components/Container'
import { makeStyles } from '@material-ui/core/styles'
import { SnackBarContext } from '../../components/SnackBar'
import { Auth } from '@supabase/ui'
import MaterialTable from 'material-table'
import AppointmentTable from '../../components/AppointmentTable'
import xhrHeader from '../../constants/xhrHeader'
import { useRouter } from 'next/router'
import useStore from '../../zustand/store'
import Message from 'components/Facility/Message'
import RefreshIcon from '@material-ui/icons/Refresh'
import EditIcon from '@material-ui/icons/Edit'

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

const Profile = () => {
  const router = useRouter()
  const classes = useStyles()
  const [state, setState] = useState({})
  const [loading, setLoading] = useState(true)
  const [tabValue, setTabValue] = useState(0)
  const [appointments, setAppointments] = useState([])
  const [appointmentsLoading, setAppointmentsLoading] = useState(true)
  const [messages, setMessages] = useState([])
  const [messagesLoading, setMessagesLoading] = useState(true)
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false)

  const { user } = Auth.useUser()
  const appointmentsWithPatientName = []

  useEffect(async () => {
    if (user) {
      await fetchProfileInformation().then(() => {
        setLoading(false)
      })
    }
  }, [user])

  const { facilityProfileTableTab, setFacilityProfileTableTab } = useStore()

  useEffect(async () => {
    if (tabValue === 1 && Object.keys(state).length !== 0) {
      const data = await fetchFacilityAppointments()
      setAppointments(data)
      setAppointmentsLoading(false)
    }
    if (tabValue === 0 && user?.id) {
      getFacilityMessages()
    }
  }, [tabValue, state])

  useEffect(() => {
    setTabValue(facilityProfileTableTab)
  }, [facilityProfileTableTab])

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }

  const handlePatientSelect = (e) => {
    router.push(`/facility/create-appointment/${e.target.value}`)
  }

  const getFacilityMessages = () => {
    const payload = {
      facilityId: user.id,
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
        } else {
          openSnackBar({
            message: 'There was an error.  Please try again later',
            error: 'error',
          })
          setMessagesLoading(false)
        }
      })
  }

  const openSnackBar = useContext(SnackBarContext)

  const fetchFacilityAppointments = async () => {
    const payload = {
      user,
      facilityId: state.id,
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

  const fetchProfileInformation = async () => {
    const payload = {
      id: user.id,
    }
    let returnData = {}
    await fetch('/api/getFacilityById', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setState({ ...data })
          returnData = { ...data }
        } else {
          openSnackBar({
            message: 'There was an error.  Please try again later',
            error: 'error',
          })
          setLoading(false)
        }
      })
    return returnData
  }

  return (
    <>
      <NextSeo
        title="My Facility Account | House Call MD"
        description="My Facility Account |  House Call MD."
        canonical="https://www.housecallmd.org"
        openGraph={{
          type: 'website',
          title: 'My Facility Account | House Call MD',
          description: 'My Facility Account in House Call MD',
          locale: 'en_US',
          url: `https://www.housecallmd.org/facility/profile`,
        }}
      />
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
        <>
          <Container>
            <Box>
              <Box display="flex" alignItems="end">
                <Typography variant="h2" className={classes.h2}>
                  {state.name}
                </Typography>
                <Tooltip title="Edit Profile">
                  <IconButton
                    component="span"
                    onClick={() => router.push(`/facility/edit-account`)}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <div style={{ marginTop: '1em' }}>{state.address}</div>
              <div>
                {state.city}, {state.state} {state.zip}
              </div>
              <div>Primary Contact: {state.primary_contact_name}</div>
              <div>Phone: {state.facility_phone}</div>

              <div style={{ margin: '2em 0' }}>
                <Button
                  onClick={() => router.push('add-patient')}
                  color="primary"
                  variant="contained"
                >
                  Add New Resident
                </Button>
                <Button
                  style={{ marginLeft: 20 }}
                  onClick={() => setAppointmentModalOpen(true)}
                  color="primary"
                  variant="contained"
                >
                  Create New Appointment
                </Button>
              </div>
            </Box>
          </Container>
          <Box style={{ padding: '0 10px' }}>
            <Tabs
              value={tabValue}
              onChange={(e, newValue) => setFacilityProfileTableTab(newValue)}
            >
              <Tab label="Messages" {...a11yProps(0)} />
              <Tab label="Appointments" {...a11yProps(1)} />
              <Tab label="Residents" {...a11yProps(2)} />
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
                    <IconButton component="span" onClick={getFacilityMessages}>
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
              {appointmentsLoading ? (
                <Box
                  my="8em"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <CircularProgress />
                </Box>
              ) : (
                <AppointmentTable appointments={appointments} />
              )}
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <MaterialTable
                title="Patients"
                columns={[
                  {
                    title: 'First Name',
                    field: 'first_name',
                  },
                  {
                    title: 'Last Name',
                    field: 'last_name',
                  },
                  {
                    title: 'Room Number',
                    field: 'room_number',
                  },
                  {
                    title: 'Date of Birth',
                    field: 'date_of_birth',
                  },
                ]}
                data={state.patients}
                options={{
                  paginationType: 'stepped',
                  selection: true,
                  pageSize: 50,
                  pageSizeOptions: [50, 100, 200],
                }}
                onRowClick={(event, rowData) => {
                  const { id } = rowData
                  router.push(`/facility/patient/${id}`)
                }}
                // actions={[
                //   {
                //     tooltip: 'Remove All Selected Users',
                //     icon: 'delete',
                //     onClick: (event, data) => {
                //       setRowsToDelete(data)
                //       setOpenDialog(true)
                //     },
                //   },
                // ]}
                //onRowClick={(event, rowData) => rowSelected(rowData)}
              />
            </TabPanel>
          </Box>
        </>
      )}

      <Modal
        open={appointmentModalOpen}
        onClose={() => setAppointmentModalOpen(false)}
        // onClick={() => setAppointmentModalOpen(false)}
      >
        <div
          style={{
            width: '50%',
            margin: 'auto',
            minWidth: 350,
            paddingTop: '30%',
          }}
        >
          <Paper>
            <div
              style={{
                padding: 40,
              }}
            >
              <h3>Choose a Resident</h3>
              <Box mt="1em">
                <Select
                  fullWidth
                  id="select-patient"
                  placeholder={'Select Patient'}
                  variant="outlined"
                  onChange={handlePatientSelect}
                >
                  <MenuItem selected>Choose A Resident</MenuItem>
                  {state?.patients &&
                    state.patients.map((patient) => {
                      return (
                        <MenuItem value={patient.id} selected>
                          {patient.first_name} {patient.last_name}
                        </MenuItem>
                      )
                    })}
                </Select>
              </Box>
            </div>
          </Paper>
        </div>
      </Modal>
    </>
  )
}

export default Profile

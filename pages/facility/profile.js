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
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  FormControl,
} from '@material-ui/core'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
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
import FacilityMessageModal from '../../components/FacilityMessageModal'
import moment from 'moment'

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
  const [authorized, setAuthorized] = useState(false)
  const [messageModalOpen, setMessageModalOpen] = useState(false)
  const [messagesLoading, setMessagesLoading] = useState(true)
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false)
  const [patientSelectLoading, setPatientSelectLoading] = useState(false);
  const [deleteReason, setDeleteReason] = useState('');
  const [replyModalOpen, setReplyModalOpen] = useState(false)
  const [replyModalData, setReplyModalData] = useState({
    modalOpen: false,
    title: `You are replying to the following message`,
    patientName: null,
    patientId: null,
    receipientId: null,
  });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deletePatientData, setDeletePatientData] = useState(false);

  const { user } = Auth.useUser()

  useEffect(async () => {
    if (user) {
      if (user?.user_metadata?.facility) {
        await fetchProfileInformation().then(() => {
          setLoading(false)
          setAuthorized(true)
        })
      } else {
        openSnackBar({
          message: 'Not authorized to view this page.',
          snackSeverity: 'error',
        })
        setLoading(false)
      }
    }
  }, [user])

  const { facilityProfileTableTab, setFacilityProfileTableTab } = useStore()

  useEffect(async () => {
    if (user && user?.user_metadata?.facility) {
      if ((tabValue === 1 || tabValue === 2) && Object.keys(state).length !== 0) {
        const data = await fetchFacilityAppointments()
        setAppointments(data)
        setAuthorized(true);
        setAppointmentsLoading(false)
      }
      if (tabValue === 0 && user?.id) {
        getFacilityMessages()
      }
    }
  }, [tabValue, state, user])

  useEffect(() => {
    if (user && user?.user_metadata?.facility) {
      setTabValue(facilityProfileTableTab)
    }
  }, [facilityProfileTableTab, user])

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }

  const handlePatientSelect = (e) => {
    setPatientSelectLoading(true);
    router.push(`/facility/create-appointment/${e.target.value}`)
  }

  const setReply = (entry) => {
    setReplyModalOpen(true);
    const title = entry.patient_first_name ? `You are sending a message to ${entry.sender.name} at HouseCallMD about the following patient` : `You are sending a general message to ${entry.sender.name} at HouseCallMD`;

    const data = Object.assign(replyModalData, {});
    data.modalOpen = true;
    data.title = title;
    data.patientName = `${entry.patient_first_name} ${entry.patient_last_name}`;
    data.patientId = entry.patient_id;
    setReplyModalData(data)
  }

  let intervalTimeout;

  const getFacilityMessages = () => {
    clearTimeout(intervalTimeout)
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
          intervalTimeout = setTimeout(() => {
            getFacilityMessages();
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

  const openSnackBar = useContext(SnackBarContext)

  const handleDeleteReason = (e) => {
    setDeleteReason(e.target.value);
  }

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

  const archivePatient = ({id, archived}) => {
    const payload = {
      id: Number(id),
      archived,
      deleteReason,
    }
    fetch('/api/archiveFacilityUser', {
      ...xhrHeader,
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        openSnackBar({
          message: 'Patient Archived',
          snackSeverity: 'success',
        })
        setDeleteModalOpen(false);
        fetchProfileInformation();
      })
  }

  const fetchProfileInformation = async () => {
    const payload = {
      id: user.id,
      hideArchived: true,
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

      {!loading && authorized && (
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
                <Button
                  style={{ marginLeft: 20 }}
                  onClick={() => setMessageModalOpen(true)}
                  color="secondary"
                  variant="contained"
                >
                  Send A Message To HouseCall
                </Button>
              </div>
            </Box>
          </Container>
          <Container>
            <Tabs
              value={tabValue}
              onChange={(e, newValue) => setFacilityProfileTableTab(newValue)}
            >
              <Tab label="Messages" {...a11yProps(0)} />
              <Tab label="Appointments" {...a11yProps(1)} />
              <Tab label="Completed Appointments" {...a11yProps(1)} />
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
              <Box className="profile-messages">
                {messages.length > 0 &&
                  !messagesLoading &&
                  messages.map((entry, index) => {
                    return <Message entry={entry} index={index} onReplyClick={() => setReply(entry)} />
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
                <AppointmentTable appointments={appointments} hideCompleted />
              )}
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
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
                <AppointmentTable appointments={appointments} hideNonCompleted />
              )}
            </TabPanel>
            <TabPanel value={tabValue} index={3}>
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
                  {
                    title: '',
                    field: 'archived',
                    render: (rowData) => {
                      return (
                        <div>
                          <Tooltip title={`Remove ${rowData.first_name} ${rowData.last_name} From Account`}>
                            <HighlightOffIcon
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeleteModalOpen(true);
                                setDeletePatientData(rowData);
                              }}
                            />
                          </Tooltip>
                        </div>
                      )
                    }
                  },
                ]}
                data={state.patients}
                options={{
                  paginationType: 'stepped',
                  selection: false,
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
          </Container>
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
              <h3>Please choose a resident to create an appointment</h3>
              <Box mt="1em">
                {patientSelectLoading && (
                  <Box
                    my="8em"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <CircularProgress />
                  </Box>
                )}
                <Select
                  fullWidth
                  id="select-patient"
                  placeholder={'Select Patient'}
                  variant="outlined"
                  onChange={handlePatientSelect}
                  disabled={patientSelectLoading}
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
      <FacilityMessageModal
        open={messageModalOpen}
        onClose={() => setMessageModalOpen(false)}
        title="Your are sending general message to HouseCall MD. If this message applies to a resident please send the message through the resident's page."
        patientName={null}
        patientId={null}
        recipientId={null}
        senderId={user?.id}
        callbackFn={getFacilityMessages}
      />

      <FacilityMessageModal
        open={replyModalOpen}
        onClose={() => setReplyModalOpen(false)}
        title={replyModalData.title}
        patientName={replyModalData.patientName}
        patientId={replyModalData.patientId}
        recipientId={null}
        senderId={user?.id}
        callbackFn={getFacilityMessages}
      />

      <Modal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        // onClick={() => setAppointmentModalOpen(false)}
      >
        <div
          style={{
            width: '50%',
            margin: 'auto',
            minWidth: 350,
            paddingTop: '20%',
          }}
        >
          <Paper>
            <div
              style={{
                padding: 40,
              }}
            >
              <h3>You have chosen to remove {deletePatientData.first_name} {deletePatientData.last_name} from your HouseCallMD Account:</h3>
              <Box mt="1em">
                Please select a reason below and hit submit.  This action cannot be undone.
              </Box>
              <Box mt="1em">
                <FormControl component="fieldset">
                  <RadioGroup aria-label="reason" name="reason" value={deleteReason} onChange={handleDeleteReason}>
                    <FormControlLabel value="deceased" control={<Radio />} label="Resident deceased" />
                    <FormControlLabel value="left_facility" control={<Radio />} label="Resident left facility" />
                    <FormControlLabel value="error" control={<Radio />} label="Entered in error" />
                  </RadioGroup>
                </FormControl>
              </Box>
              <Box mt="1em">
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => archivePatient({id: deletePatientData.id, archived: true })}
                  disabled={!deleteReason}
                >Submit</Button>
                <Button
                  color="primary"
                  variant="outlined"
                  style={{marginLeft: 10}}
                  onClick={() => setDeleteModalOpen(false)}
                >Cancel</Button>
              </Box>
            </div>
          </Paper>
        </div>
      </Modal>
    </>
  )
}

export default Profile

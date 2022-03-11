import { useContext, useEffect, useState } from 'react'
import { NextSeo } from 'next-seo'
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
import MaterialTable from 'material-table'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Message from 'components/Facility/Message'
import RefreshIcon from '@material-ui/icons/Refresh'

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
  const [message, setMessage] = useState('')
  const [messageLoading, setMessageLoading] = useState(false)

  const openSnackBar = useContext(SnackBarContext)

  const { user } = Auth.useUser()

  const patientId = router.query.id

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }

  useEffect(() => {
    if (patientId) {
      fetchPatientInformation()
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
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
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

  const getPatientMessages = () => {
    const payload = {
      // facilityId: '2bcc2d5d-7ddf-4b6a-86cb-714f1d348213',
      patientId,
    }

    setMessagesLoading(true)

    fetch('/api/getAllFacilityMessages', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
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
          getPatientMessages()
        } else {
          openSnackBar({
            message: 'There was an error.  Please try again later',
            error: 'error',
          })
        }
      })

    console.log('payload', payload)
  }

  return (
    <>
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
                      router.push(`/facility/patient/edit-patient/${patientId}`)
                    }
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </Typography>
            </Box>
            {state.room_number && <Box>Room Number: {state.room_number}</Box>}
            <Box style={{ display: 'flex', marginTop: 40 }}>
              <Box style={{ marginRight: 20 }}>
                <Button variant="contained" color="secondary" size="large">
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
                onChange={(e, newValue) => setTabValue(newValue)}
              >
                <Tab label="Messages" {...a11yProps(0)} />
                <Tab label="Appointments" {...a11yProps(1)} />
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
                      <IconButton component="span" onClick={getPatientMessages}>
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
                Appointments
              </TabPanel>
            </Box>
          </Container>
        </>
      )}
      <Modal open={messageModalOpen} onClose={() => setMessageModalOpen(false)}>
        <Box
          style={{
            backgroundColor: '#fff',
            maxWidth: 700,
            width: '90%',
            margin: '10% auto',
            padding: 40,
            borderRadius: 10,
          }}
        >
          <Typography
            variant="h5"
            className={classes.h2}
            style={{ marginBottom: '1em' }}
          >
            Send a message to HouseCall MD about {state.first_name}{' '}
            {state.last_name}
          </Typography>
          <TextField
            placeholder="MultiLine with rows: 2 and rowsMax: 4"
            multiline
            rows={8}
            maxRows={8}
            fullWidth
            variant="outlined"
            onChange={(e) => setMessage(e.target.value)}
            disabled={messagesLoading}
          />
          <Button
            disabled={!message}
            onClick={sendMessage}
            style={{ marginTop: '1em' }}
            size="small"
            variant="contained"
            color="secondary"
          >
            Send Message
          </Button>
          {messagesLoading && <CircularProgress />}
        </Box>
      </Modal>
    </>
  )
  {
    /*    <div style={{marginTop: '1em'}}>*/
  }
  {
    /*      {state.address}*/
  }
  {
    /*    </div>*/
  }
  {
    /*    <div>*/
  }
  {
    /*      {state.city}, {state.state} {state.zip}*/
  }
  {
    /*    </div>*/
  }
  {
    /*    <div>*/
  }
  {
    /*      Primary Contact: {state.primary_contact_name}*/
  }
  {
    /*    </div>*/
  }
  {
    /*    <div>*/
  }
  {
    /*      Phone: {state.facility_phone}*/
  }
  {
    /*    </div>*/
  }

  {
    /*    <div style={{margin: '2em 0'}}>*/
  }
  {
    /*      <Button*/
  }
  {
    /*        onClick={() => router.push('add-patient')}*/
  }
  {
    /*        color="primary"*/
  }
  {
    /*        variant="contained"*/
  }
  {
    /*      >Add New Patient</Button>*/
  }
  {
    /*    </div>*/
  }
  {
    /*  </Box>*/
  }
  {
    /*</Container>*/
  }
  {
    /*<Box style={{padding: '0 40px'}}>*/
  }
  {
    /*  <MaterialTable*/
  }
  {
    /*    title="Patients"*/
  }
  {
    /*    columns={[*/
  }
  {
    /*      {*/
  }
  {
    /*        title: 'First Name',*/
  }
  {
    /*        field: 'first_name',*/
  }
  {
    /*      },*/
  }
  {
    /*      {*/
  }
  {
    /*        title: 'Last Name',*/
  }
  {
    /*        field: 'last_name',*/
  }
  {
    /*      },*/
  }
  {
    /*      {*/
  }
  {
    /*        title: 'Date of Birth',*/
  }
  {
    /*        field: 'date_of_birth',*/
  }
  {
    /*      },*/
  }
  {
    /*    ]}*/
  }
  {
    /*    data={state.patients}*/
  }
  {
    /*    options={{*/
  }
  {
    /*      paginationType: 'stepped',*/
  }
  {
    /*      selection: true,*/
  }
  {
    /*      pageSize: 50,*/
  }
  {
    /*      pageSizeOptions: [50, 100, 200],*/
  }
  {
    /*    }}*/
  }
  {
    /*    onRowClick={(event, rowData) => {*/
  }
  {
    /*      console.log('rowData', rowData)*/
  }
  {
    /*      const { id } = rowData;*/
  }
  {
    /*      router.push(`/facility/user/${id}`)*/
  }
  {
    /*    }}*/
  }
  {
    /*  />*/
  }
  //   </>
  //   }
  // </>
}

export default Patient

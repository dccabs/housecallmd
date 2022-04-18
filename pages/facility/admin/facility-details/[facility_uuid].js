import React, { useEffect, useState, useContext } from 'react'
import { NextSeo } from 'next-seo'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import useStore from '../../../../zustand/store'
import {
  Typography,
  Box,
  CircularProgress,
  Tabs,
  Tab,
  Tooltip,
  IconButton,
} from '@material-ui/core'
import xhrHeader from 'constants/xhrHeader'
import { SnackBarContext } from 'components/SnackBar'
import Container from 'components/Container'
import FacilityDetails from 'components/FacilityDetails'
import MaterialTable from 'material-table'
import tableCols from 'components/FacilityDetails/table-cols'
import RefreshIcon from '@material-ui/icons/Refresh'
import Message from 'components/Facility/Message'
import AppointmentTable from 'components/AppointmentTable'
import { Auth } from '@supabase/ui'
import FacilityMessageModal from '../../../../components/FacilityMessageModal'

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

const FacilityDetailsPage = () => {
  const { user } = Auth.useUser()
  const [authorized, setAuthorized] = useState(false)
  const [facility, setFacility] = useState()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [tabValue, setTabValue] = useState(0)
  const [messages, setMessages] = useState([])
  const [messagesLoading, setMessagesLoading] = useState(true)
  const [messageModalOpen, setMessageModalOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [appointments, setAppointments] = useState([])
  const [replyModalOpen, setReplyModalOpen] = useState(false)
  const [replyModalData, setReplyModalData] = useState({
    modalOpen: false,
    title: `You are replying to the following message`,
    patientName: null,
    patientId: null,
    receipientId: null,
  });

  const { facilityDetailsTableTab, setFacilityDetailsTableTab } = useStore()
  const openSnackBar = useContext(SnackBarContext)
  const router = useRouter()

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }

  useEffect(() => {
    setTabValue(facilityDetailsTableTab)
  }, [facilityDetailsTableTab])

  useEffect(() => {
    if (user) {
      fetch('/api/getSingleUser', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify({ email: user.email }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.role === 'admin') {
            setAuthorized(true)
          } else {
            openSnackBar({
              message: 'You are not authorized to view this page',
              snackSeverity: 'error',
            })
          }
        })
    }
  }, [user])

  useEffect(async () => {
    if (!facility && authorized && user) {
      const { facility_uuid } = router.query
      if (facility_uuid) {
        const fetchFacilityData = await fetch('/api/getFacilityById', {
          ...xhrHeader,
          body: JSON.stringify({ id: facility_uuid }),
        })

        const data = await fetchFacilityData.json()
        if (data.error) {
          console.error('ERROR:', data.error)
          setError(true)
          setLoading(false)
        } else {
          setFacility(data)
          setLoading(false)
        }
      }
    } else {
      setLoading(false)
    }
  })

  useEffect(() => {
    if (!loading && !user) {
      openSnackBar({
        message: 'You are not authorized to view this page',
        snackSeverity: 'error',
      })
    }
  }, [user, loading])

  const setReply = (entry) => {
    setReplyModalOpen(true);
    const title = entry.patient_first_name ? `You are sending a message to ${entry.sender.name} about the following patient` : `You are sending a general message to ${entry.sender.name}`;

    const data = Object.assign(replyModalData, {});
    data.modalOpen = true;
    data.title = title;
    data.patientName = `${entry.patient_first_name} ${entry.patient_last_name}`;
    data.patientId = entry.patient_id;
    data.receipientId = entry.sender.id;
    data.sentToHouseCall = false;
    data.sentFromHouseCall = true;
    setReplyModalData(data)
  }

  const getFacilityAppointments = () => {
    if (facility) {
      fetch('/api/getFacilityAppointments', {
        ...xhrHeader,
        body: JSON.stringify({ user, facilityId: facility.id }),
      })
        .then((res) => res.json())
        .then((data) => {
          setAppointments(data)
        })
    }
  }

  useEffect(() => {
    if (tabValue === 0 && facility) {
      getFacilityMessages()
    }
    if ((tabValue === 1 || tabValue === 2) && facility) {
      getFacilityAppointments()
    }
  }, [tabValue, facility])

  let intervalTimeout;

  const getFacilityMessages = () => {
    clearTimeout(intervalTimeout)
    const { facility_uuid } = router.query
    const payload = {
      facilityId: facility_uuid,
      // patientId: userId,
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

  return (
    <>
      {authorized && (
        <Container
        >
          <NextSeo
            title="My Facility Account | House Call MD"
            description="My Facility Account |  House Call MD."
            canonical="https://www.housecallmd.org"
            openGraph={{
              type: 'website',
              title: 'My Facility Account | House Call MD',
              description: 'My Facility Account in House Call MD',
              locale: 'en_US',
              url: `https://www.housecallmd.org/facility/facility-details`,
            }}
          />
          {error ? (
            <Container>
              <Typography variant="body1" className={classes.error}>
                Sorry, there has been an error
              </Typography>
            </Container>
          ) : (
            <>
              {loading ? (
                <Box
                  my="1em"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <CircularProgress />
                </Box>
              ) : (
                <div style={{marginBottom: 40}}>
                  <FacilityDetails facility={facility} />
                </div>
              )}
              <Box style={{ padding: 10 }}>
                <Tabs
                  value={tabValue}
                  onChange={(e, newValue) =>
                    setFacilityDetailsTableTab(newValue)
                  }
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
                        <IconButton
                          component="span"
                          onClick={getFacilityMessages}
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
                        return <Message isAdmin entry={entry} index={index} onReplyClick={() => { setReply(entry) }} />
                      })}
                  </Box>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                  <AppointmentTable appointments={appointments} hideCompleted admin />
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                  <AppointmentTable appointments={appointments} hideNonCompleted admin />
                </TabPanel>
                <TabPanel value={tabValue} index={3}>
                  <MaterialTable
                    title="Residents"
                    columns={tableCols}
                    data={facility?.patients}
                    onRowClick={(event, rowData) => {
                      const id = rowData.id
                      router.push(`/facility/admin/user-details/${id}`)
                    }}
                    options={{
                      paginationType: 'stepped',
                      selection: true,
                      pageSize: 50,
                      pageSizeOptions: [50, 100, 200],
                    }}
                  />
                </TabPanel>
              </Box>
            </>
          )}

        </Container>
      )}
      <FacilityMessageModal
        open={replyModalOpen}
        onClose={() => setReplyModalOpen(false)}
        title={replyModalData.title}
        patientName={replyModalData.patientName}
        patientId={replyModalData.patientId}
        recipientId={replyModalData.receipientId}
        senderId={user?.id}
        callbackFn={getFacilityMessages}
      />
    </>
  )
}

export default FacilityDetailsPage

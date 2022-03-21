import React, { useEffect, useState } from 'react'
import { NextSeo } from 'next-seo'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import useStore from '../../../../zustand/store'
import { Typography, Box, CircularProgress, Tabs, Tab, Tooltip, IconButton } from '@material-ui/core'
import xhrHeader from '../../../../constants/xhrHeader'
import Container from '../../../../components/Container'
import FacilityDetails from '../../../../components/FacilityDetails'
import MaterialTable from 'material-table'
import tableCols from '../../../../components/FacilityDetails/table-cols'
import RefreshIcon from '@material-ui/icons/Refresh'
import Message from '../../../../components/Facility/Message'
import AppointmentTable from '../../../../components/AppointmentTable'
import { Auth } from '@supabase/ui'


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

  const [facility, setFacility] = useState()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [tabValue, setTabValue] = useState(0)

  const [messages, setMessages] = useState([])
  const [messagesLoading, setMessagesLoading] = useState(true)
  const [messageModalOpen, setMessageModalOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [appointments, setAppointments] = useState([])

  const { facilityDetailsTableTab, setFacilityDetailsTableTab } = useStore()

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

  useEffect(async () => {
    if (!facility) {
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
    }
  })

  const getFacilityAppointments = async () => {
    if (facility) {
      const getAppointments = await fetch('/api/getFacilityAppointments', {
        ...xhrHeader,
        body: JSON.stringify({ user, facilityId: facility.id }),
      })
        .then((res) => res.json())
        .then((data) => {
          setAppointments(data);
      })
    }
  }

  useEffect(() => {
    if (tabValue === 0 && facility) {
      getFacilityMessages()
    }
    if (tabValue === 1 && facility) {
      getFacilityAppointments()
    }
  }, [tabValue, facility])

  const getFacilityMessages = () => {
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
            <>
              <FacilityDetails facility={facility} />
            </>
          )}
          <Box style={{ padding: 10 }}>
            <Tabs
              value={tabValue}
              onChange={(e, newValue) => setFacilityDetailsTableTab(newValue)}
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
              <AppointmentTable appointments={appointments} />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <MaterialTable
                title="Residents"
                columns={tableCols}
                data={facility?.patients}
                onRowClick={(event, rowData) => {
                  const id = rowData.id
                  router.push(`/facility/admin/user-details/${id}`)
                }}
              />
            </TabPanel>
          </Box>
        </>
      )}
    </>
  )
}

export default FacilityDetailsPage

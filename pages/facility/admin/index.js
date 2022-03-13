import { useState, useEffect, useContext } from 'react'
import { Typography, Box, Tabs, Tab } from '@material-ui/core'

import { Auth } from '@supabase/ui'
import { SnackBarContext } from '../../../components/SnackBar'
import useStore from '../../../zustand/store'
import Users from '../../../components/Facility/Users'
import Centers from '../../../components/Facility/Centers'
import AppointmentTable from '../../../components/AppointmentTable'
import xhrHeader from '../../../constants/xhrHeader'

const a11yProps = (index) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
})

function TabPanel(props) {
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

function UserAdmin(props) {
  const [authorized, setAuthorized] = useState(false)
  const [tabValue, setTabValue] = useState(1)
  const [appointments, setAppointments] = useState([])
  const openSnackBar = useContext(SnackBarContext)
  const { user } = Auth.useUser()
  const { facilityAdminTableTab, setFacilityAdminTableTab } = useStore()

  useEffect(async () => {
    if (user) {
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

  useEffect(() => {
    setTabValue(facilityAdminTableTab)
  }, [facilityAdminTableTab])

  console.log(appointments)

  return (
    <>
      {authorized && (
        <>
          <Box mt="1em">
            <Tabs
              value={tabValue}
              onChange={(e, newValue) => setFacilityAdminTableTab(newValue)}
            >
              <Tab label="Messages" {...a11yProps(0)} wrap />
              <Tab label="Appointments" {...a11yProps(1)} />
              <Tab label="Users" {...a11yProps(2)} wrap />
              <Tab label="Centers" {...a11yProps(3)} />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            Messages
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <AppointmentTable appointments={appointments} />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <Users user={user} />
          </TabPanel>
          <TabPanel value={tabValue} index={3}>
            <Centers user={user} />
          </TabPanel>
        </>
      )}
    </>
  )
}

export default UserAdmin

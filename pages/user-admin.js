import { useState, useEffect, useContext } from 'react'
import { Typography, Box, Tabs, Tab } from '@material-ui/core'

import Container from '../components/Container'
import Users from '../components/UserAdminPage/Users'
import Appointments from '../components/UserAdminPage/Appointments'
import CompletedAppointments from '../components/UserAdminPage/CompletedAppointments'
import PhoneNumbers from '../components/UserAdminPage/PhoneNumbers'
import { SnackBarContext } from '../components/SnackBar'
import { Auth } from '@supabase/ui'

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

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

const UserAdmin = (props) => {
  const [authorized, setAuthorized] = useState(false)
  const [tabValue, setTabValue] = useState(0)
  const openSnackBar = useContext(SnackBarContext)
  const { user } = Auth.useUser()

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

  return (
    <Container>
      {authorized && (
        <>
          <div>
            <Tabs
              value={tabValue}
              onChange={(e, newValue) => setTabValue(newValue)}
            >
              <Tab label="Users" {...a11yProps(0)} />
              <Tab label="Appointments" {...a11yProps(1)} />
              <Tab label="Completed Appoitments" {...a11yProps(2)} />
              <Tab label="Phone Numbers" {...a11yProps(3)} />
            </Tabs>
          </div>

          <TabPanel value={tabValue} index={0}>
            <Users user={user} openSnackBar={openSnackBar} />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <Appointments />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <CompletedAppointments />
          </TabPanel>
          <TabPanel value={tabValue} index={3}>
            <PhoneNumbers user={user} openSnackBar={openSnackBar} />
          </TabPanel>
        </>
      )}
    </Container>
  )
}

export default UserAdmin

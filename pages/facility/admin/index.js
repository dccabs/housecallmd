import { useState, useEffect, useContext } from 'react'
import { Typography, Box, Tabs, Tab } from '@material-ui/core'

import { Auth } from '@supabase/ui'
import { SnackBarContext } from '../../../components/SnackBar'
import useStore from '../../../zustand/store'
import Users from '../../../components/Facility/Users'
import Centers from '../../../components/Facility/Centers'

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
  const [tabValue, setTabValue] = useState(0)
  const openSnackBar = useContext(SnackBarContext)
  const { user } = Auth.useUser()
  const { facilityAdminTableTab, setFacilityAdminTableTab } = useStore()

  useEffect(async () => {
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

  useEffect(() => {
    setTabValue(facilityAdminTableTab)
  }, [facilityAdminTableTab])

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
            Appointments
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

import { useState, useEffect, useContext } from 'react'
import { Typography, Box, Tabs, Tab } from '@material-ui/core'

import { Auth } from '@supabase/ui'
import { SnackBarContext } from '../../components/SnackBar'
import Centers from '../../components/Facility/Centers'

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
  const openSnackBar = useContext(SnackBarContext)
  const { user } = Auth.useUser()

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

  return (
    <>
      {authorized && (
        <>
          <Box mt="1em">
            <Tabs
              value={tabValue}
              onChange={(e, newValue) => setTabValue(newValue)}
            >
              <Tab label="Users" {...a11yProps(0)} wrap />
              <Tab label="Centers" {...a11yProps(1)} />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <h1>USERS GOES HERE</h1>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <Centers user={user} />
          </TabPanel>
        </>
      )}
    </>
  )
}

export default UserAdmin
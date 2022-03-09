import { useContext, useEffect, useState } from 'react'
import { NextSeo } from 'next-seo'
import {
  Typography,
  Box,
  CircularProgress,
  Button,
  Tabs,
  Tab,
} from '@material-ui/core'
import Container from '../../components/Container'
import { makeStyles } from '@material-ui/core/styles'
import { SnackBarContext } from '../../components/SnackBar'
import { Auth } from '@supabase/ui'
import MaterialTable from 'material-table'
import Link from 'next/link';
import { useRouter } from 'next/router'

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
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true)
  const [tabValue, setTabValue] = useState(0);

  const { user } = Auth.useUser()


  useEffect(() => {
    if (user) {
      fetchProfileInformation();
    }
  }, [user])

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }

  const openSnackBar = useContext(SnackBarContext)

  const fetchProfileInformation = () => {
    const payload = {
      id: user.id,
    }
    fetch('/api/getFacilityById', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify(payload),
    }).then((res) => res.json())
     .then((data) => {
      if (data) {
        setState({...data})
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
      {loading &&
      <Box
        my="8em"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
      }
      {!loading &&
        <>
          <Container>
            <Box>
              <Typography variant="h2" className={classes.h2}>
                {state.name}
              </Typography>
              <div style={{marginTop: '1em'}}>
                {state.address}
              </div>
              <div>
                {state.city}, {state.state} {state.zip}
              </div>
              <div>
                Primary Contact: {state.primary_contact_name}
              </div>
              <div>
                Phone: {state.facility_phone}
              </div>

              <div style={{margin: '2em 0'}}>
                <Button
                  onClick={() => router.push('add-patient')}
                  color="primary"
                  variant="contained"
                >Add New Resident</Button>
                <Button
                  style={{marginLeft: 20}}
                  onClick={() => router.push('add-patient')}
                  color="primary"
                  variant="contained"
                >Create New Appointment</Button>
              </div>
            </Box>
          </Container>
          <Box style={{padding: '0 10px'}}>
            <Tabs
              value={tabValue}
              onChange={(e, newValue) => setTabValue(newValue)}
            >
              <Tab label="Messages" {...a11yProps(0)} />
              <Tab label="Appointments" {...a11yProps(1)}  />
              <Tab label="Residents" {...a11yProps(2)}  />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
              Messages
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              Appointments
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
                    const { id } = rowData;
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
      }
    </>
  )
}

export default Profile

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
import Container from '../../../components/Container'
import { makeStyles } from '@material-ui/core/styles'
import { SnackBarContext } from '../../../components/SnackBar'
import { Auth } from '@supabase/ui'
import MaterialTable from 'material-table'
import Link from 'next/link';
import { useRouter } from 'next/router'
import Users from '../../../components/UserAdminPage/Users'
import Appointments from '../../../components/UserAdminPage/Appointments'
import CompletedAppointments from '../../../components/UserAdminPage/CompletedAppointments'
import PhoneNumbers from '../../../components/UserAdminPage/PhoneNumbers'

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
  const [state, setState] = useState({});
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true)

  const { user } = Auth.useUser()

  console.log('router', router.query)
  const patientId = router.query.id;

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }


  useEffect(() => {
    if (patientId) {
      fetchPatientInformation();
    }
  }, [patientId])

  const openSnackBar = useContext(SnackBarContext)

  const fetchPatientInformation = () => {
    const payload = {
      id: patientId,
    }

    fetch('/api/getFacilityPatientById', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify(payload),
    }).then((res) => res.json())
      .then((data) => {
        console.log('data', data)
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
              {state.first_name} {state.last_name}
            </Typography>
          </Box>
          <Box style={{marginTop: 40}}>
            <Button variant="contained" color="secondary" size="large">
              Request New Appointment
            </Button>
          </Box>
          <Box style={{marginTop: 40}}>
            <Tabs
              value={tabValue}
              onChange={(e, newValue) => setTabValue(newValue)}
            >
              <Tab label="Messages" {...a11yProps(0)} />
              <Tab label="Appointments" {...a11yProps(1)}  />
              <Tab label="Information" {...a11yProps(2)}  />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              Information
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              Messages
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              Appointments
            </TabPanel>
          </Box>
        </Container>
      </>
      }
    </>);
        {/*    <div style={{marginTop: '1em'}}>*/}
        {/*      {state.address}*/}
        {/*    </div>*/}
        {/*    <div>*/}
        {/*      {state.city}, {state.state} {state.zip}*/}
        {/*    </div>*/}
        {/*    <div>*/}
        {/*      Primary Contact: {state.primary_contact_name}*/}
        {/*    </div>*/}
        {/*    <div>*/}
        {/*      Phone: {state.facility_phone}*/}
        {/*    </div>*/}

        {/*    <div style={{margin: '2em 0'}}>*/}
        {/*      <Button*/}
        {/*        onClick={() => router.push('add-patient')}*/}
        {/*        color="primary"*/}
        {/*        variant="contained"*/}
        {/*      >Add New Patient</Button>*/}
        {/*    </div>*/}
        {/*  </Box>*/}
        {/*</Container>*/}
        {/*<Box style={{padding: '0 40px'}}>*/}
        {/*  <MaterialTable*/}
        {/*    title="Patients"*/}
        {/*    columns={[*/}
        {/*      {*/}
        {/*        title: 'First Name',*/}
        {/*        field: 'first_name',*/}
        {/*      },*/}
        {/*      {*/}
        {/*        title: 'Last Name',*/}
        {/*        field: 'last_name',*/}
        {/*      },*/}
        {/*      {*/}
        {/*        title: 'Date of Birth',*/}
        {/*        field: 'date_of_birth',*/}
        {/*      },*/}
        {/*    ]}*/}
        {/*    data={state.patients}*/}
        {/*    options={{*/}
        {/*      paginationType: 'stepped',*/}
        {/*      selection: true,*/}
        {/*      pageSize: 50,*/}
        {/*      pageSizeOptions: [50, 100, 200],*/}
        {/*    }}*/}
        {/*    onRowClick={(event, rowData) => {*/}
        {/*      console.log('rowData', rowData)*/}
        {/*      const { id } = rowData;*/}
        {/*      router.push(`/facility/user/${id}`)*/}
        {/*    }}*/}
        {/*  />*/}
    //   </>
    //   }
    // </>
}

export default Patient

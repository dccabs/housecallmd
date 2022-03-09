import React, { useEffect, useState } from 'react'
import { NextSeo } from 'next-seo'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import {
  Typography,
  Box,
  CircularProgress,
  Tabs,
  Tab,
} from '@material-ui/core'
import xhrHeader from '../../../../constants/xhrHeader'
import Container from '../../../../components/Container'
import FacilityDetails from '../../../../components/FacilityDetails'
import MaterialTable from 'material-table'
import tableCols from '../../../../components/FacilityDetails/table-cols'

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
  const [facility, setFacility] = useState()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [tabValue, setTabValue] = useState(0);

  const router = useRouter()

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }

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
          <Box style={{padding:10}}>
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
                title="Residents"
                columns={tableCols}
                data={facility?.patients}
                onRowClick={(event, rowData) => {
                  const id = rowData.id;
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

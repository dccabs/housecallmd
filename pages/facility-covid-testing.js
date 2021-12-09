import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Container from '../components/Container'
import { NextSeo } from 'next-seo'
import { Box, Grid, Typography, makeStyles } from '@material-ui/core'
import FacilityCovidTestingPage from './covid-19-information'

const useStyles = makeStyles((theme) => ({}))

const FacilityCovidTesting = () => {
  const classes = useStyles()
  return (
    <>
      <NextSeo
        title="Facility Covid Testing | House Call MD"
        description="Facility Covid Testing in House Call MD."
        canonical="https://www.housecallmd.org"
        openGraph={{
          type: 'website',
          title: 'Facility Covid Testing | House Call MD',
          description: 'Facility Covid Testing',
          locale: 'en_US',
          url: `https://www.housecallmd.org/facility-covid-testing`,
        }}
      />
      <Container component="main">
        <Box my="3em" justifyContent="center" alignItems="center">
          <Box paddingBottom="3em">
            <Typography variant="h3" gutterBottom>
              Facility Covid Testing
            </Typography>
          </Box>
          <Box mb="2em">
            <img
              width="100%"
              src="/media/facility_covid_testing.jpg"
              alt="testing"
            />
          </Box>
          <Typography variant="body1">
            HouseCall MD works with local businesses and facilities to provide COVID-19 screening and testing. We
            can do on-site testing for groups as small as 5, and for groups up to 300. When you need a physician’s
            orders for the COVID test to be covered by the patient’s insurance, or when you and your staff are
            overwhelmed by the frequency and complexity of testing a large number of people, HouseCall MD can
            help. We work with long-term care facilities, factory and shipyard employers, school districts, and other
            community groups to provide COVID-19 testing after potential exposure or for clearance for travel. If
            any positives are found, we can immediately initiate treatment and help with contact tracing. If you
            need testing supplies and staff to perform COVID testing, call HouseCall MD at 833-432-5633.
          </Typography>
        </Box>
      </Container>
    </>
  )
}
FacilityCovidTesting.propTypes = {}

export default FacilityCovidTesting

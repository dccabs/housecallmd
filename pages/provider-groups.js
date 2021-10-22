import React from 'react'
import PropTypes from 'prop-types'
import { Box, Grid, Typography, makeStyles } from '@material-ui/core'
import Container from '../components/Container'
import { NextSeo } from 'next-seo'
const useStyles = makeStyles((theme) => ({
  titleText: {
    textAlign: 'left',
    fontWeight: 600,
  },
}))

const ProviderGroupsPage = () => {
  const classes = useStyles()
  return (
    <>
      <NextSeo
        title="Provider Groups | House Call MD"
        description="Provider Groups in House Call MD."
        canonical="https://www.housecallmd.org"
        openGraph={{
          type: 'website',
          title: 'Provider Groups | House Call MD',
          description: 'Provider Groups in House Call MD',
          locale: 'en_US',
          url: `https://www.housecallmd.org/provider-groups`,
        }}
      />
      <Container component="main">
        <Box my="3em">
          <Box paddingBottom="4em">
            <Typography variant="h3">Provider Groups</Typography>
          </Box>
          <Grid container>
            <Box mb="3em">
              <Typography
                variant="h4"
                className={classes.titleText}
                gutterBottom
              >
                Partnering with Community Health Care Providers
              </Typography>
              <Typography variant="body1">
                HouseCall MD works closely with local physicians and physician
                extenders to provide coverage for them after-hours, on weekends
                and holidays, when their schedule is full, or any other time
                they are unable to see patients. HouseCall MD does not provide
                primary care, so you have no reason to fear losing your patient
                to us.
              </Typography>
            </Box>
            <Box mb="3em">
              <Typography
                variant="h4"
                className={classes.titleText}
                gutterBottom
              >
                Extending Care to Your Patients
              </Typography>
              <Typography variant="body1">
                If a patient calls your office after hours and you feel like the
                patient needs care before you can fit them into your schedule,
                then HouseCall MD can be your eyes and ears and help in the care
                of your patient and their acute needs. This can also save your
                patient from an expensive ER visit or a prolonged wait in an
                urgent care waiting room. Also, HouseCall MD is unaffiliated,
                meaning we will not refer patients to specialists or other PCPs
                without your express approval. The patient can request an
                appointment directly or you can request an appointment on their
                behalf by creating an online portal. Once a request has been
                made, a clinical team member will review the patient’s symptoms
                over the phone to make sure it is appropriate for our services.
                HouseCall MD guarantees a visit within 24 hours for a home visit
                and within 2 hours of a telemedicine request.. HouseCall MD will
                assess, diagnose, and treat the patient. The provider will call
                in any prescriptions deemed appropriate, and send a copy of the
                clinical note and visit summary to the primary care provider and
                any other pertinent care team members to ensure appropriate
                follow-up.
              </Typography>
            </Box>
            <Box mb="3em">
              <Typography
                variant="h4"
                className={classes.titleText}
                gutterBottom
              >
                Following Up
              </Typography>
              <Typography variant="body1">
                To ensure continuity of care, HouseCall MD provides a detailed
                report to each patient’s primary care physician, regardless if
                the patient requested the visit, or if the PCP initiated the
                request. The goal of HouseCall MD is to bridge the gap between
                primary care visits and to provide convenient acute care
                services that are cheaper than an urgent care or emergency room.
              </Typography>
            </Box>
            <Box mb="3em">
              <Typography
                variant="h4"
                className={classes.titleText}
                gutterBottom
              >
                Better Access for Your Patients
              </Typography>
              <Typography variant="body1">
                Many patients are home bound or struggle to leave their home.
                Getting a patient to the clinic on time for a fasting blood test
                in the morning can be difficult for many patients who cannot
                drive or have mobility issues. HouseCall MD has a mobile
                phlebotomy service. We can also provide TeleMedicine technicians
                to your practice to help you see your home bound patients who
                struggle with technology.
              </Typography>
            </Box>
            <Box mb="3em">
              <Typography
                variant="h4"
                className={classes.titleText}
                gutterBottom
              >
                Increase Referrals
              </Typography>
              <Typography variant="body1">
                Due to the nature of HouseCall MD’s service model, we see a
                great deal of unassigned patients. Partnering with us will help
                facilitate a pathway for referrals to bring in new patients to
                your practice.
              </Typography>
            </Box>
          </Grid>
        </Box>
      </Container>
    </>
  )
}

ProviderGroupsPage.propTypes = {}

export default ProviderGroupsPage

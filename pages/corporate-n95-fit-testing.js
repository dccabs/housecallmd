import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Container from '../components/Container'
import { NextSeo } from 'next-seo'
import { Box, Grid, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({}))

const CorporateN95FitTesting = () => {
  const classes = useStyles()
  return (
    <>
      <NextSeo
        title="Corporate N95 Fit Testing | House Call MD"
        description="Corporate N95 Fit Testing in House Call MD."
        canonical="https://www.housecallmd.org"
        openGraph={{
          type: 'website',
          title: 'Corporate N95 Fit Testing | House Call MD',
          description: 'Corporate N95 Fit Testing in House Call MD',
          locale: 'en_US',
          url: `https://www.housecallmd.org/corporate-n95-fit-testing`,
        }}
      />
      <Container component="main">
        <Box my="3em" justifyContent="center" alignItems="center">
          <Box paddingBottom="3em">
            <Typography variant="h3" gutterBottom>
              N95 Fit Testing
            </Typography>
          </Box>
          <Box mb="2em">
            <img
              width="100%"
              src="/media/coporate-n95-fit-testing.jpg"
              alt="assited-living"
            />
          </Box>
          <Typography variant="body1">
            HouseCall MD provides N95 fit testing at your facility. We will
            review your staff’s medical history form and can approve them for
            the fit test. We can then send a certified technician to your
            facility to perform qualified N95 fit testing as required by State
            and County mandates. HouseCall MD will also provide you with a
            signed N95 Respirator Medical Clearance Form so you will be in
            compliance with regulating agencies. Call{' '}
            <a href="tel:833-432-5633">833-432-5633</a> to request more
            information or schedule your facility for testing.
          </Typography>
        </Box>
      </Container>
    </>
  )
}
CorporateN95FitTesting.propTypes = {}

export default CorporateN95FitTesting

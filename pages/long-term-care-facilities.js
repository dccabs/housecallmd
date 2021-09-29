import React from 'react'
import PropTypes from 'prop-types'
import Container from '../components/Container'
import { NextSeo } from 'next-seo'
import {
  Avatar,
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  makeStyles,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  textTitle: {
    textAlign: 'left',
    fontSize: '2em',
    marginBottom: '0.8em',
  },
}))

const LongTermCareFacilitiesPage = () => {
  const classes = useStyles()

  return (
    <>
      <NextSeo
        title="Long Term Care Facilities | House Call MD"
        description="Long Term Care Facilities in House Call MD."
        canonical="https://www.housecallmd.org"
        openGraph={{
          type: 'website',
          title: 'Long Term Care Facilities | House Call MD',
          description: 'Long Term Care Facilities in House Call MD',
          locale: 'en_US',
          url: `https://www.housecallmd.org/long-term-care-facilities`,
        }}
      />
      <Container component="main">
        <Box my="3em" justifyContent="center" alignItems="center">
          <Box paddingBottom="4em">
            <Typography variant="h3" gutterBottom>
              Long Term Care Facilities
            </Typography>
          </Box>
          <Box mb="4em">
            <Grid container direction="row" spacing={3} alignItems="stretch" >
              <Grid item xs={12} sm={12} md={6}>
                <Box>
                  <Typography
                    variant="h4"
                    className={classes.textTitle}
                    gutterBottom
                  >
                    Assisted Living and Independent Senior Living Communities
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    HouseCall MD partners with Senior Communities such as
                    Independent Living and Assisted Living. We provide
                    convenient medical evaluation and treatment in residents
                    rooms. This helps residents avoid unnecessary and expensive
                    trips to the emergency room or urgent care. The average wait
                    time for a resident to get an appointment with their primary
                    care clinic currently averages more than 2 weeks. An elderly
                    patient’s condition can rapidly deteriorate without prompt
                    medical evaluation and intervention. Our on-demand acute
                    care delivery system provides families with the peace of
                    mind that their loved ones have access to in-home care seven
                    days a week. Facilities that partner with HouseCall MD can
                    feel safe with the knowledge that their residents are
                    getting timely and appropriate medical care right in their
                    facilities. Call HouseCall MD at{' '}
                    <a href="tel:+8334325633">833-432-5633</a> to inquire.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Box>
                  <img
                    width="100%"
                    src="/media/assisted-living.jpg"
                    alt="assited-living"
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box mb="5em">
            <Grid
              container
              direction="row-reverse"
              spacing={3}
              alignItems="stretch"
              justify="flex-start"
            >
              <Grid item xs={12} sm={12} md={6}>
                <Box>
                  <Typography
                    variant="h4"
                    className={classes.textTitle}
                    gutterBottom
                  >
                    Home Health Agencies
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    We can deliver medical services directly in the patient’s
                    home. If you have a home health patient that you feel has an
                    acute medical need, HouseCall MD can help. We can provide
                    medical care when your patients are unable to get an
                    appointment with their regular primary care provider. We
                    also can manage most acute care issues and prevent expensive
                    urgent care or emergency room visits. We have extended hours
                    and are open on weekends to provide services to the
                    community when other options are not available. HouseCall MD
                    works as a team with your caregivers to get rapid medical
                    evaluation into the patient’s home.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Box>
                  <img
                    width="100%"
                    src="/media/home-health-agencies.jpg"
                    alt="home-health-agencies"
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box mb="4em">
            <Grid container direction="row" spacing={3} alignItems="stretch">
              <Grid item xs={12} sm={12} md={6}>
                <Box>
                  <Typography
                    variant="h4"
                    className={classes.textTitle}
                    gutterBottom
                  >
                    Adult Family Homes
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    HouseCall MD provides medical services to resident of the
                    adult family home. We can deliver medical services for acute
                    care as well as exacerbations of chronic medical conditions.
                    We are familiar with caring for patients with complex
                    medical conditions, and we understand how stressful visits
                    to the clinic or hospital can be for this population. We are
                    happy to work with the staff of adult family homes to
                    provide convenient and timely care for their facilities.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Box>
                  <img
                    width="100%"
                    src="/media/adult-family-homes.jpg"
                    alt="adult-family-homes"
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  )
}
LongTermCareFacilitiesPage.propTypes = {}

export default LongTermCareFacilitiesPage

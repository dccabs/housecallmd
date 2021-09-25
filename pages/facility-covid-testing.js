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
  imgCenter: {
    margin: 'auto',
    marginBottom: '1.25em',
  },
  yellowText: {
    color: '#F7C319',
  },
  yellowBG: {
    backgroundColor: '#F7C319',
  },
  greenText: {
    color: '#4CBD6F',
  },
  greenBG: {
    backgroundColor: '#4CBD6F',
  },
  purpleText: {
    color: '#592277',
  },
  purpleBG: {
    backgroundColor: '#592277',
  },
  fontWeight: {
    fontWeight: 800,
  },
  h4: {
    textAlign: 'left',
    fontSize: '2em',
  },
}))

const FacilityCovidTestingPage = () => {
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
          description: 'Facility Covid Testing in House Call MD',
          locale: 'en_US',
          url: `https://www.housecallmd.org/facility-covid-testing`,
        }}
      />
      <Container component="main">
        <Box my="3em">
          <Box paddingBottom="4em">
            <Typography variant="h3" gutterBottom>
              COVID-19 Testing
            </Typography>
            <Typography variant="body1">
              HouseCall MD administers 3 types of COVID tests in your home:
            </Typography>
          </Box>
          <Grid container direction="row" spacing={3} alignItems="stretch">
            <Grid item xs={12} sm={6} md={4}>
              <Box
                className={classes.boxRna}
                py="2em"
                m="auto"
                alignItems="center"
              >
                <Avatar className={`${classes.imgCenter} ${classes.yellowBG}`}>
                  <Typography className={`${classes.fontWeight}`}>1</Typography>
                </Avatar>
                <Typography
                  variant="h6"
                  align="center"
                  className={`${classes.yellowText} ${classes.fontWeight}`}
                >
                  VIRAL RNA
                </Typography>
                <Typography variant="body1" align="center" gutterBottom>
                  Detects the RNA of COVID-19 virus
                </Typography>
                <Box mt="2em" textAlign="center">
                  <img
                    className={classes.imgCenter}
                    height="120"
                    src="/media/viral-rna.png"
                    alt="viral-rna"
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box
                className={`box-${classes.antigen}`}
                py="2em"
                m="auto"
                alignItems="center"
              >
                <Avatar className={`${classes.imgCenter} ${classes.greenBG}`}>
                  <Typography className={`${classes.fontWeight}`}>2</Typography>
                </Avatar>
                <Typography
                  variant="h6"
                  align="center"
                  className={`${classes.greenText} ${classes.fontWeight}`}
                >
                  ANTIGEN
                </Typography>
                <Typography variant="body1" align="center" gutterBottom>
                  Detects antigens of the COVID-19 virus
                </Typography>
                <Box mt="2em" textAlign="center">
                  <img
                    className={classes.imgCenter}
                    height="120"
                    src="/media/antigen.png"
                    alt="antigen"
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box
                className={`box-${classes.antibody}`}
                py="2em"
                m="auto"
                alignItems="center"
              >
                <Avatar className={`${classes.imgCenter} ${classes.purpleBG}`}>
                  <Typography className={`${classes.fontWeight}`}>3</Typography>
                </Avatar>
                <Typography
                  variant="h6"
                  align="center"
                  fontWeight="600"
                  className={`${classes.purpleText} ${classes.fontWeight}`}
                >
                  ANTIBODY
                </Typography>
                <Typography variant="body1" align="center" gutterBottom>
                  Detects the RNA of COVID-19 virus
                </Typography>
                <Box mt="2em" textAlign="center">
                  <img
                    className={classes.imgCenter}
                    height="120"
                    src="/media/antibody.png"
                    alt="antibody"
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Box my="3em">
            <Typography variant="body1">
              The first two tests,
              <span className={`${classes.yellowText} ${classes.fontWeight}`}>
                Viral RNA (RT-PCR/RNA)
              </span>
              and the
              <span className={`${classes.greenText} ${classes.fontWeight}`}>
                Rapid Antigen Test (RAT)
              </span>
              , are obtained by a nasal swab. The
              <span className={`${classes.purpleText} ${classes.fontWeight}`}>
                Serum Antibody Test
              </span>
              requires a blood draw. Each test is appropriate at different times
              after the date of the potential exposure. The timing of the test
              matters for each of the three tests as well as if symptoms are
              present or not.
            </Typography>
          </Box>
          <Box mb="5em">
            <img width="100%" src="/media/graph-timeline.png" />
          </Box>
          <Typography
            variant="h4"
            className={`${classes.h4} ${classes.fontWeight}`}
          >
            So which test do I need, and when do I need it?
          </Typography>
          <Box mt="1em">
            <img
              width="100%"
              src="/media/detectability-graph.png"
              alt="detectability"
            />
          </Box>
          <Box mt="2em" mb="3em">
            <List>
              <ListItem>
                <ListItemIcon className={classes.fontWeight}>A.</ListItemIcon>
                <ListItemText>
                  This is the time from the date of exposure until the time the
                  virus begins replicating inside the body. This can be as quick
                  as 3 days, or take as long as 14 days, though the average
                  incubation period of COVID-19 is 5.6 days.{' '}
                  <span className={classes.fontWeight}>
                    All of the tests are likely to be negative in the incubation
                    window.
                  </span>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon className={classes.fontWeight}>B.</ListItemIcon>
                <ListItemText>
                  The time when someone is actively shedding the virus is the
                  Infection Window. This typically starts between 5-7 days after
                  initial exposure, and lasts up to 2 or 3 weeks. This is the
                  period of time where people will have symptoms which may be
                  mild to severe. This is also the time where someone is
                  contagious and can infect others.{' '}
                  <span className={classes.fontWeight}>
                    The <span className={classes.yellowText}>RT-PCR/RNA</span>{' '}
                    and the{' '}
                    <span className={classes.greenText}>
                      Rapid Antigen Test (RAT)
                    </span>{' '}
                    are both appropriate choices in this time window after
                    exposure. However, presence or absence of symptoms
                    determines which test would be more appropriate (read below
                    for more information).
                  </span>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon className={classes.fontWeight}>C.</ListItemIcon>
                <ListItemText>
                  The Immune Response Window is the period that begins after
                  your body begins to develop antibodies to the infection. This
                  response time takes about 14-24 days on average from the time
                  of first exposure. Antibodies are necessary to fight and
                  eliminate an infection, though they do not necessarily prevent
                  an infection.
                  <span className={classes.fontWeight}>
                    {' '}
                    The{' '}
                    <span className={classes.purpleText}>
                      Serum Antibody Test
                    </span>{' '}
                    is appropriate at this time to determine if you have
                    developed antibodies and have developed immunity.
                  </span>
                </ListItemText>
              </ListItem>
            </List>
          </Box>
          <Typography
            variant="h4"
            className={`${classes.h4} ${classes.fontWeight}`}
          >
            Still not sure which test you need?
          </Typography>
          <Box my="3em" textAlign="center">
            <img
              className={classes.imgCenter}
              width="auto"
              height="auto"
              max-height="500"
              max-width="500"
              src="/media/which-covid19-test.jpg"
              alt="which-covid19-test"
            />
          </Box>
          <Box my="2em">
            <Typography gutterBottom variant="body1">
              <span className={classes.fontWeight}>Symptomatic Patients:</span>{' '}
              Patients experiencing fever, shortness of breath, cough, new loss
              of taste or smell, or other common COVID-19 symptoms. If you have
              symptoms, there are two options for testing: the{' '}
              <span className={`${classes.fontWeight} ${classes.greenText}`}>
                Rapid Antigen Test (RAT)
              </span>{' '}
              or the{' '}
              <span className={`${classes.fontWeight} ${classes.yellowText}`}>
                Viral RNA (RT-PCR/RNA)
              </span>{' '}
              test. The{' '}
              <span className={`${classes.fontWeight} ${classes.greenText}`}>
                RAT
              </span>{' '}
              has same-day results, while the{' '}
              <span className={`${classes.fontWeight} ${classes.yellowText}`}>
                RT-PCR/RNA
              </span>{' '}
              test takes a bit longer. Although the{' '}
              <span className={`${classes.fontWeight} ${classes.greenText}`}>
                RAT
              </span>{' '}
              results are quicker, the{' '}
              <span className={`${classes.fontWeight} ${classes.yellowText}`}>
                RT-PCR/RNA
              </span>{' '}
              test is much more accurate.
              <span className={classes.fontWeight}>
                {' '}
                The{' '}
                <span className={`${classes.fontWeight} ${classes.greenText}`}>
                  Rapid Antigen Test
                </span>{' '}
                has a high false negative rate (~20%). The best and more
                accurate test is the{' '}
                <span className={`${classes.fontWeight} ${classes.yellowText}`}>
                  RT-PCR/RNA
                </span>
                , and is preferred over the{' '}
                <span className={`${classes.fontWeight} ${classes.greenText}`}>
                  RAT
                </span>
                .
              </span>
            </Typography>
          </Box>
          <Box my="2em">
            <Typography gutterBottom variant="body1">
              <span className={`${classes.fontWeight}`}>
                Asymptomatic Patients:
              </span>{' '}
              The only appropriate test for screening patients without any
              symptoms is the{' '}
              <span className={`${classes.fontWeight} ${classes.yellowText}`}>
                RT-PCR/RNA
              </span>{' '}
              test. Remember, the timing of the test after initial exposure is
              important (see above). For this test, results are currently
              returning in 2-3 days on average. This test is appropriate for
              those who have been exposed to someone with COVID-19 but have no
              symptoms, want to visit a high-risk family member, are returning
              to work, or need to be tested for travel purposes.{' '}
              <span className={`${classes.fontWeight}`}>
                The{' '}
                <span className={`${classes.greenText}`}>
                  Rapid Antigen Test
                </span>{' '}
                should NEVER be used for asymptomatic screening.
              </span>{' '}
              It is only to be used for patients with symptoms (those with a
              high pre-test probability).
            </Typography>
          </Box>
          <Box my="2em">
            <Typography gutterBottom variant="body1">
              For those who need to document whether they have immunity to
              COVID-19 (prior infection or immunization), the{' '}
              <span className={`${classes.fontWeight} ${classes.purpleText}`}>
                Serum Antibody Test
              </span>{' '}
              can be used. While it is good to have peace of mind, this test
              still doesn’t have much clinical application (though it may help
              determine if you need a booster of the COVID-19 vaccine).{' '}
              <span className={`${classes.fontWeight} `}>
                {' '}
                It is important to note, this test is not always covered by
                insurance, so the cost of the test may be out of pocket.
              </span>
            </Typography>
          </Box>
          <Box my="2em">
            <Typography gutterBottom variant="body1">
              Schedule an appointment with one of our medical providers. They
              can discuss which test is the most appropriate based on timing of
              exposure, potential symptoms, accuracy of each test, and whether
              the test is needed for travel or employment purposes. If you
              aren’t sure, schedule a telemedicine appointment, and the medical
              provider will discuss which option is best, and we can then send a
              technician to obtain a sample at your home.
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  )
}

FacilityCovidTestingPage.propTypes = {}

export default FacilityCovidTestingPage

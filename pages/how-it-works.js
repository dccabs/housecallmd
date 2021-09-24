import React from 'react'
import PropTypes from 'prop-types'
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Image,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core'
import { deepOrange } from '@material-ui/core/colors'
import Container from '../components/Container'

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: 'auto',
    marginBottom: '1.25em',
    backgroundColor: '#75c4d9',
  },
  cardTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#2670C0',

    textAlign: 'center',
  },
  stretch: {
    height: 'calc(100%)',
  },
}))

const HowItWorksPage = () => {
  const classes = useStyles()
  return (
    <Container component="main">
      <Box my="3em">
        <Box paddingBottom="3em">
          <Typography variant="h3">How it Works</Typography>
        </Box>
        <Box paddingBottom="3em" sx={{ flexGrow: 1 }}>
          <Grid container direction="row" spacing={3} alignItems="stretch">
            <Grid item xs={12} sm={6} md={4}>
              <Box py="2em" m="auto" alignItems="center">
                <Avatar className={classes.avatar}>
                  <Typography>1</Typography>
                </Avatar>
                <Typography variant="h6" align="center">
                  Register
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box py="2em" alignItems="center">
                <Avatar className={classes.avatar}>
                  <Typography>2</Typography>
                </Avatar>
                <Typography variant="h6" align="center">
                  Create an account
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box py="2em" alignItems="center">
                <Avatar
                  sx={{ bgcolor: deepOrange[500], margin: 'auto' }}
                  className={classes.avatar}
                >
                  <Typography>3</Typography>
                </Avatar>
                <Typography variant="h6" align="center">
                  Choose your appointment
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Typography variant="body1">
          Choose which level of care you feel is most suited to your medical
          issue. All visits are covered by insurance. If you don’t have
          insurance, there is a flat rate per visit.
        </Typography>
        <Box my="4em">
          <Grid
            container
            spacing={2}
            justify="space-between"
            alignItems="stretch"
          >
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.stretch}>
                <CardHeader
                  title="TeleMedicine"
                  className={classes.cardTitle}
                />
                <CardMedia
                  component="img"
                  height="194"
                  image="/media/tele-medicine.jpeg"
                  alt="Tele Medicine"
                />
                <CardContent>
                  <Typography gutterBottom>
                    Many simple medical issues can be handled via telemedicine.
                    Issues that are appropriate for telemedicine can range from
                    pinkeye, sinusitis, rashes, constipation, diarrhea, nausea,
                    back pain, shingles, and simple medication refills among
                    others. The medical provider can evaluate your symptoms and
                    send a prescription electronically to your local pharmacy
                    for immediate pickup.
                  </Typography>
                  <Box mt="2em">
                    <Typography style={{ fontWeight: 600 }}>
                      With insurance: Free/no copay
                    </Typography>
                    <Typography style={{ fontWeight: 600 }}>
                      No insurance: $49
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.stretch}>
                <CardHeader
                  title="Augmented TeleMedicine"
                  className={classes.cardTitle}
                />
                <CardMedia
                  component="img"
                  height="194"
                  image="/media/augmented-tele-medicine.jpeg"
                  alt="Tele Medicine"
                />
                <CardContent>
                  <Typography gutterBottom>
                    The level of care sends a medical technician to your home to
                    help the doctor perform the exam using technology (digital
                    stethoscope and otoscope). They can order on-site testing as
                    well as medical treatments like nebulizers, injections, or
                    wound care. The medical technician can also dispense your
                    prescription for you, so you don’t have to go to the
                    pharmacy after the visit. Most medical issues can be treated
                    with this level of care.
                  </Typography>
                  <Box mt="2em">
                    <Typography style={{ fontWeight: 600 }}>
                      With insurance: $49/no Co-pay
                    </Typography>
                    <Typography style={{ fontWeight: 600 }}>
                      No insurance: $99
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.stretch}>
                <CardHeader title="House Call" className={classes.cardTitle} />
                <CardMedia
                  component="img"
                  height="194"
                  image="/media/house-call.jpeg"
                  alt="Tele Medicine"
                />
                <CardContent>
                  <Typography gutterBottom>
                    A House Call brings a medical practitioner (MD/DO, PA, NP)
                    into your home. This is the highest level of care and is
                    appropriate for more complex medical concerns or elderly
                    patients that have multiple medical conditions. Any
                    procedures such as stitches, abscess drainage, or fracture
                    splinting require a House Call by a medical practitioner.
                  </Typography>
                  <Box mt="2em">
                    <Typography style={{ fontWeight: 600 }}>
                      With insurance: $99 and Co-pay
                    </Typography>
                    <Typography style={{ fontWeight: 600 }}>
                      No insurance: $249
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
        <Grid container spacing={4}>
          <Grid item md={6}>
            <Box py="2em" m="auto" alignItems="center">
              <Avatar className={classes.avatar}>
                <Typography>4</Typography>
              </Avatar>
              <Typography>
                We will confirm your appointment after you have chosen your
                level of care. If you are unsure what level of care is
                appropriate, choose TeleMedicine and the medical provider will
                speak with you and evaluate your symptoms. If they determine
                that you need an on-site visit or testing, they can arrange for
                staff to come to you or schedule you for an in-person follow-up
                appointment.
              </Typography>
            </Box>
          </Grid>

          <Grid item md={6}>
            <Box py="2em" m="auto" alignItems="center">
              <Avatar className={classes.avatar}>
                <Typography>5</Typography>
              </Avatar>
              <Typography>
                Wait in the comfort of your own home and HouseCall MD will
                provide you with prompt medical care.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

HowItWorksPage.propTypes = {}

export default HowItWorksPage

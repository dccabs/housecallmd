import { Typography, Box, Link } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { NextSeo } from 'next-seo'
import Container from '../components/Container'
import ServicesItems from '../components/ServicesPage/ServicesItems'
import ServicesAreas from '../components/ServicesPage/ServicesAreas'
import ContactSection from '../components/ContactSection'

const useStyles = makeStyles((theme) => ({
  h2: {
    marginTop: '.5em',
  },
  content: {
    '& p': {
      maxWidth: '35rem',
    },

    [theme.breakpoints.up('sm')]: {
      padding: '0 6em',
    },
  },
  services: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    maxWidth: '1400px',
  },
  cta: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',

    '& h4': {
      maxWidth: '45rem',
    },

    '& p': {
      maxWidth: '50rem',
    },

    '& a': {
      color: '#fff',
    },
  },
}))

const ServicesPage = () => {
  const classes = useStyles()

  return (
    <>
      <NextSeo
        title="Services | House Call MD"
        description="Services in House Call MD."
        canonical="https://www.housecallmd.org"
        openGraph={{
          type: 'website',
          title: 'Services | House Call MD',
          description: 'Services in House Call MD',
          locale: 'en_US',
          url: `https://www.housecallmd.org/services`,
        }}
      />
      <Container>
        <Box>
          <Typography variant="h2" className={classes.h2}>
            Services
          </Typography>
          <ServicesItems />
        </Box>
      </Container>

      <Box className={classes.cta} display="flex" justifyContent="center">
        <Container>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h4" align="center">
              Housecall MD brings urgent care straight to your home or office!
              No more waiting or wasting time, effort and money!
            </Typography>
            <Box mt="1em" mb="4em">
              <Typography align="center">
                With our services, you get to receive the healthcare service and
                urgent care you need on the spot. You do not even have to go to
                the pharmacy if you need prescriptions – we dispense medications
                on site! The best thing is we are available to cater to your
                needs when other clinics are closed. We provide after-hours and
                weekend services, giving you with the necessary care day and
                night!{' '}
              </Typography>
            </Box>
            <Typography variant="h6" align="center">
              <strong>
                <Link href="#contact">
                  Take advantage of our services today
                  <br />
                  Contact us now!
                </Link>
              </strong>
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container>
        <ServicesAreas />
      </Container>
      <ContactSection />
    </>
  )
}

export default ServicesPage

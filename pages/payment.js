import { Typography, Box, TextField, Button, Backdrop, CircularProgress } from '@material-ui/core'
import Container from '../components/Container'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import PaymentForm from '../components/PaymentForm'
import { SnackBarContext } from '../components/SnackBar'

import { makeStyles } from '@material-ui/core/styles'
import useStore from '../zustand/store'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const useStyles = makeStyles((theme) => ({
  h2: {
    marginTop: '.5em',
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
    '& a': {
      textDecoration: 'none',
    },
  },
  content: {
    [theme.breakpoints.up('sm')]: {
      textAlign: 'center',
      fontSize: '1.5em',
      padding: '2em 0',
    },
  }
}))

const Payment = () => {
  const [processing, setProcessing] = useState(false)

  const classes = useStyles()
  const router = useRouter()

  const {
    hasInsurance,
    provider,
    planNumber,
    groupNumber,
    visitChoice,
    firstName,
    lastName,
    email,
    address,
    city,
    state,
    zip,
    phone,
  } = useStore()

  const openSnackBar = useContext(SnackBarContext)

  const handleContinue = () => {
    console.log('handleContinue')
    sendEmailToHouseCall();
  }

  const sendEmailToHouseCall = async () => {
    const payload = {
      newUser: {
        hasInsurance,
        provider,
        planNumber,
        groupNumber,
        visitChoice,
        firstName,
        lastName,
        email,
        address,
        city,
        state,
        zip,
        phone,
        amount: 0,
      }
    }

    await fetch('/api/sendNewAppointmentEmail', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify(payload)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw Error(data.error);
        } else {
          openSnackBar({message: 'Appointment request sent to HouseCallMD', snackSeverity: 'success'})
          router.push('/thank-you')
          setProcessing(false)
        }
      })
      .catch(error => {
        openSnackBar({message: error.toString(), snackSeverity: 'error'})
        setProcessing(false)
        // setOpen(false);
      });
  }

  return (
    <>
      <Backdrop className={classes.backdrop} open={processing}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container>
        <Box>
          <Typography variant="h2" className={classes.h2}>Payment</Typography>
          {(hasInsurance && visitChoice==='video') ?
            <>
              <p className={classes.content}>
                Because you have insurance and have selected a Video appointment, there is no addtional charge for this service. Please click <strong>Continue</strong>.
              </p>
              <Box
                mt="2em"
                display="flex"
                justifyContent="center"
                flexWrap="wrap"
              >
                <Box m="1em" className={classes.buttonLinks}>
                  <Button
                    onClick={() => router.back()}
                    color="secondary"
                    variant="contained"
                  >
                    Back
                  </Button>
                </Box>
                <Box m="1em" className={classes.buttonLinks}>
                  <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    size="large"
                    onClick={handleContinue}
                  >
                    Continue
                  </Button>
                </Box>
              </Box>
            </>


            : <Elements stripe={stripePromise}>
              <PaymentForm />
            </Elements>
          }
        </Box>
      </Container>
    </>
  )
}

export default Payment

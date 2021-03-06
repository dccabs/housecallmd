import {
  Typography,
  Box,
  TextField,
  Button,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import Container from '../components/Container'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import PaymentForm from '../components/PaymentForm'
import { SnackBarContext } from '../components/SnackBar'

import { makeStyles } from '@material-ui/core/styles'
import useStore from '../zustand/store'
import { useRouter } from 'next/router'
import { useContext, useState, useEffect } from 'react'
import { Auth } from '@supabase/ui'
import moment from 'moment'

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
  },
  backdrop: {
    zIndex: 99999,
  }
}))

const Payment = () => {
  const [processing, setProcessing] = useState(false)
  const [clientPhones, setClientPhones] = useState([])

  const classes = useStyles()
  const router = useRouter()
  const { user } = Auth.useUser()

  const {
    isPolicyCardHolder,
    policyHolderFirstName,
    policyHolderLastName,
    policyHolderDob,
    policyHolderRelation,
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
    dob,
    reason,
    insuranceOptOut,
  } = useStore()

  const newUser = {
    insuranceOptOut,
    hasInsurance,
    isPolicyCardHolder,
    policyHolderFirstName,
    policyHolderLastName,
    policyHolderDob: moment(policyHolderDob).format('L'),
    policyHolderRelation,
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
    reason,
    dob: moment(dob).format('L'),
    amount: 0,
  }

  useEffect(async () => {
    if (user) {
      await fetch('/api/getPhoneNumbers', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify({
          user,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          const activePhones = data.filter(phone => {
            return phone.isActive;
          })


          const phones = activePhones.map(phone => {
            return phone.phoneNumber;
          })
          setClientPhones(phones);
        })
        .catch((error) => {
          openSnackBar({ message: error.toString(), snackSeverity: 'error' })
        })
    }
  }, [user])

  const openSnackBar = useContext(SnackBarContext)

  const handleContinue = () => {
    addAppointment();
  }

  const addAppointment = async () => {
    setProcessing(true)
    await fetch('/api/addAppointment', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({
        user,
        visitChoice,
        visitReason: reason,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw Error(data.error)
        } else {
          sendEmailAppointmentConfirmation()
          sendSMSToHouseCall()
          sendSMSToPatient();
        }
      })
      .catch((error) => {
        openSnackBar({ message: error.toString(), snackSeverity: 'error' })
        setProcessing(false)
      })
  }

  const sendEmailAppointmentConfirmation = async () => {
    const payload = {
      newUser,
    }

    await fetch('/api/sendAppointmentConfirmationEmail', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw Error(data.error)
        }
      })
      .catch((error) => {
        openSnackBar({ message: error.toString(), snackSeverity: 'error' })
        setProcessing(false)
      })

    await fetch('/api/sendNewAppointmentEmail', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw Error(data.error)
        } else {
          openSnackBar({
            message: 'Appointment request sent to HouseCallMD',
            snackSeverity: 'success',
          })
          router.push('/thank-you')
          setProcessing(false)
        }
      })
      .catch((error) => {
        openSnackBar({ message: error.toString(), snackSeverity: 'error' })
        setProcessing(false)
        // setOpen(false);
      })
  }

  const sendSMSToHouseCall = () => {
    const message = `${firstName} ${lastName} just signed up for an appointment.`
    //const phones = process.env.NEXT_PUBLIC_CLIENT_PHONE_NUMBERS.split(',')

    clientPhones.forEach(async (phone) => {
      try {
        await fetch('/api/sendMessage', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: phone,
            body: message,
          }),
        })
      } catch (err) {
        throw err
      }
    })
  }

  const sendSMSToPatient = () => {
    console.log('sendSMSToPatient', phone)
    const message = `Housecall MD received your request for an appointment. A representative from HouseCall MD will be contacting you shortly with more information. Please do not reply to this message as this inbox is not monitored. If you need to reach out to us sooner, please email contact@housecallmd.org or call (833) 432-5633. If this is an emergency, please call 9-1-1.`
    try {
      fetch('/api/sendMessage', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: phone,
          body: message,
        }),
      })
    } catch (err) {
      throw err
    }
  }

  const usingInsurance = hasInsurance && !insuranceOptOut;

  return (
    <>
      <Backdrop className={classes.backdrop} open={processing}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container>
        <Box>
          <Typography variant="h2" className={classes.h2}>
            Payment
          </Typography>
          {usingInsurance && visitChoice === 'video' ? (
            <>
              <p className={classes.content}>
                Because you have insurance and have selected a Video
                appointment, there is no addtional charge for this service.
                Please click <strong>Continue</strong>.
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
          ) : (
            <Elements stripe={stripePromise}>
              <PaymentForm
                newUser={newUser}
                clientPhones={clientPhones}
                usingInsurance={usingInsurance}
                addAppointment={addAppointment}
              />
            </Elements>
          )}
        </Box>
      </Container>
    </>
  )
}

export default Payment

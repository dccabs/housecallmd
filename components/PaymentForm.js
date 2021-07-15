import { useContext, useState, useEffect } from 'react'
import {
  Typography,
  Box,
  Button,
  Dialog,
  DialogContent,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import useStore from '../zustand/store'
import { SnackBarContext } from './SnackBar'
import visitPricing from '../public/constants/visitPricing'
import Field from './Field'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: 9999,
    color: '#fff',
  },
  cardError: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    marginBottom: '2em',
    maxWidth: '40rem',

    '& h4': {
      lineHeight: '1.5em',
    },
  },
  textFields: {
    width: '100%',
    marginTop: '2em',
    maxWidth: '34rem',
  },
  FormRow: {
    padding: '1rem',
    borderRadius: '4px',
  },
  FormGroup: {
    margin: '0 15px 20px',
    padding: 0,
    borderStyle: 'none',
    backgroundColor: '#fff',
    boxShadow: '1px 5px 10px 1px #e6e6e6',
    borderRadius: '4px',
  },
  buttonLinks: {
    '@media screen and (max-width: 700px)': {
      '&:nth-child(2)': {
        order: -1,
      },
    },

    '& button': {
      height: '100%',
      padding: '1em',
      fontWeight: 600,
      width: '16rem',

      '&:hover': {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
  visitDescription: {
    textAlign: 'center',
    fontSize: 16,
    margin: '20px 0'
  }
}))

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#0092b8',
      color: '#000',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: '#000',
      },
      '::placeholder': {
        color: '#b9b9b9',
      },
    },
    invalid: {
      iconColor: '#0092b8',
      color: '#0092b8',
    },
  },
}

const PaymentForm = (props) => {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState(null)
  const [cardComplete, setCardComplete] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState(false)
  const [amount, setAmount] = useState(0)
  const [billingDetails, setBillingDetails] = useState({
    email: '',
    phone: '',
    name: '',
  })

  const openSnackBar = useContext(SnackBarContext)

  const {
    hasInsurance,
    visitChoice,
    firstName,
    lastName,
    email,
  } = props.newUser;

  const stripe = useStripe()
  const elements = useElements()
  const classes = useStyles()
  const router = useRouter()

  useEffect(() => {
    if (visitChoice === 'video') {
      hasInsurance
        ? setAmount(visitPricing.insurance.pricing.video)
        : setAmount(visitPricing.noInsurance.pricing.video)
    } else if (visitChoice === 'phone') {
      hasInsurance
        ? setAmount(visitPricing.insurance.pricing.phone)
        : setAmount(visitPricing.noInsurance.pricing.phone)
    } else if (visitChoice === 'in_person') {
      hasInsurance
        ? setAmount(visitPricing.insurance.pricing.in_person)
        : setAmount(visitPricing.noInsurance.pricing.in_person)
    }
  }, [])

  const handleClose = () => {
    setOpen(false)
    // handleSubmit()
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error) {
      openSnackBar({
        message: "Please correct the errors in your payment form",
        snackSeverity: 'error',
      })
      return false;
    }
    setProcessing(true)
    await fetch(`/api/createPaymentIntent`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // id,
        amount: amount * 100,
        email,
        visitChoice,
        firstName,
        lastName,
      }),
    }).then((res) => {
      return res.json();
    }).then((data) => {
      setClientSecret(data.clientSecret);
      setOpen(true);
      setProcessing(false)
    });
  }

  const sendEmailToUser = async () => {
    const userData = {
      ...props.newUser,
      amount,
    }
    const payload = {
      newUser: userData,
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
        setOpen(false);
      });
  }

  const handleConfirm = async (e) => {
    e.preventDefault();
    setProcessing(true)


    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      }
    })

    if (payload.error) {
      openSnackBar({
        message: `Payment failed ${payload.error.message}`,
        snackSeverity: 'error',
      });
      setProcessing(false);
      setOpen(false);
    } else {
      setError(null);
      setSucceeded(true);
      sendEmailToUser();
    }
  }

  return (
    <>
      <Backdrop className={classes.backdrop} open={processing}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box my="1em" width="100%" display="flex" justifyContent="center">
        <Box className={classes.wrapper}>
          <Box className={classes.text}>
            <Typography variant="h4">
              <strong>Cost: ${amount}</strong>
            </Typography>
            <div className={classes.visitDescription}>
              <p>
                You have chosen a {' '}
                {visitChoice === 'video'
                  ? 'Video'
                  : visitChoice === 'phone'
                    ? 'Phone'
                    : visitChoice === 'in_person'
                      ? 'Housecall, in person'
                      : ''}{' appointment'}
              </p>
              <p>
                To proceed please fill out your payment information.
              </p>
            </div>
          </Box>
          <form onSubmit={handleSubmit}>
            <fieldset className={classes.FormGroup}>
              <Field
                label="Name"
                id="name"
                type="text"
                placeholder="Jane Doe"
                required
                autoComplete="name"
                value={billingDetails.name}
                onChange={(e) => {
                  setBillingDetails({ ...billingDetails, name: e.target.value })
                }}
              />
              <Field
                label="Email"
                id="email"
                type="email"
                placeholder="janedoe@gmail.com"
                required
                autoComplete="email"
                value={billingDetails.email}
                onChange={(e) => {
                  setBillingDetails({ ...billingDetails, email: e.target.value })
                }}
              />
              <Field
                label="Phone"
                id="phone"
                type="tel"
                placeholder="(941) 555-0123"
                required
                autoComplete="tel"
                value={billingDetails.phone}
                onChange={(e) => {
                  setBillingDetails({ ...billingDetails, phone: e.target.value })
                }}
              />
            </fieldset>

            <fieldset className={classes.FormGroup}>
              <div className={classes.FormRow}>
                <CardElement
                  options={CARD_OPTIONS}
                  onChange={(e) => {
                    setError(e.error?.message)
                    setCardComplete(e.complete)
                  }}
                />
              </div>
            </fieldset>
            {error &&
            <div className={classes.cardError}>
              {error}
            </div>
            }

            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Box
                mt="1em"
                display="flex"
                justifyContent="center"
                flexWrap="wrap"
              >
                <Box m="1em" className={classes.buttonLinks}>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => router.back()}
                  >
                    Back
                  </Button>
                </Box>
                <Box m="1em" className={classes.buttonLinks}>
                  <Button
                    color="secondary"
                    variant="contained"
                    type="submit"
                    disabled={!cardComplete || !billingDetails.name || !billingDetails.email || !billingDetails.phone}
                  >
                    Continue
                  </Button>
                </Box>
              </Box>
            </Box>

            <Dialog open={open} keepMounted onClose={() => setOpen(false)}>
              <Box
                p="4em"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  variant="h4"
                  align="center"
                  style={{ lineHeight: '1.5em', maxWidth: '25rem' }}
                >
                  You will be charged ${amount} by HouseCallMD. Please confirm to
                  pay.
                </Typography>
                <DialogContent>
                  <Box
                    mt="2em"
                    display="flex"
                    justifyContent="center"
                    flexWrap="wrap"
                  >
                    <Box m="1em" className={classes.buttonLinks}>
                      <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => setOpen(!open)}
                      >
                        Cancel
                      </Button>
                    </Box>
                    <Box m="1em" className={classes.buttonLinks}>
                      <Button
                        color="secondary"
                        variant="contained"
                        onClick={handleConfirm}
                      >
                        Confirm
                      </Button>
                    </Box>
                  </Box>
                </DialogContent>
              </Box>
            </Dialog>
          </form>
        </Box>
      </Box>
    </>
  )
}

export default PaymentForm

import { useState, useEffect } from 'react'
import {
  Typography,
  Box,
  Button,
  Dialog,
  DialogContent,
} from '@material-ui/core'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import useStore from '../zustand/store'
import visitPricing from '../public/constants/visitPricing'

import Field from './Field'

const useStyles = makeStyles((theme) => ({
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

const PaymentForm = () => {
  const [open, setOpen] = useState(false)
  const [amount, setAmount] = useState(0)
  // const [error, setError] = useState(null)
  // const [cardComplete, setCardComplete] = useState(false)
  // const [processing, setProcessing] = useState(false)
  const [billingDetails, setBillingDetails] = useState({
    email: '',
    phone: '',
    name: '',
  })
  const { visitChoice, hasInsurance } = useStore()
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
    handleSubmit()
  }

  const handleSubmit = async () => {
    // TODO: remove after stripe fixed.
    router.push('/thank-you')
    return

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: billingDetails,
    })

    if (!error) {
      try {
        const { id } = paymentMethod
        const res = await fetch(`/api/payment`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id,
            amount: 1000,
          }),
        })

        if (res.data.success) {
          setSuccess(true)
        }
      } catch (err) {
        console.log(err)
      }
    } else console.log(error)
  }

  return (
    <Box my="1em" width="100%" display="flex" justifyContent="center">
      <Box className={classes.wrapper}>
        <Box className={classes.text}>
          <Typography variant="h4">
            You have selected a{' '}
            {visitChoice === 'video'
              ? 'Video'
              : visitChoice === 'phone'
              ? 'Phone'
              : visitChoice === 'in_person'
              ? 'Housecall, in person'
              : ''}{' '}
            appointment. The cost for this service is {amount}. To proceed
            please fill out your payment information.
          </Typography>
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
                // onChange={(e) => {
                //   setError(e.error)
                //   setCardComplete(e.complete)
                // }}
              />
            </div>
          </fieldset>

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
                  onClick={() => setOpen(true)}
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
                      onClick={handleClose}
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
  )
}

export default PaymentForm

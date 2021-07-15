import { useState, useEffect } from 'react'
import {
  Typography,
  Box,
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  CircularProgress,
} from '@material-ui/core'
import Container from '../components/Container'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import { Auth } from '@supabase/ui'

import useStore from '../zustand/store'
import setStoreWithAuthInfo from '../utils/setStoreWithAuthInfo'
import visitPricing from '../public/constants/visitPricing'

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
      textaDecoration: 'none',
    },
  },
}))

const VisitChoice = () => {
  const [value, setValue] = useState('Video/Telemedicine Visit')
  const [loading, setLoading] = useState(false)
  const [firstName, setLocalFirstName] = useState(null)
  const store = useStore()
  const { setVisitChoice, hasInsurance, isAuthenticated } = store
  const classes = useStyles()
  const router = useRouter()
  const { user, session } = Auth.useUser()

  useEffect(() => {
    if (user) {
      try {
        setLoading(true)
        fetch('/api/getSingleUser', {
          method: 'POST',
          headers: new Headers({ 'Content-Type': 'application/json' }),
          credentials: 'same-origin',
          body: JSON.stringify({ email: user.email }),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log('res', res)
            setLocalFirstName(res.firstName)
            setStoreWithAuthInfo({
              store,
              user: res,
            })
          })
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    } else router.push('/login')
  }, [user])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setVisitChoice(value)
    router.push('/payment')
  }

  return (
    <Container>
      <Box>
        <Typography className={classes.h2} variant="h2">
          Visit Choice
        </Typography>
        {!loading && firstName ? (
          <>
            <form onSubmit={handleSubmit}>
              <Box
                mt="2em"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Typography variant="h4">
                  <span>Hi {firstName}, </span>
                  What type of visit would you like?
                </Typography>
                <Box
                  mt="1em"
                  width="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <FormControl component="fieldset">
                    <RadioGroup
                      name="visit"
                      value={value}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="video"
                        control={<Radio />}
                        label={`Video/Telemedicine Visit (${
                          hasInsurance
                            ? 'No additonal fee with insurance'
                            : `$${visitPricing.noInsurance.pricing.video}`
                        })`}
                      />
                      <FormControlLabel
                        value="phone"
                        control={<Radio />}
                        label={`Phone Visit ($${
                          hasInsurance
                            ? visitPricing.insurance.pricing.phone
                            : visitPricing.noInsurance.pricing.phone
                        })`}
                      />
                      <FormControlLabel
                        value="in_person"
                        control={<Radio />}
                        label={`Housecall, In person visit at home ($${
                          hasInsurance
                            ? visitPricing.insurance.pricing.in_person
                            : visitPricing.noInsurance.pricing.in_person
                        })`}
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
                <Box
                  mt="1em"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexWrap="wrap"
                  width="100%"
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
                    >
                      Continue
                    </Button>
                  </Box>
                </Box>
              </Box>
            </form>
          </>
        ) : (
          <Box
            my="1em"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress />
          </Box>
        )}
      </Box>
    </Container>
  )
}

export default VisitChoice

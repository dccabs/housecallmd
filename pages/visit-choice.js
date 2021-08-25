import { useState, useEffect } from 'react'
import {
  Typography,
  Box,
  Button,
  Radio,
  RadioGroup,
  FormControl,
  TextField,
  FormControlLabel,
  CircularProgress,
  Switch,
  Modal,
  Paper,
} from '@material-ui/core'
import Container from '../components/Container'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import { Auth } from '@supabase/ui'

import useStore from '../zustand/store'
import visitPricing from '../public/constants/visitPricing'
import billOfRights from '../public/constants/bill_of_rights'
import privacyPolicy from '../public/constants/privacyPolicy'

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
  toggleText: {
    color: theme.palette.secondary.main,
    cursor: 'pointer',

    '&:hover': {
      textDecoration: 'underline',
      textDecorationColor: theme.palette.secondary.main,
    },
  },
  modal: {
    margin: '8em auto',
    padding: '4em',
    maxWidth: '50rem',
    outline: 'none',
  },
}))

const maxCharacters = 240

const VisitChoice = () => {
  const [localReason, setLocalReason] = useState('')
  const [maxLength, setMaxLength] = useState(maxCharacters)
  const [value, setValue] = useState('video')
  const [loading, setLoading] = useState(false)
  const [firstName, setLocalFirstName] = useState(null)
  const [agreeBorToggle, setAgreeBorToggle] = useState(false)
  const [agreePPToggle, setAgreePPToggle] = useState(false)
  const [borOpen, setBorOpen] = useState(false)
  const [ppOpen, setPPOpen] = useState(false)
  const store = useStore()
  const { setVisitChoice, hasInsurance, isAuthenticated, setReason, insuranceOptOut } = store
  const classes = useStyles()
  const router = useRouter()
  const { user, session } = Auth.useUser()

  useEffect(() => {
    if (user) {
      setLocalFirstName(store.firstName);
      setLoading(false)
    }
  }, [user])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setVisitChoice(value)
    setReason(localReason)
    router.push('/payment')
  }

  const billOfRightsText = (
    <Paper className={classes.modal}>{billOfRights}</Paper>
  )

  const ppText = <Paper className={classes.modal}>{privacyPolicy}</Paper>

  const usingInsurance = hasInsurance && !insuranceOptOut;

  return (
    <>
      <Modal
        open={borOpen}
        onClose={() => setBorOpen(false)}
        onClick={() => setBorOpen(false)}
        style={{ overflowY: 'scroll' }}
      >
        {billOfRightsText}
      </Modal>

      <Modal
        open={ppOpen}
        onClose={() => setPPOpen(false)}
        onClick={() => setPPOpen(false)}
        style={{ overflowY: 'scroll' }}
      >
        {ppText}
      </Modal>

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
                            usingInsurance
                              ? 'No additonal fee with insurance'
                              : `$${visitPricing.noInsurance.pricing.video}`
                          })`}
                        />
                        <FormControlLabel
                          value="phone"
                          control={<Radio />}
                          label={`Phone Visit ($${
                            usingInsurance
                              ? visitPricing.insurance.pricing.phone
                              : visitPricing.noInsurance.pricing.phone
                          })`}
                        />
                        <FormControlLabel
                          value="in_person"
                          control={<Radio />}
                          label={`Housecall, In person visit at home ($${
                            usingInsurance
                              ? visitPricing.insurance.pricing.in_person
                              : visitPricing.noInsurance.pricing.in_person
                          })`}
                        />
                      </RadioGroup>

                      <Box mt="2em">
                        <TextField
                          fullWidth
                          type="text"
                          label="Reason for visit *"
                          variant="outlined"
                          color="secondary"
                          multiline
                          rows={4}
                          inputProps={{ maxLength: maxCharacters }}
                          helperText={maxLength}
                          value={localReason}
                          onChange={(e) => {
                            setLocalReason(e.target.value)
                            setMaxLength(maxCharacters - e.target.value.length)
                          }}
                        />
                      </Box>

                      <Box mt="2em" display="flex" alignItems="center">
                        <Box mr="1em">
                          <Switch
                            checked={agreeBorToggle}
                            onChange={() => setAgreeBorToggle(!agreeBorToggle)}
                            color="secondary"
                          />
                        </Box>

                        <Typography
                          className={classes.toggleText}
                          onClick={() => setBorOpen(true)}
                        >
                          I have read HouseCallMD's patient bill of rights
                        </Typography>
                      </Box>
                      <Box mt="1em" display="flex" alignItems="center">
                        <Box mr="1em">
                          <Switch
                            checked={agreePPToggle}
                            onChange={() => setAgreePPToggle(!agreePPToggle)}
                            color="secondary"
                          />
                        </Box>

                        <Typography
                          className={classes.toggleText}
                          onClick={() => setPPOpen(true)}
                        >
                          I have read HouseCallMD's Notice of Privacy Practices
                        </Typography>
                      </Box>
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
                        disabled={
                          !localReason || !agreeBorToggle || !agreePPToggle
                        }
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
    </>
  )
}

export default VisitChoice

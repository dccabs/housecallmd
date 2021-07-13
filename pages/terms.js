import { Typography, Box, Button, Checkbox, FormControl, FormControlLabel } from '@material-ui/core'
import Container from '../components/Container'
import { makeStyles } from '@material-ui/core/styles'
import useStore from '../zustand/store'
import { useRouter } from 'next/router'
import { useState } from 'react'


const useStyles = makeStyles((theme) => ({
  h2: {
    marginTop: '.5em',
  },
  buttonLinks: {
    '& button': {
      padding: '1em',
      fontWeight: 600,
      width: '16rem',
      margin: '1em',

      '&:hover': {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
  disclaimer: {
    color: '#666',
  },
}))

const Insurance = () => {
  const [acceptTerms, setAcceptTerms] = useState(false)
  const classes = useStyles()
  const { setHasInsurance } = useStore()
  const router = useRouter()

  const handleYesClick = () => {
    setHasInsurance(true);
    router.push('/insurance');
  }

  return (
    <Container>
      <Box>
        <Typography variant="h2" className={classes.h2}>Terms of Service</Typography>
        <Box
          mt="2em"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Typography>If this is an emergency please call 911. You must be at least 18 years old and located in the state of Washington to use the HouseCallMD service.  We accept most insurances and credit cards. Some services have fees not covered by insurance, and omse insurances only cover a portion of medical services.  Use of HousecallMD constitues an agreement to pay for fees as listed by level of service and costs not covered by insurance.</Typography>
          <Box className={classes.disclaimer} mt="1em">
            You do not need to have insurance to use this service.
          </Box>
          <Box mt="1em" width="100%" maxWidth="34rem">
            <FormControl component="fieldset">
              <FormControlLabel
                value="Terms"
                control={<Checkbox color="secondary" checked={acceptTerms} />}
                label="Accept terms and conditions of HousecallMD"
                labelPlacement="end"
                onChange={() => setAcceptTerms(!acceptTerms)}
              />
            </FormControl>
          </Box>
          <Box
            className={classes.buttonLinks}
            mt="2em"
            display="flex"
            justifyContent="center"
            flexWrap="wrap"
          >
            <Button
              onClick={handleYesClick}
              color="secondary"
              variant="contained"
              disabled={!acceptTerms}
            >
              Continue
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default Insurance

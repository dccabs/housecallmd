import { Typography, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'

import Container from '../components/Container'

const useStyles = makeStyles((theme) => ({
  link: {
    '& a': {
      color: theme.palette.primary.main,
    },
  },
}))

const ThankYou = () => {
  const classes = useStyles()

  return (
    <Box mt="4em">
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box
            maxWidth="45rem"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h4" align="center">
              Thank you for submitting a request for an appointment. A
              representative from HouseCall MD will be contacting you shortly
              with more information.
            </Typography>
            <Box className={classes.link} mt="2em">
              <Link href="/">
                <a>
                  <Typography variant="h6">
                    <strong>Go back to homepage</strong>
                  </Typography>
                </a>
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default ThankYou

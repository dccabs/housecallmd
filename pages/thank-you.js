import { Typography, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'

import Container from '../components/Container'

const useStyles = makeStyles((theme) => ({
  h2: {
    marginTop: '.5em',
  },
  link: {
    '& a': {
      color: theme.palette.primary.main,
    },
  },
  text: {
    fontSize: 18,
    lineHeight: '1.8em',
    textAlign: 'center'
  }
}))

const ThankYou = () => {
  const classes = useStyles()

  return (
      <Container>
        <Typography variant="h2">Thank You</Typography>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box
            maxWidth="45rem"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box mt="2em" className={classes.text}>
              Thank you for submitting a request for an appointment. A
              representative from HouseCall MD will be contacting you shortly
              with more information.
            </Box>
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
  )
}

export default ThankYou

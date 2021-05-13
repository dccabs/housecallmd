import { Typography, Box, Button } from '@material-ui/core'
import Container from '../../components/Container'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import { useAuth0 } from '@auth0/auth0-react'

const useStyles = makeStyles((theme) => ({
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
    '& a': {
      textDecoration: 'none',
    },
  },
  disclaimer: {
    color: '#666',
  },
}))

const Insurance = () => {
  const { loginWithRedirect } = useAuth0()
  const classes = useStyles()

  return (
    <Container>
      <Box p="1em">
        <Typography variant="h2">Insurance</Typography>
        <Container>
          <Box
            mt="2em"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="h4">Will you be using insurance?</Typography>
            <Box
              className={classes.buttonLinks}
              mt="2em"
              display="flex"
              justifyContent="center"
              flexWrap="wrap"
            >
              <Link href="/insurance/choose-provider">
                <a>
                  <Button color="secondary" variant="contained">
                    Yes
                  </Button>
                </a>
              </Link>
              <Button
                color="secondary"
                variant="contained"
                onClick={loginWithRedirect}
              >
                No
              </Button>
            </Box>
            <Box className={classes.disclaimer}>
              You do not need to have insurance to use this service.
            </Box>
          </Box>
        </Container>
      </Box>
    </Container>
  )
}

export default Insurance

import { Typography, Box, Button } from '@material-ui/core'
import Container from '../../components/Container'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'

const useStyles = makeStyles((theme) => ({
  buttonLinks: {
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
      margin: '1em',
    },
  },
  disclaimer: {
    color: '#666',
  },
}))

const Insurance = () => {
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
            <Typography variant="h4">Do you have insurance?</Typography>
            <Box className={classes.disclaimer} mt="1em">
              You do not need to have insurance to use this service.
            </Box>
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
              <Link href="/sign-up">
                <a>
                  <Button color="secondary" variant="contained">
                    No
                  </Button>
                </a>
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>
    </Container>
  )
}

export default Insurance

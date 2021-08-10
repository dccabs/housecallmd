import { Typography, Box, Button, Link } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Container from '../components/Container'

const useStyles = makeStyles((theme) => ({
  headings: {
    textAlign: 'center',
    maxWidth: '40rem',

    '& h6': {
      marginTop: '0.25em',
      color: 'red',
    },
  },
  buttonLinks: {
    marginTop: '4em',

    '& button': {
      padding: '1em 2em',
      fontWeight: 600,
      width: '100%',
      marginTop: '1em',

      '&:hover': {
        backgroundColor: theme.palette.primary.main,
      },
    },
    '& a': {
      textaDecoration: 'none',
    },
  },
}))

const ReturningUserPage = () => {
  const classes = useStyles()

  return (
    <div>
      <Container>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <div className={classes.headings}>
            <Typography variant="h2">Welcome Back</Typography>
            <Typography variant="h6">
              <strong>
                If you have questions about a recently completed visit, please
                call (833) 432-5633 / (833) HEAL MED
              </strong>
            </Typography>
          </div>
          <Box
            className={classes.buttonLinks}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Button variant="contained" color="secondary">
              Continue with existing profile and insurance
            </Button>
            <Box mt="0.5em">
              <Link color="secondary">See existing information</Link>
            </Box>
            <Button variant="contained" color="secondary">
              Change insurance information
            </Button>
            <Button variant="contained" color="secondary">
              Do not use insurance for this appointment
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  )
}

export default ReturningUserPage

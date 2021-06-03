import { Typography, Box, Button, TextField } from '@material-ui/core'
import Container from '../components/Container'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  textFields: {
    width: '100%',
    marginTop: '2em',
    maxWidth: '34rem',
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
  },
}))

const Contact = () => {
  const classes = useStyles()

  return (
    <Container>
      <Box>
        <Typography variant="h2">Contact Us</Typography>
        <form action="/" style={{ width: '100%' }}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <TextField
              className={classes.textFields}
              fullWidth
              type="text"
              label="Name"
              variant="outlined"
              color="secondary"
              required
            />
            <TextField
              className={classes.textFields}
              fullWidth
              type="email"
              label="Email"
              variant="outlined"
              color="secondary"
              required
            />
            <TextField
              className={classes.textFields}
              fullWidth
              type="text"
              label="Phone (optional)"
              variant="outlined"
              color="secondary"
            />
            <TextField
              fullWidth
              className={classes.textFields}
              multiline
              rows={4}
              label="Enter your question or comment here"
              variant="outlined"
              color="secondary"
              required
            />
          </Box>
          <Box mt="2em" display="flex" justifyContent="center" flexWrap="wrap">
            <Box m="1em" className={classes.buttonLinks}>
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                size="large"
              >
                Submit
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Container>
  )
}

export default Contact

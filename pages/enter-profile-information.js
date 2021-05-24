import { Typography, Box, Button, TextField, MenuItem } from '@material-ui/core'
import Container from '../components/Container'
import { makeStyles } from '@material-ui/core/styles'
import STATES from '../public/constants/states'
import MuiSelect from '../components/MuiSelect'
import { useRouter } from 'next/router'

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
  formControl: {
    marginTop: '2em',
    marginBottom: 0,
  },
  selectLabel: {
    background: '#fff',
  },
}))

const Contact = () => {
  const classes = useStyles();
  const router = useRouter();

  const handleSubmit = (e) => {
    console.log('handle Submit')
    e.preventDefault();
    router.push('/enter-login-information');
  }

  return (
    <Container>
      <Box p="1em">
        <Typography variant="h2">Please enter the following information:</Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
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
              label="First Name"
              variant="outlined"
              color="secondary"
              required
            />
            <TextField
                className={classes.textFields}
                fullWidth
                type="text"
                label="Last Name"
                variant="outlined"
                color="secondary"
                required
            />
            <TextField
              className={classes.textFields}
              fullWidth
              type="text"
              label="Address"
              variant="outlined"
              color="secondary"
              required
            />
            <TextField
                className={classes.textFields}
                fullWidth
                type="text"
                label="City"
                variant="outlined"
                color="secondary"
                required
            />
            <MuiSelect
                label="State"
                defaultValue=""
                // value={age}
                // onChange={handleChange}
            >
              {STATES.map((state, index) => {
                return (
                    <MenuItem key={index} value={state.abbreviation}>{state.abbreviation}</MenuItem>
                )
              })}
            </MuiSelect>
            <TextField
                className={classes.textFields}
                fullWidth
                type="text"
                label="Zip Code"
                variant="outlined"
                color="secondary"
                required
            />
            <TextField
              className={classes.textFields}
              fullWidth
              type="text"
              label="Phone"
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

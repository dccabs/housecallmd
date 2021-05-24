import { Typography, Box, Button, TextField, MenuItem } from '@material-ui/core'
import Container from '../components/Container'
import { makeStyles } from '@material-ui/core/styles'
import STATES from '../public/constants/states'
import MuiSelect from '../components/MuiSelect'
import { useRouter } from 'next/router'
import useStore from '../zustand/store';
import { useState } from 'react'

const useStyles = makeStyles((theme) => ({
  textFields: {
    width: '100%',
    marginTop: '2em',
    maxWidth: '34rem',
  },
  buttonLinks: {
    // '@media screen and (max-width: 700px)': {
    //   '&:nth-child(2)': {
    //     order: -1,
    //   },
    // },

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
  const { setFirstName, setLastName, setAddress, setCity, setState, setZip, setPhone } = useStore();
  const [localFirstName, setLocalFirstName] = useState('');
  const [localLastName, setLocalLastName] = useState('');

  const [localAddress, setLocalAddress] = useState('');
  const [localCity, setLocalCity] = useState('');
  const [localState, setLocalState] = useState('');
  const [localZip, setLocalZip] = useState('');
  const [localPhone, setLocalPhone] = useState('');

  const classes = useStyles();
  const router = useRouter();

  const handleSubmit = (e) => {
    console.log('handle Submit')
    e.preventDefault();
    router.push('/enter-login-information');
  }

  const handleUpdate = (e, fn) => {
    fn(e.target.value);
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
              onChange={(e) => handleUpdate(e, setLocalFirstName)}
            />
            <TextField
                className={classes.textFields}
                fullWidth
                type="text"
                label="Last Name"
                variant="outlined"
                color="secondary"
                required
                onChange={(e) => handleUpdate(e, setLocalLastName)}
            />
            <TextField
              className={classes.textFields}
              fullWidth
              type="text"
              label="Address"
              variant="outlined"
              color="secondary"
              required
              onChange={(e) => handleUpdate(e, setLocalAddress)}
            />
            <TextField
                className={classes.textFields}
                fullWidth
                type="text"
                label="City"
                variant="outlined"
                color="secondary"
                required
                onChange={(e) => handleUpdate(e, setLocalCity)}
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
              onChange={(e) => handleUpdate(e, setLocalZip)}
            />
            <TextField
              className={classes.textFields}
              fullWidth
              type="text"
              label="Phone"
              variant="outlined"
              color="secondary"
              required
              onChange={(e) => handleUpdate(e, setLocalPhone)}
            />
          </Box>
          <Box mt="2em" display="flex" justifyContent="center" flexWrap="wrap">
            <Box m="1em" className={classes.buttonLinks}>
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                size="large"
                disabled={
                  !localFirstName ||
                    !localLastName ||
                    !localAddress ||
                    !localCity ||
                    !localZip ||
                    !localPhone
                }
              >
                Continue
              </Button>
            </Box>
            <Box m="1em" className={classes.buttonLinks}>
              <Button
                onClick={() => router.back()}
                color="secondary"
                variant="contained"
              >
                Back
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Container>
  )
}

export default Contact

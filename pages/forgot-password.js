import { useContext, useState } from 'react'
import { Typography, Box, Button, TextField } from '@material-ui/core'
import Container from '../components/Container'
import { SnackBarContext} from '../components/SnackBar'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  h2: {
    marginTop: '.5em',
  },
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
  disclaimer: {
    [theme.breakpoints.up('sm')]: {
      margin: '2em 0 1em',
      fontSize: '1.5em',
      textAlign: 'center',
    },
  }
}))

const ForgotPassword = () => {
  const [localEmail, setLocalEmail] = useState('')
  const classes = useStyles()
  const payload = {
    email: localEmail,
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    fetch('/api/requestNewPassword', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify(payload)
    })
      .then((res) => {
        console.log('res', res)
        if (res.ok) {
          openSnackBar({message: `An email has been sent to ${localEmail} to reset your password.`, snackSeverity: 'success'})
        } else {
          openSnackBar({message: `There was an error please try again later.`, snackSeverity: 'error'})
        }
      });
  }

  const handleEmailUpdate = (e) => {
    setLocalEmail(e.target.value)
  }

  const openSnackBar = useContext(SnackBarContext)

  return (
    <Container>
      <Box>
        <Typography variant="h2" className={classes.h2}>Forgot Password</Typography>
        <Box className={classes.disclaimer} mt="1em">
          Please enter your email.  If you have an account associated with HouseCall MD, you will be sent instructions to reset your password.
        </Box>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Box
            p="0"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <TextField
              value={localEmail}
              className={classes.textFields}
              fullWidth
              type="email"
              label="Email"
              variant="outlined"
              color="secondary"
              required
              onChange={handleEmailUpdate}
            />
          </Box>
          <Box
            mt="2em"
            display="flex"
            justifyContent="center"
            flexWrap="wrap"
          >
            <Box m="1em" className={classes.buttonLinks}>
              <Button
                disabled={!localEmail}
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

export default ForgotPassword

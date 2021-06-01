import { useState } from 'react'
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

const ForgotPassword = () => {
  const [localEmail, setLocalEmail] = useState('')
  const classes = useStyles()
  const payload = {
    email: localEmail,
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
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
          alert(`An email has been sent to ${localEmail} to reset your password.`);
        }
      });
  }

  const handleEmailUpdate = (e) => {
    setLocalEmail(e.target.value)
  }

  return (
    <Container>
      <Box p="1em">
        <Typography variant="h2">Enter your user email</Typography>
        <Container>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Box
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
        </Container>
      </Box>
    </Container>
  )
}

export default ForgotPassword

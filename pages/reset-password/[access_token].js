import { useContext, useState } from 'react'
import { Typography, Box, Button, TextField, Dialog } from '@material-ui/core'
import Container from '../../components/Container'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import { SnackBarContext } from '../../components/SnackBar'

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

const ResetPassword = () => {
  const router = useRouter();
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [open, setOpen] = useState(false)
  const classes = useStyles()
  const openSnackBar = useContext(SnackBarContext)

  const { access_token } = router.query;
  console.log('access_token', access_token)

  const handleSubmit = (e) => {
    e.preventDefault()
    //setOpen(true)
    const payload = {
      password,
    }
    fetch('/api/resetPassword', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json', token: access_token }),
      credentials: 'same-origin',
      body: JSON.stringify(payload)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw Error(data.error);
        } else {
          openSnackBar({message: 'You successfully changed your password, please login', snackSeverity: 'success'})
          router.push('/login');
        }
      })
      .catch(error => {
        openSnackBar({message: error, snackSeverity: 'error'})

      });

  }

  const handlePasswordUpdate = (e) => {
    setPassword(e.target.value)
  }

  const handleConfirmPasswordUpdate = (e) => {
    setConfirmPassword(e.target.value)
  }

  return (
    <Container>
      <Box>
        <Typography variant="h2">Enter new password</Typography>
        <Container>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <TextField
                value={password}
                className={classes.textFields}
                fullWidth
                type="password"
                label="Password"
                variant="outlined"
                color="secondary"
                required
                onChange={handlePasswordUpdate}
              />
              <TextField
                value={confirmPassword}
                className={classes.textFields}
                fullWidth
                type="password"
                label="Confirm Password"
                variant="outlined"
                color="secondary"
                required
                onChange={handleConfirmPasswordUpdate}
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
                  disabled={
                    !password ||
                    !confirmPassword ||
                    password !== confirmPassword
                  }
                  type="submit"
                  color="secondary"
                  variant="contained"
                  size="large"
                >
                  Reset Password
                </Button>
              </Box>
            </Box>
          </form>

          <Dialog open={open} keepMounted onClose={() => setOpen(false)}>
            <Box p="4em">
              <Typography variant="h4" align="center">
                Your password has been reset, please login to HouseCallMD
              </Typography>
            </Box>
          </Dialog>
        </Container>
      </Box>
    </Container>
  )
}

export default ResetPassword

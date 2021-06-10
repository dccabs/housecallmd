import { useState } from 'react'
import { Typography, Box, Button, TextField } from '@material-ui/core'
import Container from '../components/Container'
import { makeStyles } from '@material-ui/core/styles'
import { Auth } from '@supabase/ui'
import cuid from 'cuid'

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
  link: {
    '& a': {
      color: theme.palette.secondary.main,
      textDecoration: 'none',
    },
  },
}))

const getCuid = () => {
  return cuid()
}

const login = () => {
  const { session } = Auth.useUser()
  //console.log('session', session)
  const classes = useStyles()
  const payload = {
    creator: 'Dan Cabaniss',
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('/api/addMeeting', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        token: session.access_token,
      }),
      credentials: 'same-origin',
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw Error(data.error)
        } else {
          alert('You successfully created a meeting')
          // router.push('/login');
        }
      })
      .catch((error) => {
        alert(error)
      })
  }

  return (
    <Container>
      <Box p="1em">
        <Typography variant="h2">Create meeting test page</Typography>
        <Container>
          <Box m="1em" className={classes.buttonLinks}>
            <Button
              onClick={handleSubmit}
              type="submit"
              color="secondary"
              variant="contained"
              size="large"
            >
              Create Meeting
            </Button>
          </Box>
        </Container>
      </Box>
    </Container>
  )
}

export default login

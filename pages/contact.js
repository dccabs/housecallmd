import { Typography, Box, Button, TextField } from '@material-ui/core'
import Container from '../components/Container'
import { makeStyles } from '@material-ui/core/styles'
import { useState } from 'react'
import PhoneField from '../components/PhoneField'

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
  const [localName, setLocalName] = useState('')
  const [localEmail, setLocalEmail] = useState('')
  const [localPhone, setLocalPhone] = useState('')
  const [localComment, setLocalComment] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const payload = {
      email: localEmail,
      name: localName,
      client_message: localComment,
      subject: `${localName} filled out the contact us form`,
      recipient_email: 'dccabs@gmail.com',
      phone: localPhone,
    }

    fetch('/api/sendContactUsEmail', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify(payload)
    })
      .then((res) => {
        console.log('res', res)
        if (res.ok) {
          alert(`An email to HouseCall MD`);
        }
      });  }

  return (
    <Container>
      <Box>
        <Typography variant="h2">Contact Us</Typography>
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
              label="Name"
              variant="outlined"
              color="secondary"
              required
              value={localName}
              onChange={(e) => {setLocalName(e.target.value)}}
            />
            <TextField
              className={classes.textFields}
              fullWidth
              type="email"
              label="Email"
              variant="outlined"
              color="secondary"
              required
              value={localEmail}
              onChange={(e) => {setLocalEmail(e.target.value)}}
            />
            <TextField
              className={classes.textFields}
              fullWidth
              type="text"
              label="Phone (optional)"
              variant="outlined"
              color="secondary"
              value={localPhone}
              onChange={(e) => {setLocalPhone(e.target.value)}}
              InputProps={{
                inputComponent: PhoneField,
              }}
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
              value={localComment}
              onChange={(e) => {setLocalComment(e.target.value)}}
            />
          </Box>
          <Box mt="2em" display="flex" justifyContent="center" flexWrap="wrap">
            <Box m="1em" className={classes.buttonLinks}>
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                size="large"
                disabled={!localName || !localEmail || !localComment}
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

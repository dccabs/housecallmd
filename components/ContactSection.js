import { useContext, useState } from 'react'
import { Typography, Box, Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PhoneIcon from '@material-ui/icons/Phone'
import EmailIcon from '@material-ui/icons/Email'
import { SnackBarContext} from '../components/SnackBar'

import Container from '../components/Container'
import PhoneField from './PhoneField'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#f4f4f4',
  },
  h2: {
    marginTop: '.5em',
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    color: theme.palette.primary.main,
    margin: '1em 0',

    '& h4': {
      fontSize: '18px',

      [theme.breakpoints.up('sm')]: {
        fontSize: '24px',
      },
    },

    '& svg': {
      marginRight: '1em',
    },
  },
  doctor: {
    display: 'none',

    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  fields: {
    marginBottom: '1em',
    maxWidth: '100%',

    '& button': {
      width: '100%',

      '&:hover': {
        backgroundColor: theme.palette.primary.main,
      },
    },

    [theme.breakpoints.up('md')]: {
      maxWidth: '40%',
    },
  },
  textFields: {
    margin: '0.5em 0',
  },
  formButton: {
    marginTop: '.5em',
  }
}))

const ContactSection = () => {
  const classes = useStyles()
  const [localName, setLocalName] = useState('')
  const [localEmail, setLocalEmail] = useState('')
  const [localPhone, setLocalPhone] = useState('')
  const [localComment, setLocalComment] = useState('')

  const openSnackBar = useContext(SnackBarContext)

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
        if (res.ok) {
          openSnackBar({message: `An email has been sent HouseCall MD`, snackSeverity: 'success'})
        }
      });  }

  return (
    <Box className={classes.root}>
      <Container>
        <Box id="contact">
          <Box
            width="100%"
            display="flex"
            flexWrap="wrap"
            maxWidth="1400px"
          >
            <Box display="flex">
              <Box>
                <Typography variant="h2" className={classes.h2}>Contact Us</Typography>
                <Box className={classes.info}>
                  <PhoneIcon />
                  <Typography variant="h4">1-833-432-5633</Typography>
                </Box>
                <Box className={classes.info}>
                  <EmailIcon />
                  <Typography variant="h4">contact@housecallmd.org</Typography>
                </Box>
              </Box>
              <Box>
                <img
                  className={classes.doctor}
                  src="/media/doctor.png"
                  width="100%"
                  height="100%"
                />
              </Box>
            </Box>
            <Box
              my="1em"
              mt="0em"
              className={classes.fields}
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <form onSubmit={handleSubmit}>
                <TextField
                  className={classes.textFields}
                  fullWidth
                  type="text"
                  label="Full Name"
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
                  value={localPhone}
                  className={classes.textFields}
                  fullWidth
                  type="tel"
                  label="Phone (optional)"
                  variant="outlined"
                  color="secondary"
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
                  label="Comment"
                  variant="outlined"
                  color="secondary"
                  required
                  value={localComment}
                  onChange={(e) => {setLocalComment(e.target.value)}}
                />
                <Box width="100%" className={classes.formButton}>
                  <Button type="submit" variant="contained" color="secondary" size="large">
                    Submit
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default ContactSection

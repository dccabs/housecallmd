import { useContext, useEffect, useState } from 'react'
import { NextSeo } from 'next-seo'
import { Typography, Box, Button, TextField } from '@material-ui/core'
import Container from '../../components/Container'
import { makeStyles } from '@material-ui/core/styles'
import { SnackBarContext } from '../../components/SnackBar'
import { Auth } from '@supabase/ui'

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
}))

const Contact = () => {
  const classes = useStyles()
  const [localName, setLocalName] = useState('')
  const [localEmail, setLocalEmail] = useState('')
  const [localPhone, setLocalPhone] = useState('')
  const [localComment, setLocalComment] = useState('')

  const { user } = Auth.useUser()


  useEffect(() => {
    if (user) {
      console.log('user', user.id)
      fetchProfileInformation();
    }
  }, [user])

  const openSnackBar = useContext(SnackBarContext)

  const fetchProfileInformation = () => {

    const payload = {
      id: user.id,
    }

    fetch('/api/getFacilityById', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify(payload),
    }).then((res) => {
      console.log('res', res)
      if (res.ok) {
        // openSnackBar({
        //   message: 'An email has been sent to HouseCall MD',
        //   snackSeverity: 'success',
        // })
      } else {
        openSnackBar({
          message: 'There was an error.  Please try again later',
          error: 'error',
        })
      }
    })
  }

  return (
    <>
      <NextSeo
        title="My Facility Account | House Call MD"
        description="My Facility Account |  House Call MD."
        canonical="https://www.housecallmd.org"
        openGraph={{
          type: 'website',
          title: 'My Facility Account | House Call MD',
          description: 'My Facility Account in House Call MD',
          locale: 'en_US',
          url: `https://www.housecallmd.org/facility/profile`,
        }}
      />
      <Container>
        <Box>
          <Typography variant="h2" className={classes.h2}>
            My Facility Account
          </Typography>
          <form style={{ width: '100%' }}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
            </Box>
            <Box
              mt="2em"
              display="flex"
              justifyContent="center"
              flexWrap="wrap"
            >
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
    </>
  )
}

export default Contact

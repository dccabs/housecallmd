import { useState } from 'react'
import { Typography, Box, Button, Link as MuiLink } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import { Auth } from '@supabase/ui'
import { useRouter } from 'next/router'

import Container from '../components/Container'
import UtilModal from '../components/UtilModal'
import ExistingInformation from '../components/ExistingInformation'

const useStyles = makeStyles((theme) => ({
  headings: {
    textAlign: 'center',
    maxWidth: '40rem',

    '& h6': {
      marginTop: '0.25em',
      color: 'red',
    },
  },
  buttonLinks: {
    marginTop: '4em',

    '& button': {
      padding: '1em 2em',
      fontWeight: 600,
      width: '100%',
      marginTop: '1em',

      '&:hover': {
        backgroundColor: theme.palette.primary.main,
      },
    },
    '& a': {
      textaDecoration: 'none',
      cursor: 'pointer',
    },
  },
}))

const ReturningUserPage = () => {
  const [open, setOpen] = useState(false)

  const { user } = Auth.useUser()
  const router = useRouter()
  const classes = useStyles()

  const updateInsurance = async () => {
    const payload = {
      email: user.email,
      newValue: false,
    }

    try {
      const res = await fetch(`/api/updateHasInsurance`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
    } catch (error) {
      throw error
    } finally {
      router.push('/visit-choice')
    }
  }

  return (
    <div>
      <Container>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <div className={classes.headings}>
            <Typography variant="h2">Welcome Back</Typography>
            <Typography variant="h6">
              <strong>
                If you have questions about a recently completed visit, please
                call (833) 432-5633 / (833) HEAL MED
              </strong>
            </Typography>
          </div>
          <Box
            className={classes.buttonLinks}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Link href="/visit-choice">
              <Button variant="contained" color="secondary">
                Continue with existing profile and insurance
              </Button>
            </Link>
            <Box mt="0.5em">
              <MuiLink color="secondary" onClick={() => setOpen(true)}>
                See existing information
              </MuiLink>
            </Box>
            <Link href="/edit-information">
              <Button variant="contained" color="secondary">
                Change insurance information
              </Button>
            </Link>
            <Button
              variant="contained"
              color="secondary"
              onClick={updateInsurance}
            >
              Do not use insurance for this appointment
            </Button>
          </Box>
        </Box>
      </Container>

      <UtilModal
        open={open}
        setOpen={setOpen}
        component={<ExistingInformation setOpen={setOpen} />}
      />
    </div>
  )
}

export default ReturningUserPage

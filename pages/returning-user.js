import { useState, useEffect } from 'react'
import { Typography, Box, Button, Link as MuiLink } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import { Auth } from '@supabase/ui'
import { useRouter } from 'next/router'
import useStore from '../zustand/store'

import Container from '../components/Container'
import UtilModal from '../components/UtilModal'
import CustomModal from '../components/CustomModal/CustomModal'
import ExistingInformation from '../components/ExistingInformation'
import setStoreWithAuthInfo from '../utils/setStoreWithAuthInfo'
import PersonIcon from '@material-ui/icons/Person'

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
  const [loading, setLoading] = useState(false)

  const store = useStore()

  const { insuranceOptOut, setInsuranceOptOut } = store

  const { user } = Auth.useUser()
  const router = useRouter()
  const classes = useStyles()

  useEffect(() => {
    if (user) {
      try {
        setLoading(true)
        fetch('/api/getSingleUser', {
          method: 'POST',
          headers: new Headers({ 'Content-Type': 'application/json' }),
          credentials: 'same-origin',
          body: JSON.stringify({ email: user.email }),
        })
          .then((res) => res.json())
          .then((res) => {
            setStoreWithAuthInfo({
              store,
              user: res,
            })
          })
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
  }, [user])

  useEffect(() => {
    setInsuranceOptOut(false)
  }, [])

  const optOutofInsurance = async () => {
    setInsuranceOptOut(true)
    router.push('/visit-choice')
  }

  return (
    <div>
      {!loading && (
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
                onClick={optOutofInsurance}
              >
                Do not use insurance for this appointment
              </Button>
            </Box>
          </Box>
        </Container>
      )}

      <CustomModal
        open={open}
        icon={<PersonIcon fontSize="medium" />}
        title={'Your User Information'}
        onClose={() => setOpen(false)}
        component={<ExistingInformation />}
      />
    </div>
  )
}

export default ReturningUserPage

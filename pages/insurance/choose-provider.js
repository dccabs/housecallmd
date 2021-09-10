import { Typography, Box, Button, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import Container from '../../components/Container'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import useStore from '../../zustand/store'
import providerOptions from '../../public/constants/providerOptions'
import { useState } from 'react'

const useStyles = makeStyles((theme) => ({
  h2: {
    marginTop: '.5em',
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
    '& a': {
      textDecoration: 'none',
    },
  },
}))

const ChooseProvider = () => {
  const { setProvider, provider, setHasInsurance } = useStore()

  const [localProvider, setLocalProvider] = useState('')

  const classes = useStyles()
  const router = useRouter()

  const handleUpdate = (e, fn) => {
    fn(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setProvider(localProvider)
    router.push('/insurance/card-information')
  }

  const handleSelfPayClick = (e) => {
    e.preventDefault()
    setHasInsurance(false)
    router.push('/enter-profile-information')
  }

  return (
    <Container>
      <Box>
        <Typography variant="h2" className={classes.h2}>
          Insurance
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box
            mt="2em"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="h4">Please choose your provider</Typography>
            <Box
              mt="1em"
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Autocomplete
                //value={localProvider}
                // freeSolo
                disableClearable
                options={providerOptions}
                style={{ width: '100%', maxWidth: '34rem' }}
                onChange={(e, value) => {
                  setLocalProvider(value)
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Type to select provider"
                    margin="normal"
                    color="secondary"
                    variant="outlined"
                    onChange={(e, value) => {
                      handleUpdate(e, setLocalProvider)
                    }}
                    InputProps={{ ...params.InputProps, type: 'search' }}
                    required
                  />
                )}
              />
            </Box>
            <Box
              mt="1em"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <p>
                Some HMO plans require prior authorization to reimburse for our services.
              </p>
              <p>
                If your health insurance is not listed here, then HouseCall MD’s services will not be covered.  You can still use our services at the discounted <a href="#" onClick={handleSelfPayClick}>self-pay rate</a>.
              </p>
            </Box>
              <Box
              mt="1em"
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexWrap="wrap"
              width="100%"
            >
              <Box m="1em" className={classes.buttonLinks}>
                <Button
                  onClick={() => router.back()}
                  color="secondary"
                  variant="contained"
                >
                  Back
                </Button>
              </Box>
              <Box m="1em" className={classes.buttonLinks}>
                <Button
                  disabled={!localProvider}
                  type="submit"
                  color="secondary"
                  variant="contained"
                >
                  Continue
                </Button>
              </Box>
            </Box>
          </Box>
        </form>
      </Box>
    </Container>
  )
}

export default ChooseProvider

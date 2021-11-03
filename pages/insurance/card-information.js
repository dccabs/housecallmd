import { Typography, Box, Button, TextField } from '@material-ui/core'
import Container from '../../components/Container'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import useStore from '../../zustand/store'
import { useState } from 'react'

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
    '& a': {
      textDecoration: 'none',
    },
  },
}))

const CardInformation = () => {
  const { setPlanNumber, setGroupNumber } = useStore()
  const [localPlanNumber, setLocalPlanNumber] = useState('')
  const [localGroupNumber, setLocalGroupNumber] = useState('')

  const classes = useStyles()
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    setPlanNumber(localPlanNumber)
    setGroupNumber(localGroupNumber)
    router.push('/enter-profile-information')
  }

  const handleUpdate = (e, fn) => {
    fn(e.target.value)
  }

  return (
    <Container>
      <Box>
        <Typography variant="h2" className={classes.h2}>Insurance</Typography>
          <form onSubmit={handleSubmit}>
            <Box
              mt="2em"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h4">
                Please fill out your insurance card information
              </Typography>
              <Box
                mt="1em"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                width="100%"
              >
                <TextField
                  value={localPlanNumber}
                  className={classes.textFields}
                  label="Plan number"
                  variant="outlined"
                  color="secondary"
                  onChange={(e) => handleUpdate(e, setLocalPlanNumber)}
                  required
                />
                <TextField
                  value={localGroupNumber}
                  className={classes.textFields}
                  label="Group number"
                  variant="outlined"
                  color="secondary"
                  onChange={(e) => handleUpdate(e, setLocalGroupNumber)}
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
                    onClick={() => router.back()}
                    color="secondary"
                    variant="contained"
                  >
                    Back
                  </Button>
                </Box>
                <Box m="1em" className={classes.buttonLinks}>
                  <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    size="large"
                    disabled={!localPlanNumber}
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

export default CardInformation

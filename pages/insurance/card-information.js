import { Typography, Box, Button, TextField } from '@material-ui/core'
import Container from '../../components/Container'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import useStore from '../../zustand/store'
import { useAuth0 } from '@auth0/auth0-react'

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
    '& a': {
      textDecoration: 'none',
    },
  },
}))

const CardInformation = () => {
  const { setPlanNumber, setGroupNumber } = useStore()
  const classes = useStyles()
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/enter-profile-information')
  }

  return (
    <Container>
      <Box p="1em">
        <Typography variant="h2">Insurance</Typography>
        <Container>
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
                  className={classes.textFields}
                  label="Plan number"
                  variant="outlined"
                  color="secondary"
                  onChange={(e) => setPlanNumber(e.target.value)}
                  required
                />
                <TextField
                  className={classes.textFields}
                  label="Group number"
                  variant="outlined"
                  color="secondary"
                  onChange={(e) => setGroupNumber(e.target.value)}
                  required
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
                  >
                    Continue
                  </Button>
                </Box>
              </Box>
            </Box>
          </form>
        </Container>
      </Box>
    </Container>
  )
}

export default CardInformation

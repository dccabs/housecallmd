import { Typography, Box, Button, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import Container from '../../components/Container'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
<<<<<<< HEAD:pages/insurance/choose-provider.js
=======
import useStore from '../../zustand/store'
>>>>>>> d566e018494f2fbebc41f68fed896490d1437e2b:pages/insurance/choose-provider.js

const useStyles = makeStyles((theme) => ({
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
<<<<<<< HEAD:pages/insurance/choose-provider.js
=======
  const { setProvider } = useStore()
>>>>>>> d566e018494f2fbebc41f68fed896490d1437e2b:pages/insurance/choose-provider.js
  const classes = useStyles()
  const router = useRouter()

  return (
    <Container>
      <Box p="1em">
        <Typography variant="h2">Insurance</Typography>
        <Container>
          <form action="/insurance/card-information">
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
                  freeSolo
                  disableClearable
<<<<<<< HEAD:pages/insurance/choose-provider.js
                  options={['Blue Cross Blue Shielf', 'Cigna', 'Athena']}
                  style={{ width: '100%', maxWidth: '34rem' }}
=======
                  options={['Blue Cross Blue Shield', 'Cigna', 'Athena']}
                  style={{ width: '100%', maxWidth: '34rem' }}
                  onChange={(event, value) => setProvider(value)}
>>>>>>> d566e018494f2fbebc41f68fed896490d1437e2b:pages/insurance/choose-provider.js
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Type to select provider"
                      margin="normal"
                      color="secondary"
                      variant="outlined"
<<<<<<< HEAD:pages/insurance/choose-provider.js
=======
                      onChange={(e) => setProvider(e.target.value)}
>>>>>>> d566e018494f2fbebc41f68fed896490d1437e2b:pages/insurance/choose-provider.js
                      InputProps={{ ...params.InputProps, type: 'search' }}
                      required
                    />
                  )}
                />
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
                  <Button type="submit" color="secondary" variant="contained">
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

export default ChooseProvider

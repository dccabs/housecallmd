import { NextSeo } from 'next-seo'
import Container from '../../components/Container'
import {
  Box,
  Button,
  TextField,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PhoneField from '../../components/PhoneField'

const useStyles = makeStyles((theme) => ({
  h2: {
    marginTop: '.5em',
  },
  textFields: {
    margin: '0.5em 0',
  },
  formButton: {
    marginTop: '.5em',
  },
}))

const handleSubmit = () => {}

const CreateAccount = () => {
  const classes = useStyles()
  return (
    <>
      <NextSeo
        title="Services | House Call MD"
        description="Services in House Call MD."
        canonical="https://www.housecallmd.org"
        openGraph={{
          type: 'website',
          title: 'Assisted Living | House Call MD',
          description: 'Services in House Call MD',
          locale: 'en_US',
          url: `https://www.housecallmd.org/assisted-living/create-account`,
        }}
      />
      <Container>
        <Box>
          <Typography variant="h2" className={classes.h2}>
            Create your account
          </Typography>
          <Typography>Sign up for an Assisted Living Center Account</Typography>
        </Box>
      </Container>
      <Container>
        <Box
          mt="1em"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <form onSubmit={handleSubmit}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <TextField
                className={classes.textFields}
                fullWidth
                type="email"
                label="Email"
                variant="outlined"
                color="secondary"
                required
              />
              <TextField
                className={classes.textFields}
                fullWidth
                type="password"
                variant="outlined"
                color="secondary"
                label="Password"
              />
              <TextField
                className={classes.textFields}
                fullWidth
                type="password"
                variant="outlined"
                color="secondary"
                label="Confirm Password"
              />
              <TextField
                fullWidth
                className={classes.textFields}
                label="Center Name"
                variant="outlined"
                color="secondary"
                required
              />
              <TextField
                fullWidth
                className={classes.textFields}
                label="Center Address"
                multiline
                rows={4}
                variant="outlined"
                color="secondary"
                required
              />
              <TextField
                fullWidth
                className={classes.textFields}
                label="State"
                variant="outlined"
                color="secondary"
                required
              />
              <TextField
                className={classes.textFields}
                type="number"
                label="Zip"
                variant="outlined"
                color="secondary"
                fullWidth
                required
              />
              <TextField
                className={classes.textFields}
                fullWidth
                type="tel"
                label="Phone"
                variant="outlined"
                color="secondary"
                required
                InputProps={{
                  inputComponent: PhoneField,
                }}
              />

              <TextField
                fullWidth
                className={classes.textFields}
                label="Primary Account First Name"
                variant="outlined"
                color="secondary"
                required
              />

              <TextField
                fullWidth
                className={classes.textFields}
                label="Primary Account Last Name"
                variant="outlined"
                color="secondary"
                required
              />
            </Box>
            <Box width="100%">
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Accept terms and conditions of HousecallMD"
                  labelPlacement="end"
                />
              </FormGroup>
            </Box>

            <Box width="100%" className={classes.formButton}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                size="large"
              >
                Create Account
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  )
}

export default CreateAccount

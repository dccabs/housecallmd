import { useState } from 'react'
import {
  Typography,
  Box,
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from '@material-ui/core'
import Container from '../components/Container'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'

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

const VisitChoice = () => {
  const [value, setValue] = useState('Video/Telemedicine Visit')
  const classes = useStyles()
  const router = useRouter()

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return (
    <Container>
      <Box p="1em">
        <Typography variant="h2">Visit Choice</Typography>
        <Container>
          <form action="/">
            <Box
              mt="2em"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h4">
                What type of visit would you like?
              </Typography>
              <Box
                mt="1em"
                width="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <FormControl component="fieldset">
                  <RadioGroup
                    name="visit"
                    value={value}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="Video/Telemedicine Visit"
                      control={<Radio />}
                      label="Video/Telemedicine Visit"
                    />
                    <FormControlLabel
                      value="Phone Visit"
                      control={<Radio />}
                      label="Phone Visit"
                    />
                    <FormControlLabel
                      value="Housecall (In person visit at home)"
                      control={<Radio />}
                      label="Housecall (In person visit at home)"
                    />
                  </RadioGroup>
                </FormControl>
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

export default VisitChoice

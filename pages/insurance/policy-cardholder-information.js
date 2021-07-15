import { Typography, Box, Button, TextField } from '@material-ui/core'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import Container from '../../components/Container'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import useStore from '../../zustand/store'
import { useState } from 'react'
import moment from 'moment'

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
  const { setPolicyHolderFirstName, setPolicyHolderLastName, setPolicyHolderDob, setPolicyHolderRelation } = useStore()
  const [localFirstName, setLocalFirstName] = useState('')
  const [localLastName, setLocalLastName] = useState('')
  const [localDob, setLocalDob] = useState(null)
  const [localRelation, setLocalRelation] = useState('')

  const classes = useStyles()
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    setPolicyHolderFirstName(localFirstName)
    setPolicyHolderLastName(localLastName)
    setPolicyHolderDob(localDob)
    setPolicyHolderRelation(localRelation)
    router.push('/insurance/choose-provider')
  }

  const handleUpdate = (e, fn) => {
    fn(e.target.value)
  }

  return (
    <Container>
      <Box>
        <Typography variant="h2" className={classes.h2}>Insurance</Typography>
        <form onSubmit={handleSubmit} autoComplete="off">
          <Box
            mt="2em"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Typography>
              Please fill out the following about the <strong style={{color: '#0092b8'}}>primary policy cardholder</strong> of your insurance plan
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
                autoComplete="nope"
                value={localFirstName}
                className={classes.textFields}
                label="Policy holder first name"
                variant="outlined"
                color="secondary"
                onChange={(e) => handleUpdate(e, setLocalFirstName)}
                required
              />
              <TextField
                autoComplete="nope"
                value={localLastName}
                className={classes.textFields}
                label="Policy holder last name"
                variant="outlined"
                color="secondary"
                onChange={(e) => handleUpdate(e, setLocalLastName)}
                required
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  autoComplete="nope"
                  className={classes.textFields}
                  inputVariant="outlined"
                  margin="normal"
                  id="date-picker-dialog"
                  label="Policy holder date of birth"
                  format="MM/dd/yyyy"
                  value={localDob}
                  onChange={(value) => {
                    setLocalDob(value)
                  }}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
              <FormControl variant="outlined" className={classes.textFields}>
                <InputLabel id="demo-simple-select-outlined-label">Relation to policy holder</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={localRelation}
                  onChange={(e) => handleUpdate(e, setLocalRelation)}
                  label="Relation to policy holder"
                >
                  <MenuItem value="spouse">Spouse</MenuItem>
                  <MenuItem value="child">Step-child</MenuItem>
                  <MenuItem value="child">Other</MenuItem>
                </Select>
              </FormControl>
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
                  disabled={!localLastName || !localFirstName || !moment(localDob).isValid() || !localRelation}
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

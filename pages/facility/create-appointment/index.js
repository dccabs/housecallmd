import { useState, useEffect } from 'react'
import {
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from '@material-ui/core'
import Container from '../../../components/Container'
import { makeStyles } from '@material-ui/core/styles'
import { Auth } from '@supabase/ui'
import xhrHeader from '../../../constants/xhrHeader'
import router from 'next/router'

const useStyles = makeStyles((theme) => ({
  h2: {
    marginTop: '.5em',
  },
  selectBox: {
    minWidth: '20em',
  },
}))

const CreateAppointment = () => {
  const [loading, setLoading] = useState(false)
  const [patients, setPatients] = useState([])
  const classes = useStyles()
  const { user } = Auth.useUser()

  useEffect(async () => {
    if (user && patients) {
      setLoading(false)

      const facilityPatientById = await fetch('/api/getAllFacilityPatients', {
        ...xhrHeader,
        body: JSON.stringify({ user }),
      })
      const data = await facilityPatientById.json()
      setPatients(data)
    }
  }, [user])

  function handleChange(e) {
    const userId = e.target.value
    if (userId) {
      router.push(`/facility/create-appointment/${userId}`)
    }
  }

  return (
    <>
      <Container>
        <Box>
          <Typography className={classes.h2} variant="h2">
            Select a patient
          </Typography>
          {!loading ? (
            <>
              <form>
                <Box
                  mt="2em"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Box
                    mt="1em"
                    width="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <FormControl component="fieldset" sx={{ minWidth: 130 }}>
                      <Box mt="1em">
                        <InputLabel id="select-patient">
                          Select Patient
                        </InputLabel>
                        <Select
                          className={classes.selectBox}
                          id="select-patient"
                          placeholder={'Select Patient'}
                          onChange={handleChange}
                        >
                          {patients.map((patient) => {
                            return (
                              <MenuItem value={patient.id}>
                                {patient.first_name} {patient.last_name}
                              </MenuItem>
                            )
                          })}
                        </Select>
                      </Box>
                    </FormControl>
                  </Box>
                </Box>
              </form>
            </>
          ) : (
            <Box
              my="1em"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <CircularProgress />
            </Box>
          )}
        </Box>
      </Container>
    </>
  )
}

export default CreateAppointment

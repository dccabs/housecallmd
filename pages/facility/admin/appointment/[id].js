import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import useStore from '../../../../zustand/store'
import {
  Typography,
  Box,
  Button,
  TextField,
  MenuItem,
  IconButton,
  Tooltip,
  CircularProgress,
  Tabs,
  Tab,

} from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check';
import { Autocomplete } from '@material-ui/lab'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import EditIcon from '@material-ui/icons/Edit'
import DateFnsUtils from '@date-io/date-fns'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'
import { Auth } from '@supabase/ui'
import Link from 'next/link'

import Container from 'components/Container'
import { SnackBarContext } from 'components/SnackBar'
import xhrHeader from '../../../../constants/xhrHeader'

const useStyles = makeStyles((theme) => ({
  h2: {
    marginTop: '.5em',
  },
  facilityLink: {
    '& a': {
      textDecoration: 'none',
      color: theme.palette.secondary.main,
    },
  },
  textFields: {
    width: '100%',
    marginTop: '2em',
    maxWidth: '34rem',
  },
  buttonLinks: {
    '& button': {
      padding: '1em',
      fontWeight: 600,
      width: '16rem',

      '&:hover': {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
}))

const TabPanel = (props) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

const AppointmentDetailsPage = () => {
  const openSnackBar = useContext(SnackBarContext)
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [note, setNote] = useState('');

  const classes = useStyles()
  const { user } = Auth.useUser()
  const router = useRouter()
  const { id: appointmentId } = router.query

  useEffect(() => {
    if (user && appointmentId) {
      // setLoading(true)
      fetch('/api/getFacilityAppointmentById', {
        ...xhrHeader,
        body: JSON.stringify({ id: Number(appointmentId)}),
      })
        .then((res) => res.json())
        .then((res) => {
          setData(res);
          setNote(res?.note);
          setLoading(false);
        })
    }
  }, [user, appointmentId])

  const { user_info, facility_info } = data || {};

  return (
    <Container>
      {loading ?
          <Container>
            <div style={{textAlign: 'center'}}>
              <CircularProgress />
            </div>
          </Container>

        :
        <>
          <Box display="flex" alignItems="end">
            <Typography variant="h2" className={classes.h2}>
              Appointment
              <Button
                style={{marginLeft: 30}}
                size="small"
                variant="contained"
              >
                <Tooltip title={`${data.complete ? 'Mark Incomplete' : 'Mark Complete'}`}>
                  <CheckIcon />
                </Tooltip>
              </Button>
            </Typography>
          </Box>
          <Box style={{margin: '40px 0 0'}}>
            <Box style={{margin: '40px 0 0'}}>
              <Box>
                <strong>Name:</strong> {user_info?.first_name} {user_info?.last_name}
              </Box>
              <Box>
                <strong>Facility:</strong> {facility_info?.name}
              </Box>
              <Box>
                <strong>Facility Phone:</strong> {facility_info?.facility_phone}
              </Box>
              <Box>
                <strong>Room Number:</strong> {user_info?.room_number}
              </Box>
              <Box>
                <strong>Date:</strong> {data?.created_at}
              </Box>

              <Box style={{margin: '40px 0 0'}}>
                <Box>
                  <strong>Visit Reason:</strong>
                </Box>
                <Box>
                  {data?.visitReason}
                </Box>
              </Box>
              <Box style={{margin: '40px 0 0px'}}>
                <Box style={{marginBottom: 10}}>
                  <strong>HousecallMD Notes:</strong>
                </Box>
                <Box>
                  <TextField
                    placeholder="Visit Reason"
                    value={note}
                    multiline
                    rows={8}
                    maxrows={8}
                    fullWidth
                    variant="outlined"
                    onChange={(e) => updateNotes(e.target.value)}
                    // disabled={messagesLoading}
                  />
                  <Button
                    style={{marginTop: 10}}
                    size="large"
                    variant="contained"
                    color="primary"
                  >
                    Update Notes
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box style={{margin: '40px 0 0px'}}>
              <Button
                color="secondary"
                style={{marginTop: 10}}
                size="large"
                variant="contained"
              >
                Send Message to {facility_info?.name} about this appointment
              </Button>
            </Box>
            <Box style={{margin: '10px 0 0px'}}>
              <Button
                color="secondary"
                style={{marginTop: 10}}
                size="large"
                variant="contained"
              >
                Create a video chat room for this appointment
              </Button>
            </Box>
          </Box>
        </>
      }
    </Container>
  )
}

export default AppointmentDetailsPage

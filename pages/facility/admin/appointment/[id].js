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
import { supabase } from 'utils/initSupabase'

import Container from 'components/Container'
import MuiSelect from 'components/MuiSelect'
import PhoneField from 'components/PhoneField'
import providerOptions from 'public/constants/providerOptions'
import { SnackBarContext } from 'components/SnackBar'
import { v4 as uuidv4 } from 'uuid'
import AppointmentTable from '../../../../components/AppointmentTable'
import xhrHeader from '../../../../constants/xhrHeader'
import RefreshIcon from '@material-ui/icons/Refresh'
import Message from '../../../../components/Facility/Message'
const NEXT_PUBLIC_SUPABASE_STORAGE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL

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

const UserDetailsPage = () => {
  const openSnackBar = useContext(SnackBarContext)
  const [data, setData] = useState(null);

  const classes = useStyles()
  const { user } = Auth.useUser()
  const router = useRouter()
  const { id: appointmentId } = router.query

  useEffect(() => {
    console.log('appointmentId', appointmentId)
    if (user && appointmentId) {
      // setLoading(true)
      fetch('/api/getFacilityAppointmentById', {
        ...xhrHeader,
        body: JSON.stringify({ id: Number(appointmentId)}),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log('res', res)
        })
    }
  }, [user, appointmentId])


  return (
    <Container>
      <Box display="flex" alignItems="end">
        <Typography variant="h2" className={classes.h2}>
          Appointment
        </Typography>
      </Box>
      Details

    </Container>
  )
}

export default UserDetailsPage

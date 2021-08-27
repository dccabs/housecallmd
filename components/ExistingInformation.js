import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  List,
  ListItem,
} from '@material-ui/core'
import moment from 'moment'
import { Auth } from '@supabase/ui'
import Link from 'next/link'
import PersonIcon from '@material-ui/icons/Person'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
  buttonLinks: {
    marginTop: '4em',
    alignItems: 'center',

    '& button': {
      width: '250px',
      padding: '1em 2em',
      fontWeight: 600,
      marginTop: '1em',

      '&:hover': {
        backgroundColor: theme.palette.primary.main,
      },
    },
    '& a': {
      textaDecoration: 'none',
      cursor: 'pointer',
    },
  },
}))

const ExistingInformation = (props) => {
  const classes = useStyles()
  const [isPolicyHolder, setIsPolicyHolder] = useState('')
  const [policyHolderFirstName, setPolicyHolderFirstName] = useState('')
  const [policyHolderLastName, setPolicyHolderLastName] = useState('')
  const [policyHolderDob, setPolicyHolderDob] = useState('')
  const [policyHolderRelation, setPolicyHolderRelation] = useState('')

  const [provider, setProvider] = useState('')
  const [hasInsurance, setHasInsurance] = useState(false)
  const [planNumber, setPlanNumber] = useState('')
  const [groupNumber, setGroupNumber] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [phone, setPhone] = useState('')
  const [dob, setDob] = useState('')

  const [loading, setLoading] = useState(false)

  const { user } = Auth.useUser()

  useEffect(async () => {
    if (user) {
      try {
        setLoading(true)
        const res = await fetch('/api/getSingleUser', {
          method: 'POST',
          headers: new Headers({ 'Content-Type': 'application/json' }),
          credentials: 'same-origin',
          body: JSON.stringify({ email: user.email }),
        })
        const data = await res.json()

        setIsPolicyHolder(data.isPolicyCardHolder)
        setPolicyHolderFirstName(data.policyHolderFirstName)
        setPolicyHolderLastName(data.policyHolderLastName)
        setPolicyHolderRelation(data.policyHolderRelation)

        if (data.policyHolderDob && data.policyHolderDob !== 'Invalid date')
          setPolicyHolderDob(moment(data.policyHolderDob).format('L'))

        setProvider(data.provider)
        setHasInsurance(data.hasInsurance)
        setPlanNumber(data.planNumber)
        setGroupNumber(data.groupNumber)
        setFirstName(data.firstName)
        setLastName(data.lastName)
        setEmail(data.email)
        setAddress(data.address)
        setCity(data.city)
        setState(data.state)
        setZip(data.zip)
        setPhone(data.phone)

        if (data.dob && data.dob !== 'Invalid date')
          setDob(moment(data.dob).format('L'))
      } catch (err) {
        throw err
      } finally {
        setLoading(false)
      }
    }
  }, [user])

  return (
    <div>
      {!loading ? (
        <>
          <Box display="flex" alignItems="center">
            <PersonIcon fontSize="large" style={{ marginRight: '0.3em' }} />
            <Typography variant="h4" align="left">
              Your User Information
            </Typography>
          </Box>

          <Box my="1em">
            <List>
              <ListItem>
                  <strong>Patient is Policy Holder:</strong> {isPolicyHolder ? 'Yes' : 'No'}
              </ListItem>
              {!isPolicyHolder &&
              <>
                <ListItem>
                    <strong>Policy Holder First Name:</strong> {policyHolderFirstName}
                </ListItem>
                <ListItem>
                    <strong>Policy Holder Last Name:</strong> {policyHolderLastName}
                </ListItem>
                <ListItem>
                    <strong> Policy Holder Date of Birth:</strong> {policyHolderDob}
                </ListItem>
                <ListItem>
                    <strong>Policy Holder Relationship to Patient:</strong> {policyHolderRelation}
                </ListItem>
              </>
              }
            </List>

            <List>
              <ListItem>
                <strong>Email: {email}</strong>
              </ListItem>
              <ListItem>
                <strong>
                  First Name: {firstName}
                </strong>
              </ListItem>
              <ListItem>
                <strong>Last Name: {lastName}</strong>
              </ListItem>
              <ListItem>
                <strong>
                  Has Insurance: {hasInsurance ? 'Yes' : 'No'}
                </strong>
              </ListItem>
              <ListItem>
                <strong>
                  Insurance Provider: {provider}
                </strong>
              </ListItem>
              <ListItem>
                <strong>
                  Plan Number: {planNumber}
                </strong>
              </ListItem>
              <ListItem>
                <strong>
                  Group Number: {groupNumber}
                </strong>
              </ListItem>
              <ListItem>
                <strong>Date of Birth: {dob}</strong>
              </ListItem>
              <ListItem>
                <strong>Phone: {phone}</strong>
              </ListItem>
              <ListItem>
                <strong>Address: {address}</strong>
              </ListItem>
              <ListItem>
                <strong>City: {city}</strong>
              </ListItem>
              <ListItem>
                <strong>State: {state}</strong>
              </ListItem>
              <ListItem>
                <strong>Zip Code: {zip}</strong>
              </ListItem>
            </List>
          </Box>

          <Box display="flex" justifyContent="center" flexDirection="column" className={classes.buttonLinks}>
            <Link href="/edit-information">
              <Button variant="contained" color="secondary" size="large">
                Edit Information
              </Button>
            </Link>
            <Button variant="contained" color="secondary" size="large" onClick={() => props.setOpen(false)}>
              Close
            </Button>
          </Box>
        </>
      ) : (
        <Box
          my="8em"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress />
        </Box>
      )}
    </div>
  )
}

export default ExistingInformation

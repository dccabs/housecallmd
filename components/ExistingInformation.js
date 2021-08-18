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

const ExistingInformation = () => {
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
                <Typography variant="caption">
                  Policy Holder: {isPolicyHolder ? 'Yes' : 'No'}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="caption">
                  Policy Holder First Name: {policyHolderFirstName}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="caption">
                  Policy Holder Last Name: {policyHolderLastName}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="caption">
                  Policy Holder Date of Birth: {policyHolderDob}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="caption">
                  Policy Holder Relationship to Patient: {policyHolderRelation}
                </Typography>
              </ListItem>
            </List>

            <List>
              <ListItem>
                <Typography variant="caption">Email: {email}</Typography>
              </ListItem>
              <ListItem>
                <Typography variant="caption">
                  First Name: {firstName}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="caption">Last Name: {lastName}</Typography>
              </ListItem>
              <ListItem>
                <Typography variant="caption">
                  Has Insurance: {hasInsurance ? 'Yes' : 'No'}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="caption">
                  Insurance Provider: {provider}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="caption">
                  Plan Number: {planNumber}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="caption">
                  Group Number: {groupNumber}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="caption">Date of Birth: {dob}</Typography>
              </ListItem>
              <ListItem>
                <Typography variant="caption">Phone: {phone}</Typography>
              </ListItem>
              <ListItem>
                <Typography variant="caption">Address: {address}</Typography>
              </ListItem>
              <ListItem>
                <Typography variant="caption">City: {city}</Typography>
              </ListItem>
              <ListItem>
                <Typography variant="caption">State: {state}</Typography>
              </ListItem>
              <ListItem>
                <Typography variant="caption">Zip Code: {zip}</Typography>
              </ListItem>
            </List>
          </Box>

          <Box display="flex" justifyContent="center">
            <Link href="/edit-information">
              <Button variant="contained" color="secondary">
                Edit Information
              </Button>
            </Link>
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

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
  makeStyles,
} from '@material-ui/core'
import moment from 'moment'
import { Auth } from '@supabase/ui'
import Link from 'next/link'
import PersonIcon from '@material-ui/icons/Person'

const useStyles = makeStyles((theme) => ({
  flexGrow: {
    flex: 1,
  },
  itemLabel: {
    fontWeight: 600,
  },
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
  const { onClose } = props
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

  const handleCloseModal = () => {
    onClose()
  }

  return (
    <div>
      {!loading ? (
        <>
          <Box display="flex" alignItems="center">
            <PersonIcon
              color="secondary"
              fontSize="large"
              style={{ marginRight: '0.3em' }}
            />
            <Typography variant="h4" align="left">
              Your User Information
            </Typography>
          </Box>
          <Divider />

          <Box my="1em">
            <List dense={true}>
              <ListItem>
                <ListItemText className={classes.flexGrow}>
                  Patient is Policy Holder:
                </ListItemText>
                <ListItemText className={classes.flexGrow}>
                  {isPolicyHolder ? 'Yes' : 'No'}
                </ListItemText>
              </ListItem>
              {!isPolicyHolder && (
                <>
                  <ListItem>
                    <span
                      className={`${classes.flexGrow} ${classes.itemLabel}`}
                    >
                      Policy Holder First Name:
                    </span>
                    <ListItemText className={classes.flexGrow}>
                      {policyHolderFirstName}
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    <span
                      className={`${classes.flexGrow} ${classes.itemLabel}`}
                    >
                      Policy Holder Last Name:
                    </span>
                    <ListItemText className={classes.flexGrow}>
                      {policyHolderLastName}
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    <span
                      className={`${classes.flexGrow} ${classes.itemLabel}`}
                    >
                      Policy Holder Date of Birth:
                    </span>
                    <ListItemText className={classes.flexGrow}>
                      {policyHolderDob}
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    <span
                      className={`${classes.flexGrow} ${classes.itemLabel}`}
                    >
                      Policy Holder Relationship to Patient:
                    </span>
                    <ListItemText className={classes.flexGrow}>
                      {policyHolderRelation}
                    </ListItemText>
                  </ListItem>
                </>
              )}
            </List>

            <List dense={true}>
              <ListItem alignItems="flex-start">
                <span className={`${classes.flexGrow} ${classes.itemLabel}`}>
                  Email:
                </span>
                <ListItemText className={classes.flexGrow}>
                  {email}
                </ListItemText>
              </ListItem>
              <ListItem>
                <span className={`${classes.flexGrow} ${classes.itemLabel}`}>
                  First Name:
                </span>
                <ListItemText className={classes.flexGrow}>
                  {firstName}
                </ListItemText>
              </ListItem>
              <ListItem>
                <span className={`${classes.flexGrow} ${classes.itemLabel}`}>
                  Last Name:
                </span>
                <ListItemText className={classes.flexGrow}>
                  {lastName}
                </ListItemText>
              </ListItem>
              <ListItem>
                <span className={`${classes.flexGrow} ${classes.itemLabel}`}>
                  Has Insurance:
                </span>
                <ListItemText className={classes.flexGrow}>
                  {hasInsurance ? 'Yes' : 'No'}
                </ListItemText>
              </ListItem>
              <ListItem>
                <span className={`${classes.flexGrow} ${classes.itemLabel}`}>
                  Insurance Provider:
                </span>
                <ListItemText className={classes.flexGrow}>
                  {provider}
                </ListItemText>
              </ListItem>
              <ListItem>
                <span className={`${classes.flexGrow} ${classes.itemLabel}`}>
                  Plan Number:
                </span>
                <ListItemText className={classes.flexGrow}>
                  {planNumber}
                </ListItemText>
              </ListItem>
              <ListItem>
                <span className={`${classes.flexGrow} ${classes.itemLabel}`}>
                  Group Number:
                </span>
                <ListItemText className={classes.flexGrow}>
                  {groupNumber}
                </ListItemText>
              </ListItem>
              <ListItem>
                <span className={`${classes.flexGrow} ${classes.itemLabel}`}>
                  Date of Birth:
                </span>
                <ListItemText className={classes.flexGrow}> {dob}</ListItemText>
              </ListItem>
              <ListItem>
                <span className={`${classes.flexGrow} ${classes.itemLabel}`}>
                  Phone:
                </span>
                <ListItemText className={classes.flexGrow}>
                  {phone}
                </ListItemText>
              </ListItem>
              <ListItem>
                <span className={`${classes.flexGrow} ${classes.itemLabel}`}>
                  Address:
                </span>
                <ListItemText className={classes.flexGrow}>
                  {address}
                </ListItemText>
              </ListItem>
              <ListItem>
                <span className={`${classes.flexGrow} ${classes.itemLabel}`}>
                  City:
                </span>
                <ListItemText className={classes.flexGrow}>{city}</ListItemText>
              </ListItem>
              <ListItem>
                <span className={`${classes.flexGrow} ${classes.itemLabel}`}>
                  State:
                </span>
                <ListItemText className={classes.flexGrow}>
                  {state}
                </ListItemText>
              </ListItem>
              <ListItem>
                <span className={`${classes.flexGrow} ${classes.itemLabel}`}>
                  Zip Code:
                </span>
                <ListItemText className={classes.flexGrow}> {zip}</ListItemText>
              </ListItem>
            </List>
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            flexDirection="column"
            className={classes.buttonLinks}
          >
            <Link href="/edit-information">
              <Button variant="contained" color="secondary" size="large">
                Edit Information
              </Button>
            </Link>
            <Button
              variant="contained"
              color="default"
              size="large"
              onClick={handleCloseModal}
            >
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

ExistingInformation.propTypes = {
  onClose: PropTypes.func,
}
ExistingInformation.defaultProps = {
  onClose: () => {},
}

export default ExistingInformation

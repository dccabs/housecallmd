import React, { memo, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
} from '@material-ui/core'
import { PersonTwoTone } from '@material-ui/icons'

const PhoneNumberList = memo((props) => {
  const { user } = props

  const [loading, setLoading] = useState(false)
  const [phoneNumbers, setPhoneNumbers] = useState(false)

  useEffect(async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/getPhoneNumbers`, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        credentials: 'same-origin',
        body: JSON.stringify({
          user,
        }),
      })
      const phoneNumbersData = await res.json()

      setPhoneNumbers(phoneNumbersData)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <List dense={true}>
      {phoneNumbers &&
        phoneNumbers?.map(({ id, phoneNumber, firstName, lastName }) => (
          <ListItem button key={id}>
            <ListItemIcon>
              <Avatar>
                <PersonTwoTone />
              </Avatar>
            </ListItemIcon>
            <ListItemText
              primary={`${firstName} ${lastName}`}
              secondary={`${phoneNumber}`}
            />
          </ListItem>
        ))}
    </List>
  )
})

PhoneNumberList.propTypes = {}

export default PhoneNumberList

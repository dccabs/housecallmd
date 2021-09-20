import React, { memo, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
} from '@material-ui/core'
import Link from 'next/link'
import { PersonTwoTone } from '@material-ui/icons'
import { Skeleton } from '@material-ui/lab'

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
      setLoading(true)
    }
  }, [])

  return (
    <List dense={true}>
      {phoneNumbers &&
        phoneNumbers?.map(({ id, phoneNumber, firstName, lastName }) => (
          <Link key={id} href={`/smsHistory/${id}`} underline="none">
            <a
              style={{
                textDecoration: 'none',
                color: '#0092b8',
              }}
            >
              <ListItem button>
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
            </a>
          </Link>
        ))}
    </List>
  )
})

PhoneNumberList.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }),
}

PhoneNumberList.defaultProps = {
  user: {
    email: '',
  },
}

export default PhoneNumberList

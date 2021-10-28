import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import Link from 'next/link'

const RedirectMessage = () => {
  return (
    <div className="RedirectMessage">
      <Typography variant="h4">
        You must be logged in and be an admin user to view this page. Click{' '}
        <Link href="/login">
          <a>HERE</a>
        </Link>{' '}
        to log in.
      </Typography>
    </div>
  )
}

RedirectMessage.propTypes = {}

export default RedirectMessage

import { useState, useEffect, Fragment } from 'react'
import { Box, List, ListItem, Link as MuiLink } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useAuth0 } from '@auth0/auth0-react'
import Link from 'next/link'

const useStyles = makeStyles((theme) => ({
  authLinks: {
    '& a': {
      textDecoration: 'none',
      color: theme.palette.primary.main,
      fontWeight: '600',
    },
  },
  '.MuiListItem-gutters': {
    padding: '2em',
  },
}))

const MobileNavDrawer = ({ setDrawerToggle }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0()
  const classes = useStyles()

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize)
    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])

  useEffect(() => {
    if (screenWidth >= 768) setDrawerToggle(false)
  }, [screenWidth, setDrawerToggle])

  const handleWindowResize = () => {
    setScreenWidth(window.innerWidth)
  }

  return (
    <Fragment>
      <Box
        onClick={() => setDrawerToggle(false)}
        onKeyDown={() => setDrawerToggle(false)}
        minWidth="12rem"
      >
        <List className={classes.authLinks}>
          {isAuthenticated && (
            <ListItem>
              <strong>Hello, {user.nickname}</strong>
            </ListItem>
          )}
          <Link href="/services">
            <ListItem button>Services</ListItem>
          </Link>
          <Link href="/contact">
            <ListItem button>Contact</ListItem>
          </Link>
          {isAuthenticated ? (
            <MuiLink onClick={logout}>
              <ListItem button>Logout</ListItem>
            </MuiLink>
          ) : (
            <MuiLink onClick={loginWithRedirect}>
              <ListItem button>Login</ListItem>
            </MuiLink>
          )}
        </List>
      </Box>
    </Fragment>
  )
}

export default MobileNavDrawer

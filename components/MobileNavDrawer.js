import { useState, useEffect, Fragment } from 'react'
import { Box, List, ListItem, Link as MuiLink } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles'
import { supabase } from '../utils/initSupabase'
import { useRouter } from 'next/router'
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
  profileEmail: {
    marginLeft: 5,
  }
}))

const MobileNavDrawer = ({ setDrawerToggle }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const session = supabase.auth.session()
  const classes = useStyles()

  useEffect(() => {
    session ? setIsAuthenticated(true) : setIsAuthenticated(false)
  }, [session])

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

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    console.log(error)
    router.push('/')
  }

  return (
    <Fragment>
      <Box
        onClick={() => setDrawerToggle(false)}
        onKeyDown={() => setDrawerToggle(false)}
        minWidth="12rem"
      >
        <List className={classes.authLinks}>
          {isAuthenticated &&
            <ListItem>
              <AccountCircleIcon/> <span className={classes.profileEmail}>dccabs@gmail.com</span>
            </ListItem>
          }
          {isAuthenticated ? (
            <MuiLink
              onClick={handleSignOut}
              style={{ color: '#000', fontWeight: 400 }}
            >
              <ListItem button>Logout</ListItem>
            </MuiLink>
          ) : (
            <Link href="/login">
              <ListItem button>Login</ListItem>
            </Link>
          )}
          <Link href="/services">
            <ListItem button>Services</ListItem>
          </Link>
          <Link href="/contact">
            <ListItem button>Contact</ListItem>
          </Link>
        </List>
      </Box>
    </Fragment>
  )
}

export default MobileNavDrawer

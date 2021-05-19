import { useState, Fragment } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  Link as MuiLink,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/core/styles'
import { useAuth0 } from '@auth0/auth0-react'
import Link from 'next/link'
import Image from 'next/image'

import MobileNavDrawer from './MobileNavDrawer'

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#fff',
    boxShadow: 'none',

    [theme.breakpoints.up('sm')]: {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      position: 'absolute',
    },
  },
  toolBar: {
    display: 'flex',
    justifyContent: 'space-between',
<<<<<<< HEAD

    '& a': {
      textDecoration: 'none',
      color: 'blue',
    },
  },
  authLinks: {
    '& a': {
      fontWeight: 600,
      textDecoration: 'none',
      color: theme.typography.color,
      marginLeft: '2rem',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  burgerNav: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
=======
    alignItems: 'center',

    '& a': {
      textDecoration: 'none',
>>>>>>> d566e018494f2fbebc41f68fed896490d1437e2b
    },
  },
  logoText: {
    marginLeft: 10,
    color: '#494b4b',
    fontWeight: 900,
    '& span': {
      color: '#0092b8',
    },
  },
  logoH6: {
    display: 'flex',
  },
<<<<<<< HEAD
=======
  navigation: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  navLinks: {
    color: theme.typography.color,

    '& a': {
      color: theme.typography.color,
      textDecoration: 'none',
      marginLeft: '2rem',
    },
  },
  authLinks: {
    color: theme.typography.color,
    marginLeft: '2rem',

    '& a': {
      color: theme.typography.color,
      textDecoration: 'none',
    },
  },
  burgerNav: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
    },
  },
>>>>>>> d566e018494f2fbebc41f68fed896490d1437e2b
}))

const Navbar = () => {
  const [drawerToggle, setDrawerToggle] = useState(false)
<<<<<<< HEAD
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0()
=======
  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0()
>>>>>>> d566e018494f2fbebc41f68fed896490d1437e2b
  const classes = useStyles()

  return (
    <Fragment>
      <Drawer
        anchor="right"
        open={drawerToggle}
        onClose={() => setDrawerToggle(false)}
      >
        <MobileNavDrawer setDrawerToggle={setDrawerToggle} />
      </Drawer>

      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <Link href="/">
            <a>
              <Box display="flex">
                <Image
                  alt="Housecall MD"
                  src="/logo_heart.png"
                  width={35}
                  height={30}
                />
                <Typography variant="h6" className={classes.logoH6}>
                  <strong className={classes.logoText}>
                    HouseCall<span>MD</span>
                  </strong>
                </Typography>
              </Box>
            </a>
          </Link>

<<<<<<< HEAD
          <Box className={classes.authLinks} display="flex">
            <Link href="/contact">
              <a>
                <Typography>Contact</Typography>
              </a>
            </Link>
            {isAuthenticated ? (
              <MuiLink
                onClick={logout}
                style={{ textDecoration: 'none', cursor: 'pointer' }}
              >
                <Typography>Logout</Typography>
              </MuiLink>
            ) : (
              <MuiLink
                onClick={loginWithRedirect}
                style={{ textDecoration: 'none', cursor: 'pointer' }}
              >
                <Typography>Login</Typography>
              </MuiLink>
=======
          <Box
            className={classes.navigation}
            display="flex"
            alignItems="center"
          >
            <Box
              className={classes.navLinks}
              display="flex"
              alignItems="center"
            >
              <Link href="/contact">
                <a>
                  <Typography>Contact</Typography>
                </a>
              </Link>
            </Box>
            {isAuthenticated ? (
              <Box
                ml="2rem"
                className={classes.authLinks}
                display="flex"
                alignItems="center"
              >
                <Typography>
                  <strong>Hello, {user.nickname}</strong>
                </Typography>
                <MuiLink
                  onClick={logout}
                  style={{
                    textDecoration: 'none',
                    cursor: 'pointer',
                    marginLeft: '5px',
                  }}
                >
                  <Typography>(Logout)</Typography>
                </MuiLink>
              </Box>
            ) : (
              <Box ml="2rem" className={classes.authLinks} display="flex">
                <MuiLink
                  onClick={loginWithRedirect}
                  style={{ textDecoration: 'none', cursor: 'pointer' }}
                >
                  <Typography>Login</Typography>
                </MuiLink>
              </Box>
>>>>>>> d566e018494f2fbebc41f68fed896490d1437e2b
            )}
          </Box>

          <Box display="none" className={classes.burgerNav}>
            <IconButton
              edge="start"
              onClick={() => setDrawerToggle(!drawerToggle)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Fragment>
  )
}

export default Navbar

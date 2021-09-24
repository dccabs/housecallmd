import { useState, useEffect, useContext, Fragment } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
} from '@material-ui/core'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Auth } from '@supabase/ui'
import { supabase } from '../utils/initSupabase'
import useStore from '../zustand/store'
import { makeStyles } from '@material-ui/core/styles'
import Image from 'next/image'
import { SnackBarContext } from '../components/SnackBar'
import {
  AccountCircleRounded as AccountCircleIcon,
  Menu as MenuIcon,
} from '@material-ui/icons'

import MobileNavDrawer from './MobileNavDrawer'
import clearStore from '../utils/clearStore'

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#fff',
    boxShadow: 'rgba(140, 152, 164, 0.25) 0px 3px 6px 0px',

    [theme.breakpoints.up('sm')]: {
      backgroundColor: '#fff',
      margin: 'auto',
      boxShadow: 'rgba(140, 152, 164, 0.25) 0px 3px 6px 0px',
    },
  },
  toolBar: {
    display: 'flex',
    justifyContent: 'space-between',

    '& a': {
      textDecoration: 'none',
      color: 'blue',
    },
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      maxWidth: 1100,
      margin: 'auto',
    },
  },
  authLinks: {
    color: theme.typography.color,

    '& a': {
      fontWeight: 600,
      color: theme.typography.color,
      textDecoration: 'none',
      marginLeft: '2rem',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  burgerNav: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
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
  nextLink: {
    '& a': {
      fontWeight: 400,
    },
  },
}))

const Navbar = () => {
  const store = useStore()

  const [drawerToggle, setDrawerToggle] = useState(false)
  const router = useRouter()
  const classes = useStyles()
  const openSnackBar = useContext(SnackBarContext)
  const { user, session } = Auth.useUser()

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    openSnackBar({
      message: `${user.email} has been logged out of the application`,
      snackSeverity: 'error',
    })
    clearStore(store)
    router.push('/')
  }

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

          <Box className={classes.authLinks} display="flex">
            <Link href="/services">
              <a>
                <Typography>Services</Typography>
              </a>
            </Link>
            <Link href="/contact">
              <a>
                <Typography>Contact</Typography>
              </a>
            </Link>
            {user ? (
              <>
                <Box ml="2rem">
                  <Typography style={{ display: 'flex', alignItems: 'center' }}>
                    <AccountCircleIcon style={{ marginRight: 10 }} />
                    {user.email}
                  </Typography>
                </Box>
                <Box ml="1rem">
                  <Typography
                    onClick={handleSignOut}
                    style={{ cursor: 'pointer' }}
                  >
                    Logout
                  </Typography>
                </Box>
              </>
            ) : (
              <Box className={classes.nextLink}>
                <Link href="/login">
                  <Typography align="right" style={{ cursor: 'pointer' }}>
                    <a>Login</a>
                  </Typography>
                </Link>
              </Box>
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

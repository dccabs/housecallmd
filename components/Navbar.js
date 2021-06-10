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
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import useStore from '../zustand/store'
import { supabase } from '../utils/initSupabase'

import MobileNavDrawer from './MobileNavDrawer'

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#fff',
    boxShadow: 'none',

    [theme.breakpoints.up('sm')]: {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      maxWidth: 1400,
      margin: 'auto',
    },
  },
  toolBar: {
    display: 'flex',
    justifyContent: 'space-between',

    '& a': {
      textDecoration: 'none',
      color: 'blue',
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
  const [drawerToggle, setDrawerToggle] = useState(false)
  const { isAuthenticated } = useStore()
  const router = useRouter()
  const classes = useStyles()

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    console.log(error)
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
            {isAuthenticated ? (
              <Box ml="2rem">
                <Typography
                  onClick={handleSignOut}
                  style={{ cursor: 'pointer' }}
                >
                  Logout
                </Typography>
              </Box>
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

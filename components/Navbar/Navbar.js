import { useState, useRef, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  makeStyles,
  Button,
} from '@material-ui/core'
import Link from 'next/link'
import Image from 'next/image'
import { Auth } from '@supabase/ui'
import { useRouter } from 'next/router'
import useStore from '../../zustand/store'
import { supabase } from '../../utils/initSupabase'
import { SnackBarContext } from '../../components/SnackBar'
import PatientsMenu from './desktopMenu/PatientsMenu'
import PartnersMenu from './desktopMenu/PartnersMenu'
import CompanyMenu from './desktopMenu/CompanyMenu'
import MobileNavDrawer from './mobileMenu/MobileNavDrawer'
import {
  AccountCircleRounded as AccountCircleIcon,
  Menu as MenuIcon,
} from '@material-ui/icons'
import { Skeleton } from '@material-ui/lab'
import clearStore from '../../utils/clearStore'

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
      maxWidth: 1500,
      margin: 'auto',
    },
  },
  authLinks: {
    color: theme.typography.color,
    alignItems: 'center',
    '& a': {
      fontWeight: 600,
      color: theme.typography.color,
      textDecoration: 'none',
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
  menuItemBox: {
    cursor: 'pointer',
    alignItems: 'center',
  },
}))

const Navbar = () => {
  const classes = useStyles()
  const store = useStore()
  const router = useRouter()
  const { user, session } = Auth.useUser()
  const openSnackBar = useContext(SnackBarContext)
  const [drawerToggle, setDrawerToggle] = useState(false)
  const [loading, setLoading] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (user) {
      setLoading(true)
      fetch('/api/getSingleUser', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res) {
            setFirstName(res?.firstName ?? '')
            setLastName(res?.lastName ?? '')
            setIsAdmin(res?.role === 'admin')
            setLoading(false)
          }
        })
    }
  }, [user])

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
    <>
      <Drawer
        anchor="right"
        width={280}
        open={drawerToggle}
        onClose={() => setDrawerToggle(false)}
      >
        <MobileNavDrawer loading={loading} setDrawerToggle={setDrawerToggle} />
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

                {isAdmin && (
                  <Box display="flex">
                    <span style={{ marginLeft: 10 }}>
                      <Link href="/user-admin">
                        <a>
                          <Button
                            color="primary"
                            variant="outlined"
                            size="small"
                          >
                            Admin
                          </Button>
                        </a>
                      </Link>
                    </span>

                    <span style={{ marginLeft: 10 }}>
                      <Link href="/facility/admin">
                        <a>
                          <Button
                            color="primary"
                            variant="outlined"
                            size="small"
                          >
                            Assisted Living Admin
                          </Button>
                        </a>
                      </Link>
                    </span>
                  </Box>
                )}
              </Box>
            </a>
          </Link>

          {/* desktop */}
          <Box className={classes.authLinks} display="flex">
            <Box mr="1.2em">
              <PatientsMenu user={user} handleSignOut={handleSignOut} />
            </Box>
            <Box mr="1.2em">
              <PartnersMenu />
            </Box>
            <Box mr="1.2em">
              <CompanyMenu />
            </Box>
            <Box mr="2em">
              <Link href="/covid-19-information" underline="none">
                <a>
                  <Typography>Covid 19 Information</Typography>
                </a>
              </Link>
            </Box>
            {user ? (
              <>
                {loading ? (
                  <Typography>
                    <Skeleton variant="text" width="5em" />
                  </Typography>
                ) : (
                  <Box display="flex" alignItems="center">
                    <AccountCircleIcon style={{ marginRight: 10 }} />
                    <Typography>
                      {firstName} {lastName}
                    </Typography>
                  </Box>
                )}
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
            {user?.user_metadata?.facility ? (
              <Box style={{ marginLeft: 30 }}>
                <Link href="/facility/profile">
                  <Typography align="right" style={{ cursor: 'pointer' }}>
                    <a>
                      <Button color="primary" variant="contained">
                        My facility Account
                      </Button>
                    </a>
                  </Typography>
                </Link>
              </Box>
            ) : (
              <Box style={{ marginLeft: 30 }}>
                <Link href="/facility/create-account">
                  <Typography align="right" style={{ cursor: 'pointer' }}>
                    <a>
                      <Button color="primary" variant="contained">
                        Facilities
                      </Button>
                    </a>
                  </Typography>
                </Link>
              </Box>
            )}
          </Box>

          {/* mobile */}
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
    </>
  )
}

Navbar.propTypes = {}

Navbar.defaultProps = {}

export default Navbar

import { useState, useRef, useEffect, useContext } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  makeStyles,
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
      // marginLeft: '2rem',
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

          {/* desktop */}
          <Box className={classes.authLinks} display="flex">
            <Box mr="2em">
              <PatientsMenu />
            </Box>
            <Box mr="2em">
              <PartnersMenu />
            </Box>
            <Box mr="2em">
              <CompanyMenu />
            </Box>
            {/* <Box mr="2em">
              <Box display="flex">
                <Typography>Our Company</Typography>
                <KeyboardArrowDown />
              </Box>
            </Box> */}

            {/* <Typography
              ref={anchorRef}
              aria-controls={openMenuList ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              <AccountCircleIcon style={{ marginRight: 10 }} />
              Lourdes Suello
            </Typography>
            <Popper
              open={openMenuList}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === 'bottom' ? 'center top' : 'center bottom',
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={openMenuList}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem onClick={handleClose}>My Profile</MenuItem>
                        <MenuItem onClick={handleClose}>
                          Request Records and Pay Bill
                        </MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper> */}

            {/* <Link href="/services">
              <a>
                <Typography>Services</Typography>
              </a>
            </Link>
            <Link href="/contact">
              <a>
                <Typography>Contact</Typography>
              </a>
            </Link> */}
            {user ? (
              <>
                <Box ml="2rem">
                  <Typography style={{ display: 'flex', alignItems: 'center' }}>
                    <AccountCircleIcon style={{ marginRight: 10 }} />
                    {user.first}
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

export default Navbar

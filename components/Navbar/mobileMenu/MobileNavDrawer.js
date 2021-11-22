import { useState, memo, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  List,
  Typography,
  ListItem,
  makeStyles,
  Divider,
  Button,
  Collapse,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Skeleton } from '@material-ui/lab'
import useStore from '../../../zustand/store'
import { SnackBarContext } from '../../SnackBar'
import clearStore from '../../../utils/clearStore'
import { supabase } from '../../../utils/initSupabase'
import {
  AccountCircleRounded as AccountCircleIcon,
  ExpandLess,
  ExpandMore,
  CloseOutlined,
} from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  authLinks: {
    '& a': {
      textDecoration: 'none',
      color: '#000',
      fontWeight: '600',
    },
  },
  '.MuiListItem-gutters': {
    padding: '2em',
  },
  profileEmail: {
    marginLeft: 5,
  },
}))

const MobileMenu = [
  {
    id: 1,
    headerMenu: 'Our Patients',
    subMenu: [
      {
        id: 1,
        name: 'How it works',
        url: '/how-it-works',
      },
      {
        id: 2,
        name: 'Services',
        url: '/services',
      },
      {
        id: 3,
        name: `FAQ's`,
        url: '/faq',
      },
      {
        id: 4,
        name: ' Request Records & Pay Bill',
        url: '/',
      },
    ],
  },
  {
    id: 2,
    headerMenu: 'Our Partners',
    subMenu: [
      {
        id: 1,
        name: 'Long-Term Care Facilities',
        url: '/long-term-care-facilities',
      },
      {
        id: 2,
        name: 'Corporate N95 Fit Testing',
        url: '/corporate-n95-fit-testing',
      },
      {
        id: 3,
        name: 'Facility COVID Testing',
        url: '/facility-covid-testing',
      },
      {
        id: 4,
        name: 'Provider Groups',
        url: '/provider-groups',
      },
    ],
  },
  {
    id: 3,
    headerMenu: 'Our Company',
    subMenu: [
      // {
      //   id: 1,
      //   name: 'In the Press',
      //   url: '/',
      // },
      {
        id: 2,
        name: 'Blog',
        url: '/',
      },
      {
        id: 3,
        name: 'Contact Us',
        url: '/contact',
      },
      // {
      //   id: 4,
      //   name: 'Provider Groups',
      //   url: '/provider-groups',
      // },
    ],
  },
]

const MobileNavDrawer = memo((props) => {
  const { setDrawerToggle, loading } = props
  const [openCollapse, setOpenCollapse] = useState({
    settings: [
      { id: 1, open: false },
      { id: 2, open: false },
      { id: 3, open: false },
    ],
  })
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const session = supabase.auth.session()
  const user = supabase.auth.user()
  const classes = useStyles()
  const store = useStore()

  const openSnackBar = useContext(SnackBarContext)

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
    openSnackBar({
      message: `${user.email} has been logged out of the application`,
      snackSeverity: 'error',
    })
    clearStore(store)
    setDrawerToggle(false)
    router.push('/')
  }

  const handleOpenSettings = (id) => {
    setOpenCollapse((openCollapse) => ({
      ...openCollapse,
      settings: openCollapse.settings.map((item) =>
        item.id === id ? { ...item, open: !item.open } : item
      ),
    }))
  }

  return (
    <>
      <Box maxWidth="280px" width="280px">
        <Box p="1em" onClick={() => setDrawerToggle(false)}>
          <CloseOutlined />
        </Box>
        <Divider />
        {loading ? (
          <Box p="1em" display="flex" alignContent="center">
            <Skeleton
              variant="circle"
              width={25}
              height={25}
              style={{ marginRight: 10 }}
            />
            <Skeleton variant="text" width={150} height={25} />
          </Box>
        ) : (
          <Box p="1em" display="flex">
            <AccountCircleIcon style={{ marginRight: 10 }} />
            <Typography>
              {store?.firstName ?? ''} {store?.lastName ?? ''}
            </Typography>
          </Box>
        )}

        <Divider light />
        <Box>
          <List component="nav" className={classes.authLinks}>
            {MobileMenu.map((each) => (
              <Box key={`${each.id}`}>
                <ListItem button onClick={() => handleOpenSettings(each.id)}>
                  <ListItemText primary={each.headerMenu} />
                  {openCollapse.settings.find((item) => item.id === each.id)
                    .open ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )}
                </ListItem>
                <Collapse
                  in={
                    openCollapse.settings.find((item) => item.id === each.id)
                      .open
                  }
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {each.subMenu.map((subData) => (
                      <Link key={`${subData.id}`} href={`${subData.url}`}>
                        <a>
                          <ListItem key={subData.id} button>
                            <ListItemText
                              primary={subData.name}
                              style={{ marginLeft: '1.5em' }}
                            />
                          </ListItem>
                        </a>
                      </Link>
                    ))}
                  </List>
                </Collapse>
              </Box>
            ))}
            <ListItem>
              <Link href="/">
                <a>
                  <ListItemText primary="Covid 19 Information"></ListItemText>
                </a>
              </Link>
            </ListItem>
          </List>
        </Box>

        <Box p="1em">
          <Divider light />
          {isAuthenticated ? (
            <Button
              onClick={handleSignOut}
              variant="outlined"
              style={{ marginTop: '1.5em', width: '100%' }}
            >
              Logout
            </Button>
          ) : (
            <Button
              variant="outlined"
              style={{ marginTop: '1.5em', width: '100%' }}
              onClick={() => setDrawerToggle(false)}
            >
              <Link href="/login" underline="none">
                <a>Login</a>
              </Link>
            </Button>
          )}
        </Box>
      </Box>
    </>
  )
})
MobileNavDrawer.propTypes = {
  setDrawerToggle: PropTypes.func,
  loading: PropTypes.bool,
}
MobileNavDrawer.defaultProps = {
  setDrawerToggle: () => {},
  loading: false,
}

export default MobileNavDrawer

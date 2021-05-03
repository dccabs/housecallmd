import { useState, useEffect, Fragment } from 'react'
import { Box, List, ListItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
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
          <Link href="/login">
            <ListItem button>Login</ListItem>
          </Link>
          <Link href="/sign-up">
            <ListItem button>Sign Up</ListItem>
          </Link>
        </List>
      </Box>
    </Fragment>
  )
}

export default MobileNavDrawer

import React, { memo, useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  Typography,
  Box,
  Grow,
  Paper,
  MenuList,
  MenuItem,
  Popper,
  ClickAwayListener,
  makeStyles,
  Divider,
} from '@material-ui/core'
import Link from 'next/link'
import {
  AccountCircleRounded as AccountCircleIcon,
  Menu as MenuIcon,
  KeyboardArrowDown,
  KeyboardArrowUp,
  ExitToApp,
  LogoutIcon,
} from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  menuItemBox: {
    cursor: 'pointer',
    alignItems: 'center',
  },
}))

const PatientsMenu = memo((props) => {
  const { user, handleSignOut } = props
  const classes = useStyles()
  const anchorRefPatientsMenu = useRef(null)
  const [openPatientsMenu, setOpenPatientsMenu] = useState(false)

  const handleToggle = () => {
    setOpenPatientsMenu((prevOpen) => !prevOpen)
  }

  const signOut = () => {
    handleSignOut()
  }

  const handleClose = (event) => {
    if (
      anchorRefPatientsMenu.current &&
      anchorRefPatientsMenu.current.contains(event.target)
    ) {
      return
    }
    setOpenPatientsMenu(false)
  }

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpenPatientsMenu(false)
    } else if (event.key === 'Escape') {
      event.preventDefault()
      setOpenPatientsMenu(false)
    }
  }

  const prevOpen = useRef(openPatientsMenu)
  useEffect(() => {
    if (prevOpen.current === true && openPatientsMenu === false) {
      anchorRefPatientsMenu.current.focus()
    }

    prevOpen.current = openPatientsMenu
  }, [openPatientsMenu])
  return (
    <>
      <Box
        ref={anchorRefPatientsMenu}
        display="flex"
        id="patients-button"
        aria-controls={openPatientsMenu ? 'patients-menu' : undefined}
        aria-expanded={openPatientsMenu ? 'true' : undefined}
        aria-describedby="patients-menu"
        aria-haspopup="true"
        onClick={handleToggle}
        className={classes.menuItemBox}
      >
        <Typography variant="body1">Our Patients</Typography>
        {openPatientsMenu ? (
          <KeyboardArrowUp fontSize="small" />
        ) : (
          <KeyboardArrowDown fontSize="small" />
        )}
      </Box>
      <Popper
        open={openPatientsMenu}
        anchorEl={anchorRefPatientsMenu.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={openPatientsMenu}
                  id="patients-menu"
                  aria-labelledby="patients-button"
                  onKeyDown={handleListKeyDown}
                >
                  {user ? (
                    <MenuItem>
                      <Box display="flex" alignItems="center">
                        <ExitToApp
                          fontSize="small"
                          style={{ marginRight: 10 }}
                        />{' '}
                        <Typography
                          onClick={signOut}
                          style={{ cursor: 'pointer' }}
                        >
                          Logout
                        </Typography>
                      </Box>
                    </MenuItem>
                  ) : (
                    <MenuItem onClick={handleClose} disableRipple>
                      <Link href="/login" underline="hover">
                        <a>
                          <span style={{ marginRight: '1em' }}>Login</span>
                        </a>
                      </Link>
                      |
                      <Link href="/insurance" underline="hover">
                        <a>
                          <span style={{ marginLeft: '1em' }}>Signup</span>
                        </a>
                      </Link>
                    </MenuItem>
                  )}
                  <Divider />
                  <Link href="/how-it-works">
                    <a>
                      <MenuItem onClick={handleClose} disableRipple>
                        How it works
                      </MenuItem>
                    </a>
                  </Link>
                  <Link href="/services">
                    <a>
                      <MenuItem onClick={handleClose} disableRipple>
                        Services
                      </MenuItem>
                    </a>
                  </Link>
                  <Link href="/faq">
                    <a>
                      <MenuItem onClick={handleClose} disableRipple>
                        FAQ's
                      </MenuItem>
                    </a>
                  </Link>
                  <Link href="/">
                    <a>
                      <MenuItem onClick={handleClose} disableRipple>
                        <Typography noWrap>
                          Request Records &amp; Pay Bill
                        </Typography>
                      </MenuItem>
                    </a>
                  </Link>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
})

PatientsMenu.propTypes = {}

PatientsMenu.defaultProps = {}

export default PatientsMenu

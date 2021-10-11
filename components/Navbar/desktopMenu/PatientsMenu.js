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
} from '@material-ui/core'
import Link from 'next/link'
import {
  AccountCircleRounded as AccountCircleIcon,
  Menu as MenuIcon,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  menuItemBox: {
    cursor: 'pointer',
    alignItems: 'center',
  },
}))

const PatientsMenu = () => {
  const classes = useStyles()
  const anchorRefPatientsMenu = useRef(null)
  const [openPatientsMenu, setOpenPatientsMenu] = useState(false)

  const handleToggle = () => {
    setOpenPatientsMenu((prevOpen) => !prevOpen)
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
        {openPatientsMenu ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
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
                  <MenuItem onClick={handleClose} disableRipple>
                    <Link href="/login">
                      <a>
                        <span style={{ marginRight: '1em' }}>Login</span>
                      </a>
                    </Link>
                    |
                    <Link href="/insurance">
                      <a>
                        <span style={{ marginLeft: '1em' }}>Signup</span>
                      </a>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose} disableRipple>
                    <Link href="/how-it-works">
                      <a>How it works</a>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose} disableRipple>
                    <Link href="/services">
                      <a>Services</a>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose} disableRipple>
                    <Link href="/faq">
                      <a>FAQ's</a>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose} disableRipple>
                    <Typography noWrap>
                      <Link href="/services">
                        <a>Request Records &amp; Pay Bill</a>
                      </Link>
                    </Typography>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}

PatientsMenu.propTypes = {}

export default PatientsMenu

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

const PartnersMenu = () => {
  const classes = useStyles()
  const anchorRefPartnersMenu = useRef(null)
  const [openPartnersMenu, setOpenPartnersMenu] = useState(false)

  const handleToggle = () => {
    setOpenPartnersMenu((prevOpen) => !prevOpen)
  }
  const handleClose = (event) => {
    if (
      anchorRefPartnersMenu.current &&
      anchorRefPartnersMenu.current.contains(event.target)
    ) {
      return
    }
    setOpenPartnersMenu(false)
  }

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpenPartnersMenu(false)
    } else if (event.key === 'Escape') {
      event.preventDefault()
      setOpenPartnersMenu(false)
    }
  }

  const prevOpen = useRef(openPartnersMenu)
  useEffect(() => {
    if (prevOpen.current === true && openPartnersMenu === false) {
      anchorRefPartnersMenu.current.focus()
    }

    prevOpen.current = openPartnersMenu
  }, [openPartnersMenu])
  return (
    <>
      <Box
        ref={anchorRefPartnersMenu}
        display="flex"
        id="partners-button"
        aria-controls={openPartnersMenu ? 'partners-menu' : undefined}
        aria-expanded={openPartnersMenu ? 'true' : undefined}
        aria-describedby="partners-menu"
        aria-haspopup="true"
        onClick={handleToggle}
        className={classes.menuItemBox}
      >
        <Typography variant="body1">Our Partners</Typography>
        {openPartnersMenu ? (
          <KeyboardArrowUp fontSize="small" />
        ) : (
          <KeyboardArrowDown fontSize="small" />
        )}
      </Box>
      <Popper
        open={openPartnersMenu}
        anchorEl={anchorRefPartnersMenu.current}
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
                  autoFocusItem={openPartnersMenu}
                  id="partners-menu"
                  aria-labelledby="partners-button"
                  onKeyDown={handleListKeyDown}
                >
                  <Link href="/long-term-care-facilities">
                    <a>
                      <MenuItem onClick={handleClose} disableRipple>
                        Long-Term Care Facilities
                      </MenuItem>
                    </a>
                  </Link>
                  <Link href="/corporate-n95-fit-testing">
                    <a>
                      <MenuItem onClick={handleClose} disableRipple>
                        Corporate N95 Fit Testing
                      </MenuItem>
                    </a>
                  </Link>
                  <Link href="/facility-covid-testing">
                    <a>
                      <MenuItem onClick={handleClose} disableRipple>
                        Facility COVID Testing
                      </MenuItem>
                    </a>
                  </Link>
                  <Link href="/provider-groups">
                    <a>
                      <MenuItem onClick={handleClose} disableRipple>
                        <Typography noWrap>Provider Groups</Typography>
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
}

PartnersMenu.propTypes = {}

export default PartnersMenu

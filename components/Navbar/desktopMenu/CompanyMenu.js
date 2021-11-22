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

const CompanyMenu = () => {
  const classes = useStyles()
  const anchorRefCompanyMenu = useRef(null)
  const [openCompanyMenu, setOpenCompanyMenu] = useState(false)

  const handleToggle = () => {
    setOpenCompanyMenu((prevOpen) => !prevOpen)
  }
  const handleClose = (event) => {
    if (
      anchorRefCompanyMenu.current &&
      anchorRefCompanyMenu.current.contains(event.target)
    ) {
      return
    }
    setOpenCompanyMenu(false)
  }

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpenCompanyMenu(false)
    } else if (event.key === 'Escape') {
      event.preventDefault()
      setOpenCompanyMenu(false)
    }
  }

  const prevOpen = useRef(openCompanyMenu)
  useEffect(() => {
    if (prevOpen.current === true && openCompanyMenu === false) {
      anchorRefCompanyMenu.current.focus()
    }

    prevOpen.current = openCompanyMenu
  }, [openCompanyMenu])
  return (
    <>
      <Box
        ref={anchorRefCompanyMenu}
        display="flex"
        id="company-button"
        aria-controls={openCompanyMenu ? 'company-menu' : undefined}
        aria-expanded={openCompanyMenu ? 'true' : undefined}
        aria-describedby="company-menu"
        aria-haspopup="true"
        onClick={handleToggle}
        className={classes.menuItemBox}
      >
        <Typography variant="body1">Our Company</Typography>
        {openCompanyMenu ? (
          <KeyboardArrowUp fontSize="small" />
        ) : (
          <KeyboardArrowDown fontSize="small" />
        )}
      </Box>
      <Popper
        open={openCompanyMenu}
        anchorEl={anchorRefCompanyMenu.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        style={{
          zIndex: 1500,
        }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left-top' : 'left-bottom',
            }}
          >
            <Paper elevation={2}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={openCompanyMenu}
                  id="company-menu"
                  aria-labelledby="company-button"
                  onKeyDown={handleListKeyDown}
                >
                  {/*<Link href="/">*/}
                  {/*  <a>*/}
                  {/*    <MenuItem onClick={handleClose} disableRipple>*/}
                  {/*      In the Press*/}
                  {/*    </MenuItem>*/}
                  {/*  </a>*/}
                  {/*</Link>*/}
                  <Link href="/">
                    <a>
                      <MenuItem onClick={handleClose} disableRipple>
                        Blog
                      </MenuItem>
                    </a>
                  </Link>
                  <Link href="/contact">
                    <a>
                      <MenuItem onClick={handleClose} disableRipple>
                        Contact Us
                      </MenuItem>
                    </a>
                  </Link>
                  {/*<Link href="/provider-groups">*/}
                  {/*  <a>*/}
                  {/*    <MenuItem onClick={handleClose} disableRipple>*/}
                  {/*      <Typography noWrap>Provider Groups</Typography>*/}
                  {/*    </MenuItem>*/}
                  {/*  </a>*/}
                  {/*</Link>*/}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}

CompanyMenu.propTypes = {}

export default CompanyMenu

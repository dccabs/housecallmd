import React, { useState, createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'
import create from 'zustand'
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Divider,
  makeStyles,
} from '@material-ui/core'
import { Close } from '@material-ui/icons'

const modalContext = createContext()

const useStyles = makeStyles((theme) => ({
  title: {
    padding: '10px 20px',
  },
  content: {
    padding: '20px',
  },
}))

const CustomModal = ({
  component,
  footer,
  title,
  children,
  onClose,
  onSubmit,
  open,
}) => {
  const classes = useStyles()
  return (
    <Dialog open={Boolean(open)} maxWidth="sm" fullWidth>
      <DialogTitle className={classes.title}>{title}</DialogTitle>
      <Box position="absolute" top={0} right={0} onClick={onClose}>
        <IconButton>
          <Close />
        </IconButton>
      </Box>
      <Divider light />
      <DialogContent className={classes.content}>{component}</DialogContent>
      <Divider light />
      {footer && (
        <DialogActions className={classes.actions}>
          <Button color="primary" variant="contained" onClick={onClose}>
            Cancel
          </Button>
        </DialogActions>
      )}
    </Dialog>
  )
}

CustomModal.propTypes = {
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string,
}
CustomModal.defaultProps = {
  onClose: () => {},
  onSubmit: () => {},
  open: false,
  title: '',
}
export default CustomModal

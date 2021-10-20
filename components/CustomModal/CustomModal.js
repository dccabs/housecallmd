import React, { useState, createContext, memo, useContext } from 'react'
import PropTypes from 'prop-types'
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

const useStyles = makeStyles((theme) => ({
  header: {
    padding: '10px 20px 10px 10px',
    minHeight: '48px',
  },
  titleHeader: {
    padding: '0px',

    '& h2': {
      fontSize: '18px',
      fontWeight: 600,
    },
  },
  iconHeader: {
    marginRight: '10px',
    display: 'flex',
    alignItems: 'center',
  },
  content: {
    padding: '20px',
  },
}))

const CustomModal = memo((props) => {
  const {
    component,
    footer,
    title,
    // children,
    onClose,
    onSubmit,
    open,
    icon,
  } = props

  const classes = useStyles()
  return (
    <Dialog open={Boolean(open)} maxWidth="sm" fullWidth>
      <Box className={classes.header}>
        <Box ml="1em" display="flex" alignItems="center">
          {icon && <Box className={classes.iconHeader}>{icon} </Box>}
          {title && (
            <DialogTitle className={classes.titleHeader}>{title}</DialogTitle>
          )}
        </Box>
        <Box position="absolute" top={0} right={0} onClick={onClose}>
          <IconButton>
            <Close />
          </IconButton>
        </Box>
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
})

CustomModal.propTypes = {
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string,
  icon: PropTypes.object,
}
CustomModal.defaultProps = {
  onClose: () => {},
  onSubmit: () => {},
  open: false,
  title: '',
  icon: null,
}
export default CustomModal

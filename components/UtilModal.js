import { useState, useEffect, useContext } from 'react'
import {
  Paper,
  Modal,
  Zoom,
  Button,
  Box,
  Typography,
  Divider,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Close } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  modalContainer: {
    margin: '8em auto',
    outline: 'none',
    zIndex: 999,
    left: 0,
    maxWidth: 'calc(100vw - 50px)',
    minWidth: '720px',
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',

    color: '#62626e',
  },
  body: {
    maxHeight: '600px',
    overflow: 'scroll',
    position: 'relative',
  },
  root: {
    outline: 'none',
    outlineStyle: 'none',
  },
}))
const UtilModal = ({
  icon,
  open,
  onClose,
  component,
  width,
  height,
  title,
  top,
}) => {
  const classes = useStyles()

  let modalWidth = '0px'
  if (width === 'sm') {
    modalWidth = '780px'
  }
  if (width === 'md') {
    modalWidth = '900px'
  }
  if (width === 'lg') {
    modalWidth === '1200px'
  }
  if (width === 'xl') {
    modalWidth === '1400px'
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      className={`${classes.modalContainer}`}
      style={{
        marginTop: top ? top : '2%',
        width: width ? modalWidth : modalWidth,
      }}
    >
      <Zoom in={open} className={classes.modalContent}>
        <Paper elevation={3} className={classes.root}>
          <Box
            className="header"
            p="1em"
            display="flex"
            alignContent="center"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center">
              {icon && <Box pr="0.5em">{icon}</Box>}
              {title && (
                <Typography variant="body1" color="initial">
                  {title}
                </Typography>
              )}
            </Box>
            <Button title="close modal" onClick={onClose}>
              <Close color="primary" />
            </Button>
          </Box>
          <Divider light />
          <Box p="1.5em" className={classes.body}>
            {component}
          </Box>
          <Box className="footer" p="1em"></Box>
        </Paper>
      </Zoom>
    </Modal>
  )
}

export default UtilModal

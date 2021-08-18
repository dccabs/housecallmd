import { useState, useEffect, useContext } from 'react'
import { Paper, Modal, Zoom } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '8em auto',
    padding: '4em',
    maxWidth: '50rem',
    outline: 'none',
  },
}))

const UtilModal = ({ open, setOpen, component }) => {
  const classes = useStyles()

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      style={{ overflow: 'scroll' }}
    >
      <Zoom in={open}>
        <Paper elevation={3} className={classes.root}>
          {component}
        </Paper>
      </Zoom>
    </Modal>
  )
}

export default UtilModal

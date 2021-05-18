import { Box, Paper, Typography, Button, Modal } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '15em auto',
    padding: '4em',
    maxWidth: '50rem',
  },
  buttonLinks: {
    '@media screen and (max-width: 700px)': {
      '&:nth-child(2)': {
        order: -1,
      },
    },

    '& button': {
      height: '100%',
      padding: '1em',
      fontWeight: 600,
      width: '16rem',

      '&:hover': {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
}))

const ModalPrompt = ({ open, setOpen, handleSubmit }) => {
  const classes = useStyles()

  const confirm = () => {
    setOpen(false)
    handleSubmit()
  }

  return (
    <Modal open={open} onClose={() => setOpen(!open)}>
      <Paper elevation={3} className={classes.root}>
        <Typography variant="h4">Make Transaction</Typography>
        <Box mt="2em" display="flex" justifyContent="center" flexWrap="wrap">
          <Box m="1em" className={classes.buttonLinks}>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => setOpen(!open)}
            >
              Cancel
            </Button>
          </Box>
          <Box m="1em" className={classes.buttonLinks}>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              onClick={confirm}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Paper>
    </Modal>
  )
}

export default ModalPrompt

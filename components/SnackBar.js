import { createContext, useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  alert: {
    fontWeight: 'bold',
  }
}))

export const SnackBarContext  = createContext();

export default function CustomizedSnackbars(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const handleOpenSnackbar = (props) => {
    const { message, snackSeverity } = props;
    console.log('props', props)
    setMessage(message)
    setSeverity(snackSeverity)
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <div className={classes.root}>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          key={"top, center"}
        >
          <Alert onClose={handleClose} className={classes.alert} severity={severity}>
           {message}
          </Alert>
        </Snackbar>
      </div>
      <SnackBarContext.Provider
        value={handleOpenSnackbar}
      >
        {props.children}
      </SnackBarContext.Provider>
    </>
  );
}

import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '1em',

    [theme.breakpoints.up('sm')]: {
      padding: '3em 6em',
      margin: 'auto',
      maxWidth: 1200
    },
  },
}))

const Container = ({ children }) => {
  const classes = useStyles()

  return <Box className={classes.root}>{children}</Box>
}

export default Container

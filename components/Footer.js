import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    padding: '2em',

    '& a': {
      fontWeight: 600,
      textDecoration: 'none',
      color: '#fff',
      margin: '0 2rem',
    },
  },
}))

const Footer = () => {
  const classes = useStyles()

  return (
    <Box className={classes.root} display="flex" justifyContent="center">
      <Link href="/contact">
        <a>
          <Typography>Contact</Typography>
        </a>
      </Link>
      <Link href="/login">
        <a>
          <Typography>Login</Typography>
        </a>
      </Link>
      <Link href="/sign-up">
        <a>
          <Typography>Sign Up</Typography>
        </a>
      </Link>
    </Box>
  )
}

export default Footer

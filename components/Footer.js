import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    padding: '2em',
    width: '100%',

    '& a': {
      fontWeight: 600,
      textDecoration: 'none',
      color: '#fff',
      margin: '0 2rem',
    },

    '@media print': {
      display: 'none',
    },
  },
}))

const Footer = () => {
  const classes = useStyles()

  return (
    <Box className={classes.root} display="flex" justifyContent="center">
      <Link href="/services">
        <a>
          <Typography>Services</Typography>
        </a>
      </Link>
      <Link href="/contact">
        <a>
          <Typography>Contact</Typography>
        </a>
      </Link>
    </Box>
  )
}

export default Footer

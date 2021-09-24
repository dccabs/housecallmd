import { Card, CardMedia, CardContent, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '18rem',
    height: '25rem',
    overflow: 'auto',
    boxShadow: 'rgb(140, 152, 164, 0.25) 0px 3px 6px 0px',
    margin: '1em',

    [theme.breakpoints.up('sm')]: {
      margin: '2em 4em',
    },
  },
  media: {
    maxHeight: '10rem',
  },
}))

const AreasCard = ({ media, description }) => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} component="img" image={media} />
      <CardContent>
        <Typography align="center">{description}</Typography>
      </CardContent>
    </Card>
  )
}

export default AreasCard

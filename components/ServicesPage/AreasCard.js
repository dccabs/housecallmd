import { Card, CardMedia, CardContent, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '18rem',
    height: '25rem',
    overflow: 'auto',
    boxShadow: '10px 15px 15px 6px #e6e6e6',
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
  console.log(media)
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

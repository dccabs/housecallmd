import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '18rem',
    maxHeight: '25rem',
    overflow: 'auto',
    boxShadow: '10px 15px 15px 6px #e6e6e6',
    padding: '1em',
    margin: '1em',

    [theme.breakpoints.up('sm')]: {
      margin: '2em',
    },
  },
}))

const ServicesCard = ({ category, condition }) => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h4" align="left">
          {category}
        </Typography>
        <List>
          {condition.map((c, i) => {
            return (
              <ListItem key={i}>
                <ListItemText primary={c} />
              </ListItem>
            )
          })}
        </List>
      </CardContent>
    </Card>
  )
}

export default ServicesCard

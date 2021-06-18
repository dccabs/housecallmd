import { Box, Typography, Card, CardContent, Avatar } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: '20rem',
    minHeight: '25rem',
    height: '100%',
    marginBottom: '2em',
  },
  avatar: {
    width: '6rem',
    height: '6rem',
  },
}))

const Reviews = () => {
  const classes = useStyles()

  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="space-around"
      flexWrap="wrap"
    >
      <Card className={classes.card} variant="outlined">
        <CardContent>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box mb="1em">
              <Avatar className={classes.avatar} />
            </Box>
            <Box mb="1em">
              <Rating value={5} readOnly />
            </Box>
            <Box mb="1em">
              <Typography>
                <strong>Jimmy Smith</strong>
              </Typography>
            </Box>
            <Typography mb="1em" align="center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
              quibusdam vero alias accusamus tenetur eius, consectetur, odit
              nemo aut.
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Card className={classes.card} variant="outlined">
        <CardContent>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box mb="1em">
              <Avatar className={classes.avatar} />
            </Box>
            <Box mb="1em">
              <Rating value={5} readOnly />
            </Box>
            <Box mb="1em">
              <Typography>
                <strong>John Doe</strong>
              </Typography>
            </Box>
            <Typography mb="1em" align="center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
              quibusdam vero alias accusamus tenetur eius, consectetur, odit
              nemo aut dolore sapiente vel deleniti, cum eum perspiciatis nisi
              velit assumenda nobis.
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Card className={classes.card} variant="outlined">
        <CardContent>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box mb="1em">
              <Avatar className={classes.avatar} />
            </Box>
            <Box mb="1em">
              <Rating value={5} readOnly />
            </Box>
            <Box mb="1em">
              <Typography>
                <strong>Karen Myers</strong>
              </Typography>
            </Box>
            <Typography mb="1em" align="center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
              quibusdam vero alias accusamus tenetur eius, consectetur, odit
              nemo aut dolore sapiente vel deleniti.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Reviews

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
      paddingY="4em"
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
                <strong>Beverly H.</strong>
              </Typography>
            </Box>
            <Typography mb="1em" align="center">
              My mom has memory issues and also isn’t mobile. Taking time out of my day to take her to the clinic just doesn’t work. Housecall came and treated her and I could go about my day.
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
                <strong>Sandra B</strong>
              </Typography>
            </Box>
            <Typography mb="1em" align="center">
              I appreciate that they don’t make me feel rushed because there are a bunch of other people waiting in the waiting room. They get to spend the time with me so I get the proper diagnosis and treatment.
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
                <strong>Adam Y.</strong>
              </Typography>
            </Box>
            <Typography mb="1em" align="center">
              Housecall MD came to my home and gave me a breathing treatment and medicine for my bronchitis. It was nice not having to wait for hours in some urgent care waiting room.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Reviews

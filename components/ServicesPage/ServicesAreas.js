import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Container from '../Container'
import AreasCard from './AreasCard'

const useStyles = makeStyles((theme) => ({
  areas: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: '1280px',
  },
}))

const areas = [
  {
    media: '/media/seattle.png',
    description:
      'We primarily serve the Kitsap County including Bainbridge Island, Bremerton, Port Orchard, Poulsbo, Kingston, Silverdale, Keyport, Hansville, Seabeck, Port Gamble, Suquamish, Tracyton, Southworth, and Indianola.',
  },
  {
    media: '/media/tacoma.png',
    description:
      'Our team also caters to the needs of those in the northern part of Pierce County including Fircrest, Gig Harbor, Lakewood, Tacoma, University Place, and Edgewood.',
  },
  {
    media: '/media/pullman.png',
    description:
      'We also provide mobile urgent care to the residents of Pullman, Washington.',
  },
  {
    media: '/media/sequim.png',
    description:
      'Now, we extend our services to households in Port Angeles and Sequim in Clallam County.',
  },
  {
    media: '/media/bellevue.png',
    description:
      'Our range of service areas continue to expand, and now we are serving clients in Bellevue and Kirkland in King County.',
  },
]

const ServicesAreas = () => {
  const classes = useStyles()

  return (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box mb="2em">
          <Typography variant="h2">Services Areas Covered</Typography>
        </Box>
        <Box className={classes.areas}>
          {areas.map((a, i) => {
            return (
              <AreasCard key={i} media={a.media} description={a.description} />
            )
          })}
        </Box>
      </Box>
    </Container>
  )
}

export default ServicesAreas

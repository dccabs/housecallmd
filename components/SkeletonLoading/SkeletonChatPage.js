import React from 'react'
import {
  Grid,
  Container,
  Divider,
  Box,
} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

const SkeletonChatPage = () => {
  return (
    <Container component="main" maxWidth="md">
      <Box my="5em">
        <Skeleton animation="wave" variant="text" width="40%" height={50} />
        <Box my="1em" />
        <Grid container direction="row">
          <Grid item xs={12} sm={12} md={12}>
            <Grid>
              <Skeleton
                animation="wave"
                variant="rect"
                height={50}
                width={`100%`}
              />
              <Box my="1em" />
              <Skeleton
                animation="wave"
                variant="rect"
                height={50}
                width={`100%`}
              />
              <Box my="1em" />
              <Skeleton
                animation="wave"
                variant="rect"
                height={50}
                width={`100%`}
              />
              <Box my="1em" />
              <Skeleton
                animation="wave"
                variant="rect"
                height={50}
                width={`100%`}
              />
            </Grid>
            <Box my="2em">
              <Divider />
            </Box>
            <Grid item>
              <Box px={1}>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={10} sm={10} md={10}>
                    <Skeleton animation="wave" variant="rect" height={100} />
                  </Grid>
                  <Grid item xs={2} sm={2} md={2}>
                    <Box ml="1em">
                      <Skeleton animation="wave" variant="rect" height={50} />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default SkeletonChatPage

import React from 'react'
import {
  Grid,
  Container,
  Divider,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

const SkeletonChatPage = () => {
  return (
    <Container component="main" maxWidth="md">
      <Box my="5em">
        <Skeleton animation="wave" variant="text" width="40%" height={50} />
        <Box my="1em" />
        <Grid container direction="row">
          <Grid item xs={11} sm={5} md={3}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Skeleton
                    animation="wave"
                    variant="circle"
                    width={40}
                    height={40}
                  >
                    <Avatar />
                  </Skeleton>
                </ListItemIcon>
                <ListItemText>
                  <Skeleton animation="wave" height={20} />
                  <Skeleton animation="wave" width="80%" height={20} />
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Skeleton
                    animation="wave"
                    variant="circle"
                    width={40}
                    height={40}
                  />
                </ListItemIcon>
                <ListItemText>
                  <Skeleton animation="wave" height={20} />
                  <Skeleton animation="wave" width="80%" height={20} />
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Skeleton
                    animation="wave"
                    variant="circle"
                    width={40}
                    height={40}
                  />
                </ListItemIcon>
                <ListItemText>
                  <Skeleton animation="wave" height={20} />
                  <Skeleton animation="wave" width="80%" height={20} />
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Skeleton
                    animation="wave"
                    variant="circle"
                    width={40}
                    height={40}
                  />
                </ListItemIcon>
                <ListItemText>
                  <Skeleton animation="wave" height={20} />
                  <Skeleton animation="wave" width="80%" height={20} />
                </ListItemText>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={11} sm={7} md={9}>
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
                  <Grid item xs={10}>
                    <Skeleton animation="wave" variant="rect" height={100} />
                  </Grid>
                  <Grid item xs={2}>
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

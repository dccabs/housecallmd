import React, { memo } from 'react'
import PropTypes from 'prop-types'
import MessageItem from '../../components/MessageItem'
import {
  Typography,
  Box,
  Button,
  TextField,
  makeStyles,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Avatar,
  ListItemIcon,
} from '@material-ui/core'
import { Send, ChatBubbleOutlineTwoTone } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  wrapIcon: {
    marginTop: '3rem',
    alignItems: 'center',
    display: 'inline-flex',
  },
  textField: {
    width: '100%',
    borderWidth: 0,
    borderColor: 'transparent',
  },
  textFieldContainer: {
    flex: 1,
    marginRight: 12,
  },
  gridItem: {
    paddingTop: 12,
    paddingBottom: 12,
  },
  gridItemChatList: {
    overflow: 'auto',
    height: '50vh',
  },
  gridItemMessage: {
    marginTop: 12,
    marginBottom: 12,
  },
  sendButton: {
    backgroundColor: '#3f51b5',
  },
  sendIcon: {
    color: '#fff',
  },
  mainGrid: { paddingTop: '3em', borderWidth: 1 },
  h4: {
    marginTop: 0,
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0'
  },
}))

const dataMessages = [
  {
    message: {
      from: 'lourdes@yucaba.com',
      text: 'hello',
      date: '09/1/2021-3:00PM',
    },
    email: 'lourdes@yucaba.com',
  },
  {
    message: {
      date: '09/1/2021-3:01PM',
      text: 'hi',
      from: 'valerie@yucaba.com',
    },
    email: 'valerie@yucaba.com',
  },
  {
    message: {
      from: 'lourdes@yucaba.com',
      text: 'this is a sample text',
      date: '09/1/2021-3:05PM',
    },
    email: 'lourdes@yucaba.com',
  },
]

const SmsHistory = () => {
  const classes = useStyles()
  return (
    <Container component="main" maxWidth="md">
      <Typography
        mt="2rem"
        variant="h4"
        align="left"
        className={classes.wrapIcon}
      >
        <ChatBubbleOutlineTwoTone color="secondary" />
        SMS History
      </Typography>
      <Grid container direction="row" className={classes.mainGrid}>
        <Grid item xs={3} spacing={0} className={classes.borderRight500}>
          <List dense={true}>
            <ListItem button key="RemySharp">
              <ListItemIcon>
                <Avatar>C</Avatar>
              </ListItemIcon>
              <ListItemText primary="Lourdes">Lourdes</ListItemText>
            </ListItem>
            <ListItem button key="A">
              <ListItemIcon>
                <Avatar>A</Avatar>
              </ListItemIcon>
              <ListItemText primary="Valerie">Valerie</ListItemText>
            </ListItem>
            <ListItem button key="B">
              <ListItemIcon>
                <Avatar>B</Avatar>
              </ListItemIcon>
              <ListItemText primary="Janna">Janna</ListItemText>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={9} spacing={0} className={classes.gridItemChatList}>
          <List dense={true}>
            {dataMessages &&
              dataMessages.map((dataMessage) => (
                <MessageItem
                  key={dataMessage.index}
                  message={dataMessage.message}
                  email={dataMessage.email}
                />
              ))}
          </List>
          <Divider />
          <Grid item className={classes.gridItemMessage}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={11} className={classes.textFieldContainer}>
                <TextField
                  required
                  className={classes.textField}
                  placeholder="Enter message"
                  variant="outlined"
                  // multiline
                  rows={2}
                  // value={text}
                />
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  className={classes.sendButton}
                  // onClick={}
                >
                  <Send className={classes.sendIcon} />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

SmsHistory.propTypes = {}
SmsHistory.defaultProps = {}

export default SmsHistory

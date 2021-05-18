import { useState } from 'react'
import { Typography, Box, Button, TextField } from '@material-ui/core'
import Container from '../components/Container'

const sms = () => {
  const [number, setNumber] = useState('')
  const [body, setBody] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/sendMessage', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to: number, body: body }),
      })

      const data = await res.json()

      if (data.success) {
        setNumber('')
        setBody('')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Box>
      <Container>
        <Box mb="1em">
          <Typography variant="h4" align="left">
            Send SMS
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <Box mb="1em" maxWidth="30%">
            <Typography>To: </Typography>
            <TextField
              variant="outlined"
              value={number}
              onChange={(e) =>
                setNumber(e.target.value.replace(/[\[\]'() ]+/g, ''))
              }
              fullWidth
            />
          </Box>

          <Box mb="1em" maxWidth="30%">
            <Typography>Message: </Typography>
            <TextField
              multiline
              rows={6}
              variant="outlined"
              onChange={(e) => setBody(e.target.value)}
              fullWidth
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            value={body}
            color="secondary"
          >
            Send
          </Button>
        </form>
      </Container>
    </Box>
  )
}

export default sms

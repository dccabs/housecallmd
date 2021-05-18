import { Box, Button } from '@material-ui/core'
import Container from '../components/Container'

const MailTest = () => {

  const sendMailTest = () => {
    console.log('send Mail Test')
    const data = JSON.stringify({
      name_: 'Bob smit',
      email: 'dccabs@gmail.com',
      client_message: 'hello world',
      subject: 'sample message',
    });

    fetch(`/api/sendMail`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Content-Length": data.length,
      },
      body: data,
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log('data', data)
      })
      .catch(error => {
        console.log('error', error)
      });
  }

  return (
    <Container>
      <Box p="1em">
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          size="large"
          onClick={sendMailTest}
        >
          Submit
        </Button>
      </Box>
    </Container>
  )
}

export default MailTest

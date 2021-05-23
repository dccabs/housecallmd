require('dotenv').config()
const client = require('twilio')(
  process.env.NEXT_PUBLIC_TWILIO_SID,
  process.env.NEXT_PUBLIC_AUTH_TOKEN
)

export default (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')

  client.messages
    .create({
      from: process.env.NEXT_PUBLIC_PHONE_NUMBER,
      to: req.body.to,
      body: req.body.body,
    })
    .then(() => {
      res.send(JSON.stringify({ success: true }))
    })
    .catch((err) => {
      console.log(err)
      res.send(JSON.stringify({ success: false }))
    })
}

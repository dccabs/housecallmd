require('dotenv').config()
const MessagingResponse = require('twilio').twiml.MessagingResponse;

// const client = require('twilio')(
//   process.env.NEXT_PUBLIC_TWILIO_SID,
//   process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN
// )


export default (req, res) => {

  const twiml = new MessagingResponse();
  twiml.message("This inbox is not monitored. Please contact HouseCallMD at https://www.housecallmd.org/contact or call (833) 432-5633. If this an emergency please call 911.");


  res.statusCode = 200
  res.setHeader('Content-Type', 'application/xml')

  return res.end(twiml.toString());
}
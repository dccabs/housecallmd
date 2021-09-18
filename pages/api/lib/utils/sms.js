require('dotenv').config()

const smsClient = require('twilio')(
    process.env.NEXT_PUBLIC_TWILIO_SID,
    process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN
)


export default smsClient;


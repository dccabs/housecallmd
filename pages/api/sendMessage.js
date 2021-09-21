import { supabase } from '../../utils/initSupabase'
import moment from 'moment';

require('dotenv').config()
const client = require('twilio')(
  process.env.NEXT_PUBLIC_TWILIO_SID,
  process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN
)

export default async (req, res) => {
  try {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')

    if (req.body.isFromSmsHistory) {
      const logMessage = {
        message: req.body.body,
        from_phone_number: process.env.NEXT_PUBLIC_PHONE_NUMBER,
        is_admin: true
      }
      const { data, error, status } = await supabase.from('sms_log_message').insert([{
        ...logMessage,
      }], { returning: 'minimal' })

      if (error) {
        console.log(error);
        res.status(400).send('Error');
      }
    }

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


  } catch (error) {
    console.log(error);
  }
  
}

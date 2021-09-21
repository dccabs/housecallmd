require('dotenv').config()
const MessagingResponse = require('twilio').twiml.MessagingResponse;
import { supabase } from '../../utils/initSupabase'
import moment from 'moment';

// const client = require('twilio')(
//   process.env.NEXT_PUBLIC_TWILIO_SID,
//   process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN
// )


const smsResponder = async (req, res) => {
  
  try {
    const { From, Body } = req.body;
    const logMessage = {
      message: Body,
      from_phone_number: From,
    }
    
    const lastTwoDays = moment().subtract(2, 'days').format('YYYY-MM-DD');
    const twiml = new MessagingResponse();
    
    let message = '';
    let statusCode = 400;

    let appointments = await supabase
      .from('UserList')
      .select(`*,
      appointments (*)`)
      .eq('phone', From)
      .eq('appointments.completed', true)
      .gte("appointments.completed_date", lastTwoDays)

    
    if (appointments && (appointments.data === null || appointments.data.length === 0)) {
      message = 'Something went wrong. This inbox is not monitored. Please contact HouseCallMD at https://www.housecallmd.org/contact';
    } else {
      if (appointments.data[0].appointments.length === 0) {
        message = 'Something went wrong. This inbox is not monitored. Please contact HouseCallMD at https://www.housecallmd.org/contact';
      } else {
        const { data, error, status } = await supabase.from('sms_log_message').insert([{ ...logMessage, user_id: appointments.data[0].id }], { returning: 'minimal' })
        if (error) {
          console.log('error saving in the table', error);
        }
        statusCode = status;
      }
    }
    
    twiml.message(message);
    
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/xml')

  
    res.end(twiml.toString());

  } catch (e) {
    console.log('error', e);
  }

}

// twilio phone-numbers:update "+12525125702" --sms-url="http://localhost:3001/api/smsResponder"

export default smsResponder;
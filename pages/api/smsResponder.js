require('dotenv').config()
import smsClient from './lib/utils/sms';
import { supabase } from '../../utils/initSupabase'
import config from '../../utils/config';
import moment from 'moment';
import pusher from '../../utils/pusher';
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const smsResponder = async (req, res) => {
  try {
    const { From, Body } = req.body;
    const logMessage = {
      message: Body,
      from_phone_number: From,
      to_phone_number: process.env.NEXT_PUBLIC_PHONE_NUMBER
    }
    
    // const lastTwoDays = moment().subtract(2, 'days').format('YYYY-MM-DD');
    const twiml = new MessagingResponse();

    
    let message = '';
    let statusCode = 400;
    
    let appointments = await supabase
    .from('UserList')
    .select(`*,
    appointments (*)`)
    .eq('phone', From)
    // .eq('appointments.completed', true)
    // .gte("appointments.completed_date", lastTwoDays)

    if (appointments && (appointments.data === null || appointments.data.length === 0)) {
      message = 'This inbox is not monitored. Please contact HouseCallMD at https://www.housecallmd.org/contact';
    } else {
      if (appointments.data[0].appointments.length === 0) {
        message = 'This inbox is not monitored. Please contact HouseCallMD at https://www.housecallmd.org/contact';
      } else {

        
        const userId = appointments.data[0].id;
        const senderName = `${appointments.data[0].firstName} ${appointments.data[0].lastName}`;
        const smsHistoryPath = `${config.default.host}smsHistory/${userId}`;

        const response = await pusher.trigger("chat", "chat-event", {
          body: Body,
          sender: From,
          isOwnMessage: false,
          isReply: true,
          name: senderName,
          user_id: userId,
        });
        
        const { data, error, status } = await supabase.from('sms_log_message').insert([{ ...logMessage, user_id: appointments.data[0].id }], { returning: 'minimal' })
        
        const adminPhones = await supabase.from('adminPhones').select(`*`).eq('isActive', true);

        if (adminPhones && adminPhones.data && adminPhones.data.length > 0) {
          const adminMsg = `User ${senderName} has sent following message to HouseCallMD: 
          "${Body}"
          To reply to this message or see the full message history, click here. ${smsHistoryPath}`

          const sendAdminMsg = adminPhones.data.map(user => {
            return smsClient.messages.create({
              body: adminMsg,
              from: process.env.NEXT_PUBLIC_PHONE_NUMBER,
              to: user.phoneNumber,
            }).then((message) => {
              return message;
            }).catch((err) => {
              return err;
            })
          });

          
          const resultSendAdmin = await Promise.all(sendAdminMsg);
        }
        
        if (error) {
          console.log('error saving in the table', error);
          message = 'This inbox is not monitored. Please contact HouseCallMD at https://www.housecallmd.org/contact';
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

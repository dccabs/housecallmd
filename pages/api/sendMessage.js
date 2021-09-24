import { supabase } from '../../utils/initSupabase'
import moment from 'moment';
import pusher from '../../utils/pusher';

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
        to_phone_number: req.body.to,
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

    const { body } = req.body;
    
    const payload = { body: body, sender: process.env.NEXT_PUBLIC_PHONE_NUMBER };

    const clientMsg = await client.messages
    .create({
      from: process.env.NEXT_PUBLIC_PHONE_NUMBER,
      to: req.body.to,
      body: req.body.body,
    })
      
    if (clientMsg) {
        const response = await pusher.trigger("chat", "chat-event", {
          body,
          sender: process.env.NEXT_PUBLIC_PHONE_NUMBER,
        });
      
        const smsHistoryPath = `${process.env.HOST}/smsHistory/${req.body.user.userId}`;
        const adminPhones = await supabase.from('adminPhones').select(`*`).eq('isActive', true);
        
        if (adminPhones && adminPhones.data && adminPhones.data.length > 0) {
            const userWhoOwnsTheSMS = await supabase
            .from('UserList')
            .select(`*`)
            .eq('id', req.body.user.userId)

            const userAdmin = await supabase
            .from('UserList')
            .select(`*`)
            .eq('email', req.body.user.email)
            
            const adminMsg = `${userAdmin.data[0].firstName} ${userAdmin.data[0].lastName} sent a message to 
            ${userWhoOwnsTheSMS.data[0].firstName} ${userWhoOwnsTheSMS.data[0].lastName}:
            ${req.body.body}
            To see the full message history or reply, click here ${smsHistoryPath}`;

            const sendAdminMsg = adminPhones.data.map(user => {
              return client.messages.create({
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

        res.send(JSON.stringify({success: true, payload}))
    } else {
      console.log(clientMsg);
      res.send(JSON.stringify({ success: false }))
    }

    


  } catch (error) {
    console.log(error);
  }
  
}

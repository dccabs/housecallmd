import moment from 'moment';
import { supabase } from '../../../../utils/initSupabase';
import pusher from '../../../../utils/pusher';

require('dotenv').config()
const client = require('twilio')(
  process.env.NEXT_PUBLIC_TWILIO_SID,
  process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN
)

const sendMessage = async (req) => {
    let fnc;
    const caseSend = req.body && req.body.user !== undefined ? 'ChatSms' : 'SendSms';
    
    switch (caseSend) {
        case 'ChatSms':
            fnc = chatSms(req);
            break;
        case 'SendSms':
            fnc = sendSms(req);
            break;
        default:
            fnc = sendSms(req);
            break;
    }

    return fnc;
}

const chatSms = async (req) => {
    const userAdmin = await supabase
    .from('UserList')
    .select(`*`)
    .eq('email', req.body.user.email)

    if (req.body.isFromSmsHistory) {
      const logMessage = {
        message: req.body.body,
        from_phone_number: process.env.NEXT_PUBLIC_PHONE_NUMBER,
        to_phone_number: req.body.to,
        is_admin: true,
        user_id: userAdmin.data[0].id,
      }
      const { data, error, status } = await supabase.from('sms_log_message').insert([{
        ...logMessage,
      }], { returning: 'minimal' })

      if (error) {
          console.log(error);
          return {
              success: false,
              error: `Error: ${error}`
            }
      }
    }

    const { body } = req.body;
    
    
    const clientMsg = await client.messages
    .create({
      from: process.env.NEXT_PUBLIC_PHONE_NUMBER,
      to: req.body.to,
      body: `HouseCallMD has sent you a message: ${req.body.body}`,
    })
    
    if (clientMsg) {
      const smsHistoryPath = `${process.env.NEXT_PUBLIC_HOST}/smsHistory/${req.body.user.smsUserId}`;
      const adminPhones = await supabase.from('adminPhones').select(`*`).eq('isActive', true);
      
      if (adminPhones && adminPhones.data && adminPhones.data.length > 0) {
        const userWhoOwnsTheSMS = await supabase
        .from('UserList')
        .select(`*`)
        .eq('id', req.body.user.smsUserId)
        
        const adminMsg = `Housecall Admin ${userAdmin.data[0].firstName} ${userAdmin.data[0].lastName} sent a message to 
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
      
      // const response = await pusher.trigger("chat", "chat-event", {
        //   body,
        //   sender: process.env.NEXT_PUBLIC_PHONE_NUMBER,
        //   user_id: req.body.user.id
        // });
        
        const payload = {
            body,
            sender: process.env.NEXT_PUBLIC_PHONE_NUMBER,
            user_id: req.body.user.id,
            adminName: `${userAdmin.data[0].firstName} ${userAdmin.data[0].lastName}`
        };

        return { success: true, payload };
    } else {
      console.log('else', clientMsg);
      return { success: false };
    }
}

const sendSms = async (req) => {
    const clientMsg = await client.messages
        .create({
        from: process.env.NEXT_PUBLIC_PHONE_NUMBER,
        to: req.body.to,
        body: req.body.body,
        })
    
    if (clientMsg) {
        return { success: true };
    }

    return { success: false };
        
}

export default sendMessage;

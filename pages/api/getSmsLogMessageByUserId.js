import { supabase } from '../../utils/initSupabase'
require('dotenv').config();

const getSmsLogMessageByUserId = async (req, res) => {
  try {
    const { smsUserId, authEmail, authUserId } = req.body

    if (!smsUserId || smsUserId === 'undefined') {
      throw Error('User Id not found')
    }
  
    let messages = [];
  
    /**
     * Get id the current login user base with the authEmail 
     * Get the id of the current login because we should base the fetching of message with the login user
     * Display as the sent message of the login user (blue bubble)
     * */ 
    let authUser = await supabase.from('UserList').select('*').eq('email', authEmail);
    authUser = !authUser.error ? authUser.data[0] : [];

    /** 
     * Get the phone number of the userId in the url parameter which was passed as the smsUserId in request body
     * Display as the reply message (white bubble)
     * */  
    let patient = await supabase.from('UserList').select('*').eq('id', smsUserId);
    patient = !patient.error ? patient.data[0] : [];

    // Get the authUser messages in sms_log_messages base by user_id and to_phone_number = patient's phone
    let authUserMessages = await supabase.from('sms_log_message').select('*').eq('user_id', authUser.id).eq('to_phone_number', patient.phone);
    authUserMessages = authUserMessages.data.map((msg) => ({ ...msg, name: `${authUser.firstName} ${authUser.lastName}` }));

    /**
     * Get the patient's messages in sms_log_messages base by its phone number and to_phone_number = twilio's phone number
     * */
    let patientMessages = await supabase.from('sms_log_message').select('*').eq('from_phone_number', patient.phone).eq('to_phone_number', process.env.NEXT_PUBLIC_PHONE_NUMBER);
    patientMessages = patientMessages.data.length > 0 ? patientMessages.data.map((msg) => ({ ...msg, name: `${patient.firstName} ${patient.lastName}` })) : [];

    // Merge the authUserMessages and patientMessages with sorting by created_at
    messages = [...authUserMessages, ...patientMessages].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

    /**
     * Map the messages and assign key isOwnMessage to designate which color of the bubble would the message be. 
     * */
    messages = messages.map((d) => {
      if (d.from_phone_number === process.env.NEXT_PUBLIC_PHONE_NUMBER && d.user_id === parseFloat(authUser.id)) {
        d.isOwnMessage = true;
        d.name = "Me";
      }
      delete d.UserList;
      return {...d}
    })
  
    return res.status(200).json(messages)
  } catch (e) {
    return res.status(401).json({ error: e })
  }
 
}

export default getSmsLogMessageByUserId

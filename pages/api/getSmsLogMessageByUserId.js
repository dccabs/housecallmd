import { supabase } from '../../utils/initSupabase'
require('dotenv').config();

const getSmsLogMessageByUserId = async (req, res) => {
  const { smsUserId, authEmail, authUserId } = req.body

  if (!smsUserId || smsUserId === 'undefined') {
    throw Error('User Id not found')
  }

  let auth = [];
  let messages = [];
  let messagesToUser = [];
  let messagesFromUser = [];
  let viewerId;
  let smsMessages = [];

  // let { data: smsMessages, error } = await supabase
  //   .from('sms_log_message')
  //   .select(`*, UserList(*)`)
  //   .eq('user_id', smsUserId)
  //   .order('created_at', true)
  //
  // smsMessages = smsMessages.map((d) => ({ ...d, name: `${d.UserList.firstName} ${d.UserList.lastName}` }))

  //if (smsMessages.length > 0) {
    let { data: user, error } = await supabase
      .from('UserList')
      .select('*')
      .eq('id', smsUserId)

    messagesToUser = await supabase
      .from('sms_log_message')
      .select(`*, UserList(*)`)
      .eq('to_phone_number', user[0].phone)

    messagesToUser = messagesToUser.data.map((d) => ({ ...d, name: `${d.UserList.firstName} ${d.UserList.lastName}` }))

    messagesFromUser = await supabase
      .from('sms_log_message')
      .select(`*, UserList(*)`)
      .eq('from_phone_number', user[0].phone)

    messagesFromUser = messagesFromUser.data.map((d) => ({ ...d, name: `${d.UserList.firstName} ${d.UserList.lastName}` }))

    viewerId = await supabase
      .from('UserList')
      .select(`*`)
      .eq('email', authEmail)
  //}

  messages = [...messagesToUser, ...messagesFromUser].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  messages = messages.map((d) => {
    if (d.from_phone_number === process.env.NEXT_PUBLIC_PHONE_NUMBER && d.user_id === parseFloat(viewerId.data[0].id)) {
      d.isOwnMessage = true;
      d.name = "Me";
    }
    delete d.UserList;
    return {...d}
  })

  if (error || auth.error) return res.status(401).json({ error: error.message })

  return res.status(200).json(messages)
}

export default getSmsLogMessageByUserId

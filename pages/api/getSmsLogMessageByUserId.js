import { UserList } from 'twilio/lib/rest/conversations/v1/user'
import { supabase } from '../../utils/initSupabase'

const getSmsLogMessageByUserId = async (req, res) => {
  const token = req.headers.token
  const { smsUserId, authEmail } = req.body

  if (!smsUserId || smsUserId === 'undefined') {
    throw Error('User Id not found')
  }

  let auth = [];
  let authMessage = [];
  let messages = [];
  
  let { data: smsMessages, error } = await supabase
    .from('sms_log_message')
    .select(`*, UserList(*)`)
    .eq('user_id', smsUserId)
    .order('created_at', true)
  
  smsMessages = smsMessages.map((d) => ({ ...d, name: `${d.UserList.firstName} ${d.UserList.lastName}` }))

  if (smsMessages.length > 0) {
    auth = await supabase
      .from('UserList')
      .select(`*, sms_log_message (*)`)
      .eq('email', authEmail)
      .eq('sms_log_message.to_phone_number', smsMessages[0].from_phone_number)
  }
  
  if (auth.data && auth.data.length > 0) {
     authMessage = auth.data[0].sms_log_message.map((d) => ({ ...d, isOwnMessage: true, name: `${auth.data[0].firstName} ${auth.data[0].lastName}` }));
     messages = [...smsMessages, ...authMessage].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
     messages = messages.map((d) => {
      delete d.UserList;
      return {...d}
     })

  }

  if (error || auth.error) return res.status(401).json({ error: error.message })

  return res.status(200).json(messages)
}

export default getSmsLogMessageByUserId

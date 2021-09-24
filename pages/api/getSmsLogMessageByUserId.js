import { supabase } from '../../utils/initSupabase'

const getSmsLogMessageByUserId = async (req, res) => {
  const token = req.headers.token
  const { userId, authEmail } = req.body

  if (!userId || userId === 'undefined') {
    throw Error('User Id not found')
  }

  let auth = [];
  
  let { data: users, error } = await supabase
    .from('sms_log_message')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', true)
  

  if (users.length > 0) {
    auth = await supabase
      .from('UserList')
      .select(`*, sms_log_message (*)`)
      .eq('email', authEmail)
      .eq('sms_log_message.to_phone_number', users[0].from_phone_number)
  } 

  const authMessage = auth.data[0].sms_log_message.map((d) => ({ ...d, isOwnMessage: true }));

  const messages = [...users, ...authMessage].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

  if (error || auth.error) return res.status(401).json({ error: error.message })
  return res.status(200).json(messages)
}

export default getSmsLogMessageByUserId

import { supabase } from '../../utils/initSupabase'

const getSmsLogMessageByUserId = async (req, res) => {
  const token = req.headers.token
  const { userId } = req.body

  if (!userId || userId === 'undefined') {
    throw Error('User Id not found')
  }

  let { data: users, error } = await supabase
    .from('sms_log_message')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', true)

  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json(users)
}

export default getSmsLogMessageByUserId

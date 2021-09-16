import { supabase } from '../../utils/initSupabase'

const getSmsLogMessageByUserId = async (req, res) => {
  const body = req.body
  if (body.user.role !== 'authenticated') {
    throw Error('not authorized')
  }

  let { data, error } = await supabase
    .from('sms_log_message')
    .select('*')
    .eq('id', userId)
    
  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json(data)
}


export default getSmsLogMessageByUserId
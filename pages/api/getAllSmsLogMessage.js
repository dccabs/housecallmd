import { supabase } from '../../utils/initSupabase'

const getAllSmsLogMessage = async (req, res) => {
  const body = req.body
  if (body.user.role !== 'authenticated') {
    throw Error('not authorized')
  }

  let { data: SmsLogMessage, error} = await supabase
  .from('sms_log_message')
  .select('*')

  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json(SmsLogMessage)
}

export default getAllSmsLogMessage

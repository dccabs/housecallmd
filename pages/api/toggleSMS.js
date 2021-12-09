import { supabase } from '../../utils/initSupabase'

const toggleSMS = async (req, res) => {
  const payload = req.body
  const { sms_enabled, id } = payload;

  if (!payload || payload === 'undefined') {
    throw Error('null data value')
  }

  const { data, error } = await supabase
    .from('UserList')
    .update({
      sms_enabled,
    })
    .eq('id', id)

  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json({ success: true, data })
}

export default toggleSMS

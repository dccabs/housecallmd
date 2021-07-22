import { supabase } from '../../utils/initSupabase'

const updateUser = async (req, res) => {
  const updatedUser = req.body

  if (!updatedUser || updatedUser === 'undefined') {
    throw Error('null data value')
  }

  const { data, error } = await supabase
    .from('UserList')
    .update(updatedUser)
    .eq('email', updatedUser.email)

  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json({ success: true, data })
}

export default updateUser

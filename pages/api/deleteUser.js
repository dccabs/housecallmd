import { supabase } from '../../utils/initSupabase'

const deleteUser = async (req, res) => {
  const { updatedUser } = req.body

  const { data, error } = await supabase
    .from('UserList')
    .delete()
    .match({ email: updatedUser.email })

  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json(data)
}

export default deleteUser

import { supabase } from '../../utils/initSupabase'

// Example of how to verify and get user data server-side.
const deleteUser = async (req, res) => {
  const { email } = req.body;

  const { data, error } = await supabase
    .from('UserList')
    .delete()
    .match({email,})
  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json(data)
}

export default deleteUser

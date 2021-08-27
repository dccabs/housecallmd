import { supabase } from '../../utils/initSupabase'

// Example of how to verify and get user data server-side.
const getAllUsers = async (req, res) => {
  const token = req.headers.token
  const { email } = req.body

  if (!email || email === 'undefined') {
    throw Error('null data value')
  }

  let { data: users, error } = await supabase
    .from('UserList')
    .select('*')
    .eq('email', email)

  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json(users[0])
}

export default getAllUsers

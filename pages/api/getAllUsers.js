import { supabase } from '../../utils/initSupabase'

// Example of how to verify and get user data server-side.
const getAllUsers = async (req, res) => {
  const body = req.body

  if (body.user.role !== 'authenticated') {
    throw Error('not authorized')
  }

  let { data: users, error } = await supabase
    .from('UserList')
    .select('*')
    .order('email', true)

  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json(users)
}

export default getAllUsers

import { supabase } from '../../utils/initSupabase'

// Example of how to verify and get user data server-side.
const getAllUsers = async (req, res) => {
  const session = supabase.auth.session()
  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json(users)
}

export default getAllUsers

import { supabase } from '../../utils/initSupabase'

// Example of how to verify and get user data server-side.
const resetPassword = async (req, res) => {
  const token = req.headers.token

  const { data, error } = supabase.auth.api.resetPasswordForEmail('dccabs@gmail.com')

  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json(data)
}

export default resetPassword

import { supabase } from '../../utils/initSupabase'

// Example of how to verify and get user data server-side.
const requestNewPassword = async (req, res) => {
  const email = req.body.email

  const { data, error } = await supabase.auth.api.resetPasswordForEmail(email)

  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json(data)
}

export default requestNewPassword

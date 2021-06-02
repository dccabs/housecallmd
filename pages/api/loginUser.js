import { supabase } from '../../utils/initSupabase'

// Example of how to verify and get user data server-side.
const loginUser = async (req, res) => {
  console.log('req', req.body)
  const { email, password } = req.body;
  const { user, session, error } = await supabase.auth.signIn({
    email,
    password,
  })
  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json(session)
}

export default loginUser

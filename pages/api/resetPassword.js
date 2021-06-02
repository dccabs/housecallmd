import { supabase } from '../../utils/initSupabase'

// Example of how to verify and get user data server-side.
const resetPassword = async (req, res) => {
  console.log('req', req.body)
  const access_token = req.headers.token
  const password = req.body.password
  //
  const { error, data } = await supabase.auth.api
    .updateUser(access_token, { password : password })
  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json(data)
}

export default resetPassword

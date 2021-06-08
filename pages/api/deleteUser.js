import { supabase } from '../../utils/initSupabase'

// Example of how to verify and get user data server-side.
const addMeeting = async (req, res) => {
  const access_token = req.headers.token;
  const { email } = req.body;
  //

  const { data, error } = await supabase
    .from('UserList')
    .delete()
    .eq('email', email)
  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json(data)
}

export default addMeeting

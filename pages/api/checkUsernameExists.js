import { supabase } from 'utils/initSupabase'

const checkUsernameExists = async (req, res) => {
  const { username } = req.body

  if (!username || username === '') {
    throw Error('null data value')
  }

  const { data, error } = await supabase
    .from('facilities')
    .select('*')
    .eq('user_name', username)
  console.log(data)
  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json(data)
}

export default checkUsernameExists

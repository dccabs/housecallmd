import { supabase } from '../../utils/initSupabase'

// Example of how to verify and get user data server-side.
const getFacilities = async (req, res) => {
  const { user } = req.body
  const { id } = user

  if (user.role !== 'authenticated') {
    throw Error('not authorized')
  }

  let { data: facilities, error } = await supabase
    .from('facilities')
    .select('*')
    .eq('auth_id', id)

  if (error) {
    console.error(error.message)
    return res.status(401).json({ error: error.message })
  }
  return res.status(200).json(facilities)
}

export default getFacilities

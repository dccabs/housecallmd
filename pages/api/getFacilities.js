import { supabase } from '../../utils/initSupabase'

// Example of how to verify and get user data server-side.
const getFacilities = async (req, res) => {
  const { user } = req.body

  if (user.role !== 'authenticated') {
    return res.status(500).json({ error: 'user is not authenticated' })
  }

  let { data: facilities, error } = await supabase
    .from('facilities')
    .select('*')

  if (error) {
    console.error(error.message)
    return res.status(401).json({ error: error.message })
  }
  return res.status(200).json(facilities)
}

export default getFacilities

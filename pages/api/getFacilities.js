import { supabase } from '../../utils/initSupabase'

// Example of how to verify and get user data server-side.
const getFacilities = async (req, res) => {
  const body = req.body

  // if (body.user.role !== 'authenticated') {
  //   throw Error('not authorized')
  // }

  let { data: facilities, error } = await supabase
    .from('facilities')
    .select('name')

  console.log('error', error)

  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json(facilities)
}

export default getFacilities

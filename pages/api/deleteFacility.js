import { supabase } from '../../utils/initSupabase'

// Example of how to verify and get user data server-side.
const deleteFacility = async (req, res) => {
  const { id, facility } = req.body

  if (user.role !== 'authenticated') {
    throw Error('not authorized')
  }

  if (!id || id === 'undefined') {
    throw Error('null data value')
  }

  const { data, error } = await supabase
    .from('facilities')
    .delete()
    .match({ id })
  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json(data)
}

export default deleteFacility

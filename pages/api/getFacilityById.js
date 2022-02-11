import { supabase } from '../../utils/initSupabase'

const getFacilityById = async (req, res) => {
  const token = req.headers.token
  const { id } = req.body

  console.log('id', id)

  if (!id || id === 'undefined') {
    throw Error('User ID not found')
  }

  let { data: facilities, error } = await supabase
    .from('facilities')
    .select('*')
    .eq('auth_id', id)

  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json(facilities[0])
}

export default getFacilityById

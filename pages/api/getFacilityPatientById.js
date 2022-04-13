import { supabase } from '../../utils/initSupabase'

// Example of how to verify and get user data server-side.
const getFacilityPatientById = async (req, res) => {
  const token = req.headers.token
  const { id } = req.body

  if (!id || id === 'undefined') {
    throw Error('null data value')
  }

  let { data: users, error } = await supabase
    .from('facility_patients')
    .select(`*,
      facility_info:facility_auth_id (*)
    `)
    .eq('id', id)

  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json(users[0])
}

export default getFacilityPatientById

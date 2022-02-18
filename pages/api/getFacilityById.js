import { supabase } from '../../utils/initSupabase'
import getPatientByFacilityId from '../../utils/mock/getPatientByFacilityId.json'

const getFacilityById = async (req, res) => {
  const { id } = req.body

  if (!id || id === 'undefined') {
    throw Error('User ID not found')
    return res.status(400).json({ error: 'User Not Found' })
  }

  let { data: facilities, error } = await supabase
    .from('facilities')
    .select('*')
    .eq('auth_id', id)

  const data = {
    ...facilities[0],
    patients: getPatientByFacilityId,
  }

  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json(data)
}

export default getFacilityById

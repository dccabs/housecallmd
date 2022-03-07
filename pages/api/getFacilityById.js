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

  let { data: patients, patientsError } = await supabase
    .from('facility_patients')
    .select('*')
    .eq('facility_auth_id', id)

  if (facilities) {
    const data = {
      ...facilities[0],
      patients,
    }
    return res.status(200).json(data)
  }

  if (error) return res.status(400).json({ error: error.message })
}

export default getFacilityById

import { supabase } from '../../utils/initSupabase'

const getFacilityPatientById = async (req, res) => {
  const token = req.headers.token
  const { id } = req.body

  if (!id || id === 'undefined') {
    throw Error('User ID not found')
  }

  let { data: patients, error } = await supabase
    .from('facility_patients')
    .select('*')
    .eq('id', id)

  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json(patients[0])
}

export default getFacilityPatientById

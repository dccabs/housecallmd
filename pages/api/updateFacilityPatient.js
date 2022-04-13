import { supabase } from '../../utils/initSupabase'

const updateFacilityPatient = async (req, res) => {
  const {updatedPatient} = req.body

  if (!updatedPatient || updatedPatient === 'undefined') {
    throw Error('null data value')
  }

  const { data, error } = await supabase
    .from('facility_patients')
    .update(updatedPatient)
    .eq('id', updatedPatient.id)

  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json({ success: true, data })
}

export default updateFacilityPatient

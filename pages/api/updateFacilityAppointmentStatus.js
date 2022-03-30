import { supabase } from '../../utils/initSupabase'

const updateFacilityAppointmentStatus = async (req, res) => {
  const {id, status } = req.body
  if (!id || status === 'undefined') {
    throw Error('null data value')
  }

  const { data, error } = await supabase
    .from('facility_appointments')
    .update({ completed: status })
    .eq('id', id)

  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json({ success: true, data })
}

export default updateFacilityAppointmentStatus

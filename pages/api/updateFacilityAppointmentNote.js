import { supabase } from '../../utils/initSupabase'

const updateFacilityAppointmentNote = async (req, res) => {
  const {id, note } = req.body

  if (!id || note === 'undefined') {
    throw Error('null data value')
  }

  const { data, error } = await supabase
    .from('facility_appointments')
    .update({ note, })
    .eq('id', id)

  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json({ success: true, data })
}

export default updateFacilityAppointmentNote

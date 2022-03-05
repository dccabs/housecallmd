import { supabase } from '../../utils/initSupabase'

const addFacilitiesAppointment = async (req, res) => {
  const { user, payload } = req.body

  if (user.role !== 'authenticated') {
    throw Error('not authorized')
  }

  const { data, error } = await supabase
    .from('facility_appointments')
    .insert(payload)

  if (error) return res.status(401).json({ appointmentError: error.message })
  return res.status(200).json(data)
}

export default addFacilitiesAppointment

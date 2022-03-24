import { supabase } from '../../utils/initSupabase'

const addFacilitiesAppointment = async (req, res) => {
  const { user, appointmentData } = req.body

  if (user.role !== 'authenticated') {
    throw Error('not authorized')
  }

  const { data, error } = await supabase
    .from('facility_appointments')
    .insert(appointmentData)

  if (error) return res.status(401).json({ appointmentError: error.message })
  return res.status(200).json(data)
}

export default addFacilitiesAppointment

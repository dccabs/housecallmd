import { supabase } from '../../utils/initSupabase'

const deleteFacilitiesAppointment = async (req, res) => {
  const { user, id } = req.body

  if (user.role !== 'authenticated') {
    throw Error('not authorized')
  }

  const { data, error } = await supabase
    .from('facility_appointments')
    .delete()
    .eq('id', id)

  if (error) return res.status(401).json({ appointmentError: error.message })
  return res.status(200).json(data)
}

export default deleteFacilitiesAppointment

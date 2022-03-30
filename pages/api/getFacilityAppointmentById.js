import { supabase } from '../../utils/initSupabase'

// Example of how to verify and get user data server-side.
const getFacilityAppointmentById = async (req, res) => {
  const { id } = req.body

  if (!id || id === 'undefined') {
    throw Error('null data value')
  }

  let { data: appointments, error } = await supabase
    .from('facility_appointments')
    .select(`*,
      facility_info:facilityId (*),
      user_info:userId (*)
    `)
    .eq('id', id)

  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json(appointments[0])
}

export default getFacilityAppointmentById

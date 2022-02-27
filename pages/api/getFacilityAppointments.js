import { supabase } from '../../utils/initSupabase'

// Example of how to verify and get user data server-side.
const getFacilityAppointments = async (req, res) => {
  const { user, facilityId, patientId } = req.body

  if (user.role !== 'authenticated') {
    return res.status(500).json({ error: 'user is not authenticated' })
  }

  const col = patientId ? 'userId' : facilityId ? 'facilityId' : '*'
  let { data: facility_appointments, error } = await supabase
    .from('facility_appointments')
    .select(col)

  if (error) {
    console.error(error.message)
    return res.status(401).json({ error })
  }

  return res.status(200).json(facility_appointments)
}

export default getFacilityAppointments

import { supabase } from '../../utils/initSupabase'

// Example of how to verify and get user data server-side.
const getFacilityAppointments = async (req, res) => {
  const { user, facilityId, patientId } = req.body

  if (user.role !== 'authenticated') {
    return res.status(500).json({ error: 'user is not authenticated' })
  }

  const col = patientId ? 'userId' : facilityId ? 'facilityId' : '*'
  const val = patientId ? patientId : facilityId ? facilityId : null

  if (val === null) {
    let { data: patients, patientsError } = await supabase
      .from('facility_appointments')
      .select(`*,
    facility_patients (*),
    facilities (*)`);

    if (patientsError) {
      console.error(patientsError.message)
      return res.status(401).json({ patientsError })
    }

    return res.status(200).json(patients)
  } else {
    let { data: patients, patientsError } = await supabase
      .from('facility_appointments')
      .select(`*,
    facility_patients (*),
    facilities (*)`)
      .eq(col, val)

    if (patientsError) {
      console.error(patientsError.message)
      return res.status(401).json({ patientsError })
    }

    return res.status(200).json(patients)
  }
}

export default getFacilityAppointments

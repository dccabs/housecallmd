import { supabase } from '../../utils/initSupabase'

// Example of how to verify and get user data server-side.
const createPatient = async (req, res) => {
  const { user } = req.body
  const formData = req.body.formData
  const keys = Object.keys(formData)
  const payload = {}

  keys.map((key) => {
    payload[key] = formData[key].value
  })

  if (!user) {
    return res.status(500).json({ error: 'User not logged in' })
  }

  if (user.role !== 'authenticated') {
    return res.status(500).json({ error: 'User not authenticated' })
  }

  const { data, error } = await supabase
    .from('facility_patients')
    .insert([payload])
  if (data) {
    return res.status(200).json(data)
  }

  if (error) {
    return res.status(400).json(error)
  }
}

export default createPatient

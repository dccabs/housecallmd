import { supabase } from '../../utils/initSupabase'

const addPatient = async (req, res) => {
  const newPatient = req.body


  if (!newPatient || newPatient === 'undefined') {
    throw Error('null data value')
  }

  const { data, error } = await supabase
    .from('facility_patients')
    .insert([{ ...newPatient }])
  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json(data)
}

export default addPatient

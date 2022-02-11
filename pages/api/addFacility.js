import { supabase } from '../../utils/initSupabase'

const addFacility = async (req, res) => {
  const { newFacility } = req.body

  if (!newUser || newUser === 'undefined') {
    throw Error('null data value')
  }

  const { data, error } = await supabase
    .from('facilities')
    .insert([{ ...newFacility }])
  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json(data)
}

export default addFacility

import { supabase } from '../../utils/initSupabase'

const addPhone = async (req, res) => {
  const newPhone = req.body

  if (!newPhone || newPhone === 'undefined') {
    throw Error('null data value')
  }

  const { data, error } = await supabase
    .from('adminPhones')
    .insert([{ ...newPhone }])
  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json(data)
}

export default addPhone

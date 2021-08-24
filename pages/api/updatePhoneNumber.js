import { supabase } from '../../utils/initSupabase'

const updatePhoneNumber = async (req, res) => {
  const updatedPhoneNumber = req.body

  if (!updatedPhoneNumber || updatedPhoneNumber === 'undefined') {
    throw Error('null data value')
  }

  const { data, error } = await supabase
    .from('adminPhones')
    .update(updatedPhoneNumber)
    .eq('id', updatedPhoneNumber.id)

  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json({ success: true, data })
}

export default updatePhoneNumber

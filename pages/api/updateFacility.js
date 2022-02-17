import { supabase } from '../../utils/initSupabase'

const updateFacility = async (req, res) => {
  const updatedFacility = req.body

  if (!updatedFacility || updatedFacility === 'undefined') {
    throw Error('null data value')
  }

  const { data, error } = await supabase
    .from('facilities')
    .update(updatedFacility)
    .eq('auth_id', req.body.auth_id)

  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json({ success: true, data })
}

export default updateFacility

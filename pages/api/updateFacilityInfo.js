import { supabase } from '../../utils/initSupabase'

const updateFacilityInfo = async (req, res) => {
  const { id, updatedFacility } = req.body

  if (!updatedFacility || updatedFacility === 'undefined') {
    throw Error('null data value')
  }

  const { data, error } = await supabase
    .from('facilities')
    .update(updatedFacility)
    .eq('id', id)

  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json({ success: true, data })
}

export default updateFacilityInfo

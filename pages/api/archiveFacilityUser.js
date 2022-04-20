import { supabase } from '../../utils/initSupabase'

const archiveFacilityUser = async (req, res) => {
  const {id, archived, deleteReason } = req.body
  if (!id || !archived || !deleteReason) {
    throw Error('null data value')
  }

  const { data, error } = await supabase
    .from('facility_patients')
    .update({ archived, archive_reason: deleteReason })
    .eq('id', id)

  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json({ success: true, data })
}

export default archiveFacilityUser

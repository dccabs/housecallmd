import { supabase } from '../../utils/initSupabase'

const addFacilityMessagesMediaUrl = async (req, res) => {
  const mediaUrl = req.body

  console.log('mediaUrl', mediaUrl)

  if (!mediaUrl || mediaUrl === 'undefined') {
    throw Error('null data value')
  }

  const { data, error } = await supabase
    .from('facility_messages')
    .insert([{ media_url: mediaUrl }])
  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json(data)
}

export default addFacilityMessagesMediaUrl

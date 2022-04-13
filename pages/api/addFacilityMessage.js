import { supabase } from '../../utils/initSupabase'

const addFacilityMessage = async (req, res) => {
  const newMessage = req.body

  /// payload should be like this
  /*
  newMessage = {
    created_at: new Date(),
    sender: string uuid,
    recipient: string uuid or null if housecall md
    patient_id: number or null if no patient associated
    message: string,
    viewed_by_recipient: false,
  }
  */


  if (!newMessage || newMessage === 'undefined') {
    throw Error('null data value')
  }

  const { data, error } = await supabase
    .from('facility_messages')
    .insert([{ ...newMessage }])
  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json(data)
}

export default addFacilityMessage

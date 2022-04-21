import { supabase } from '../../utils/initSupabase'
import { Auth } from '@supabase/ui'

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

  console.log('newMessage', newMessage)

  let { data: houseCallUsers, userListError } = await supabase
    .from('UserList')
    .select('*')
    .eq('uuid', newMessage.recipient)

  let sentToHouseCall = false;
  if (houseCallUsers) {
    houseCallUsers.forEach(user => {
      if (user.role === 'admin') {
        sentToHouseCall = true;
      }
    })
  }

  if (newMessage.recipient === null) {
    sentToHouseCall = true;
  }

  if (!newMessage || newMessage === 'undefined') {
    throw Error('null data value')
  }

  const { data, error } = await supabase
    .from('facility_messages')
    .insert([{ ...newMessage }])

  const { data: facilityData, facilityDataError } = await supabase
    .from('facilities')
    .select('*')
    .eq('auth_id', data[0].sender)

  data.sentToHouseCall = sentToHouseCall;
  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json({ sentToHouseCall, data, facilityData })
}

export default addFacilityMessage

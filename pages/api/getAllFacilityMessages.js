import { supabase } from '../../utils/initSupabase'

// Example of how to verify and get user data server-side.
const getAllFacilityMessages = async (req, res) => {
  // const token = req.headers.token
  // const { email } = req.body
  //
  // if (!email || email === 'undefined') {
  //   throw Error('null data value')
  // }

  let { data: messages, error } = await supabase
    .from('facility_messages')
    .select('*')

  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json(messages)
}

export default getAllFacilityMessages

import { supabase } from '../../utils/initSupabase'

// Example of how to verify and get user data server-side.
const addMeeting = async (req, res) => {
  const access_token = req.headers.token;
  const { cuid, creator, timestamp } = req.body;
  //
  const { data, error } = await supabase
    .from('MeetingList')
    .insert([
      {
        id: cuid,
        timestamp,
        creator,
      },
    ])
  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json(data)
}

export default addMeeting

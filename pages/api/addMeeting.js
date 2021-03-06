import { supabase } from '../../utils/initSupabase'
import { v4 as uuidv4 } from 'uuid'

// Example of how to verify and get user data server-side.
const addMeeting = async (req, res) => {
  const access_token = req.headers.token
  const { creator, user } = req.body

  if (user.role !== 'authenticated') {
    throw Error('not authorized')
  }

  const { data, error } = await supabase.from('MeetingList').insert([
    {
      cuid: uuidv4(),
      timestamp: new Date(),
      creator: user.email,
    },
  ])
  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json(data)
}

export default addMeeting

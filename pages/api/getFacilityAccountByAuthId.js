import { supabase } from '../../utils/initSupabase'

const getFacilityAccountByAuthId = async (req, res) => {
  const { auth_id, user } = req.body

  if (!auth_id || auth_id === 'undefined' || !user.id) {
    throw Error('User ID not found')
    return res.status(400).json({ error: 'User Not Found' })
  }

  let { data: facilities, error } = await supabase
    .from('facilities')
    .select('*')
    .eq('auth_id', auth_id)

  if (facilities) {
    const data = {
      ...facilities[0],
    }
    return res.status(200).json(data)
  }

  if (error) return res.status(400).json({ error: error.message })
}

export default getFacilityAccountByAuthId

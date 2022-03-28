import { supabase } from '../../utils/initSupabase'

const getFacilityAccountById = async (req, res) => {
  const { id } = req.body

  if (!id || id === 'undefined') {
    throw Error('User ID not found')
    return res.status(400).json({ error: 'User Not Found' })
  }

  let { data: facilities, error } = await supabase
    .from('facilities')
    .select('*')
    .eq('id', id)

  if (facilities) {
    const data = {
      ...facilities[0],
    }
    return res.status(200).json(data)
  }

  if (error) return res.status(400).json({ error: error.message })
}

export default getFacilityAccountById

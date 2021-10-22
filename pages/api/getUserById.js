import { supabase } from '../../utils/initSupabase'

const getUserById = async (req, res) => {
  const token = req.headers.token
  const { id } = req.body

  if (!id || id === 'undefined') {
    throw Error('User ID not found')
  }

  let { data: users, error } = await supabase
    .from('UserList')
    .select('*')
    .eq('id', id)

  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json(users[0])
}

export default getUserById

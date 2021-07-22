import { supabase } from '../../utils/initSupabase'

const addUser = async (req, res) => {
  const { newUser } = req.body

  if (!newUser || newUser === 'undefined') {
    throw Error('null data value')
  }

  const { data, error } = await supabase
    .from('UserList')
    .insert([{ ...newUser }])
  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json(data)
}

export default addUser

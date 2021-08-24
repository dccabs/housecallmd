import { supabase } from '../../utils/initSupabase'

const deletePhone = async (req, res) => {
  const {
    id: { id },
    user,
  } = req.body
  console.log(id)
  if (user.role !== 'authenticated') {
    throw Error('not authorized')
  }

  if (!id || id === 'undefined') {
    throw Error('null data value')
  }

  const { data, error } = await supabase
    .from('adminPhones')
    .delete()
    .eq('id', id)

  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json(data)
}

export default deletePhone

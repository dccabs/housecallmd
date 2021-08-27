import { supabase } from '../../utils/initSupabase'

const getPhoneNumbers = async (req, res) => {
  const body = req.body

  if (body.user.role !== 'authenticated') {
    throw Error('not authorized')
  }

  let { data, error } = await supabase
    .from('adminPhones')
    .select('*')
    .order('lastName', true)

  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json(data)
}

export default getPhoneNumbers

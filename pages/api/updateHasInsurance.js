import { supabase } from '../../utils/initSupabase'

const updateHasInsurance = async (req, res) => {
  const { email, newValue } = req.body

  const { data, error } = await supabase
    .from('UserList')
    .update({ hasInsurance: newValue })
    .match({ email: email })
  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json(data)
}

export default updateHasInsurance

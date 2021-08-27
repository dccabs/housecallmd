import { supabase } from '../../utils/initSupabase'

const updateAppointment = async (req, res) => {
  const updatedAppointment = req.body

  if (!updatedAppointment || updatedAppointment === 'undefined') {
    throw Error('null data value')
  }

  const { data, error } = await supabase
    .from('appointments')
    .update(updatedAppointment)
    .eq('id', updatedAppointment.id)

  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json({ success: true, data })
}

export default updateAppointment

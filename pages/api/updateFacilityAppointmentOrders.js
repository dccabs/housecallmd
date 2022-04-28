import { supabase } from '../../utils/initSupabase'

const updateFacilityAppointmentOrders = async (req, res) => {
  const {id, orders } = req.body

  if (!id || orders === 'undefined') {
    throw Error('null data value')
  }

  const { data, error } = await supabase
    .from('facility_appointments')
    .update({ orders, })
    .eq('id', id)

  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json({ success: true, data })
}

export default updateFacilityAppointmentOrders

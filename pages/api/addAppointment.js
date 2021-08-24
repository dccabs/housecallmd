import { supabase } from '../../utils/initSupabase'

const addApointment = async (req, res) => {
  const { user, visitChoice, visitReason } = req.body
  //
  // if (!newAppointment || newAppointment === 'undefined') {
  //   throw Error('null data value')
  // }

  let { data: UserList, error } = await supabase
    .from('UserList')
    .select('*')
    .eq('uuid', user.id)


  console.log('UserList', UserList)
  //
  const { data: appointmentData, appointmentError } = await supabase
    .from('appointments')
    .insert([
      {
        time: new Date(),
        usingInsurance: true,
        visitReason,
        clientNotes: '',
        visitChoice,
        completed: false,
        userId: UserList[0].id,
      },
    ])

  if (appointmentError) return res.status(401).json({ appointmentError: error.message })
  return res.status(200).json(appointmentData)
}

export default addApointment
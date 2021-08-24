import { supabase } from '../../utils/initSupabase'

const getAppointments = async (req, res) => {
  const body = req.body

  if (body.user.role !== 'authenticated') {
    throw Error('not authorized')
  }

  let { data: UserProfile, error } = await supabase
    .from('appointments')
    .select(`
    *,
    UserList (
      *
    )
  `)
    .eq('completed', body.completed)


  console.log('UserProfile', UserProfile)

  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json(UserProfile)
}

export default getAppointments

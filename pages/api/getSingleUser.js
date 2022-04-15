import { supabase } from '../../utils/initSupabase'

// Example of how to verify and get user data server-side.
const getAllUsers = async (req, res) => {
  const token = req.headers.token
  const { email } = req.body

  if (!email || email === 'undefined') {
    throw Error('null data value')
  }

  let { data: users, error } = await supabase
    .from('UserList')
    .select('*')
    .eq('email', email)

  if (!users.length) {
    let { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)

    if (error) return res.status(401).json({ error: error.message })

    let { data: facility, error2 } = await supabase
      .from('facilities')
      .select('*')
      .eq('auth_id', users[0].id)


    if (error2) return res.status(401).json({ error: error2.message })
    if (!facility.length) return res.status(401).json({ error: "No facility found for this user." })
    return res.status(200).json(facility[0])
  } else {
    if (error) return res.status(401).json({ error: error.message })
    return res.status(200).json(users[0])
  }
}

export default getAllUsers

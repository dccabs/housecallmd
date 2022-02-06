import { supabase } from '../../utils/initSupabase'

// Example of how to verify and get user data server-side.
const getAllUsers = async (req, res) => {
  const body = req.body

  if (body.user.role !== 'authenticated') {
    throw Error('not authorized')
  }

  let { data: users, error } = await supabase
    .from('UserList')
    .select('*')
    .order('email', true)

  // get the card imge path 

  // download the image and return together with the users object

  // console.log('get all users', users);

  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json(users)
}

export default getAllUsers

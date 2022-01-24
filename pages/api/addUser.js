import { supabase } from '../../utils/initSupabase'

const addUser = async (req, res) => {
  const { newUser } = req.body

  console.log('newUser', newUser);

  if (!newUser || newUser === 'undefined') {
    throw Error('null data value')
  }

  const { data, error } = await supabase
    .from('UserList')
    .insert([{ ...newUser }])
  
  console.log('data', data);
  console.log('error', error);
  
  if (error) {
    return res.status(401).json({ error: error.message })
  }

  
  return res.status(200).json({data: data});
}

export default addUser

import { supabase } from '../../utils/initSupabase'

const Login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || password === 'undefined') {
    throw Error('null data value')
  }

  let { data: facility, error: dataError } = await supabase
    .from('facilities')
    .select('*')
    .eq('user_name', username)

  const match = facility[0]


  let { data: users, error } = await supabase
    .from('users')
    .select('*')

  const matchingUser = users.find(item => {
    return item.id === match?.auth_id;
  })

  if (match && matchingUser) {
    const email = matchingUser?.email;
    const { session, error } = await supabase.auth.signIn({
      email, // or phone: data[0].phone
      password: password,
    });
    if (!error) {
      return res.status(200).json({
        email,
      });
    }
  }
  return res.status(404).json({
    message: "Invalid username or password",
    error: true,
  });
}

export default Login;

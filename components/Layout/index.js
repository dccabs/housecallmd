import { useEffect } from 'react'
import useStore from '../../zustand/store'
import { Box } from '@material-ui/core'
import { supabase } from '../../utils/initSupabase'
import { Auth } from '@supabase/ui'

import Navbar from '../Navbar'
import Footer from '../Footer'

const Layout = ({ children }) => {
  const { setIsAuthenticated } = useStore()
  const session = supabase.auth.session()
  const { user } = Auth.useUser()

  useEffect(() => {
    session ? setIsAuthenticated(true) : setIsAuthenticated(false)
  }, [session])

  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box>
        <Navbar />
        <Box>{children}</Box>
      </Box>
      <Footer />
    </Box>
  )
}

export default Layout

import { useEffect } from 'react'
import useStore from '../../zustand/store'
import { Box } from '@material-ui/core'
import { supabase } from '../../utils/initSupabase'
import { Auth } from '@supabase/ui'

import Navbar from '../Navbar/Navbar'
import Footer from '../Footer'
import SnackBar from '../SnackBar'
import { makeStyles } from '@material-ui/core/styles'

const Layout = ({ children }) => {
  const { setIsAuthenticated } = useStore()
  const session = supabase.auth.session()

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
        <SnackBar>
          <Navbar />
          <Box>{children}</Box>
        </SnackBar>
      </Box>
      <Footer />
    </Box>
  )
}

export default Layout

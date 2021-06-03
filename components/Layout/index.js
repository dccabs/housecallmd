import { Box } from '@material-ui/core'
import { Auth } from '@supabase/ui'

import Navbar from '../Navbar'
import Footer from '../Footer'

const Layout = ({ children }) => {
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

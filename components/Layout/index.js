import { Box } from '@material-ui/core'

import Navbar from '../Navbar'
import Footer from '../Footer'

const Layout = ({ children }) => {
  return (
    <Box display="flex" flexDirection="column">
      <Navbar />
      <Box>{children}</Box>
      <Footer />
    </Box>
  )
}

export default Layout

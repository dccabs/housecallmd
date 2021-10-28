import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#e1215b',
    },
    secondary: {
      main: '#0092b8',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    fontFamily: "'Manrope', sans-serif",
    color: '#1a1a1a',

    h2: {
      '@media screen and (max-width: 768px)': {
        fontSize: 30,
        marginTop: '1em',
      },
    },
    h3: {
      '@media screen and (max-width: 768px)': {
        fontSize: 28,
        marginTop: '1em',
      },
    },
    h4: {
      textAlign: 'center',
      fontWeight: 'normal',
      fontSize: 24,
    },

    p: {
      lineHeight: 29,
      fontSize: 20,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 900,
      lg: 1420,
      xl: 1920,
    },
  },
  zIndex: {
    mobileStepper: 1000,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
})

export default theme

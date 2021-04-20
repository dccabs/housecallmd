import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#e1215b",
    },
    secondary: {
      main: "#0092b8",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
  typography: {
    fontFamily: "'Manrope', sans-serif",
    color: "#1a1a1a",
    p: {
      lineHeight: 29,
    },
  },
});

export default theme;

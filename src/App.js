import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import Insurance from "./components/pages/Insurance";
import ChooseProvider from "./components/pages/Insurance/ChooseProvider";
import CardInformation from "./components/pages/Insurance/CardInformation";
import SignUp from "./components/pages/SignUp";
import Login from "./components/pages/Login";
import Pharmacy from "./components/pages/Pharmacy";
import VisitChoice from "./components/pages/VisitChoice";
import PageNotFound from "./components/pages/404";
import { Box } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import banner_phone from "./assets/images/banner_phone.png";

const useStyles = makeStyles((theme) => ({
  container: {
    background: "#fff",
    minHeight: 500,
    [theme.breakpoints.up("sm")]: {
      margin: "auto",
      maxWidth: 1100,
      justifyContent: 'center'
    },
  },
}));

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <Navbar />
      <Box p="0" display="flex" flexWrap="wrap" className={classes.container}>
        <Switch>
          <Route component={Home} exact path="/" />
          <Route component={Insurance} exact path="/insurance" />
          <Route component={ChooseProvider} path="/insurance/choose-provider" />
          <Route component={CardInformation} path="/insurance/card-information" />
          <Route component={Pharmacy} path="/pharmacy" />
          <Route component={VisitChoice} path="/visit-choice" />
          <Route component={SignUp} path="/sign-up" />
          <Route component={Login} path="/login" />
          <Route component={PageNotFound} />
        </Switch>
      </Box>
    </BrowserRouter>
  );
}

export default App;

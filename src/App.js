import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./App.css";

import Home from "./Components/Home";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import ForgetPassword from "./Components/ForgetPassword";
import DisplayData from "./Components/DisplayData";
import NotFound from "./Components/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/forgetpassword" component={ForgetPassword} />
          <Route exact path="/data" component={DisplayData} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
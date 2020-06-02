import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";

import Index from "./Index/Index";
import Login from "./Auth/Login/Login";
import Register from "./Auth/Register/Register";
import ForgotPassword from "./Forgot/ForgotPassword";
import ErrorPages from "./Error/ErrorPages";

class Public extends Component {
  render() {
    return (
      <>
        <Navbar brand="HOPCASH" />
        <div className="padding-top-navbar-fixed"></div>

        <Switch>
          <Route exact path="/" component={Index}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/forgot-password" component={ForgotPassword}></Route>
          <Route component={NotFounds} />
        </Switch>
      </>
    );
  }
}

const NotFounds = () => {
  return <ErrorPages />;
};

export default Public;

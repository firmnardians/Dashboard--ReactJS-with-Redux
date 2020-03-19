import React, { Component } from "react";
import { connect } from "react-redux";
import Public from "./screens/Public/Public";
import Private from "./screens/Private/Private";
import "./App.scss";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div id="myoverlay" className="overlay">
          <div id="loading"></div>
        </div>
        {!this.props.isAuth && <Public />}
        {this.props.isAuth && <Private />}
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    isAuth: state.auth.isAuthenticated
  };
};

export default connect(stateToProps)(App);

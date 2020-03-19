import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import ButtonBig from "../Button/ButtonBig";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/Actions/AuthAction";

import "./navbar.css";

class Navbar extends Component {
  logOutUser = () => {
    this.props.__logOutUser();
    this.props.history.push("/");
  };

  render() {
    return (
      <>
        <div className="navbar-app">
          <Link to="/detail">
            <div className="card-brand">
              <h1>{this.props.brand}</h1>
            </div>
          </Link>
          <div className="card-navbar-menu">
            <ul className="navbar-list">
              {/* Jika Sudah Login Start */}
              {this.props.isAuth && (
                <>
                  <li className="sm-none">
                    <ButtonBig
                      onClick={this.logOutUser}
                      title="Keluar"
                      className="mr-20"
                    />
                  </li>
                </>
              )}
              {/* Jika Sudah Login Finish */}
            </ul>
          </div>
        </div>
      </>
    );
  }
}

const stateToProps = state => {
  return {
    isAuth: state.auth.isAuthenticated
  };
};

const dispatchToProps = dispatch => ({
  __logOutUser: payload => {
    dispatch(logoutUser(payload));
  }
});

export default withRouter(connect(stateToProps, dispatchToProps)(Navbar));

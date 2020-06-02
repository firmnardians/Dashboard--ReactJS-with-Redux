import React, { Component } from "react";
import Notification from "../Notification/notification";
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
        <div
          className={
            !this.props.isAuth ? "navbar-app white" : "navbar-app blue"
          }
        >
          <Link to="/">
            <div className="card-brand">
              <h1 className={!this.props.isAuth ? "white" : " blue"}>
                {this.props.brand}
              </h1>
            </div>
          </Link>

          <div className="card-navbar-menu">
            <ul className="navbar-list">
              {/* Jika Sudah Login Start */}
              {this.props.isAuth && (
                <>
                  <Link to="/create-outlet">
                    <li className="sm-none">
                      <ButtonBig
                        title="Create Outlet"
                        className="mr-20 fw-600"
                      />
                    </li>
                  </Link>

                  <li className="sm-none">
                    <ButtonBig
                      onClick={this.logOutUser}
                      title="Keluar"
                      className="mr-20 fw-600"
                    />
                  </li>

                  <>
                    <li>
                      <Notification />
                    </li>
                    <li>
                      <i className="material-icons navbar-icon">person</i>
                    </li>
                  </>
                </>
              )}
              {/* Jika Sudah Login Finish */}

              {/* Jika Belum Login Start */}
              {!this.props.isAuth && (
                <>
                  <Link to="/login">
                    <ButtonBig className="fw-600 mr-20" title="Login" />
                  </Link>
                  <Link to="/register">
                    <ButtonBig className="fw-600 mr-20" title="Register" />
                  </Link>
                </>
              )}
              {/* Jika Belum Login Finish */}
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

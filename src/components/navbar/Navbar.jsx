import React, { Component } from "react";
import Notification from "../Notification/notification";
import { Link } from "react-router-dom";
import "./navbar.css";
import ButtonBig from "../Button/ButtonBig";

class Navbar extends Component {
  render() {
    return (
      <>
        <div className="navbar-app">
          <div className="card-brand">
            <h1>{this.props.brand}</h1>
          </div>
          <div className="card-navbar-menu">
            <ul className="navbar-list">
              <Link to="/create-outlet">
                <li className="sm-none">
                  <ButtonBig title="Create Outlet" className="mr-20" />
                </li>
              </Link>
              <li>
                <Notification />
              </li>
              <li>
                <i className="material-icons navbar-icon">person</i>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default Navbar;

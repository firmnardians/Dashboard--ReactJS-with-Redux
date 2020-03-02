import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./drawer.css";

class Drawer extends Component {
  render() {
    return (
      <>
        <div className="card-drawer-container">
          <div className="card-drawer">
            <div className="sub-drawer">
              <NavLink
                exact
                activeClassName="btnLinkMenu--active"
                className="btnLinkMenu"
                to="/"
              >
                <i className="material-icons menu-icon">home</i>Dashboard
              </NavLink>

              <NavLink
                activeClassName="btnLinkMenu--active"
                className="btnLinkMenu"
                to="/report"
              >
                <i className="material-icons menu-icon">assessment</i>Report
              </NavLink>

              <NavLink
                exact
                activeClassName="btnLinkMenu--active"
                className="btnLinkMenu"
                to="/business"
              >
                <i className="material-icons menu-icon">store</i>Business
              </NavLink>
            </div>

            <div className="sub-drawer">
              <NavLink
                exact
                activeClassName="btnLinkMenu--active"
                className="btnLinkMenu"
                to="/product-category"
              >
                <i className="material-icons menu-icon">category</i>Product
                category
              </NavLink>

              <NavLink
                exact
                activeClassName="btnLinkMenu--active"
                className="btnLinkMenu"
                to="/product-item"
              >
                <i className="material-icons menu-icon">ballot</i>Product item
              </NavLink>

              <NavLink
                exact
                activeClassName="btnLinkMenu--active"
                className="btnLinkMenu"
                to="/inventory"
              >
                <i className="material-icons menu-icon">table_chart</i>Inventory
              </NavLink>
            </div>

            <div className="sub-drawer">
              <NavLink
                exact
                activeClassName="btnLinkMenu--active"
                className="btnLinkMenu"
                to="/tax-services"
              >
                <i className="material-icons menu-icon">monetization_on</i>Tax
                &#38; services
              </NavLink>

              <NavLink
                exact
                activeClassName="btnLinkMenu--active"
                className="btnLinkMenu"
                to="/employee"
              >
                <i className="material-icons menu-icon">group</i>Employee
              </NavLink>

              <NavLink
                exact
                activeClassName="btnLinkMenu--active"
                className="btnLinkMenu"
                to="/promo"
              >
                <i className="material-icons menu-icon">local_offer</i>Promo
              </NavLink>
            </div>

            <div className="sub-drawer">
              <NavLink
                exact
                activeClassName="btnLinkMenu--active"
                className="btnLinkMenu"
                to="/billing"
              >
                <i className="material-icons menu-icon">horizontal_split</i>
                Billing
              </NavLink>
              <NavLink
                exact
                activeClassName="btnLinkMenu--active"
                className="btnLinkMenu"
                to="/account"
              >
                <i className="material-icons menu-icon">account_circle</i>
                Account
              </NavLink>
            </div>
          </div>
          <div className="drawer-footer">
            <p>Fitur Premium</p>
          </div>
        </div>
      </>
    );
  }
}

export default Drawer;

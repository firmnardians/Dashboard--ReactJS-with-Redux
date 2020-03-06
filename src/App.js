import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

// Pages
import Login from "./screens/Auth/Login";
import Navbar from "./components/Navbar/Navbar";
import Drawer from "./components/Drawer/Drawer";
import Dashboard from "./screens/Dashboard/Dashboard";
import Report from "./screens/Report/Report";
import Account from "./screens/Account/Account";
import Business from "./screens/Business/Business";
import Employee from "./screens/Employee/Employee";
import Promo from "./screens/Promo/Promo";
import Billing from "./screens/Billing/Billing";
import TaxServices from "./screens/TaxServices/TaxServices";
import Inventory from "./screens/Inventory/Inventory";
import ProductItem from "./screens/ProductItem/ProductItem";
import ProductCategory from "./screens/ProductCategory/ProductCategory";
import Outlet from "./screens/Outlet/Outlet";
import Setting from "./screens/Setting/Setting";
import Signup from "./screens/Auth/Signup";
import ErrorPages from "./screens/404/ErrorPages";
import Detail from "./screens/Detail/Detail";

// style
import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true
    };
  }

  render() {
    return (
      <div className="App">
        <Navbar brand="HOPCASH" />
        <div className="padding-top-navbar-fixed"></div>

        {!this.state.isLogin ? (
          <div className="card-flex">
            <div className="card-data-drawer-app lg-none">
              <Drawer />
            </div>

            <Switch>
              <Route exact path="/" component={Dashboard}></Route>
              <Route path="/business" component={Business}></Route>
              <Route path="/report" component={Report}></Route>
              <Route
                path="/product-category"
                component={ProductCategory}
              ></Route>
              <Route path="/product-item" component={ProductItem}></Route>
              <Route path="/inventory" component={Inventory}></Route>
              <Route path="/tax-services" component={TaxServices}></Route>
              <Route path="/employee" component={Employee}></Route>
              <Route path="/promo" component={Promo}></Route>
              <Route path="/billing" component={Billing}></Route>
              <Route path="/account" component={Account}></Route>
              <Route path="/setting" component={Setting}></Route>
              <Route path="/create-outlet" component={Outlet}></Route>
              <Route component={NotFounds} />
            </Switch>
          </div>
        ) : (
          // Jika belum login
          <Switch>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/signup" component={Signup}></Route>
            <Route path="/detail" component={Detail}></Route>
            <Route component={NotFounds} />
          </Switch>
        )}
      </div>
    );
  }
}

const NotFounds = () => {
  return <ErrorPages />;
};

export default App;

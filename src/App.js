import React from "react";
import { Route, Switch } from "react-router-dom";
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

import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar brand="HOPCASH" />
      <div className="padding-top-navbar-fixed"></div>
      <div className="card-flex">
        <div className="card-data-drawer-app lg-none">
          <Drawer />
        </div>

        <Switch>
          <Route exact path="/" component={Dashboard}></Route>
          <Route path="/business" component={Business}></Route>
          <Route path="/report" component={Report}></Route>
          <Route path="/product-category" component={ProductCategory}></Route>
          <Route path="/product-item" component={ProductItem}></Route>
          <Route path="/inventory" component={Inventory}></Route>
          <Route path="/tax-services" component={TaxServices}></Route>
          <Route path="/employee" component={Employee}></Route>
          <Route path="/promo" component={Promo}></Route>
          <Route path="/billing" component={Billing}></Route>
          <Route path="/account" component={Account}></Route>
          <Route path="/setting" component={Setting}></Route>
          <Route path="/create-outlet" component={Outlet}></Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;

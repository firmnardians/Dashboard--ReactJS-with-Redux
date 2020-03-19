import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import Navbar from "../../components/Navbar/Navbar";
import Drawer from "../../components/Drawer/Drawer";
import Dashboard from "./Dashboard/Dashboard";
import Report from "./Report/Report";
import Outlet from "./Outlet/Outlet";
import Detail from "./Detail/Detail";
import NavbarDetail from "../../components/Navbar/NavbarDetail";

class Private extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBusiness: false
    };
  }

  myBusinessAPI = () => {
    const payload = JSON.stringify({
      id: this.props.user_id,
      token: this.props.token,
      data_type: 3
    });

    axios
      .post("https://devtest-api-beo.hop.cash/v1/api/data/general", payload)
      .then(res => {
        console.log(res.data.length);
        if (res.data.length > 0) {
          console.log("sudah punya bisnis");
          this.setState({
            isBusiness: !this.state.isBusiness
          });
          this.props.history.push("/");
        } else {
          console.log("belum punya bisnis");
          this.props.history.push("/detail");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.myBusinessAPI();
  }

  render() {
    return (
      <>
        {this.state.isBusiness === false && (
          <>
            <NavbarDetail brand="HOPCASH" />
            <div className="padding-top-navbar-fixed"></div>
            <div className="card-flex">
              <Route path="/detail" component={Detail}></Route>
            </div>
          </>
        )}

        {this.state.isBusiness === true && (
          <>
            <Navbar brand="HOPCASH" />
            <div className="padding-top-navbar-fixed"></div>
            <div className="card-flex">
              <div className="card-data-drawer-app lg-none">
                <Drawer />
              </div>
              <Switch>
                <Route exact path="/" component={Dashboard}></Route>
                <Route path="/report" component={Report}></Route>
                <Route path="/create-outlet" component={Outlet}></Route>
              </Switch>
            </div>
          </>
        )}
      </>
    );
  }
}

const stateToProps = state => {
  return {
    token: state.auth.token,
    user_id: state.auth.user_id
  };
};

export default withRouter(connect(stateToProps)(Private));

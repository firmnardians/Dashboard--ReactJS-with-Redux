import React, { Component } from "react";
import CreateOutlet from "../../controllers/CreateOutlet/CreateOutlet";

export class Outlet extends Component {
  render() {
    return (
      <>
        <div className="card-content-app">
          <div className="card-content-title">
            <h1>Buat Outlet</h1>
          </div>
          <CreateOutlet />
        </div>
      </>
    );
  }
}

export default Outlet;

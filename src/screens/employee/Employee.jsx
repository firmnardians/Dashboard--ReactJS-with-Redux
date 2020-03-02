import React, { Component } from "react";
import ButtonBig from "../../components/Button/ButtonBig";

import "./employee.css";

export class Employee extends Component {
  render() {
    return (
      <div className="card-content-app">
        <div className="card-content-title">
          <h1>Employee</h1>
        </div>

        <div className="card-employe-content">
          <div className="card-flex">
            <div className="card-left">
              <div className="card-images-employee"></div>
            </div>
            <div className="card-right">
              <div className="card-get-employee">
                <h2>You don't have any employee yet.</h2>
                <p>You can add employees and give access to each employee.</p>
                <div className="sub-detail-get-employee">
                  <p>
                    Provide a convenience to your business, by providing access
                    control to your employees, such as managing orders,
                    payments, changing transactions.
                  </p>
                </div>
                <div className="button-add-employee">
                  <ButtonBig title="Add Employee" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Employee;

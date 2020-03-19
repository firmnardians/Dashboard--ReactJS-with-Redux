import React, { Component } from "react";
import axios from "axios";
import "../../components/Select/select.css";
import "./Billing.css";

export class Billing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataBusiness: [],
      dataOulet: []
    };
  }

  getBusinessAPI = () => {
    axios.get("http://localhost:3004/business").then(response => {
      this.setState({
        dataBusiness: response.data
      });
    });
  };

  getOutletAPI = () => {
    axios.get("http://localhost:3004/outlet").then(response => {
      this.setState({
        dataOulet: response.data
      });
    });
  };

  componentDidMount() {
    this.getBusinessAPI();
    this.getOutletAPI();
  }

  render() {
    return (
      <div className="card-content-app">
        <div className="card-content-title">
          <h1>Billing</h1>
        </div>
        <div className="card-app">
          <div className="card-app-title">
            <h2>Select your business</h2>
          </div>
          <div className="my-business-select">
            <select className="select-group" name="" id="">
              {this.state.dataBusiness.map(item => {
                return <option key={item.id}>{item.title}</option>;
              })}
            </select>

            <div className="card-table mt-30">
              <table className="table-group">
                <thead>
                  <tr>
                    <th className="heading-table">Outlet</th>
                    <th className="heading-table">Business</th>
                    <th className="heading-table">Package</th>
                  </tr>

                  {this.state.dataOulet.map((item, Index) => {
                    return (
                      <tr key={Index}>
                        <td className="td-group"> {item.outlate_title}</td>
                        <td className="td-group">{item.business_title}</td>
                        <td className="td-group">{item.outlet_package}</td>
                        <td className="td-group">
                          <input type="checkbox" name="" id="" />
                        </td>
                      </tr>
                    );
                  })}
                </thead>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Billing;

import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import InputNormal from "../../../components/Input/InputNormal";
import ButtonBig from "../../../components/Button/ButtonBig";

export class Outlet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeSelect: [],
      countrySelect: [],
      businessList: [],

      data: {
        select_business: "",
        outlet_name: "",
        outlet_num_emp: "",
        outlet_phone_number: "",
        outlet_address: "",
        outlet_country: ""
      }
    };
  }

  businessList = () => {
    const BusinessList = JSON.stringify({
      id: this.props.user_id,
      token: this.props.token,
      data_type: 3
    });

    axios
      .post(
        "https://devtest-api-beo.hop.cash/v1/api/data/general",
        BusinessList
      )
      .then(res => {
        console.log(res);
        if (res.statusText === "OK") {
          this.setState({
            businessList: res.data
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  outletNumberEmployee = () => {
    const OutletNumEmp = JSON.stringify({
      id: this.props.user_id,
      token: this.props.token,
      data_type: 1
    });
    axios
      .post(
        "https://devtest-api-beo.hop.cash/v1/api/data/general",
        OutletNumEmp
      )
      .then(res => {
        // const _response = res.data;
        // console.log(_response);

        if (res.statusText === "OK") {
          this.setState({
            employeeSelect: res.data
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  countryList = () => {
    const Country = JSON.stringify({
      id: this.props.user_id,
      token: this.props.token,
      data_type: 0
    });

    axios
      .post("https://devtest-api-beo.hop.cash/v1/api/data/location", Country)
      .then(res => {
        // const _response = res.data;
        // console.log(_response);

        if (res.statusText === "OK") {
          this.setState({
            countrySelect: res.data
          });
        }
        // console.log(this.state.countrySelect);
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  handleChange = event => {
    let newData = { ...this.state.data };
    newData[event.target.name] = event.target.value;
    console.log(newData);
    this.setState({
      data: newData
    });
  };

  componentDidMount() {
    this.outletNumberEmployee();
    this.countryList();
    this.businessList();
  }

  render() {
    // MAP
    const mapOutletNumEmp = this.state.employeeSelect.map(item => {
      return (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      );
    });

    const mapCountry = this.state.countrySelect.map(item => {
      return (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      );
    });

    const mapBusinessList = this.state.businessList.map(item => {
      return (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      );
    });

    return (
      <>
        <div className="card-content-app">
          <div className="card-content-title">
            <h1>Buat Outlet</h1>
          </div>

          <form onSubmit={this.handleSubmit}>
            <div className="card-app">
              <div className="card-flex">
                <div className="card-grid">
                  <p>Pilih Bisnis</p>
                  <select
                    name="select_business"
                    onChange={this.handleChange}
                    className="select-group"
                  >
                    {mapBusinessList}
                  </select>
                </div>
                <div className="card-grid">
                  <p>Nama Outlet</p>
                  <InputNormal
                    name="outlet_name"
                    type="text"
                    autoComplete="off"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="card-grid">
                  <p>Jumlah Karyawan</p>
                  <select
                    name="outlet_num_emp"
                    onChange={this.handleChange}
                    className="select-group"
                  >
                    {mapOutletNumEmp}
                  </select>
                </div>
              </div>

              <div className="card-flex mt-30">
                <div className="card-grid">
                  <p>Nomor handphone Outlet</p>
                  <InputNormal
                    name="outlet_phone_number"
                    type="number"
                    autoComplete="off"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="card-grid">
                  <p>Alamat</p>
                  <InputNormal
                    name="outlet_address"
                    type="text"
                    autoComplete="off"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="card-grid">
                  <p>Negara</p>
                  <select
                    name="outlet_country"
                    onChange={this.handleChange}
                    className="select-group"
                  >
                    {mapCountry}
                  </select>
                </div>
              </div>
              <ButtonBig
                onClick={this.clickSubmitOutlet}
                className="mt-30"
                title="Buat Outlet"
              />
            </div>
          </form>
        </div>
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

export default connect(stateToProps)(Outlet);

import React, { Component } from "react";
import { connect } from "react-redux";

import InputNormal from "../../../components/Input/InputNormal";
import ButtonBig from "../../../components/Button/ButtonBig";
import Loading from "../../../components/Loading/Loading";
import { generalPost, locationPost, businessPost } from "../../../service/api";

export class Outlet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      button: "Buat outlet",
      alert: false,
      isLoading: true,
      employeeSelect: [],
      countrySelect: [],
      businessSelect: [],

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

  newOutlet_API = () => {
    const {
      select_business,
      outlet_name,
      outlet_num_emp,
      outlet_phone_number,
      outlet_address,
      outlet_country
    } = this.state.data;

    const __data = JSON.stringify({
      id: this.props.user_id,
      token: this.props.token,

      data_type: 6,
      business_id: select_business,
      outlet_name: outlet_name,
      outlet_num_emp: outlet_num_emp,
      outlet_phone_number: outlet_phone_number,
      outlet_address: outlet_address,
      outlet_country: outlet_country
    });

    businessPost(__data).then(res => {
      if (res.data.status === "00") {
        this.loadingButton();
        this.setState({
          alert: res.data.message
        });
        setTimeout(() => {
          this.props.history.push("/");
        }, 1000);
      } else {
        this.setState({
          alert: res.data.message,
          button: "Buat outlet"
        });
        this.resetAlert();
      }
    });
  };

  myBusiness_API = () => {
    const __data = JSON.stringify({
      id: this.props.user_id,
      token: this.props.token,
      data_type: 3
    });

    generalPost(__data)
      .then(res => {
        if (res.status === 200) {
          let indexOfBusiness = { ...this.state.data };
          indexOfBusiness.select_business = res.data[0].id.toString();

          this.setState({
            businessSelect: res.data,
            data: indexOfBusiness,
            isLoading: false
          });
        }
      })
      .catch(() => {
        this.setState({
          isLoading: true
        });
      });
  };

  outletNumberEmployee_API = () => {
    const __data = JSON.stringify({
      id: this.props.user_id,
      token: this.props.token,
      data_type: 1
    });
    generalPost(__data)
      .then(res => {
        if (res.status === 200) {
          let indexOfOutletNumberEmployee = { ...this.state.data };
          indexOfOutletNumberEmployee.outlet_num_emp = res.data[0].id.toString();

          this.setState({
            employeeSelect: res.data,
            data: indexOfOutletNumberEmployee
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  countryList_API = () => {
    const __data = JSON.stringify({
      id: this.props.user_id,
      token: this.props.token,
      data_type: 0
    });

    locationPost(__data)
      .then(res => {
        if (res.status === 200) {
          let indexOfOutletNumberEmployee = { ...this.state.data };
          indexOfOutletNumberEmployee.outlet_country = res.data[101].id.toString();
          this.setState({
            countrySelect: res.data,
            data: indexOfOutletNumberEmployee
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.newOutlet_API();

    this.setState({
      button: "Loading..."
    });
  };

  handleChange = event => {
    let newData = { ...this.state.data };
    newData[event.target.name] = event.target.value;

    this.setState({
      data: newData
    });
  };

  loadingButton = () => {
    this.setState({
      button: "Loading..."
    });
  };

  resetAlert = () => {
    setTimeout(() => {
      this.setState({
        alert: !this.state.alert
      });
    }, 3000);
  };

  componentDidMount() {
    this.outletNumberEmployee_API();
    this.countryList_API();
    this.myBusiness_API();
  }

  render() {
    const mapBusinessList = this.state.businessSelect.map(item => {
      return (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      );
    });

    const mapOutletNumberEmployee = this.state.employeeSelect.map(item => {
      return (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      );
    });

    const mapCountryList = this.state.countrySelect.map(item => {
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

          {this.state.isLoading ? (
            <Loading />
          ) : (
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
                      {mapOutletNumberEmployee}
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
                      value={this.state.data.outlet_country}
                      onChange={this.handleChange}
                      className="select-group"
                    >
                      {mapCountryList}
                    </select>
                  </div>
                </div>

                <div className="ds-block">
                  <div
                    className={
                      !this.state.alert
                        ? "card-alert-disable failed"
                        : "card-alert ds-inline-blok failed"
                    }
                  >
                    <p>{this.state.alert}</p>
                  </div>
                </div>

                <ButtonBig
                  className="mt-20 fw-600"
                  onClick={this.clickSubmitOutlet}
                  title={this.state.button}
                />
              </div>
            </form>
          )}
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

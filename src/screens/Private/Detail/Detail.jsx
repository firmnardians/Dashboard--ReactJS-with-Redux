import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ButtonBig from "../../../components/Button/ButtonBig";
import "./Detail.css";

export class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      button: "Selesai",
      alert: false,
      myBusiness: false,

      businessSelect: [],
      employeeSelect: [],
      countrySelect: [],

      data: {
        business_name: "",
        outlet_name: "",
        business_category: "1",
        outlet_num_emp: "1",
        outlet_phone_number: "",
        outlet_address: "",
        outlet_country: "102"
      }
    };
  }

  myBusinessAPI = () => {
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
        // console.log(res);
        if (res.data.length > 0) {
          this.setState({
            myBusiness: !this.state.myBusiness
          });
          this.props.history.push("/");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  PostAPIDetail = () => {
    const {
      business_name,
      outlet_name,
      business_category,
      outlet_num_emp,
      outlet_phone_number,
      outlet_address,
      outlet_country
    } = this.state.data;

    const payload = JSON.stringify({
      id: this.props.user_id,
      token: this.props.token,
      business_name: business_name,
      outlet_name: outlet_name,
      business_category: business_category,
      outlet_num_emp: outlet_num_emp,
      outlet_phone_number: outlet_phone_number,
      outlet_address: outlet_address,
      outlet_country: outlet_country
    });

    axios
      .post("https://devtest-api-beo.hop.cash/v1/api/auth/detail", payload)
      .then(res => {
        const _response = res.data;
        console.log(_response);
        if (res.data.status === "00") {
          console.log(res.data.message);
          this.loadingSubmit();

          window.location.reload();
        } else {
          this.setState({
            alert: res.data.message
          });
          this.resetAlert();
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  businessCategoryList = () => {
    const businessList = JSON.stringify({
      id: this.props.user_id,
      token: this.props.token,
      data_type: 0
    });

    axios
      .post(
        "https://devtest-api-beo.hop.cash/v1/api/data/general",
        businessList
      )
      .then(res => {
        // const _response = res.data;
        // console.log(_response);

        if (res.statusText === "OK") {
          this.setState({
            businessSelect: res.data
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
    const CountryList = JSON.stringify({
      id: this.props.user_id,
      token: this.props.token,
      data_type: 0
    });

    axios
      .post(
        "https://devtest-api-beo.hop.cash/v1/api/data/location",
        CountryList
      )
      .then(res => {
        // const _response = res.data;
        // console.log(_response);
        if (res.statusText === "OK") {
          this.setState({
            countrySelect: res.data
          });
        }
      });
  };

  handleChange = event => {
    let newData = { ...this.state.data };
    newData[event.target.name] = event.target.value;
    // console.log(newData);
    this.setState({
      data: newData
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.PostAPIDetail();
  };

  loadingSubmit = () => {
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
    this.businessCategoryList();
    this.outletNumberEmployee();
    this.countryList();
    this.myBusinessAPI();
  }

  render() {
    return (
      <>
        <div className="card-detail-app">
          <div className="card-form-detail">
            <div className="card-title-detail">
              <h1>Detail usaha</h1>
              <p>Bentar lagi selesai, isi dulu detail usaha kamu.</p>
            </div>

            <form onSubmit={this.handleSubmit}>
              <div className="card-input-detail">
                <input
                  onChange={this.handleChange}
                  name="business_name"
                  type="text"
                  autoComplete="off"
                  placeholder="Nama Usaha"
                  className="input-form-detail"
                />
              </div>

              <div className="card-input-detail">
                <input
                  onChange={this.handleChange}
                  name="outlet_name"
                  type="text"
                  autoComplete="off"
                  placeholder="Nama Outlet"
                  className="input-form-detail"
                />
              </div>

              <div className="card-input-detail">
                <select
                  name="business_category"
                  onChange={this.handleChange}
                  className="select-detail"
                >
                  {this.state.businessSelect.map(item => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="card-input-detail">
                <select
                  name="outlet_num_emp"
                  onChange={this.handleChange}
                  className="select-detail"
                >
                  {this.state.employeeSelect.map(item => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="card-input-detail">
                <input
                  onChange={this.handleChange}
                  type="number"
                  autoComplete="off"
                  name="outlet_phone_number"
                  placeholder="Nomor telepon outlet"
                  className="input-form-detail"
                />
              </div>

              <div className="card-input-detail mt-20">
                <input
                  onChange={this.handleChange}
                  type="text"
                  autoComplete="off"
                  name="outlet_address"
                  placeholder="Alamat outlet"
                  className="input-form-detail"
                />
              </div>

              <div className="card-input-detail">
                <select
                  name="outlet_country"
                  onChange={this.handleChange}
                  className="select-detail"
                  value={this.state.data.outlet_country}
                >
                  {this.state.countrySelect.map(item => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div
                className={
                  !this.state.alert
                    ? "card-alert-disable failed"
                    : "card-alert failed"
                }
              >
                <p>{this.state.alert}</p>
              </div>

              <ButtonBig
                title={this.state.button}
                className={"ds-block text-center mg-0 fw-bold "}
              />
            </form>
          </div>
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

export default withRouter(connect(stateToProps)(Detail));

import React, { Component } from "react";
import InputNormal from "../../components/Input/InputNormal";
import ButtonBig from "../../components/Button/ButtonBig";
import axios from "axios";

export class CreateOutlet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectBusiness: [],
      selectCountry: [],

      formSubmitOutlet: {
        id_outlet: "",
        outlate_title: "",
        business_title: "",
        outlet_employee: "",
        outlet_address: "",
        outlet_telephone: "",
        outlet_country: ""
      }
    };
  }

  postOutletToAPI = () => {
    axios
      .post("http://localhost:3004/outlet", this.state.formSubmitOutlet)
      .then(result => {
        console.log(result);
      });
  };

  getBusinessAPI = () => {
    axios.get("http://localhost:3004/business").then(response => {
      this.setState({
        selectBusiness: response.data
      });
    });
  };

  getCountryAPI = () => {
    axios.get("http://localhost:3004/country").then(response => {
      this.setState({
        selectCountry: response.data
      });
    });
  };

  clickSubmitOutlet = () => {
    console.log("work");
  };

  handleFormChange = event => {
    console.log(event.target);
  };

  componentDidMount() {
    this.getBusinessAPI();
    this.getCountryAPI();
  }

  render() {
    return (
      <>
        <div className="card-app">
          <div className="card-flex">
            <div className="card-grid">
              <p>Pilih Bisnis</p>
              <select className="select-group">
                {this.state.selectBusiness.map(item => {
                  return (
                    <option key={item.id} value={item.title}>
                      {item.title}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="card-grid">
              <p>Nama Outlet</p>
              <InputNormal
                onChange={this.handleFormChange}
                title="outlate_title"
              />
            </div>
            <div className="card-grid">
              <p>Jumlah Karyawan</p>
              <select name="" id="" className="select-group">
                <option value="1-5">1 - 5</option>
                <option value="6-10">6 - 10</option>
                <option value="11-15">11 - 15</option>
              </select>
            </div>
          </div>

          <div className="card-flex mt-30">
            <div className="card-grid">
              <p>Nomor handphone Outlet</p>
              <InputNormal
                onChange={this.handleFormChange}
                title="outlet_telephone"
              />
            </div>
            <div className="card-grid">
              <p>Alamat</p>
              <InputNormal
                onChange={this.handleFormChange}
                title="outlet_address"
              />
            </div>
            <div className="card-grid">
              <p>Negara</p>
              <select name="" id="" className="select-group">
                {this.state.selectCountry.map(item => {
                  return (
                    <option value={item.country} key={item.id}>
                      {item.country}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <ButtonBig
            onClick={this.clickSubmitOutlet}
            className="mt-30"
            title="Buat Outlet"
          />
        </div>
      </>
    );
  }
}

export default CreateOutlet;

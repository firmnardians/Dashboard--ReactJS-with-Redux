import React, { Component } from "react";
import axios from "axios";
import ButtonMedium from "../../components/Button/ButtonMedium";

export class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: [],
      editAccount: {
        id: "",
        name: "",
        email: "",
        telephone: ""
      }
    };
  }

  getAccountAPI = () => {
    axios.get("http://localhost:3004/profile").then(result => {
      console.log(result.data);
      this.setState({
        account: result.data
      });
    });
  };
  componentDidMount() {
    this.getAccountAPI();
  }

  render() {
    return (
      <>
        <div className="card-content-app">
          <div className="card-content-title">
            <h1>Edit Akun</h1>
          </div>
          <div className="card-app">
            <div className="card-flex">
              <div className="card-grid">
                <p>Nama</p>
                <input type="text" className="input-normal" />
              </div>
              <div className="card-grid">
                <p>Email</p>
                <input type="email" className="input-normal" />
              </div>
              <div className="card-grid">
                <p>Telephone</p>
                <input type="number" className="input-normal" />
              </div>
            </div>

            <ButtonMedium title="Simpan" className="mt-30" />
          </div>
        </div>
      </>
    );
  }
}

export default Setting;

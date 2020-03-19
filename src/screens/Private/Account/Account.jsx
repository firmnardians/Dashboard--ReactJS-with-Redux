import React, { Component } from "react";
import DetailAccount from "../../components/DetailAccount/DetailAccount";
import { Link } from "react-router-dom";
import ButtonMedium from "../../components/Button/ButtonMedium";

export class Account extends Component {
  render() {
    return (
      <div className="card-content-app">
        <div className="card-content-title">
          <h1>Account</h1>
        </div>

        <div className="card-app">
          <div className="card-detail-account">
            <DetailAccount info="Nama" title="Ade Firman Ardiansyah" />
            <DetailAccount info="Email" title="firmnardians@gmail.com" />
            <DetailAccount info="Telephone" title="081398907475" />
            <DetailAccount info="Password" title="Password" />
            <DetailAccount info="Registrasi" title="Password" />
            <DetailAccount info="Terakhir login" title="Password" />
          </div>
          <Link to="/setting">
            <ButtonMedium title="Edit Akun" />
          </Link>
        </div>
      </div>
    );
  }
}

export default Account;

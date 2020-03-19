import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ButtonMedium from "../../../components/Button/ButtonMedium";
import "./ForgotPassword.css";

export class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      button: "Kirim",
      alert: false,

      data: {
        email: ""
      }
    };
  }

  postAPIforgotPassword = () => {
    const { email } = this.state.data;
    const payload = JSON.stringify({
      email: email
    });
    axios
      .post("https://devtest-api-beo.hop.cash/v1/api/auth/forgot", payload)
      .then(res => {
        // console.log(res);

        if (res.data.status === "00") {
          this.setState({
            alert: "Berhasil, " + res.data.message,
            button: "Kirim"
          });
          this.resetAlert();
        } else {
          this.setState({
            alert: res.data.message,
            button: "Kirim"
          });
          this.resetAlert();
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
    this.postAPIforgotPassword();
    this.setState({
      button: "Loading..."
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

  render() {
    const { email } = this.state.data;
    const buttonEnable = email.length >= 3;
    let submitButton;

    if (!buttonEnable) {
      submitButton = (
        <ButtonMedium title="Kirim" disabled className="btn-disable fw-600" />
      );
    } else {
      submitButton = (
        <ButtonMedium title={this.state.button} className="fw-600" />
      );
    }
    return (
      <>
        <div className="card-forgot-app">
          <div className="card-form-forgot">
            <div className="card-title-forgot">
              <h1>Lupa password</h1>
              <p>
                Masukkan email Anda dan kami akan mengirimi Anda sebuah tautan
                untuk mengatur ulang password.
              </p>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="card-input-forgot">
                <input
                  type="email"
                  autoComplete="off"
                  name="email"
                  onChange={this.handleChange}
                  placeholder="Email"
                  className="input-form-forgot"
                />
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

              {submitButton}
            </form>

            <div className="card-footer-forgot mt-20">
              <p>
                <Link className="color-primary pr-5 fw-600" to="/register">
                  Buat akun baru
                </Link>
                atau kembali ke
                <Link className="color-primary pl-5 fw-600" to="/login">
                  halaman masuk
                </Link>
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ForgotPassword;

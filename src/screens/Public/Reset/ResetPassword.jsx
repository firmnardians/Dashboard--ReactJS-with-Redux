import React, { Component } from "react";
import ButtonBig from "../../components/Button/ButtonBig";
import "./ResetPassword.css";

export class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      showAlert: false,

      data: {
        password: "",
        newPassword: ""
      }
    };
  }
  handleSubmit = event => {
    event.preventDefault();
  };

  handleChange = event => {
    let newData = { ...this.state.data };
    newData[event.target.name] = event.target.value;
    // console.log(newData);
    this.setState({
      data: newData
    });
  };

  clickShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword
    });
  };

  clickSubmit = () => {
    console.log("work, tinggal nunggu API");
    console.log(this.state.data);
  };
  render() {
    const { password, newPassword } = this.state.data;
    const buttonEnable = password.length >= 3 && newPassword.length >= 3;
    let submitButton;

    if (buttonEnable && password === newPassword) {
      submitButton = (
        <ButtonBig
          onClick={this.clickSubmit}
          className="fw-600"
          title="Ubah password"
        />
      );
    } else {
      submitButton = (
        <ButtonBig
          onClick={null}
          className="fw-600 btn-disable"
          title="Ubah password"
        />
      );
    }
    return (
      <>
        <div className="card-reset-app">
          <div className="card-form-reset">
            <div className="card-title-reset">
              <h1>Atur ulang password</h1>
              <p>Harap simpan kata sandi Anda seaman mungkin.</p>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="card-input-reset">
                <input
                  type={this.state.showPassword ? "text" : "password"}
                  name="password"
                  onChange={this.handleChange}
                  autoComplete="off"
                  placeholder="Password baru"
                  className="input-form-forgot"
                />
                <div className="card-show-password">
                  <i
                    onClick={this.clickShowPassword}
                    className="material-icons icon-show-password cursor-pointer"
                  >
                    {!this.state.showPassword ? `visibility_off` : `visibility`}
                  </i>
                </div>
              </div>

              <div className="card-input-reset">
                <input
                  type={this.state.showPassword ? "text" : "password"}
                  autoComplete="off"
                  onChange={this.handleChange}
                  name="newPassword"
                  placeholder="Ulangi password baru"
                  className="input-form-forgot"
                />
                <div className="card-show-password">
                  <i
                    onClick={this.clickShowPassword}
                    className="material-icons icon-show-password cursor-pointer"
                  >
                    {!this.state.showPassword ? `visibility_off` : `visibility`}
                  </i>
                </div>
              </div>

              {this.state.showAlert ? (
                <p className="color-alert ">
                  Pastikan password yang Anda masukkan keduanya sama.
                </p>
              ) : (
                ""
              )}

              {submitButton}
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default ResetPassword;

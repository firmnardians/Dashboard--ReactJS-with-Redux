import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Component
import ButtonBig from "../../components/Button/ButtonBig";

// Styling
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingSubmit: "Masuk",
      loginFailed: "",
      showPassword: false,
      data: {
        email: "",
        password: ""
      }
    };
  }

  postDataAPI = () => {
    const { email, password } = this.state.data;
    const payload = JSON.stringify({
      email: email,
      password: password
    });

    axios
      .post("https://devtest-api-beo.hop.cash/v1/api/auth/login", payload)
      .then(res => {
        const _response = res.data;
        console.log(_response);
        if (res.data.status === "00") {
          localStorage.setItem("name", res.data.name);
          localStorage.setItem("id", res.data.user_id);
          localStorage.setItem("role_id", res.data.role_id);
          localStorage.setItem("phone_number", res.data.phone_number);
          localStorage.setItem("email", res.data.email);
          localStorage.setItem("lang", res.data.lang);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem(
            "permission",
            JSON.stringify(res.data.permission)
          );
          console.log(res.data.message);
          this.loadingSubmit();
        } else {
          console.log(res.data.message);
          this.setState({
            loginFailed: res.data.message
          });
          this.resetAlert();
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = event => {
    // console.log(event.target.name);
    let newData = { ...this.state.data };
    newData[event.target.name] = event.target.value;
    this.setState({
      data: newData
    });
    // console.log(this.state.data);
  };

  handleSubmit = event => {
    event.preventDefault();
    // console.log(this.state.data);
    // console.log(email);
    // console.log(password);
  };

  clickSubmit = () => {
    if (!this.state.data.email) {
      console.log("button disable");
    } else {
      this.postDataAPI();
    }
  };

  clickShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword
    });
  };

  loadingSubmit = () => {
    this.setState({
      loadingSubmit: "Loading..."
    });
  };

  resetAlert = () => {
    setTimeout(() => {
      this.setState({
        loginFailed: !this.state.loginFailed
      });
    }, 3000);
  };

  render() {
    // button Disable start
    const { email, password } = this.state.data;
    const buttonEnable = email.length > 0 && password.length >= 3;
    let loginButton;

    if (!buttonEnable) {
      loginButton = (
        <ButtonBig
          title={this.state.loadingSubmit}
          className={"ds-block text-center mg-0 fw-bold btn-disable"}
          onClick={null}
        />
      );
    } else {
      loginButton = (
        <ButtonBig
          title={this.state.loadingSubmit}
          className={"ds-block text-center mg-0 fw-bold "}
          onClick={this.clickSubmit}
        />
      );
    }
    // button Disable finish

    return (
      <>
        <div className="card-login-app">
          <div className="card-form-login">
            <div className="card-title-login">
              <h1>Masuk</h1>
              <p>Silahkan masuk dengan akun yang sudah Anda buat.</p>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="card-input-login">
                <input
                  type="text"
                  required
                  autoComplete="off"
                  placeholder="Email"
                  name="email"
                  className="input-form-login"
                  onChange={this.handleChange}
                />
              </div>
              <div className="card-input-login">
                <input
                  type={this.state.showPassword ? "text" : "password"}
                  autoComplete="off"
                  placeholder="Password"
                  required
                  name="password"
                  className="input-form-login"
                  onChange={this.handleChange}
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
              <div className="card-forget-password-login ">
                <p>Lupa password?</p>
              </div>
              <div
                className={
                  !this.state.loginFailed
                    ? "card-alert-disable failed"
                    : "card-alert failed"
                }
              >
                <p>{this.state.loginFailed}</p>
              </div>

              {loginButton}
            </form>

            <div className="card-footer-login">
              <p>
                Belum punya akun?
                <Link className="color-primary fw-600 pl-5" to="/signup">
                  Daftar sekarang
                </Link>
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Login;

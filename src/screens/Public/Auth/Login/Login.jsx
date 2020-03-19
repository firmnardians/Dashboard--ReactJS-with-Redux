import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { loginUser } from "../../../../redux/Actions/AuthAction";
import { connect } from "react-redux";
import ButtonBig from "../../../../components/Button/ButtonBig";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      button: "Masuk",
      alert: false,
      showPassword: false,

      data: {
        email: "",
        password: ""
      }
    };
  }

  postAPILogin = async () => {
    const { email, password } = this.state.data;
    const payload = JSON.stringify({
      email: email,
      password: password
    });

    await axios
      .post("https://devtest-api-beo.hop.cash/v1/api/auth/login", payload)
      .then(res => {
        // const _response = res.data;
        // console.log(_response);
        if (res.data.status === "00") {
          console.log(res.data);
          this.loadingButton();
          this.props.__loginUser({
            user_id: res.data.user_id,
            name: res.data.name,
            role_id: res.data.role_id,
            phone_number: res.data.phone_number,
            email: res.data.email,
            lang: res.data.lang,
            permission: res.data.permission,
            token: res.data.token
          });
          this.props.history.push("/");
        } else {
          // console.log(res.data.message);
          this.setState({
            alert: res.data.message,
            button: "Masuk"
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
    // console.log(newData);
    this.setState({
      data: newData
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.postAPILogin();
    this.setState({
      button: "Loading..."
    });
  };

  clickShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword
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
    const { email, password } = this.state.data;
    const buttonEnable = email.length > 0 && password.length >= 3;
    let submitButton;

    if (!buttonEnable) {
      submitButton = (
        <ButtonBig
          title={this.state.button}
          disabled
          className={"width-100 text-center mg-0 fw-bold btn-disable"}
        />
      );
    } else {
      submitButton = (
        <ButtonBig
          title={this.state.button}
          className={"width-100 text-center mg-0 fw-bold"}
        />
      );
    }

    return (
      <>
        <div className="card-login-app">
          <div className="card-form-login">
            <div className="card-title-login">
              <h1>Masuk </h1>
              <p>Silahkan masuk dengan akun yang sudah Anda buat.</p>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="card-input-login">
                <input
                  type="email"
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
              <Link to="/forgot-password">
                <div className="card-forget-password-login color-primary">
                  <p>Lupa password?</p>
                </div>
              </Link>
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

            <div className="card-footer-login">
              <p>
                Belum punya akun?
                <Link className="color-primary fw-600 pl-5" to="/register">
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

// ini dari reducernya
const stateToProps = state => {
  return {
    isAuth: state.auth.isAuthenticated,
    user_id: state.auth.user_id,
    name: state.auth.name,
    role_id: state.auth.role_id,
    phone_number: state.auth.phone_number,
    email: state.auth.email,
    lang: state.auth.lang,
    permission: state.auth.permission,
    token: state.auth.token
  };
};

// ini dari actionnya
const dispatchToProps = dispatch => ({
  __loginUser: payload => {
    dispatch(loginUser(payload));
  }
});

export default connect(stateToProps, dispatchToProps)(Login);

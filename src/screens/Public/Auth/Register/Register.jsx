import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { registerUser } from "../../../../redux/Actions/AuthAction";
import { connect } from "react-redux";
import ButtonBig from "../../../../components/Button/ButtonBig";
import "./Register.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      button: "Buat Akun",
      alert: false,
      showRefferal: false,
      showPassword: false,

      data: {
        name: "",
        phone_number: "",
        email: "",
        password: "",
        refferal: null
      }
    };
  }

  postAPIRegister = () => {
    let { name, phone_number, email, password, refferal } = this.state.data;
    const payload = JSON.stringify({
      name: name,
      phone_number: phone_number,
      email: email,
      password: password,
      refferal: refferal
    });

    axios
      .post("https://devtest-api-beo.hop.cash/v1/api/auth/register", payload)
      .then(async res => {
        const _response = res.data;
        console.log(_response);

        if (res.data.status === "00") {
          // console.log(res.data.message);
          this.loadingButton();
          await this.props.__registerUser({
            user_id: res.data.id,
            name: res.data.name,
            role_id: res.data.role_id,
            phone_number: res.data.phone_number,
            email: res.data.email,
            permission: res.data.permission,
            token: res.data.token
          });
          this.props.history.push("/");
        } else {
          // console.log(res.data.message);
          this.setState({
            alert: res.data.message,
            button: "Buat Akun"
          });
          this.resetAlert();
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = event => {
    // console.log(event.target);
    let newData = { ...this.state.data };
    newData[event.target.name] = event.target.value;
    // console.log(newData);
    this.setState({
      data: newData
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.postAPIRegister();
    this.setState({
      button: "Loading..."
    });
  };

  clickShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword
    });
  };

  clickShowRefferal = () => {
    this.setState({
      showRefferal: !this.state.showRefferal
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
    const { name, phone_number, email, password } = this.state.data;
    const buttonEnable =
      name.length > 0 &&
      phone_number.length > 0 &&
      email.length > 0 &&
      password.length > 0;

    let SignupButton;

    if (!buttonEnable) {
      SignupButton = (
        <ButtonBig
          title={this.state.button}
          className={"width-100 text-center mg-0 fw-bold btn-disable"}
        />
      );
    } else {
      SignupButton = (
        <ButtonBig
          title={this.state.button}
          className={"width-100 text-center mg-0 fw-bold "}
        />
      );
    }
    return (
      <>
        <div className="card-signup-app">
          <div className="card-form-signup">
            <div className="card-title-signup">
              <h1>Daftar Gratis</h1>
              <p>
                Silahkan daftar hanya dengan melewati satu langkah, tidak perlu
                pembayaran, komitmen ataupun kontrak.
              </p>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="card-input-signup">
                <input
                  onChange={this.handleChange}
                  placeholder="Nama"
                  autoComplete="off"
                  name="name"
                  type="text"
                  className="input-form-signup"
                />
              </div>
              <div className="card-input-signup">
                <input
                  onChange={this.handleChange}
                  type="number"
                  name="phone_number"
                  autoComplete="off"
                  className="input-form-signup"
                  placeholder="Nomor telepon pemilik usaha"
                />
              </div>
              <div className="card-input-signup">
                <input
                  onChange={this.handleChange}
                  type="email"
                  name="email"
                  autoComplete="off"
                  placeholder="Email"
                  className="input-form-signup"
                />
              </div>

              <div className="card-input-signup">
                <input
                  onChange={this.handleChange}
                  type={this.state.showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="off"
                  placeholder="Password"
                  className="input-form-signup"
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

              <div
                onClick={this.clickShowRefferal}
                className="card-refferal-signup color-primary fw-600 cursor-pointer"
              >
                <p>Pakai kode refferal</p>
              </div>

              <div
                className={
                  !this.state.showRefferal
                    ? "card-input-signup-disable "
                    : "card-input-signup mt-20"
                }
              >
                <input
                  onChange={this.handleChange}
                  type="text"
                  name="refferal"
                  autoComplete="off"
                  placeholder="Kode refferal"
                  className="input-form-signup"
                />
              </div>

              <div className="card-footer-signup ">
                <p>
                  Dengan mendaftar, Anda menyetujui Terms of Services dan telah
                  membaca Privacy Policy dari HOP
                </p>
              </div>

              <div
                className={
                  this.state.alert
                    ? "card-alert failed"
                    : "card-alert-disable failed"
                }
              >
                <p>{this.state.alert}</p>
              </div>

              {SignupButton}
            </form>

            <div className="card-footer-signup">
              <p>
                Sudah punya akun?
                <Link className="color-primary fw-600 pl-5" to="/login">
                  Masuk
                </Link>
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const stateToProps = state => {
  return {
    isAuth: state.auth.isAuthenticated,
    user_id: state.auth.id,
    name: state.auth.name,
    role_id: state.auth.role_id,
    phone_number: state.auth.phone_number,
    email: state.auth.email,
    permission: state.auth.permission,
    token: state.auth.token
  };
};

const dispatchToProps = dispatch => ({
  __registerUser: payload => {
    dispatch(registerUser(payload));
  }
});

export default connect(stateToProps, dispatchToProps)(Register);

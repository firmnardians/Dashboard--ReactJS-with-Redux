import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Component
import ButtonBig from "../../components/Button/ButtonBig";

// Styling
import "./Signup.css";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingSubmit: "Buat Akun",
      signupFailed: "",
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

  postDataAPI = () => {
    let { name, phone_number, email, password, refferal } = this.state.data;
    const payload = JSON.stringify({
      name: name,
      phone_number: phone_number,
      email: email,
      password: password,
      refferal: refferal
    });

    axios
      .post("http://devtest-api-beo.hop.cash/v1/api/auth/register", payload)
      .then(res => {
        const _response = res.data;
        console.log(_response);

        if (res.data.status === "00") {
          localStorage.setItem("name", res.data.name);
          localStorage.setItem("id", res.data.id);
          localStorage.setItem("role_id", res.data.role_id);
          localStorage.setItem("phone_number", res.data.phone_number);
          localStorage.setItem("email", res.data.email);
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
            signupFailed: res.data.message
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
  };

  clickSubmit = () => {
    if (!this.state.data.name) {
      console.log("button disabled");
    } else {
      this.postDataAPI();
      // console.log(this.state.data);
    }
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

  resetAlert = () => {
    setTimeout(() => {
      this.setState({
        signupFailed: ""
      });
    }, 3000);
  };

  loadingSubmit = () => {
    this.setState({
      loadingSubmit: "Loading..."
    });
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
          title={this.state.loadingSubmit}
          className={"ds-block text-center mg-0 fw-bold btn-disable"}
          onClick={null}
        />
      );
    } else {
      SignupButton = (
        <ButtonBig
          title={this.state.loadingSubmit}
          className={"ds-block text-center mg-0 fw-bold "}
          onClick={this.clickSubmit}
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
                  this.state.signupFailed.length > 0
                    ? "card-alert failed"
                    : "card-alert-disable failed"
                }
              >
                <p>{this.state.signupFailed}</p>
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

export default Signup;
